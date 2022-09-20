-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-09-2022 a las 02:04:30
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `museo`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administrador`
--

CREATE TABLE `administrador` (
  `idAdministrador` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 1,
  `idUsuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `administrador`
--

INSERT INTO `administrador` (`idAdministrador`, `username`, `password`, `token`, `estado`, `idUsuario`) VALUES
(1, 'Admin01', '1234', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFkbWluMDEiLCJpYXQiOjE1MTYyMzkwMjJ9.j3_X561CxwTIowa_wxI0T91_gvhttFy1W8bohftlh0c', 1, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `exposicion`
--

CREATE TABLE `exposicion` (
  `idExposcion` int(11) NOT NULL,
  `titulo` varchar(50) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 1,
  `idHabitacion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `exposicion`
--

INSERT INTO `exposicion` (`idExposcion`, `titulo`, `descripcion`, `estado`, `idHabitacion`) VALUES
(1, 'Mona Pisa', 'Master Mind', 0, 1),
(2, '123', '123', 0, 2),
(3, 'Nombre', 'Desc', 0, 2),
(4, 'Nombre', 'Sala de Star', 1, 2),
(5, 'Expositn', 'Yo', 1, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `guia`
--

CREATE TABLE `guia` (
  `idGuia` int(11) NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 1,
  `idUsuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `guia`
--

INSERT INTO `guia` (`idGuia`, `estado`, `idUsuario`) VALUES
(1, 0, 2),
(2, 0, 3),
(3, 0, 4),
(4, 0, 6),
(5, 0, 7),
(6, 0, 8),
(7, 0, 9),
(8, 1, 11);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `habitacion`
--

CREATE TABLE `habitacion` (
  `idHabitacion` int(11) NOT NULL,
  `identificador` varchar(255) NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 1,
  `idInstitucion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `habitacion`
--

INSERT INTO `habitacion` (`idHabitacion`, `identificador`, `estado`, `idInstitucion`) VALUES
(1, '123', 0, 1),
(2, 'Sala de Star', 0, 1),
(3, '123', 1, 1),
(4, '123123123', 0, 1),
(5, '11111111111', 0, 1),
(6, 'Sala de Star', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `idioma`
--

CREATE TABLE `idioma` (
  `idIdioma` int(11) NOT NULL,
  `idioma` varchar(255) NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `idioma`
--

INSERT INTO `idioma` (`idIdioma`, `idioma`, `estado`) VALUES
(1, 'Español', 1),
(2, 'Ingles', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `idiomaguia`
--

CREATE TABLE `idiomaguia` (
  `idIdiomaGuia` int(11) NOT NULL,
  `idIdioma` int(11) NOT NULL,
  `idGuia` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `idiomaguia`
--

INSERT INTO `idiomaguia` (`idIdiomaGuia`, `idIdioma`, `idGuia`) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 1, 2),
(4, 1, 3),
(5, 1, 4),
(6, 1, 5),
(7, 1, 6),
(8, 2, 7),
(9, 1, 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inscripcion`
--

CREATE TABLE `inscripcion` (
  `idInscripcion` int(11) NOT NULL,
  `fecha` date NOT NULL DEFAULT current_timestamp(),
  `estado` tinyint(1) NOT NULL DEFAULT 1,
  `idVisitante` int(11) NOT NULL,
  `idVisitaGuiada` int(11) NOT NULL,
  `idInscriptor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `inscripcion`
--

INSERT INTO `inscripcion` (`idInscripcion`, `fecha`, `estado`, `idVisitante`, `idVisitaGuiada`, `idInscriptor`) VALUES
(2, '2022-09-18', 0, 4, 1, 4),
(3, '2022-09-18', 1, 5, 8, 4),
(4, '2022-09-18', 1, 6, 14, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inscriptor`
--

CREATE TABLE `inscriptor` (
  `idInscriptor` int(11) NOT NULL,
  `idInstitucion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `inscriptor`
--

INSERT INTO `inscriptor` (`idInscriptor`, `idInstitucion`) VALUES
(4, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `institucion`
--

CREATE TABLE `institucion` (
  `idInstitucion` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `Mapainstalaciones` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `institucion`
--

INSERT INTO `institucion` (`idInstitucion`, `nombre`, `Mapainstalaciones`) VALUES
(1, 'Museo', 'Mapa de las Instalaciones');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modificareliminar`
--

CREATE TABLE `modificareliminar` (
  `idModificarEliminar` int(11) NOT NULL,
  `fecha` date NOT NULL DEFAULT current_timestamp(),
  `idAdministrador` int(11) NOT NULL,
  `idExposicion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recorrido`
--

CREATE TABLE `recorrido` (
  `idRecorrido` int(11) NOT NULL,
  `idInstitucion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `recorrido`
--

INSERT INTO `recorrido` (`idRecorrido`, `idInstitucion`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idUsuario` int(11) NOT NULL,
  `dni` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `dni`, `nombre`, `apellido`, `estado`) VALUES
(2, 123456789, 'Valen', 'Gordo', 1),
(3, 123, '123', '123', 1),
(4, 123123, '123', '123', 1),
(5, 999999, 'pio', 'pablo', 1),
(6, 123, '123', '123', 1),
(7, 123, '123', '123', 1),
(8, 44444, 'qweqew', 'qweqweq', 1),
(9, 123123, 'qweqew', '123', 1),
(10, 44543343, '123', '123', 1),
(11, 1234123, '123', '123', 1),
(12, 457213, '123@gnailsad', '123', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `visitaguiada`
--

CREATE TABLE `visitaguiada` (
  `idVisitaGuiada` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 1,
  `idGuia` int(11) NOT NULL,
  `idRecorrido` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `visitaguiada`
--

INSERT INTO `visitaguiada` (`idVisitaGuiada`, `fecha`, `hora`, `estado`, `idGuia`, `idRecorrido`) VALUES
(1, '2022-09-06', '09:46:11', 0, 1, 1),
(2, '2022-09-20', '16:42:00', 0, 3, 1),
(3, '0000-00-00', '16:42:00', 0, 2, 1),
(4, '0000-00-00', '14:40:00', 0, 2, 1),
(5, '2022-09-18', '20:48:00', 0, 3, 1),
(6, '2022-09-16', '14:46:00', 0, 3, 1),
(7, '2022-09-08', '14:47:00', 0, 2, 1),
(8, '2022-09-23', '14:47:00', 1, 2, 1),
(9, '2022-09-16', '14:47:00', 1, 2, 1),
(10, '0000-00-00', '00:00:00', 0, 2, 1),
(11, '2022-09-23', '14:48:00', 0, 3, 1),
(12, '2022-08-28', '15:18:00', 1, 2, 1),
(13, '2022-09-09', '20:23:00', 1, 2, 1),
(14, '2022-09-15', '20:18:00', 1, 7, 1),
(15, '2022-08-31', '20:37:00', 0, 2, 1),
(16, '2022-09-08', '20:36:00', 1, 7, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `visitante`
--

CREATE TABLE `visitante` (
  `idVisitante` int(11) NOT NULL,
  `mail` varchar(100) NOT NULL,
  `cantPersonas` int(11) NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 1,
  `idUsuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `visitante`
--

INSERT INTO `visitante` (`idVisitante`, `mail`, `cantPersonas`, `estado`, `idUsuario`) VALUES
(1, 'papa@hola', 5, 1, 5),
(2, 'papa@hola', 5, 1, 5),
(3, 'papa@hola', 5, 1, 5),
(4, 'papa@hola', 5, 1, 5),
(5, '123@gnailsad', 123123, 1, 4),
(6, '123@gnailsad', 2, 1, 12);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD PRIMARY KEY (`idAdministrador`),
  ADD KEY `idUsuario` (`idUsuario`);

--
-- Indices de la tabla `exposicion`
--
ALTER TABLE `exposicion`
  ADD PRIMARY KEY (`idExposcion`),
  ADD KEY `idHabitacion` (`idHabitacion`);

--
-- Indices de la tabla `guia`
--
ALTER TABLE `guia`
  ADD PRIMARY KEY (`idGuia`),
  ADD KEY `idUsuario` (`idUsuario`);

--
-- Indices de la tabla `habitacion`
--
ALTER TABLE `habitacion`
  ADD PRIMARY KEY (`idHabitacion`),
  ADD KEY `idInstitucion` (`idInstitucion`);

--
-- Indices de la tabla `idioma`
--
ALTER TABLE `idioma`
  ADD PRIMARY KEY (`idIdioma`);

--
-- Indices de la tabla `idiomaguia`
--
ALTER TABLE `idiomaguia`
  ADD PRIMARY KEY (`idIdiomaGuia`),
  ADD KEY `idIdioma` (`idIdioma`),
  ADD KEY `idGuia` (`idGuia`);

--
-- Indices de la tabla `inscripcion`
--
ALTER TABLE `inscripcion`
  ADD PRIMARY KEY (`idInscripcion`),
  ADD KEY `idVisitante` (`idVisitante`),
  ADD KEY `idVisitaGuiada` (`idVisitaGuiada`),
  ADD KEY `idInscriptor` (`idInscriptor`);

--
-- Indices de la tabla `inscriptor`
--
ALTER TABLE `inscriptor`
  ADD PRIMARY KEY (`idInscriptor`),
  ADD KEY `idI` (`idInstitucion`);

--
-- Indices de la tabla `institucion`
--
ALTER TABLE `institucion`
  ADD PRIMARY KEY (`idInstitucion`);

--
-- Indices de la tabla `modificareliminar`
--
ALTER TABLE `modificareliminar`
  ADD PRIMARY KEY (`idModificarEliminar`),
  ADD KEY `idAdministrador` (`idAdministrador`),
  ADD KEY `idExposicion` (`idExposicion`);

--
-- Indices de la tabla `recorrido`
--
ALTER TABLE `recorrido`
  ADD PRIMARY KEY (`idRecorrido`),
  ADD KEY `rol_institucion_recorrido` (`idInstitucion`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`);

--
-- Indices de la tabla `visitaguiada`
--
ALTER TABLE `visitaguiada`
  ADD PRIMARY KEY (`idVisitaGuiada`),
  ADD KEY `idGuia` (`idGuia`),
  ADD KEY `idRecorrido` (`idRecorrido`);

--
-- Indices de la tabla `visitante`
--
ALTER TABLE `visitante`
  ADD PRIMARY KEY (`idVisitante`),
  ADD KEY `idUsuario` (`idUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `administrador`
--
ALTER TABLE `administrador`
  MODIFY `idAdministrador` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `exposicion`
--
ALTER TABLE `exposicion`
  MODIFY `idExposcion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `guia`
--
ALTER TABLE `guia`
  MODIFY `idGuia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `habitacion`
--
ALTER TABLE `habitacion`
  MODIFY `idHabitacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `idioma`
--
ALTER TABLE `idioma`
  MODIFY `idIdioma` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `idiomaguia`
--
ALTER TABLE `idiomaguia`
  MODIFY `idIdiomaGuia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `inscripcion`
--
ALTER TABLE `inscripcion`
  MODIFY `idInscripcion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `inscriptor`
--
ALTER TABLE `inscriptor`
  MODIFY `idInscriptor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `institucion`
--
ALTER TABLE `institucion`
  MODIFY `idInstitucion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `modificareliminar`
--
ALTER TABLE `modificareliminar`
  MODIFY `idModificarEliminar` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `recorrido`
--
ALTER TABLE `recorrido`
  MODIFY `idRecorrido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `visitaguiada`
--
ALTER TABLE `visitaguiada`
  MODIFY `idVisitaGuiada` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `visitante`
--
ALTER TABLE `visitante`
  MODIFY `idVisitante` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD CONSTRAINT `rol_usuario_administrador` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`);

--
-- Filtros para la tabla `guia`
--
ALTER TABLE `guia`
  ADD CONSTRAINT `rol_usuario_guia` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`);

--
-- Filtros para la tabla `habitacion`
--
ALTER TABLE `habitacion`
  ADD CONSTRAINT `Institucion_habitacion` FOREIGN KEY (`idInstitucion`) REFERENCES `institucion` (`idInstitucion`);

--
-- Filtros para la tabla `idiomaguia`
--
ALTER TABLE `idiomaguia`
  ADD CONSTRAINT `guia_tiene_idioma` FOREIGN KEY (`idIdioma`) REFERENCES `idioma` (`idIdioma`),
  ADD CONSTRAINT `idioma_tiene_guia` FOREIGN KEY (`idGuia`) REFERENCES `guia` (`idGuia`);

--
-- Filtros para la tabla `inscripcion`
--
ALTER TABLE `inscripcion`
  ADD CONSTRAINT `relacion_inscripcion` FOREIGN KEY (`idInscriptor`) REFERENCES `inscriptor` (`idInscriptor`),
  ADD CONSTRAINT `relacion_visita` FOREIGN KEY (`idVisitante`) REFERENCES `visitante` (`idVisitante`),
  ADD CONSTRAINT `relacion_visita_guiada` FOREIGN KEY (`idVisitaGuiada`) REFERENCES `visitaguiada` (`idVisitaGuiada`);

--
-- Filtros para la tabla `inscriptor`
--
ALTER TABLE `inscriptor`
  ADD CONSTRAINT `rol_incriptor_institucion` FOREIGN KEY (`idInstitucion`) REFERENCES `institucion` (`idInstitucion`);

--
-- Filtros para la tabla `modificareliminar`
--
ALTER TABLE `modificareliminar`
  ADD CONSTRAINT `relacion_adminitrador` FOREIGN KEY (`idAdministrador`) REFERENCES `administrador` (`idAdministrador`),
  ADD CONSTRAINT `relacion_exposicion` FOREIGN KEY (`idExposicion`) REFERENCES `exposicion` (`idExposcion`);

--
-- Filtros para la tabla `recorrido`
--
ALTER TABLE `recorrido`
  ADD CONSTRAINT `rol_institucion_recorrido` FOREIGN KEY (`idInstitucion`) REFERENCES `institucion` (`idInstitucion`);

--
-- Filtros para la tabla `visitaguiada`
--
ALTER TABLE `visitaguiada`
  ADD CONSTRAINT `relacion_guia` FOREIGN KEY (`idGuia`) REFERENCES `guia` (`idGuia`),
  ADD CONSTRAINT `relacion_recorrido` FOREIGN KEY (`idRecorrido`) REFERENCES `recorrido` (`idRecorrido`);

--
-- Filtros para la tabla `visitante`
--
ALTER TABLE `visitante`
  ADD CONSTRAINT `rol_visitante_usuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
