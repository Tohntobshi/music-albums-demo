import { Observable } from "rxjs";

export function createAutoScrollSequence(
  options: { velocity: number; snap: number; currentPosition: number; },
): Observable<number> {
  return new Observable((observer) => {
    const { velocity, snap, currentPosition } = options;
    const releaseTimestamp = Date.now();

    let autoScrollTarget = currentPosition; // target position
    let autoScrollAmplitude = 0; // target distance
    if (velocity > 10 || velocity < -10) {
      autoScrollAmplitude = 0.9 * velocity; // update target distance according to velocity
      autoScrollTarget = currentPosition + autoScrollAmplitude; // updating target position
    }
    autoScrollTarget = Math.round(autoScrollTarget / snap) * snap; // adjusting target position to grid
    autoScrollAmplitude = autoScrollTarget - currentPosition; // adjusting target distance to grid

    const autoScroll = () => {
      if (autoScrollAmplitude) {
        const elapsed = Date.now() - releaseTimestamp;
        const delta = -autoScrollAmplitude * Math.exp(-elapsed / 500);
        if (delta > 2 || delta < -2) {
          observer.next(autoScrollTarget + delta);
          window.requestAnimationFrame(autoScroll);
        } else {
          observer.next(autoScrollTarget);
        }
      }
    };
    autoScroll();
    window.requestAnimationFrame(autoScroll);
  });
}
