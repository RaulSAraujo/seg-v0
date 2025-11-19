export interface FileManager {
  filename: string;
  ext?: string;
  data: string;
  size?: string;
}

export interface FileManagerReadDir {
  elements: Element[];
  totalCount: number;
  totalSize: string;
}

export interface Element {
  name: string;
  sizeMB: string;
  type: string;
  ext: string
}
