export interface Album {
  id: string;
  title: string;
  artist: string;
  date: number;
  country: string;
  trackCount: number;
}

export interface RootState {
  textToSearch: string;
  errorText: string;
  foundAlbums: Album[];
  savedAlbums: Album[];
}
