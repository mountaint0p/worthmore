DROP TABLE item CASCADE; 
DROP TABLE tag CASCADE;
DROP TABLE item_tag;
create table item (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	item_name VARCHAR NOT NULL,
    date_added DATE NOT NULL DEFAULT CURRENT_DATE,
    image_url VARCHAR NOT NULL,
    on_hold BOOLEAN NOT NULL DEFAULT false
);

create table tag (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    tag_name VARCHAR NOT NULL
);

create table item_tag(
    item_id int NOT NULL REFERENCES item (id) ON UPDATE CASCADE ON DELETE CASCADE,
    tag_id int NOT NULL REFERENCES tag (id) ON UPDATE CASCADE
);

insert into tag (tag_name) values ('decoration');
insert into tag (tag_name) values ('lighting');
insert into tag (tag_name) values ('utility');
insert into tag (tag_name) values ('supplies');
insert into tag (tag_name) values ('fans');
insert into tag (tag_name) values ('mirrors');
insert into tag (tag_name) values ('supplies');
insert into tag (tag_name) values ('organizing');
insert into item (item_name, image_url) values ('Desk Lamp', 'https://cdn.britannica.com/88/212888-050-6795342C/study-lamp-electrical-cord.jpg');
insert into item (item_name, image_url) values ('Standing Fan', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Quat.JPG/1200px-Quat.JPG');
insert into item (item_name, image_url) values ('Antique Mirror', 'https://i.ebayimg.com/images/g/PAsAAOSwXIpgNy83/s-l300.jpg');
insert into item (item_name, image_url) values ('Hangers', 'https://m.media-amazon.com/images/I/61hCGD50-WL._AC_SL1333_.jpg');
insert into item (item_name, image_url) values ('Ethernet Cable', 'https://m.media-amazon.com/images/I/41p6o9LzoOL._AC_.jpg');
insert into item_tag (item_id, tag_id) values (1, 1);
insert into item_tag (item_id, tag_id) values (1, 2);
insert into item_tag (item_id, tag_id) values (2, 5);
insert into item_tag (item_id, tag_id) values (3, 1);
insert into item_tag (item_id, tag_id) values (3, 6);
insert into item_tag (item_id, tag_id) values (4, 3);
insert into item_tag (item_id, tag_id) values (5, 3);



