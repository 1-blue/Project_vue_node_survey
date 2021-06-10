/* DB생성 */
CREATE DATABASE survey DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

/*  유저검색 */
use mysql;
SELECT user, host FROM user;

/*  유저생성 및 권한부여 */
CREATE user 'surveyUser'@'localhost' IDENTIFIED BY '1234';
GRANT ALL PRIVILEGES ON survey.* TO 'surveyUser'@'localhost';
flush privileges;

/* 권한확인 */
SHOW GRANTS FOR 'surveyUser'@'localhost';