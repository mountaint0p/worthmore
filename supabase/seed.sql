/*Insert single banner item to banner table*/
insert into
public.banner (id, banner_exist)
values
(1, false);

/*Insert single store_status item to store_status table*/
insert into 
public.store_status (id, is_closed)
values 
(1, false);

/*Insert items to item table*/
insert into 
public.items ("imageURL", "tags", "title")
values
('https://i5.walmartimages.com/asr/23f0e749-597e-4117-abb0-970922d54f02_3.8aca18c4bdf58f44708adf5bdfa42dc1.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF',
ARRAY ['Supplies'], 'Black Binder');

insert into 
public.items ("imageURL", "tags", "title")
values
('https://i5.walmartimages.com/asr/23f0e749-597e-4117-abb0-970922d54f02_3.8aca18c4bdf58f44708adf5bdfa42dc1.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF',
ARRAY ['Supplies'], '');

/*Insert triggers*/
create trigger create_user_row_trigger
  after insert on auth.users
  for each row execute procedure public.create_user_row();

