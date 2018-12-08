import * as React from "react";
import * as R from "ramda";
import classnames from "classnames";
import Cover from ":components/Cover";
import { Album } from ":types";
const styles = require("./styles.scss");
const defaultCover = require(":images/default-cover.svg");

interface Props {
  className?: string;
  savedAlbums: Album[];
  foundAlbums: Album[];
  onSave: (id: string) => void;
  onRemove: (id: string) => void;
}

export default ({ foundAlbums, className, savedAlbums, onSave, onRemove }: Props) => {
  const savedIds = R.pluck("id", savedAlbums);
  return (
    <div className={classnames([styles.container, className])}>
      {
        foundAlbums.map((el: Album) => {
          const isSaved = savedIds.includes(el.id);
          return (
            <div
              key={el.id}
              className={classnames(styles.album, isSaved && styles.saved)}
              onClick={() => isSaved ? onRemove(el.id) : onSave(el.id) }
            >
              <Cover source={el.cover} size={124} />
              <div>
                <p className={styles.info}>{el.title}</p>
                <p className={styles.info}>{el.artist}</p>
                <p className={styles.info}>{new Date(el.date).getFullYear() || ""}</p>
                <p className={styles.info}>{el.country}</p>
                <p className={styles.info}>Tracks: {el.trackCount}</p>
              </div>
            </div>
          );
        })
      }
    </div>
  );
};
