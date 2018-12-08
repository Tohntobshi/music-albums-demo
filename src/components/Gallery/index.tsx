import * as React from "react";
import * as R from "ramda";
import { Subject, Subscription, of } from "rxjs";
import { mapTo, switchMap, takeUntil, tap, map, pairwise, concat } from "rxjs/operators";
import classnames from "classnames";
import Cover from ":components/Cover";
import { Album } from ":types";
import { createAutoScrollSequence } from ":utils";
const styles = require("./styles.scss");

export interface Position {
  position: number;
  maxPosition: number;
}

interface Props {
  className?: string;
  savedAlbums: Album[];
  onRemove: (id: string) => void;
  onMove: (position: Position) => void;
}

export default class extends React.PureComponent<Props> {
  private dragSubscription: Subscription;
  private dragStart$ = new Subject();
  private dragMove$ = new Subject();
  private dragEnd$ = new Subject();

  private position = 0;
  private elementRefs: HTMLDivElement[] = [];

  private applyOffset = () => {
    this.elementRefs.forEach((el, index) => {
      if (!el) { return; }
      const currentPosition = index * 320;
      const currentOffset = currentPosition - this.position;
      const currentOffsetAbs = Math.abs(currentOffset);
      let currentX = currentOffset;
      currentX = currentX > 320 ? 320 : currentX;
      currentX = currentX < -320 ? -320 : currentX;
      let currentScale = 1;
      if (currentOffsetAbs > 160) {
        currentScale = 1 - (currentOffsetAbs - 160) / 1280;
        currentScale = Math.min(1, Math.max(0, currentScale));
      }
      el.style.zIndex = -currentOffsetAbs as any;
      el.style.transformOrigin = currentOffset > 0 ? "bottom left" : "bottom right";
      el.style.transform = `translate3d(${currentX}px, 0, 0) scale(${currentScale})`;
      if (currentOffsetAbs > 560) {
        el.style.display = "none";
      } else {
        el.style.display = "block";
      }
    });
  }

  private scrollTo = (targetPosition: number = this.position) => {
    const maxPosition = (this.elementRefs.length - 1) * 320;
    if (targetPosition < 0) {
      this.position = 0;
    } else if (targetPosition > maxPosition) {
      this.position = maxPosition;
    } else {
      this.position = targetPosition;
    }
    this.applyOffset();
    this.props.onMove({ position: this.position, maxPosition });
  }

  public componentDidMount() {
    this.dragSubscription = this.dragStart$.pipe(
      switchMap((startEvt: any) => {
        const startPosition = this.position;
        const startCursorPos = startEvt.clientX;

        const autoScrollOptions = {
          velocity: 0,
          currentPosition: startPosition,
          currentTimestamp: Date.now(),
          snap: 320,
        };

        return this.dragMove$.pipe(
        takeUntil(this.dragEnd$),
          map((moveEvt: any) => startPosition - (moveEvt.clientX - startCursorPos)),
          tap((position) => {
            const time = Date.now();
            const delta = position - autoScrollOptions.currentPosition;
            const elapsed = time - autoScrollOptions.currentTimestamp;
            autoScrollOptions.currentTimestamp = time;
            autoScrollOptions.currentPosition = position;
            const v = (1000 * delta) / (elapsed + 1);
            autoScrollOptions.velocity = (0.8 * v) + (0.2 * autoScrollOptions.velocity);
          }),
          concat(createAutoScrollSequence(autoScrollOptions)),
        );
      }),
    ).subscribe(this.scrollTo);
    this.scrollTo();
  }

  public componentDidUpdate() {
    this.scrollTo();
  }

  public componentWillUnmount() {
    this.dragSubscription.unsubscribe();
  }

  public render() {
    this.elementRefs = [];
    return (
      <div
        className={styles.container}
        onMouseDown={(e) => { e.preventDefault(); this.dragStart$.next(e); }}
        onMouseMove={(e) => { e.preventDefault(); this.dragMove$.next(e); }}
        onMouseUp={(e) => { e.preventDefault(); this.dragEnd$.next(); }}
        onMouseLeave={(e) => { e.preventDefault(); this.dragEnd$.next(); }}
      >
        {
          this.props.savedAlbums.map((el: Album, index) => (
            <div
              ref={(ref) => { this.elementRefs[index] = ref; }}
              className={styles.cover}
              key={el.id}
            >
              <Cover source={el.cover} size={320}/>
              <button className={styles.delButton} onClick={() => this.props.onRemove(el.id)} />
            </div>
          ))
        }
      </div>
    );
  }
}
