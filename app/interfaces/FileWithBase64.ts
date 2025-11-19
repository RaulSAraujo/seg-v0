export interface FileWithBase64 {
    base64: string;
    name: string;
    type: string;
    size?: number;
    lastModified?: number;
}