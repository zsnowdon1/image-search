CREATE DATABASE IF NOT EXISTS `image_data`;
USE `image_data`;


CREATE TABLE IF NOT EXISTS `user` (
    `username` varchar(100) NOT NULL,
    `password` varchar(255) NOT NULL,
    PRIMARY KEY (`username`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
INSERT INTO image_data.`user`
    VALUES ('zsnowdon', 'password');

CREATE TABLE IF NOT EXISTS `photo` (
    `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
    `bucket_url` varchar(250) NOT NULL,
    `filename` varchar(100) NOT NULL,
    `upload_time` TIMESTAMP NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS `photo_user` (
    `user_id` int(10) unsigned NOT NULL,
    `photo_id` int(10) unsigned NOT NULL,
    PRIMARY KEY (`user_id`, `photo_id`),
    CONSTRAINT  `pu_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT  `pu_photo_id` FOREIGN KEY (`photo_id`) REFERENCES `photo` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;