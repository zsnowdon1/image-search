CREATE DATABASE IF NOT EXISTS `image_data`;
USE `image_data`;


CREATE TABLE IF NOT EXISTS `user` (
    `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
    `username` varchar(100) NOT NULL,
    `password` varchar(255) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
INSERT INTO image_data.`user`
    (username, password)
    VALUES('zsnowdon', 'password');
