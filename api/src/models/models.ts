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
    name: String;
    score: number;
    photoId: number;
};