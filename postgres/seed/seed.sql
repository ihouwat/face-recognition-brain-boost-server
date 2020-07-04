-- seed database with fake users

BEGIN TRANSACTION;

INSERT into users (name, email, pet, age, entries, joined) values ('a', 'a@gmail.com', 'dragon', '23', 5, '2018-01-01');
-- password is 'a'
INSERT into login (hash, email) values ('$2a$10$WAK21U0LWl7C//jJ.DOB2uPP1DJQh7KUDgasdyQeGzkop2Pzl8W7u', 'a@gmail.com');

COMMIT;