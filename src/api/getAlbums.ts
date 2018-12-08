import { Observable, Observer, of } from "rxjs";
import * as R from "ramda";
import { Album } from ":types";

export function getAlbums(textToSearch: string): Observable<Album[]> {
  if (!textToSearch) { return of([]); }
  return Observable.create((observer: Observer<Album[]>) => {
    const req = new XMLHttpRequest();
    const onLoad = () => {
      try {
        const result = R.pipe(
          JSON.parse,
          R.prop("releases"),
          R.map((el: any) => {
            try {
              return {
                id: el["id"] || "",
                title: el["title"] || "",
                trackCount: el["track-count"] || 0,
                date: new Date(el["date"]).getTime(),
                country: el["country"] || "",
                cover: "",
                artist: el["artist-credit"][0]["artist"]["name"] || "",
                searchScore: el["score"],
              };
            } catch (e) {
              return null;
            }
          }),
          R.filter((el: any) => el),
        )(req.responseText) as Album[];
        observer.next(result);
      } catch (e) { observer.error(new Error("cannot parse result")); }
    };
    const onLoadEnd = () => observer.complete();
    const onError = (e: any) => observer.error(e);
    req.addEventListener("load", onLoad);
    req.addEventListener("loadend", onLoadEnd);
    req.addEventListener("error", onError);
    req.open("get", `http://musicbrainz.org/ws/2/release/?query=release:${textToSearch}&fmt=json`);
    req.send();
    return () => {
      req.abort();
      req.removeEventListener("load", onLoad);
      req.removeEventListener("loadend", onLoadEnd);
      req.removeEventListener("error", onError);
    };
  });
}
