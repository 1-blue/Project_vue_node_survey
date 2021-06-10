/* users생성 */
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(20) NOT NULL,
  `name` varchar(20) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/* surveys생성 */
CREATE TABLE `surveys` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(20) NOT NULL,
  `state` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/* answers생성 */
CREATE TABLE `answers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `answer` varchar(400) DEFAULT NULL,
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
  `id` int NOT NULL AUTO_INCREMENT,
  `contents` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `SurveyId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `SurveyId` (`SurveyId`),
  CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`SurveyId`) REFERENCES `surveys` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
