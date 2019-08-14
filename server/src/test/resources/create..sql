insert into users(id, ban_expired, ban_reason, email, first_name, last_name, login, password, phone) values
(1,current_date ,'spam','admin@gmail.com', 'petya','petrov','admin','admin','123');


insert into  user_role(user_id, role) values
(1,'ADMIN');


insert into apartment(id, address, floor, room_count, square) values
(1,'pobeda',1,1,34);


insert into announcement(id, creation_date, description, is_sale, price, apartment_id, user_id) values
(1,current_date ,'announcement_1',true,150,1,1);
