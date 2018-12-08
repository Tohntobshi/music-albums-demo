export interface Album {
  id: string;
  title: string;
  artist: string;
  date: number;
  country: string;
  trackCount: number;
  cover: string;
  searchScore?: number;
}

export interface RootState {
  textToSearch: string;
  searchPending: boolean;
  errorText: string;
  foundAlbums: Album[];
  savedAlbums: Album[];
}
