export type Photo = {
    id?: number;
    bucketUrl: String;
    filename: String;
    uploadTime: Date;
};

export type PhotoDAO = {
    photo: Photo;
    attributes: Attribute[];
}

export type AttributeDAO = {
    id: number;
    name: String;
    score: number;
};

export type PhotoUser = {
    username: String;
    photoId: number;
    isOwner: boolean;
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