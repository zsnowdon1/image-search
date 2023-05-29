CREATE DATABASE IF NOT EXISTS `image_data`;
USE `image_data`;

CREATE TABLE IF NOT EXISTS `user` (
    `username` varchar(100) NOT NULL,
    `password` varchar(255) NOT NULL,
    PRIMARY KEY (`username`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS `photo` (
    `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
    `unique_name` varchar(250) NOT NULL,
    `bucket_url` varchar(250) NOT NULL,
    `filename` varchar(100) NOT NULL,
    `upload_time` TIMESTAMP NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS `photo_user` (
    `username` varchar(100) NOT NULL,
    `photo_id` int(10) unsigned NOT NULL NOT NULL,
    `is_owner` boolean NOT NULL,
    PRIMARY KEY (`username`, `photo_id`),
    CONSTRAINT  `pu_username` FOREIGN KEY (`username`) REFERENCES `user` (`username`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT  `pu_photo_id` FOREIGN KEY (`photo_id`) REFERENCES `photo` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS `attribute` (
    `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
    `name` varchar(50) NOT NULL,
    `score` DECIMAL NOT NULL,
    `photo_id` int(10) unsigned NOT NULL NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `pa_photo_id` FOREIGN KEY (`photo_id`) REFERENCES `photo` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;