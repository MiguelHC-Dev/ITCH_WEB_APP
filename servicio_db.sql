-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-04-2024 a las 05:16:56
-- Versión del servidor: 8.1.0
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `servicio_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `api_carrera`
--

CREATE TABLE `api_carrera` (
  `id` bigint NOT NULL,
  `nombre_carrera` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `api_carrera`
--

INSERT INTO `api_carrera` (`id`, `nombre_carrera`) VALUES
(1, 'ISC'),
(2, 'CP'),
(3, 'IGE');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `api_formato`
--

CREATE TABLE `api_formato` (
  `id` bigint NOT NULL,
  `nombre_formato` varchar(255) NOT NULL,
  `fecha_creacion` datetime(6) NOT NULL,
  `tipo_formato_id` bigint NOT NULL,
  `archivo` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `api_serviciosocial`
--

CREATE TABLE `api_serviciosocial` (
  `id` bigint NOT NULL,
  `nombre_programa` varchar(255) NOT NULL,
  `area` varchar(255) NOT NULL,
  `dependencia_organizacion` varchar(255) NOT NULL,
  `titular_organizacion` varchar(255) NOT NULL,
  `cargo_titular` varchar(255) NOT NULL,
  `atencion_a_nombre` varchar(255) DEFAULT NULL,
  `atencion_a_cargo` varchar(255) DEFAULT NULL,
  `usuario_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `api_serviciosocial`
--

