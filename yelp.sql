CREATE DATABASE  IF NOT EXISTS `yelp` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `yelp`;
-- MySQL dump 10.13  Distrib 8.0.21, for macos10.15 (x86_64)
--
-- Host: localhost    Database: yelp
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `customer_name` varchar(50) NOT NULL,
  `customer_email_id` varchar(255) NOT NULL,
  `customer_password` varchar(100) NOT NULL,
  `customer_image` varchar(255) DEFAULT NULL,
  `customer_phone` varchar(45) DEFAULT NULL,
  `date_of_birth` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `nick_name` varchar(100) DEFAULT NULL,
  `headline` varchar(255) DEFAULT NULL,
  `yelping_since` varchar(255) DEFAULT NULL,
  `things_i_love` varchar(255) DEFAULT NULL,
  `find_me_in` varchar(255) DEFAULT NULL,
  `my_blog` varchar(255) DEFAULT NULL,
  `when_not_yelping` varchar(255) DEFAULT NULL,
  `why_read_my_reviews` varchar(255) DEFAULT NULL,
  `recent_discovery` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `customer_email_id_UNIQUE` (`customer_email_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'Shravanthi ','b.s.shravanthi94@gmail.co','$2a$10$SNPU2GebHjEW6tenkzbTuend.TDG3P/L.EwV0yQUyoII3Mado80UO','//www.gravatar.com/avatar/63dfb5b4bcffd3b0cc00a49aa610ab8c?s=200&r=pg&d=mm','9258568468','','San Jose','California','United States','Shravs','','undefined','Baking','North Park','','','',''),(2,'Swathi','swathi@gmail.com','$2a$10$9MBzJJZq3UNsOZ5rrtXEUeBdXPtbwtDpPTKyJbtdrGlkEfqHS6LSC','//www.gravatar.com/avatar/8d33fc447540a7541fc1543d157353c8?s=200&r=pg&d=mm',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3,'Surarchith Chithanuri','suri@gmail.com','$2a$10$x4Ss0gqWXh243hPx/.QRau2uBXgrt1KhnBte0Sn4mj/A1P0nmmFwW','customer3-1602009399694.JPG','469-951-9999','undefined','San Jose','California','USA','undefined','I am the GOD.','undefined','I love watching telugu movies','','','','',''),(4,'arya','arya@mail.com','$2a$10$2YggLs6tMDLGk2ZH70s/1edpB6wkPuCIXXioei3gTYVTJbstzbxM2','//www.gravatar.com/avatar/6bb697f712b771d6ffde704feb9b3cdb?s=200&r=pg&d=mm',NULL,'','Bangalore','Karnataka','India','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5,'Siya','siya@mail.com','$2a$10$toFMas.hXnv9ed.yaQtan.AKeJEmHWCwq7yTvUvOkwl3nR3YvFc/.','customer5-1602015149759.JPG',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(6,'Aravind PK','aravind@gmail.com','$2a$10$FN1l/YKyV8Bu91zJRNLrMeCmO7VmxZRuqBbcN9r5KXPzXXVn3wzwu','customer6-1602016551670.JPG',NULL,'','San Francisco','California','USA','Aru','I am the best','September, 2020',NULL,NULL,NULL,NULL,NULL,NULL),(7,'Maya','maya@mail.com','$2a$10$uc3vDRTEhffd308MDbjQ7uvgp20oLwyYBzQIMdRIJ7Ojc1jd8DB8K','customer7-1602009256227.jpg','(469) 951-9683','','Seattle','Washington','USA','Shravs','“I’ve missed more than 9,000 shots in my career. I’ve lost almost 300 games. 26 times I’ve been trusted to take the game winning shot and missed. I’ve failed over and over and over again in my life and that is why I succeed.” – Michael Jordan','undefined','I love my mom.','','','','',''),(8,'Richa','richarao95@gmail.com','$2a$10$hwuNSlkv0jWUkpzKyEindO3I1NhUN/7jH0LCnbXhnyPJz5LlYW2ha','//www.gravatar.com/avatar/4278289a479d6f13ebf314e8505ad0ca?s=200&r=pg&d=mm','2066368521','10-05-1994','San Jose','California','United States','Richie','I am god','October, 2020',NULL,NULL,NULL,NULL,NULL,NULL),(9,'Richa Rao','rr@mail.com','$2a$10$IL5ZlbiUS7nFjm174jlWOennQKQkE8cxfGvQMMLsLT6VrlUvRHqEW','customer9-1602039998075.jpg','111-273-6666','10-05-1994','San Jose','California','USA','Richie','“A man who dares to waste one hour of time has not discovered the value of life.” —Charles Darwin','October, 2020','I love to sing. I love icecreams too.','North Park','www.richaraosing.com','I am singing.','Because I never lie','iGrill chicken biryani is the best'),(10,'Barbecue','bb@mail.com','$2a$10$vUSh/4PF6rP7mmMg3.a0O.O8F6h9ceSRz.KdBzFuN0QSCiWf6QU.m','//www.gravatar.com/avatar/ea6a50ef1a8a9fc8c78f81b6c45a2a81?s=200&r=pg&d=mm',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'October, 2020',NULL,NULL,NULL,NULL,NULL,NULL),(11,'Harika','hp@mail.com','$2a$10$E0FtdTAdxna1TqSOQP4aM.zb97axWQ/nMXUt1M/KkCGkQKcGnXSFy','none',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'October, 2020',NULL,NULL,NULL,NULL,NULL,NULL),(12,'Ganesh Ram','gg@mail.com','$2a$10$UIJIS7U9aPtCK/qNOffMFeDI/KBtJWPn4yvZkIqbrQljWXogIRNrm','customer12-1602107772726.jpg','111-273-6666','10/24/1993','San Jose','California','USA','Ganuuu','“Find ecstasy in life; the mere sense of living is joy enough.” —Emily Dickinson','October, 2020','DOGS are pure love.','Chennai','www.ganu.com','I am studying...','Coz I am a foodie',''),(13,'Harika','harike@mail.com','$2a$10$JWJbPWLBOYc9c14wFaUKQuBgSQZ95/FxxlOxu5pvXeAPExYMSOfby','none',NULL,'11-10-1994','Santa Clara','California','United States','Harpie','“A man who dares to waste one hour of time has not discovered the value of life.” —Charles Darwin','October, 2020','I love to bake. I am a good singer.','Domicilio','www.hp.com','I am watching TV shows','Because I am a great critic','');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_about_data`
--

DROP TABLE IF EXISTS `customer_about_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_about_data` (
  `about_id` int NOT NULL AUTO_INCREMENT,
  `yelping_since` year DEFAULT NULL,
  `things_i_love` varchar(255) DEFAULT NULL,
  `find_me_in` varchar(255) DEFAULT NULL,
  `my_blog` varchar(255) DEFAULT NULL,
  `when_not_yelping` varchar(255) DEFAULT NULL,
  `why_read_my_reviews` varchar(255) DEFAULT NULL,
  `recent_discovery` varchar(255) DEFAULT NULL,
  `customer_id` int NOT NULL,
  PRIMARY KEY (`about_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_about_data`
--

LOCK TABLES `customer_about_data` WRITE;
/*!40000 ALTER TABLE `customer_about_data` DISABLE KEYS */;
INSERT INTO `customer_about_data` VALUES (1,2018,'Gaming','Twitter','instaWeather.com','Travelling','They are honest','I am god',3);
/*!40000 ALTER TABLE `customer_about_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_register`
--

DROP TABLE IF EXISTS `event_register`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_register` (
  `event_id` int unsigned NOT NULL,
  `customer_id` int NOT NULL,
  PRIMARY KEY (`event_id`,`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_register`
--

LOCK TABLES `event_register` WRITE;
/*!40000 ALTER TABLE `event_register` DISABLE KEYS */;
INSERT INTO `event_register` VALUES (1,1),(1,2),(1,3),(2,3),(2,7),(3,3),(3,4),(3,6),(3,7),(3,8),(3,9),(4,3),(4,4),(4,6),(4,7),(4,9),(4,12),(5,3),(5,7),(5,9),(6,3),(6,9),(7,3),(7,7),(7,8),(7,9),(8,7),(9,3),(9,7),(10,7),(11,13);
/*!40000 ALTER TABLE `event_register` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `event_id` int unsigned NOT NULL AUTO_INCREMENT,
  `event_name` varchar(255) NOT NULL,
  `event_description` varchar(3000) DEFAULT NULL,
  `event_time` varchar(45) NOT NULL,
  `event_date` date NOT NULL,
  `event_location` varchar(255) DEFAULT NULL,
  `event_hashtags` varchar(255) DEFAULT NULL,
  `creater_id` int NOT NULL,
  PRIMARY KEY (`event_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (1,'Farmers Market','All fresh vegetables.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ','09:10:00','2021-06-23','Sunnyvale, California','#farmermarket',0),(2,'Heritage Food Tour','Unleash your inner foodie during the Rockridge Neighborhood Heritage & Walking Food Tour - our original Oakland food tour! During this three-hour long guided walking you take a walk through the neighborhood, discovering the area\'s rich history and exploring its fast-growing dining culture!','09:10:00','2021-06-23','Sunnyvale, California','#farmermarket',0),(3,'Broadway & Hollywood','In a year where everything was cancelled, join us throughout October for Yelp Haunts at Home: a month of virtual tricks and treats, sugar and pumpkin spice, and all things spooky. Dim the lamps, light some candles, and cue the eerie music - Halloween is here!','03:22:10','2020-09-30','Cupertino, California','#art #event #fun',2),(4,'Latinx Heritage Month','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ','04:00:00','2020-10-01','San Francisco, California','#dance #enjoy',0),(5,'Jwelry Expo','typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.','04:00:00','2020-10-03','Salt Lake City, Utah','#traditional',0),(6,'Shrav Gallery','Gallery of artisty books paintings.. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type.','05:00:00','2020-12-03','Santa Clara','#paintings',3),(7,'Flavors of Photography','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ','05:00:00','2020-10-10','Seattle, Washington','#travel #life',3),(8,'Food Fest','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ','04:00:00','2020-12-03','Phoenix, Arizona','#enjoy #party',4),(9,'Yelp Haunts at Home','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ','04:00:00','2021-03-02','Portland, Oregon','#cool #dance #play',3),(10,'Biryani Fest','Whoever eats more biryani wins $1000 bucks. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ','07:00:00','2021-12-03','Cupertino, California','#biryani #fest #eatfood',6),(11,'CPR AED Course in Berkeley','Who should take this class?\nTeachers, summer camp counselors, coaches, fitness instructors. foster care, social workers, parents, babysitters (ten years or older), construction workers, & general workplace.','04:00:00','2020-12-03','San Francisco, California','#yoga #health',6);
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu_items`
--

DROP TABLE IF EXISTS `menu_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu_items` (
  `item_id` int NOT NULL AUTO_INCREMENT,
  `item_name` varchar(255) NOT NULL,
  `item_ingredients` varchar(255) NOT NULL,
  `item_image` varchar(255) DEFAULT NULL,
  `item_price` float DEFAULT NULL,
  `item_description` varchar(255) DEFAULT NULL,
  `item_category` varchar(255) DEFAULT NULL,
  `restaurant_id` int NOT NULL,
  PRIMARY KEY (`item_id`),
  KEY `restaurant_id` (`restaurant_id`),
  CONSTRAINT `restaurant_id` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`restaurant_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_items`
--

LOCK TABLES `menu_items` WRITE;
/*!40000 ALTER TABLE `menu_items` DISABLE KEYS */;
INSERT INTO `menu_items` VALUES (1,'Small plate','Charred green beans, olive oil','1',20.99,'with Black Twig apples, fuyu persimmons, pomegranates, walnuts, Andante Dairy goat cheese and cider vinaigrette','Main Course',2),(2,'Gobi Manchurian','Cauliflower, Garam Masala, Red Sauce','1',8,'undefined','Appetizer',2),(3,'Idly','Rice flour, Soda','1',5.99,'Indian','Appetizer',4),(4,'Pizza','Vegetables, Jalapenos','1',15.99,'Italian','Main Course',4),(5,'Garlic Noodles','Gralic, Noodles, Chili','1',5.99,'Chinese','Salads',4),(6,'Chicken Biryani','Vijaywada spice, chicken, rice','1,6-dish6-1602103650042.png',13.99,'Indian','Main Course',6),(7,'Chicken Lilipop','Chicken, Coriander','1,6-dish7-1602103668265.png',10.5,'Spicy and tasty chicken','Appetizer',6),(8,'Vegetable kadai','Vegetables, Cream','1,6-dish8-1602348949771.png,6-dish8-1602349046456.png,6-dish8-1602349057460.png',15.99,'Curry with nutritious vegetables','Salads',6),(9,'Mango Juice','Mango, Sugar','1',5.99,'Healthy and fresh','Beverages',6),(10,'Butter Lettuce Salad','Butter, Veggies','1,8-dish10-1602105720433.png,8-dish10-1602105731850.png',20.99,'Smoked bacon, Point Reyes blue cheese crumbles, grape tomatoes & buttermilk ranch','Salads',8),(11,'Spinacini Pizza','Spinach, Black Olives','1,8-dish11-1602105839334.png,8-dish11-1602349261387.png,8-dish11-1602349267836.png',22.5,'Fresh mozzarella, fresh spinach, roasted garlic, fresh basil, roasted tomatoes, extra virgin olive oil & parmesan','Main Course',8),(12,'Layer Cake','Chocolate, Cream, Butter','1,1-dish12-1602112288423.png,1-dish12-1602112296298.png',10,'Rich dark chocolate layer cake','Desserts',1),(13,'Hyderabadi Chicken Dum Biryani','Chicken, Rice, Dum','1,7-dish13-1602113259980.png,7-dish13-1602113266772.png,7-dish13-1602349194674.png',12.99,'Chicken with bones marinated with herbs, spices and special masala, cooked in low heat with long grain basmati rice. Served with raitha.','Main Course',7),(14,'Chili Paneer','Paneer, Green Chili','1,7-dish14-1602113127909.png,7-dish14-1602113136590.png',10.99,'Paneer deep fried with batter and sauteed bell pepper, Manchurian sauce, ketchup and green onions.','Appetizer',7),(15,'Espresso Frappuccino Blended','Coffee, Milk','1,9-dish15-1602230557238.png',4.5,'Blended Beverages','Beverages',9),(16,'ORIGINAL KING','LUSCIOUS SIGNATURE TONKOTSU PORK-BROTH.','1,10-dish16-1602231013781.png',22.5,'Award-winning tonkotsu pork-broth prepared in the traditional method, mouth-wateringly rich, fresh, and aromatic; special handcrafted noodles and classic Nagi pork chashu.','Main Course',10),(17,'Bakalava','Sugar, milk, caramel','1',12.99,'Mediterranean special sweet dish','Desserts',6);
/*!40000 ALTER TABLE `menu_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int unsigned NOT NULL AUTO_INCREMENT,
  `restaurant_id` int NOT NULL,
  `restaurant_name` varchar(255) NOT NULL,
  `item_name` varchar(255) DEFAULT NULL,
  `customer_id` int NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `order_date` date NOT NULL,
  `delivery_option` varchar(255) NOT NULL,
  `order_status` varchar(255) DEFAULT NULL,
  `order_type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `restaurant_id_idx` (`restaurant_id`),
  KEY `customer_id_idx` (`customer_id`),
  CONSTRAINT `orders_customer_id` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orders_restaurant_id` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`restaurant_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,1,'Mangoes Indian Cuisine','Vegetable kadai',3,'Suri','2020-09-18','DELIVERY','RECEIVED','NEW'),(2,1,'Patxis Pizza','Butter Lettuce Salad',2,'Surarchith Chithanuri','2020-09-22','PICKUP','PICK UP READY','NEW'),(3,1,'Patxis Pizza','Spinacini Pizza',1,'Suri','2020-09-22','DELIVERY','DELIVERED','COMPLETED'),(4,1,'Mangoes Indian Cuisine','Vegetable kadai',1,'Suri','2020-09-22','DELIVERY','','CANCELLED'),(5,4,'Toit','Layer Cake',1,'Suri','2020-10-01','PICKUP','RECEIVED','NEW'),(7,2,'A2B','Idly',7,'Maya','2020-10-01','PICKUP','PICKED UP','COMPLETED'),(8,4,'A2B','Idly',3,'Surarchith Chithanuri','2020-10-03','DELIVERY','RECEIVED','NEW'),(9,2,'Greens','Small plate',7,'Maya','2020-10-03','PICKUP','RECEIVED','NEW'),(10,1,'Toit','Layer Cake',7,'Maya','2020-10-03','DELIVERY',NULL,NULL),(11,3,'Inchin Bamboo','Chineese Noodles',7,'Maya','2020-10-03','PICKUP',NULL,NULL),(13,2,'Greens','Small plate',7,'Maya','2020-10-03','PICKUP','PICKED UP','COMPLETED'),(14,2,'Greens','Gobi Manchurian',7,'Maya','2020-10-03','DELIVERY','CANCELLED','CANCELLED'),(15,1,'Toit','Layer Cake',7,'Maya','2020-10-03','PICKUP',NULL,NULL),(16,1,'Toit','Layer Cake',7,'Maya','2020-10-03','PICKUP',NULL,NULL),(17,1,'Toit','Layer Cake',7,'Maya','2020-10-03','DELIVERY',NULL,NULL),(18,4,'A2B','Pizza',7,'Maya','2020-10-03','PICKUP','PICKED UP','COMPLETED'),(19,4,'A2B','Pizza',7,'Maya','2020-10-03','DELIVERY','ON THE WAY',''),(20,3,'Inchin Bamboo','Hakka Noodles',7,'Maya','2020-10-03','PICKUP',NULL,NULL),(21,1,'Toit','Layer Cake',9,'Richa Rao','2020-10-05','PICKUP',NULL,NULL),(22,1,'Toit','Layer Cake',7,'Maya','2020-10-06','DELIVERY',NULL,NULL),(23,6,'Mangoes Indian Cuisine','Chicken Biryani',9,'Richa Rao','2020-10-06','DELIVERY','PREPARING',''),(24,6,'Mangoes Indian Cuisine','Chicken Lollipop',7,'Maya','2020-10-07','DELIVERY','DELIVERED','COMPLETED'),(25,8,'Patxis Pizza','Spinacini Pizza',12,'Ganesh Ram','2020-10-07','DELIVERY',NULL,NULL),(26,8,'Patxis Pizza','Butter Lettuce Salad',12,'Ganesh Ram','2020-10-07','PICKUP',NULL,NULL),(27,6,'Mangoes Indian Cuisine','Chicken Biryani',12,'Ganesh Ram','2020-10-07','DELIVERY','DELIVERED','COMPLETED'),(28,1,'Toit','Layer Cake',7,'Maya','2020-10-09','DELIVERY',NULL,NULL),(29,6,'Mangoes Indian Cuisine','Chicken Biryani',9,'Richa Rao','2020-10-09','PICKUP','CANCELLED','CANCELLED'),(30,6,'Mangoes Indian Cuisine','Bakalava',13,'Harika','2020-10-09','DELIVERY','CANCELLED','CANCELLED'),(31,6,'Mangoes Indian Cuisine','Mango Juice',13,'Harika','2020-10-09','PICKUP',NULL,'NEW');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurant`
--

DROP TABLE IF EXISTS `restaurant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `restaurant` (
  `restaurant_id` int NOT NULL AUTO_INCREMENT,
  `restaurant_name` varchar(255) NOT NULL,
  `restaurant_email_id` varchar(255) NOT NULL,
  `restaurant_password` varchar(100) NOT NULL,
  `restaurant_location` varchar(255) NOT NULL,
  `restaurant_phone` varchar(45) DEFAULT NULL,
  `restaurant_image` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `timings` varchar(45) DEFAULT NULL,
  `delivery_method` varchar(45) DEFAULT NULL,
  `cuisine` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`restaurant_id`),
  UNIQUE KEY `restaurant_email_id_UNIQUE` (`restaurant_email_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurant`
--

LOCK TABLES `restaurant` WRITE;
/*!40000 ALTER TABLE `restaurant` DISABLE KEYS */;
INSERT INTO `restaurant` VALUES (1,'Toit','toit@eat.com','$2a$10$z8hBUNPHYG06Mbi1wqZ.LeC27miC3afJd5fSzOtcXJZZOKFm8jtoK','San Jose, CA','9258561111','restaurant1-1602112073785.png','Brick-walled microbrewery offering naturally crafted beers, hearty pub grub & brewery tours.','10:00am-12:00am','DINEIN','Indian'),(2,'Greens','green@email.com','$2a$10$wgCoPIMRmQ21RIoMuf.iq.IaHlBasxPo2w9UvL9AM4CgD00LcxtGG','Marina Blvd, San Francisco, CA 94123','123-456-6789','restaurant2-1602231334868.png','Celebrated mainstay for inventive & sustainable vegetarian dishes as well as panoramic bay views.','8:00am-10:00pm','CURBSIDE','Vegetarian restaurant'),(3,'Inchin Bamboo','ib@mail.com','$2a$10$g3QClsTxf25SdF5vzPCIIeL2mm1PLjcW/Dla0uezzs11MuAWtgy9a','River Oaks, San Jose, CA 95134','212-352-5336','restaurant3-1602231334869.png','Indian & Chinese foods share the menu at this contemporary local chain featuring Asian art.','8:00am-10:00pm','DELIVERY','Chinese'),(4,'A2B','ab@mail.com','$2a$10$g3QClsTxf25SdF5vzPCIIeL2mm1PLjcW/Dla0uezzs11MuAWtgy9a','690 Main St, Pleasanton, CA 94566','555-656-7789','restaurant4-1602111347378.png','A2B Indian Vegetarian Restaurant brings you exciting vegetarian food, making us a perfect place for dining with family or just a quick bite on the go. ','10:00am-12:00am','DINEIN','Indian'),(6,'Mangoes Indian Cuisine','mango@mail.com','$2a$10$uFyVkE9XJd8ixyRnWRUDiuCKC63OsP9pia4hv92kMZLboMBAq0AeK','2725 El Camino Real UNIT 108, Santa Clara, CA 95051','1112736666','restaurant6-1602111347378.png','Vibrant-hued cafe preparing a range of regional Indian specialties, including thali & veggie dishes.','8:00am-9:00pm','CURBSIDE','Indian'),(7,'Biryaniz','biryaniz@mail.com','$2a$10$v./wVy8Kc4Kv/yDUgPfGGek6hSZ4ZnRJNY9Q57rErKrTFnAb7p2Cm','Abbott Ave, Milpitas, CA 95035','(408) 945-5700','restaurant7-1602112949102.png','A Rich and Flavorful Layered Indian Dish A world-renowned Indian dish, biryani takes time and practice to make but is worth every bit of the effort. We serve the spiciest biryani.','11:30am-7:00pm','CURBSIDE','Indian'),(8,'Patxis Pizza','pp@mail.com','$2a$10$0YCpfanVssa3w8HoFpXLjOt5U1HOJkG2Q060MXim6V8U2ezIaVluW','3350 Zanker Rd, San Jose, CA 95134','999-123-1234','restaurant8-1602105516594.png','Pizzeria chain serving creative deep-dish & thin-crust pies in a stylish, contemporary setting.','8:00am-9:00pm','DINEIN','Italian'),(9,'Starbucks','starbucks@mail.com','$2a$10$S55o8LgrylxypBYaCUGEXeBS.YiJsk8qXwPQ1VJvS1v677hZF5qpO','Rio Robles E, San Jose, CA 95134','(408) 435-9621','restaurant9-1602230170102.webp','Starbucks Corporation is an American multinational chain of coffeehouses and roastery reserves headquartered in Seattle, Washington. ','10:00am-11:00pm','CURBSIDE','Coffee Shop'),(10,'Ramen Nagi','ramen@mail.com','$2a$10$h0YKrJp0qxBReYEo/I2duOm2WjAWkQT6662ZraXO4LFgQtTFJZG3e','Castro St, Mountain View, CA 94041','(921) 2391 6060','restaurant10-1602230778392.png','Ramen with various broths & toppings in an airy, modern space at the Westfield Vally Fair mall.','10:00am-12:00am','DELIVERY','Japaneese');
/*!40000 ALTER TABLE `restaurant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `review_id` int NOT NULL AUTO_INCREMENT,
  `rest_id` int NOT NULL,
  `cust_id` int NOT NULL,
  `date` date NOT NULL,
  `comment` varchar(255) NOT NULL,
  `rating` int NOT NULL,
  `cust_name` varchar(45) NOT NULL,
  PRIMARY KEY (`review_id`),
  UNIQUE KEY `UK_Rest_Cust` (`rest_id`,`cust_id`),
  KEY `customer_id_idx` (`cust_id`),
  KEY `restaurant_id_idx` (`rest_id`),
  CONSTRAINT `customer_review_id` FOREIGN KEY (`cust_id`) REFERENCES `customer` (`customer_id`),
  CONSTRAINT `restaurant_review_id` FOREIGN KEY (`rest_id`) REFERENCES `restaurant` (`restaurant_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,4,3,'2020-09-30','Best idly vada',5,'Suri'),(2,4,7,'2020-10-01','Best idly in this place',4,'Maya'),(5,1,7,'2020-10-01','Best idly in this place',4,'Maya'),(6,3,7,'2020-10-01','Best idly in this place',4,'Maya'),(8,1,4,'2020-10-01','Best idly in this place',4,'Maya'),(9,2,4,'2020-10-01','Best idly in this place',4,'Maya'),(10,3,4,'2020-10-01','Best idly in this place',4,'Maya'),(11,4,4,'2020-10-01','Best idly in this place',4,'Maya'),(13,2,3,'2020-10-01','Best idly in this place',4,'Surarchith Chithanuri'),(16,2,7,'2020-10-03','Service is good',4,'Maya'),(19,1,9,'2020-10-05','Best beer in bangalore',5,'Richa Rao'),(20,6,6,'2020-10-06','Best gongura biryani at Mangoes.',4,'Aravind PK'),(26,6,7,'2020-10-06','Gogura biryani is great',4,'Maya'),(28,6,9,'2020-10-06','Chicken lollipops are delicious. Delivery is a bit slow.',4,'Richa Rao'),(29,8,12,'2020-10-07','Deep dish is filling and tasty. A bit overpriced.',4,'Ganesh Ram'),(30,7,9,'2020-10-07','Spiciest biryani ever. ',5,'Richa Rao'),(31,9,7,'2020-10-09','Service is really bad. Had to wait for 25 mins to get my coffee.',1,'Maya'),(32,8,7,'2020-10-09','Pizzas are really great tasting',4,'Maya'),(33,7,7,'2020-10-09','Biryani is extra spicy. Service is good.',3,'Maya'),(34,8,9,'2020-10-09','yucckkksss',4,'Richa Rao'),(36,6,13,'2020-10-09','Good food',4,'Harika'),(37,8,13,'2020-10-10','Great pizza and love the ambience',5,'Harika');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-10-10 12:31:49
