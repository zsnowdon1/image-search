export type Photo = {
    id?: number;
    bucketUrl: String;
    filename: String;
    uploadTime: Date;
};

export type PhotoUser = {
    username: String;
    photoId: number;
};

export type LoginInfo = {
    username: String;
    password: String;
};

export type User = {
    username: String;
    password: String;
};

export type Attribute = {
    id?: number;
    name: String;
    score: number;
    photoId: number;
};