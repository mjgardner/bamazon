DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(255) NOT NULL,
    department_name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL DEFAULT 0,
    PRIMARY KEY (item_id)
);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES
('Pert Classic Clean 2 in 1 Shampoo and Conditioner 33.8oz (3 pack)',
'Beauty & Personal Care', 26.00, 124),
('Tide PODS Plus Febreze Sport Odor Defense 4 in 1 HE Turbo Laundry Detergent Pacs, 61 Count Tub',
'Health & Household', 22.66, 483),
('PUR 2-Stage Water Pitcher Replacement Filter, 6-Pack',
'Home & Kitchen', 39.59, 33),
('Coway 3304899 Replacement Filter Pack for AP1512HH',
'Home & Kitchen', 40.99, 137),
('Ivory Clean Original Bath Bar 4.0oz, 10 count',
'Beauty & Personal Care', 4.99, 466),
('Old Spice Aluminum Free Deodorant for Men High Endurance, Fresh Long Lasting Stick, 2.25oz (Pack of 2)',
'Beauty & Personal Care', 4.97, 39),
('PUR Classic Water Filtration System, 11-Cup Water Pitcher and Filter',
'Home & Kitchen', 37.71, 695),
('Proman Products KSA9030 Natural Wood Kascade Hanger (50 pcs)',
'Home & Kitchen', 70.32, 74),
('CamelBak Chute Mag Water Bottle, 20oz',
'Sports & Outdoors', 13.00, 33),
('Essentials Mens Regular-Fit Cotton Pique Polo Shirt',
'Clothing, Shoes & Jewelry', 12.00, 1780);
