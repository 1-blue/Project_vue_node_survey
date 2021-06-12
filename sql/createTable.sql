/* users생성 */
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '유저의 아이디 ( 유저를 식별할 값 )',
  `email` varchar(20) NOT NULL COMMENT '유저 이메일',
  `name` varchar(20) NOT NULL COMMENT '유저 이름',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/* surveys생성 */
CREATE TABLE `surveys` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '질문지의 아이디',
  `title` varchar(20) NOT NULL COMMENT '질문지 제목',
  `state` int NOT NULL COMMENT '질문지 상태 (0: 대기, 1: 배포, 9: 종료)',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/* answers생성 */
CREATE TABLE `answers` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '답변의 id',
  `answer` varchar(400) DEFAULT NULL COMMENT '답변 내용',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int DEFAULT NULL,
  `QuestionId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  KEY `QuestionId` (`QuestionId`),
  CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `answers_ibfk_2` FOREIGN KEY (`QuestionId`) REFERENCES `questions` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/* questions생성 */
CREATE TABLE `questions` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '질문의 id',
  `title` varchar(100) NOT NULL COMMENT '질문의 제목',
  `kinds` int NOT NULL COMMENT '질문의 종류 (0: 제목, 1: 단답 주관식, 2: 장문 주관식, 3: 객관식 )',
  `required` tinyint(1) NOT NULL COMMENT '대답 필수인지 아닌지',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `SurveyId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `SurveyId` (`SurveyId`),
  CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`SurveyId`) REFERENCES `surveys` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
