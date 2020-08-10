-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 10-08-2020 a las 22:52:48
-- Versión del servidor: 10.4.13-MariaDB
-- Versión de PHP: 7.2.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `delilah`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orderDetails`
--

CREATE TABLE `orderDetails` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `orderDetails`
--

INSERT INTO `orderDetails` (`id`, `order_id`, `product_id`, `quantity`) VALUES
(1, 1, 2, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `state` varchar(60) NOT NULL,
  `payment` tinyint(1) NOT NULL,
  `total` float NOT NULL,
  `time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `state`, `payment`, `total`, `time`) VALUES
(1, 1, 'nuevo', 0, 750, '2020-08-10 15:04:26');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `ingredients` varchar(255) NOT NULL,
  `price` float NOT NULL,
  `img` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `ingredients`, `price`, `img`) VALUES
(1, 'Hamburguesa clásica', 'HamClas', 'Medallón de carne y queso cheddar', 375, 'https://www.pexels.com/es-es/foto/a-la-barbacoa-a-la-parrilla-almuerzo-bollo-1552641/'),
(2, 'Hamburguesa Completa', 'HamCompl', 'Medallón de carne, jamón, queso cheddar, tomate y lechuga', 385, 'https://www.pexels.com/es-es/foto/almuerzo-aperitivo-bollos-carne-1633578/'),
(3, 'Hamburguesa Súper', 'HamDel', 'Medallón de carne, panceta, queso cheddar, huevo y cebolla caramelizada', 400.5, 'https://www.pexels.com/es-es/foto/carne-comida-comida-rapida-delicioso-1108117/'),
(4, 'Sandwich Veggie', 'SandVeg', 'Pan integral, tomate, lechuga, zanahoria, cebolla, pepino y palta', 310, 'https://www.pexels.com/es-es/foto/aperitivo-bollo-carne-colorido-1431305/'),
(5, 'Sandwich Focaccia', 'SandFoc', 'Pan de queso, jamón, queso, lechuga y tomate', 440, 'https://www.pexels.com/es-es/foto/beber-bebida-carne-comida-1437600/'),
(6, 'Ensalada Veggie', 'EnsVeg', 'Rúcula, zanahoria, cebolla y mix de semillas', 340, 'https://www.pexels.com/es-es/foto/almuerzo-aperitivo-apetecible-cebolla-1059905/'),
(7, 'Bagel de salmón', 'BagSalm', 'Pan brioche, salmón ahumado, tomates cherry y queso crema', 425, 'https://www.pexels.com/es-es/foto/pan-comida-sano-almuerzo-3957501/');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `userName` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `address` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `is_admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `userName`, `name`, `lastName`, `email`, `phone`, `address`, `password`, `token`, `is_admin`) VALUES
(1, 'admin', 'Mafalda', 'Pérez', 'admin@delilah.com', '3412223344', 'Calle Chile 371', 'delilah', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImFkbWluIiwiZmVjaGEiOjE1OTcwOTIzOTI1MjksImlhdCI6MTU5NzA5MjM5Mn0.RPWv2MIWneNHv-faML1ypaKF4vgVVEjLAkQB2Kaw3R8', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `orderDetails`
--
ALTER TABLE `orderDetails`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indices de la tabla `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `orderDetails`
--
ALTER TABLE `orderDetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `orderDetails`
--
ALTER TABLE `orderDetails`
  ADD CONSTRAINT `orderdetails_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `orderdetails_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Filtros para la tabla `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