INSERT INTO `api_serviciosocial` (`id`, `nombre_programa`, `area`, `dependencia_organizacion`, `titular_organizacion`, `cargo_titular`, `atencion_a_nombre`, `atencion_a_cargo`, `usuario_id`) VALUES
(1, 'Apoyo Administrativo', 'area1', 'dependencia ejemplo', 'titular de ejemplo', 'cargo de ejemplo', '', 'ddf', 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `api_tiposformatos`
--

CREATE TABLE `api_tiposformatos` (
  `id` bigint NOT NULL,
  `nombre_formato` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `api_tiposformatos`
--

INSERT INTO `api_tiposformatos` (`id`, `nombre_formato`) VALUES
(3, 'Formatos de Inicio'),
(4, 'Formatos durante el Servicio'),
(5, 'Formatos al final del Servicio');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `api_usuario`
--

CREATE TABLE `api_usuario` (
  `id` bigint NOT NULL,
  `tipo_usuario` varchar(50) DEFAULT NULL,
  `username` varchar(150) NOT NULL,
  `servicio` tinyint(1) NOT NULL,
  `residencia` tinyint(1) NOT NULL,
  `ingles` tinyint(1) NOT NULL,
  `carrera_id` bigint DEFAULT NULL,
  `date_joined` datetime(6) NOT NULL,
  `email` varchar(254) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `last_name` varchar(150) NOT NULL,
  `password` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `api_usuario`
--

INSERT INTO `api_usuario` (`id`, `tipo_usuario`, `username`, `servicio`, `residencia`, `ingles`, `carrera_id`, `date_joined`, `email`, `first_name`, `is_active`, `is_staff`, `is_superuser`, `last_login`, `last_name`, `password`) VALUES
(3, NULL, 'miguelhc', 0, 0, 0, 2, '2024-03-29 17:09:07.048873', 'mahc1112@gmail.com', '', 1, 1, 1, '2024-03-29 19:56:36.309181', '', 'pbkdf2_sha256$720000$wqVr4kDP3u5nosfsfzQERr$ojY6fgpdajk+VOLfZTs4GnUfWH2pAFiHkMu4AcmHag8='),
(4, NULL, 'usuario1', 0, 0, 0, NULL, '2024-03-29 19:44:01.484500', 'text@email.com', '', 1, 0, 0, NULL, '', 'texto123'),
(5, NULL, 'usuario2', 0, 0, 0, NULL, '2024-03-29 19:50:10.000000', 'text@email.com', 'HOla', 1, 0, 0, NULL, '', 'pbkdf2_sha256$720000$02O0q5SDt1cMyJSZVpfJk3$Ajg15Y/aBvbxeoo1OWNtWuWSsYV/KB0Y0FkYC0bxozA='),
(6, 'Personal', 'usuarioPersonal', 0, 0, 0, NULL, '2024-03-29 21:14:29.017982', '', '', 1, 0, 0, NULL, '', 'pbkdf2_sha256$720000$1CYDZrEbc7pCK26uaxMloA$UMZGAd4SUwctlxW9OHibWy5+VnF2Arg+M2jNQRy7W88='),
(7, 'Estudiante', '20520594', 0, 0, 0, 1, '2024-03-29 21:14:44.000000', '', 'Miguel Angel', 1, 0, 0, NULL, 'Hernández Corona', 'pbkdf2_sha256$720000$ZdP4GoBYmQRbSnwPIw1LSn$I3DQQcHgQGUd3nYcVSx1bfanF+g0zThEj8gjtT5+UAA=');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `api_usuario_groups`
--

CREATE TABLE `api_usuario_groups` (
  `id` bigint NOT NULL,
  `usuario_id` bigint NOT NULL,
  `group_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `api_usuario_user_permissions`
--

CREATE TABLE `api_usuario_user_permissions` (
  `id` bigint NOT NULL,
  `usuario_id` bigint NOT NULL,
  `permission_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `authtoken_token`
--

CREATE TABLE `authtoken_token` (
  `key` varchar(40) NOT NULL,
  `created` datetime(6) NOT NULL,
  `user_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `authtoken_token`
--

INSERT INTO `authtoken_token` (`key`, `created`, `user_id`) VALUES
('3f7c25f7fb39afbaa1a35e7f00c13b8c24777cc7', '2024-03-29 19:50:11.793030', 5),
('45b6897f1394f0ad8fdfe7d90b13191894291d77', '2024-03-29 21:14:45.014116', 7),
('6a0afec3c2ff3ee23ffa9d31572ead3941017165', '2024-03-29 21:14:29.955970', 6),
('bc8683fa4fb987bb7a99b8aac4108b263cd264ef', '2024-03-29 21:03:23.393038', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auth_group`
--

CREATE TABLE `auth_group` (
  `id` int NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auth_group_permissions`
--

CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auth_permission`
--

CREATE TABLE `auth_permission` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add log entry', 1, 'add_logentry'),
(2, 'Can change log entry', 1, 'change_logentry'),
(3, 'Can delete log entry', 1, 'delete_logentry'),
(4, 'Can view log entry', 1, 'view_logentry'),
(5, 'Can add permission', 2, 'add_permission'),
(6, 'Can change permission', 2, 'change_permission'),
(7, 'Can delete permission', 2, 'delete_permission'),
(8, 'Can view permission', 2, 'view_permission'),
(9, 'Can add group', 3, 'add_group'),
(10, 'Can change group', 3, 'change_group'),
(11, 'Can delete group', 3, 'delete_group'),
(12, 'Can view group', 3, 'view_group'),
(13, 'Can add user', 4, 'add_user'),
(14, 'Can change user', 4, 'change_user'),
(15, 'Can delete user', 4, 'delete_user'),
(16, 'Can view user', 4, 'view_user'),
(17, 'Can add content type', 5, 'add_contenttype'),
(18, 'Can change content type', 5, 'change_contenttype'),
(19, 'Can delete content type', 5, 'delete_contenttype'),
(20, 'Can view content type', 5, 'view_contenttype'),
(21, 'Can add session', 6, 'add_session'),
(22, 'Can change session', 6, 'change_session'),
(23, 'Can delete session', 6, 'delete_session'),
(24, 'Can view session', 6, 'view_session'),
(25, 'Can add tipos formatos', 7, 'add_tiposformatos'),
(26, 'Can change tipos formatos', 7, 'change_tiposformatos'),
(27, 'Can delete tipos formatos', 7, 'delete_tiposformatos'),
(28, 'Can view tipos formatos', 7, 'view_tiposformatos'),
(29, 'Can add formato', 8, 'add_formato'),
(30, 'Can change formato', 8, 'change_formato'),
(31, 'Can delete formato', 8, 'delete_formato'),
(32, 'Can view formato', 8, 'view_formato'),
(33, 'Can add servicio social', 9, 'add_serviciosocial'),
(34, 'Can change servicio social', 9, 'change_serviciosocial'),
(35, 'Can delete servicio social', 9, 'delete_serviciosocial'),
(36, 'Can view servicio social', 9, 'view_serviciosocial'),
(37, 'Can add usuario', 10, 'add_usuario'),
(38, 'Can change usuario', 10, 'change_usuario'),
(39, 'Can delete usuario', 10, 'delete_usuario'),
(40, 'Can view usuario', 10, 'view_usuario'),
(41, 'Can add carrera', 11, 'add_carrera'),
(42, 'Can change carrera', 11, 'change_carrera'),
(43, 'Can delete carrera', 11, 'delete_carrera'),
(44, 'Can view carrera', 11, 'view_carrera'),
(45, 'Can add Token', 12, 'add_token'),
(46, 'Can change Token', 12, 'change_token'),
(47, 'Can delete Token', 12, 'delete_token'),
(48, 'Can view Token', 12, 'view_token'),
(49, 'Can add Token', 13, 'add_tokenproxy'),
(50, 'Can change Token', 13, 'change_tokenproxy'),
(51, 'Can delete Token', 13, 'delete_tokenproxy'),
(52, 'Can view Token', 13, 'view_tokenproxy');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auth_user`
--

CREATE TABLE `auth_user` (
  `id` int NOT NULL,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `auth_user`
--

INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `first_name`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`) VALUES
(1, 'pbkdf2_sha256$720000$9fmFGEGmKv8tSRDjhcbJWP$LvE6hTd2GdyF0qko2uHvddREFTL3wpJrFUkyQaqfmCc=', '2024-03-29 03:35:33.335832', 1, 'miguelhc', '', '', 'mahc1112@gmail.com', 1, 1, '2024-03-26 04:28:25.705005');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auth_user_groups`
--

CREATE TABLE `auth_user_groups` (
  `id` bigint NOT NULL,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auth_user_user_permissions`
--

CREATE TABLE `auth_user_user_permissions` (
  `id` bigint NOT NULL,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `django_admin_log`
--

CREATE TABLE `django_admin_log` (
  `id` int NOT NULL,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint UNSIGNED NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` bigint NOT NULL
) ;

--
-- Volcado de datos para la tabla `django_admin_log`
--

INSERT INTO `django_admin_log` (`id`, `action_time`, `object_id`, `object_repr`, `action_flag`, `change_message`, `content_type_id`, `user_id`) VALUES
(1, '2024-03-31 00:17:08.887299', '5', 'usuario2 - HOla', 2, '[{\"changed\": {\"fields\": [\"First name\"]}}]', 10, 3),
(2, '2024-03-31 00:17:40.559203', '7', 'usuarioEstudiante - Miguel Angel Hernández Corona', 2, '[{\"changed\": {\"fields\": [\"First name\", \"Last name\", \"Carrera\"]}}]', 10, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `django_content_type`
--

CREATE TABLE `django_content_type` (
  `id` int NOT NULL,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(1, 'admin', 'logentry'),
(11, 'api', 'carrera'),
(8, 'api', 'formato'),
(9, 'api', 'serviciosocial'),
(7, 'api', 'tiposformatos'),
(10, 'api', 'usuario'),
(3, 'auth', 'group'),
(2, 'auth', 'permission'),
(4, 'auth', 'user'),
(12, 'authtoken', 'token'),
(13, 'authtoken', 'tokenproxy'),
(5, 'contenttypes', 'contenttype'),
(6, 'sessions', 'session');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `django_migrations`
--

CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'contenttypes', '0001_initial', '2024-03-26 02:02:40.879313'),
(2, 'auth', '0001_initial', '2024-03-26 02:02:41.329354'),
(3, 'admin', '0001_initial', '2024-03-26 02:02:41.429286'),
(6, 'contenttypes', '0002_remove_content_type_name', '2024-03-26 02:02:41.514800'),
(7, 'auth', '0002_alter_permission_name_max_length', '2024-03-26 02:02:41.572138'),
(8, 'auth', '0003_alter_user_email_max_length', '2024-03-26 02:02:41.594318'),
(9, 'auth', '0004_alter_user_username_opts', '2024-03-26 02:02:41.603333'),
(10, 'auth', '0005_alter_user_last_login_null', '2024-03-26 02:02:41.678369'),
(11, 'auth', '0006_require_contenttypes_0002', '2024-03-26 02:02:41.680332'),
(12, 'auth', '0007_alter_validators_add_error_messages', '2024-03-26 02:02:41.688329'),
(13, 'auth', '0008_alter_user_username_max_length', '2024-03-26 02:02:41.740563'),
(14, 'auth', '0009_alter_user_last_name_max_length', '2024-03-26 02:02:41.785885'),
(15, 'auth', '0010_alter_group_name_max_length', '2024-03-26 02:02:41.805919'),
(16, 'auth', '0011_update_proxy_permissions', '2024-03-26 02:02:41.814884'),
(17, 'auth', '0012_alter_user_first_name_max_length', '2024-03-26 02:02:41.867945'),
(18, 'sessions', '0001_initial', '2024-03-26 02:02:41.890824'),
(19, 'api', '0001_initial', '2024-03-26 04:25:40.211469'),
(20, 'api', '0002_alter_serviciosocial_options_and_more', '2024-03-27 04:51:44.848558'),
(21, 'api', '0003_remove_usuario_email_alter_usuario_numero_control', '2024-03-28 02:05:10.049156'),
(22, 'api', '0004_rename_numero_control_usuario_username', '2024-03-29 02:44:10.549696'),
(23, 'api', '0005_alter_usuario_options_alter_usuario_managers_and_more', '2024-03-29 03:26:37.921961'),
(24, 'api', '0006_alter_usuario_options_alter_usuario_managers_and_more', '2024-03-29 03:35:06.281750'),
(25, 'api', '0007_alter_usuario_options_alter_usuario_managers_and_more', '2024-03-29 17:06:50.054449'),
(26, 'authtoken', '0001_initial', '2024-03-29 17:36:10.017298'),
(27, 'authtoken', '0002_auto_20160226_1747', '2024-03-29 17:36:10.066903'),
(28, 'authtoken', '0003_tokenproxy', '2024-03-29 17:36:10.070917'),
(29, 'authtoken', '0004_alter_tokenproxy_options', '2024-03-29 17:36:10.077434'),
(30, 'api', '0008_alter_serviciosocial_usuario', '2024-03-30 19:32:47.627514'),
(31, 'admin', '0002_logentry_remove_auto_add', '2024-03-31 00:14:53.648428'),
(32, 'admin', '0003_logentry_add_action_flag_choices', '2024-03-31 00:14:53.665369');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `django_session`
--

CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `django_session`
--

INSERT INTO `django_session` (`session_key`, `session_data`, `expire_date`) VALUES
('s0hxr9gdwxsrm0288g6rap1zt7814ucx', '.eJxVjDkOwkAQBP-yMVpZOzM-CMl5gzWXsQHtSj4ixN_BkgNIu6r6FXre1rHfFp_7ycI5QDj9bsL68LwDu3O-laglr_MkcVfiQZd4LebPy-H-HYy8jN8aG1CRzlFqMoSKbKBEhEauBqIVADImROeGasa2HUQxuaF2CakN7w_muzfS:1rqFjJ:xfv3ddwa6Ux5FEhOFw2K_yb76TDicvHRSwDSzZtV-_I', '2024-04-12 17:09:25.050841'),
('vxow3tnlsetk2naxziy471qd260hmy1b', '.eJxVjDkOwkAQBP-yMVpZOzM-CMl5gzWXsQHtSj4ixN_BkgNIu6r6FXre1rHfFp_7ycI5QDj9bsL68LwDu3O-laglr_MkcVfiQZd4LebPy-H-HYy8jN8aG1CRzlFqMoSKbKBEhEauBqIVADImROeGasa2HUQxuaF2CakN7w_muzfS:1rqIL6:uaFKuEjxIBSuJDvyYcwlGSOqbNDochz-K3U8D8AaWww', '2024-04-12 19:56:36.312182');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `api_carrera`
--
ALTER TABLE `api_carrera`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `api_formato`
--
ALTER TABLE `api_formato`
  ADD PRIMARY KEY (`id`),
  ADD KEY `api_formato_tipo_formato_id_81a1fdcb_fk_api_tiposformatos_id` (`tipo_formato_id`);

--
-- Indices de la tabla `api_serviciosocial`
--
ALTER TABLE `api_serviciosocial`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `api_serviciosocial_usuario_id_c80ce9d5_uniq` (`usuario_id`);

--
-- Indices de la tabla `api_tiposformatos`
--
ALTER TABLE `api_tiposformatos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `api_usuario`
--
ALTER TABLE `api_usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `numero_control` (`username`),
  ADD KEY `api_usuario_carrera_id_b1e689e0_fk_api_carrera_id` (`carrera_id`);

--
-- Indices de la tabla `api_usuario_groups`
--
ALTER TABLE `api_usuario_groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `api_usuario_groups_usuario_id_group_id_d9500af0_uniq` (`usuario_id`,`group_id`),
  ADD KEY `api_usuario_groups_group_id_a1787217_fk_auth_group_id` (`group_id`);

--
-- Indices de la tabla `api_usuario_user_permissions`
--
ALTER TABLE `api_usuario_user_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `api_usuario_user_permiss_usuario_id_permission_id_7f855256_uniq` (`usuario_id`,`permission_id`),
  ADD KEY `api_usuario_user_per_permission_id_0ae209ef_fk_auth_perm` (`permission_id`);

--
-- Indices de la tabla `authtoken_token`
--
ALTER TABLE `authtoken_token`
  ADD PRIMARY KEY (`key`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indices de la tabla `auth_group`
--
ALTER TABLE `auth_group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  ADD KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`);

--
-- Indices de la tabla `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`);

--
-- Indices de la tabla `auth_user`
--
ALTER TABLE `auth_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indices de la tabla `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  ADD KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`);

--
-- Indices de la tabla `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  ADD KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`);

--
-- Indices de la tabla `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  ADD KEY `django_admin_log_user_id_c564eba6_fk_api_usuario_id` (`user_id`);

--
-- Indices de la tabla `django_content_type`
--
ALTER TABLE `django_content_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`);

--
-- Indices de la tabla `django_migrations`
--
ALTER TABLE `django_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `django_session`
--
ALTER TABLE `django_session`
  ADD PRIMARY KEY (`session_key`),
  ADD KEY `django_session_expire_date_a5c62663` (`expire_date`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `api_carrera`
--
ALTER TABLE `api_carrera`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `api_formato`
--
ALTER TABLE `api_formato`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `api_serviciosocial`
--
ALTER TABLE `api_serviciosocial`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `api_tiposformatos`
--
ALTER TABLE `api_tiposformatos`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `api_usuario`
--
ALTER TABLE `api_usuario`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `api_usuario_groups`
--
ALTER TABLE `api_usuario_groups`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `api_usuario_user_permissions`
--
ALTER TABLE `api_usuario_user_permissions`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `auth_group`
--
ALTER TABLE `auth_group`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `auth_permission`
--
ALTER TABLE `auth_permission`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT de la tabla `auth_user`
--
ALTER TABLE `auth_user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `django_admin_log`
--
ALTER TABLE `django_admin_log`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `django_content_type`
--
ALTER TABLE `django_content_type`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `django_migrations`
--
ALTER TABLE `django_migrations`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `api_formato`
--
ALTER TABLE `api_formato`
  ADD CONSTRAINT `api_formato_tipo_formato_id_81a1fdcb_fk_api_tiposformatos_id` FOREIGN KEY (`tipo_formato_id`) REFERENCES `api_tiposformatos` (`id`);

--
-- Filtros para la tabla `api_serviciosocial`
--
ALTER TABLE `api_serviciosocial`
  ADD CONSTRAINT `api_serviciosocial_usuario_id_c80ce9d5_fk_api_usuario_id` FOREIGN KEY (`usuario_id`) REFERENCES `api_usuario` (`id`);

--
-- Filtros para la tabla `api_usuario`
--
ALTER TABLE `api_usuario`
  ADD CONSTRAINT `api_usuario_carrera_id_b1e689e0_fk_api_carrera_id` FOREIGN KEY (`carrera_id`) REFERENCES `api_carrera` (`id`);

--
-- Filtros para la tabla `api_usuario_groups`
--
ALTER TABLE `api_usuario_groups`
  ADD CONSTRAINT `api_usuario_groups_group_id_a1787217_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  ADD CONSTRAINT `api_usuario_groups_usuario_id_7c19c78d_fk_api_usuario_id` FOREIGN KEY (`usuario_id`) REFERENCES `api_usuario` (`id`);

--
-- Filtros para la tabla `api_usuario_user_permissions`
--
ALTER TABLE `api_usuario_user_permissions`
  ADD CONSTRAINT `api_usuario_user_per_permission_id_0ae209ef_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `api_usuario_user_per_usuario_id_598fe587_fk_api_usuar` FOREIGN KEY (`usuario_id`) REFERENCES `api_usuario` (`id`);

--
-- Filtros para la tabla `authtoken_token`
--
ALTER TABLE `authtoken_token`
  ADD CONSTRAINT `authtoken_token_user_id_35299eff_fk_api_usuario_id` FOREIGN KEY (`user_id`) REFERENCES `api_usuario` (`id`);

--
-- Filtros para la tabla `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Filtros para la tabla `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);

--
-- Filtros para la tabla `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  ADD CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Filtros para la tabla `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Filtros para la tabla `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  ADD CONSTRAINT `django_admin_log_user_id_c564eba6_fk_api_usuario_id` FOREIGN KEY (`user_id`) REFERENCES `api_usuario` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
