import * as React from "react";
import * as R from "ramda";
import { Subject, Subscription } from "rxjs";
import { mapTo, switchMap, takeUntil, tap, map, pairwise } from "rxjs/operators";
import classnames from "classnames";
import Cover from ":components/Cover";
import { Album } from ":types";
const styles = require("./styles.scss");

export interface Position {
  position: number;
  maxPosition: number;
}

interface Props {
  className?: string;
  savedAlbums: Album[];
  // onRemove: (id: string) => void;
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
      let currentX = currentOffset;
      currentX = currentX > 320 ? 320 : currentX;
      currentX = currentX < -320 ? -320 : currentX;
      let currentScale = 1;
      if (Math.abs(currentOffset) > 160) {
        currentScale = 1 - (Math.abs(currentOffset) - 160) / 1280;
        currentScale = Math.min(1, Math.max(0, currentScale));
      }
      el.style.transformOrigin = currentOffset > 0 ? "bottom left" : "bottom right";
      el.style.transform = `translate3d(${currentX}px, 0, 0) scale(${currentScale})`;
      el.style.zIndex = `${this.elementRefs.length * 320 - Math.abs(currentOffset)}`;
      if (Math.abs(currentOffset) > 560) {
        el.style.display = "none";
      } else {
        el.style.display = "block";
      }
    });
  }

  private scrollBy = (amount: number) => {
    const maxPosition = (this.elementRefs.length - 1) * 320;
    if (this.position + amount < 0) {
      this.position = 0;
    } else if (this.position + amount > maxPosition) {
      this.position = maxPosition;
    } else {
      this.position += amount;
    }
    this.applyOffset();
    this.props.onMove({ position: this.position, maxPosition });
  }

  public componentDidMount() {
    this.dragSubscription = this.dragStart$.pipe(
      switchMap(() => this.dragMove$.pipe(
        takeUntil(this.dragEnd$),
        map((e: any) => e.clientX),
        pairwise(),
        map(([a, b]) => a - b),
      )),
    ).subscribe(this.scrollBy);
    this.scrollBy(0);
  }

  public componentDidUpdate() {
    this.scrollBy(0);
  }

  public componentWillUnmount() {
    this.dragSubscription.unsubscribe();
  }

  public render() {
    this.elementRefs = [];
    return (
      <div
        className={styles.container}
        onMouseDown={(e) => { e.preventDefault(); this.dragStart$.next(); }}
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
            </div>
          ))
        }
      </div>
    );
  }
}
