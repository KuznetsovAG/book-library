export interface Books {
  id: string;
  volumeInfo: VolumeInfo;
}

export interface VolumeInfo {
  authors?: string[];
  categories?: string[];
  description?: string;
  title?: string;
  imageLinks?: {
    smallThumbnail?: string;
    thumbnail?: string;
  };
}

export interface StateBooks {
  books: Books[];
  loading: boolean | string;
  total: number;
  hasError: boolean;
  search: string | number;
  categories: string;
  selectValue: string;
  foundBooks: Books | null;
  startIndex: number;
}
