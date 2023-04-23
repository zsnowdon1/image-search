export type Photo = {
    id?: number;
    bucketUrl: string;
    filename: string;
    uploadTime: Date;
    downloadUrl?: string;
};

export type PhotoDAO = {
    photo: Photo;
    attributes: Attribute[];
}

export type AttributeDAO = {
    id: number;
    name: string;
    score: number;
};

export type PhotoUser = {
    username: string;
    photoId: number;
    isOwner: boolean;
};

export type LoginInfo = {
    username: string;
    password: string;
};

export type User = {
    username: string;
    password: string;
};

export type Attribute = {
    name: string;
    score: number;
    photoId: number;
};