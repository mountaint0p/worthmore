DROP TABLE item; 
create table item (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	item_name VARCHAR NOT NULL,
    date_added DATE NOT NULL DEFAULT CURRENT_DATE,
    image_url VARCHAR NOT NULL,
    on_hold BOOLEAN NOT NULL DEFAULT false
);

insert into item (item_name, image_url) values ('Cool Desk Lamp', 'https://cdn.britannica.com/88/212888-050-6795342C/study-lamp-electrical-cord.jpg');
insert into item (item_name, image_url) values ('Awesome Desk Lamp', 'https://cdn.britannica.com/88/212888-050-6795342C/study-lamp-electrical-cord.jpg');
insert into item (item_name, image_url) values ('A Desk Lamp', 'https://cdn.britannica.com/88/212888-050-6795342C/study-lamp-electrical-cord.jpg');
insert into item (item_name, image_url) values ('Wow a Lamp', 'https://cdn.britannica.com/88/212888-050-6795342C/study-lamp-electrical-cord.jpg');
insert into item (item_name, image_url) values ('Sick Lamp', 'https://cdn.britannica.com/88/212888-050-6795342C/study-lamp-electrical-cord.jpg');
insert into item (item_name, image_url) values ('Dope Lamp', 'https://cdn.britannica.com/88/212888-050-6795342C/study-lamp-electrical-cord.jpg');


