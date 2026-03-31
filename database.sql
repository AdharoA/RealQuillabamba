CREATE DATABASE IF NOT EXISTS realquillabamba CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE realquillabamba;

CREATE TABLE `settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `setting_key` varchar(50) NOT NULL UNIQUE,
  `setting_value` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `settings` (`setting_key`, `setting_value`) VALUES
('companyName', 'Coco Vanilla'),
('logoUrl', ''),
('footerText', 'Lujo Auténtico. Diseño minimalista y elegante para resaltar tu estilo personal.'),
('primaryColor', '#2C2C2C');

CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `categories` (`name`, `description`) VALUES 
('Polos', 'Polos de algodón Pima para hombre y mujer.'),
('Bolsos', 'Monederos y bolsos charters en cuero rústico.');

CREATE TABLE `collections` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `image_url` varchar(255),
  `season` varchar(100),
  `item_count` int(11) DEFAULT 0,
  `min_price` decimal(10,2),
  `is_active` boolean DEFAULT true,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `collections` (`title`, `description`, `image_url`, `season`, `item_count`, `min_price`) VALUES
('Timeless Elegance', 'Colección exclusiva de básicos para toda temporada.', 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=800', 'Pre-Fall 26', 12, 120.00);

CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `category_id` int(11),
  `description` text,
  `price` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `image_url` varchar(255),
  `brand` varchar(100) DEFAULT 'Coco Vanilla',
  `sizes` varchar(200) DEFAULT 'S, M, L',
  `color` varchar(100) DEFAULT 'Carbón',
  `status` enum('Disponible', 'Agotado', 'Oculto') DEFAULT 'Disponible',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `products` (`name`, `category_id`, `description`, `price`, `stock`, `image_url`, `brand`, `sizes`, `color`, `status`) VALUES 
('Polo Minimalista', 1, 'Polo de algodón premium con corte ajustado y detalles invisibles.', 85.00, 24, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800', 'Coco Vanilla', 'S, M, L, XL', 'Blanco', 'Disponible'),
('Bolso de Mano Taupé', 2, 'Elegante bolso de mano con remates dorados importados.', 250.00, 12, 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=800', 'Coco Vanilla', 'Única', 'Taupé', 'Disponible');

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(150) NOT NULL UNIQUE,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('admin', 'customer') DEFAULT 'customer',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- The hash is MD5 for 'password123' to keep the mock simple and easy to migrate.
INSERT INTO `users` (`email`, `password_hash`, `role`) VALUES 
('a@a.com', md5('password123'), 'admin');
