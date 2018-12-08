import { Observable, Observer } from "rxjs";
import * as R from "ramda";

export function getCover(id: string): Observable<string> {
  return Observable.create((observer: Observer<string>) => {
    const req = new XMLHttpRequest();
    const onLoad = () => {
      try {
        const result = R.pipe(
          JSON.parse,
          R.prop("images"),
          R.find((el: any) => el.types.includes("Front")),
          (el: any) => el["thumbnails"]["500"] || el["thumbnails"]["large"] || "",
        )(req.responseText);
        observer.next(result);
      } catch (e) { observer.error(new Error("cannot parse result")); }
    };
    const onLoadEnd = () => observer.complete();
    const onError = (e: any) => observer.error(e);
    req.addEventListener("load", onLoad);
    req.addEventListener("loadend", onLoadEnd);
    req.addEventListener("error", onError);
    req.open("get", `https://coverartarchive.org/release/${id}`);
    req.send();
    return () => {
      req.abort();
      req.removeEventListener("load", onLoad);
      req.removeEventListener("loadend", onLoadEnd);
      req.removeEventListener("error", onError);
    };
  });
}
