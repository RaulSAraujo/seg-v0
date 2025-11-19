export interface Photo {
    success: boolean;
    paths: Path[];
}

export interface Path {
    name: string;
    fileName: string;
    photo: string;
    fileExtension: null | string;
}
