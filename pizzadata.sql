-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3307
-- Generation Time: Feb 17, 2023 at 08:34 PM
-- Server version: 5.7.24
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pizzadata`
--

-- --------------------------------------------------------

--
-- Table structure for table `cartitems`
--

CREATE TABLE `cartitems` (
  `Id` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Price` int(11) NOT NULL,
  `Category` int(11) NOT NULL,
  `Type` varchar(13) NOT NULL,
  `Size` int(11) NOT NULL,
  `ImageUrl` varchar(2048) NOT NULL,
  `Count` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `pizzaimages`
--

CREATE TABLE `pizzaimages` (
  `Id` int(11) NOT NULL,
  `Size` int(11) NOT NULL,
  `ImageURL` varchar(2048) NOT NULL,
  `PizzaId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pizzaimages`
--

INSERT INTO `pizzaimages` (`Id`, `Size`, `ImageURL`, `PizzaId`) VALUES
(4, 26, 'https://dodopizza-a.akamaihd.net/static/Img/Products/1e726528bc1647bb9c468014a7d95b25_1875x1875.jpeg', 1),
(5, 30, 'https://dodopizza-a.akamaihd.net/static/Img/Products/65bd1f183dab47e4ac2d7d7c6b44e762_1875x1875.jpeg', 1),
(6, 40, 'https://dodopizza-a.akamaihd.net/static/Img/Products/984b1f0e10da41fca6619f68f2dd88ab_1875x1875.jpeg', 1),
(10, 26, 'https://dodopizza-a.akamaihd.net/static/Img/Products/1e726528bc1647bb9c468014a7d95b25_1875x1875.jpeg', 4);

-- --------------------------------------------------------

--
-- Table structure for table `pizzas`
--

CREATE TABLE `pizzas` (
  `Id` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Price` int(11) NOT NULL,
  `Category` int(11) NOT NULL,
  `Rating` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pizzas`
--

INSERT INTO `pizzas` (`Id`, `Name`, `Price`, `Category`, `Rating`) VALUES
(1, 'Песто', 900, 0, 4),
(4, 'Песто2', 123, 0, 5);

-- --------------------------------------------------------

--
-- Table structure for table `pizza_types`
--

CREATE TABLE `pizza_types` (
  `Id` int(11) NOT NULL,
  `PizzaId` int(11) NOT NULL,
  `TypeId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pizza_types`
--

INSERT INTO `pizza_types` (`Id`, `PizzaId`, `TypeId`) VALUES
(3, 1, 3),
(4, 1, 4),
(7, 4, 4);

-- --------------------------------------------------------

--
-- Table structure for table `types`
--

CREATE TABLE `types` (
  `Id` int(11) NOT NULL,
  `TypeValue` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `types`
--

INSERT INTO `types` (`Id`, `TypeValue`) VALUES
(3, 0),
(4, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `Id` int(11) NOT NULL,
  `Login` varchar(100) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `Role` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`Id`, `Login`, `Password`, `Role`) VALUES
(1, 'Ruslan', '123', 'Admin'),
(2, 'Ruslan1', '123', 'User'),
(3, 'Ruslan2', '123456789', 'User'),
(4, 'Ruslan3', '123456789', 'User'),
(5, 'Ruslan4', '123456789', 'User');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cartitems`
--
ALTER TABLE `cartitems`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `UserId` (`UserId`);

--
-- Indexes for table `pizzaimages`
--
ALTER TABLE `pizzaimages`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `PizzaId` (`PizzaId`);

--
-- Indexes for table `pizzas`
--
ALTER TABLE `pizzas`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `pizza_types`
--
ALTER TABLE `pizza_types`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `PizzaId` (`PizzaId`),
  ADD KEY `TypeId` (`TypeId`);

--
-- Indexes for table `types`
--
ALTER TABLE `types`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cartitems`
--
ALTER TABLE `cartitems`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `pizzaimages`
--
ALTER TABLE `pizzaimages`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `pizzas`
--
ALTER TABLE `pizzas`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `pizza_types`
--
ALTER TABLE `pizza_types`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `types`
--
ALTER TABLE `types`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cartitems`
--
ALTER TABLE `cartitems`
  ADD CONSTRAINT `cartitems_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pizzaimages`
--
ALTER TABLE `pizzaimages`
  ADD CONSTRAINT `pizzaimages_ibfk_1` FOREIGN KEY (`PizzaId`) REFERENCES `pizzas` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pizza_types`
--
ALTER TABLE `pizza_types`
  ADD CONSTRAINT `pizza_types_ibfk_1` FOREIGN KEY (`PizzaId`) REFERENCES `pizzas` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pizza_types_ibfk_2` FOREIGN KEY (`TypeId`) REFERENCES `types` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
