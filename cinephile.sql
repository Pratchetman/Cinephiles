create database cinephile;
use cinephile;
-- drop database cinephile;
create table user(
	user_id MEDIUMINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    user_name VARCHAR(50) NOT NULL,
    user_last_name VARCHAR(80) NOT NULL,
    phone_number VARCHAR(15),
    user_email VARCHAR(50) NOT NULL UNIQUE,
    user_password VARCHAR(100) NOT NULL,
    user_img VARCHAR(100) NOT NULL default "user_default.jpg",
    user_description VARCHAR(200),
    deleted BOOLEAN NOT NULL DEFAULT false
);

create table movie(
	movie_id MEDIUMINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    user_id MEDIUMINT UNSIGNED NOT NULL,
    title VARCHAR(80) NOT NULL,
    director VARCHAR(80),
    genre VARCHAR(20),
    release_year year(4),
    movie_img VARCHAR(100) NOT NULL default "movie_default.jpg",
    movie_description VARCHAR(600),
    deleted BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT fk_user_id_1 FOREIGN KEY (user_id)
	REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

insert into user (user_name, user_last_name, phone_number, user_email, user_password, user_description) VALUES ("Manuel", "Valera García", "123456789", "manuelvalera@hotmail.com", "123456", "Enamorado del cine gore");
insert into user (user_name, user_last_name, phone_number, user_email, user_password, user_img, user_description) VALUES ("Manuel", "Valera García", "123456789", "manuelvalera@hotmail.com", "123456", "img.jpg", "Enamorado del cine gore");
select * from user;