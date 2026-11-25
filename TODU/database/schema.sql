CREATE DATABASE IF NOT EXISTS todu CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE todu;
CREATE TABLE IF NOT EXISTS categories (id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(50) NOT NULL UNIQUE, color CHAR(7) NOT NULL);
CREATE TABLE IF NOT EXISTS tasks (id INT PRIMARY KEY AUTO_INCREMENT, title VARCHAR(200) NOT NULL, description TEXT, category_id INT NOT NULL, due_date DATE NOT NULL, due_time TIME NULL, priority ENUM('low','medium','high') DEFAULT 'medium', status ENUM('pending','progress','completed') DEFAULT 'pending', completed_at DATETIME NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, FOREIGN KEY(category_id) REFERENCES categories(id));
INSERT IGNORE INTO categories VALUES (1,'Study','#adcb60'),(2,'Work','#f2c28f'),(3,'Personal','#9bcfd2');
