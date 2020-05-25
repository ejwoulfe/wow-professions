CREATE TABLE `professions` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `image` varchar(255),
  `recipes_id` int
);

CREATE TABLE `alchemy_recipes` (
  `recipe_id` int PRIMARY KEY AUTO_INCREMENT,
  `recipe_name` varchar(255),
  `recipe_image` varchar(255),
  `reagents` json,
  `optional_reagents` json,
  `profession_id` int
);

CREATE TABLE `blacksmithing_recipes` (
  `recipe_id` int PRIMARY KEY AUTO_INCREMENT,
  `recipe_name` varchar(255),
  `recipe_image` varchar(255),
  `reagents` json,
  `optional_reagents` json,
  `profession_id` int
);

CREATE TABLE `enchanting_recipes` (
  `recipe_id` int PRIMARY KEY AUTO_INCREMENT,
  `recipe_name` varchar(255),
  `recipe_image` varchar(255),
  `reagents` json,
  `optional_reagents` json,
  `profession_id` int
);

CREATE TABLE `herbalism_recipes` (
  `recipe_id` int PRIMARY KEY AUTO_INCREMENT,
  `recipe_name` varchar(255),
  `recipe_image` varchar(255),
  `reagents` json,
  `optional_reagents` json,
  `profession_id` int
);

CREATE TABLE `inscription_recipes` (
  `recipe_id` int PRIMARY KEY AUTO_INCREMENT,
  `recipe_name` varchar(255),
  `recipe_image` varchar(255),
  `reagents` json,
  `optional_reagents` json,
  `profession_id` int
);

CREATE TABLE `jewelcrafting_recipes` (
  `recipe_id` int PRIMARY KEY AUTO_INCREMENT,
  `recipe_name` varchar(255),
  `recipe_image` varchar(255),
  `reagents` json,
  `optional_reagents` json,
  `profession_id` int
);

CREATE TABLE `leatherworking_recipes` (
  `recipe_id` int PRIMARY KEY AUTO_INCREMENT,
  `recipe_name` varchar(255),
  `recipe_image` varchar(255),
  `reagents` json,
  `optional_reagents` json,
  `profession_id` int
);

CREATE TABLE `mining_recipes` (
  `recipe_id` int PRIMARY KEY AUTO_INCREMENT,
  `recipe_name` varchar(255),
  `recipe_image` varchar(255),
  `reagents` json,
  `optional_reagents` json,
  `profession_id` int
);

CREATE TABLE `skinning_recipes` (
  `recipe_id` int PRIMARY KEY AUTO_INCREMENT,
  `recipe_name` varchar(255),
  `recipe_image` varchar(255),
  `reagents` json,
  `optional_reagents` json,
  `profession_id` int
);

CREATE TABLE `tailoring_recipes` (
  `recipe_id` int PRIMARY KEY AUTO_INCREMENT,
  `recipe_name` varchar(255),
  `recipe_image` varchar(255),
  `reagents` json,
  `optional_reagents` json,
  `profession_id` int
);

ALTER TABLE `alchemy_recipes` ADD FOREIGN KEY (`profession_id`) REFERENCES `professions` (`recipes_id`);

ALTER TABLE `blacksmithing_recipes` ADD FOREIGN KEY (`profession_id`) REFERENCES `professions` (`recipes_id`);

ALTER TABLE `enchanting_recipes` ADD FOREIGN KEY (`profession_id`) REFERENCES `professions` (`recipes_id`);

ALTER TABLE `herbalism_recipes` ADD FOREIGN KEY (`profession_id`) REFERENCES `professions` (`recipes_id`);

ALTER TABLE `inscription_recipes` ADD FOREIGN KEY (`profession_id`) REFERENCES `professions` (`recipes_id`);

ALTER TABLE `jewelcrafting_recipes` ADD FOREIGN KEY (`profession_id`) REFERENCES `professions` (`recipes_id`);

ALTER TABLE `leatherworking_recipes` ADD FOREIGN KEY (`profession_id`) REFERENCES `professions` (`recipes_id`);

ALTER TABLE `mining_recipes` ADD FOREIGN KEY (`profession_id`) REFERENCES `professions` (`recipes_id`);

ALTER TABLE `skinning_recipes` ADD FOREIGN KEY (`profession_id`) REFERENCES `professions` (`recipes_id`);

ALTER TABLE `tailoring_recipes` ADD FOREIGN KEY (`profession_id`) REFERENCES `professions` (`recipes_id`);
