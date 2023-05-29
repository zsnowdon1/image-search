export type Photo = {
    id: number;
    bucketUrl: string;
    filename: string;
    uniqueName: string;
    uploadTime: Date;
    downloadUrl: string;
}

export type Attribute = {
    id: number,
    name: string
}