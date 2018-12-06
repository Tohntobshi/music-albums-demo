export interface Album {
  id: string;
  title: string;
  artist: string;
  date: Date;
  country: string;
  trackCount: number;
  cover: string;
}

export interface RootState {
  textToSearch: string;
  searchPending: boolean;
  errorText: string;
  foundAlbums: Album[];
  savedAlbums: Album[];
}
