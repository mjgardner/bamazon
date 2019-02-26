DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE departments (
    department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(255) NOT NULL,
    over_head_costs DECIMAL(10,2) NOT NULL DEFAULT 0,
    PRIMARY KEY (department_id)
);
CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(255) NOT NULL,
    department_id INT NOT NULL,
    price DECIMAL(10,2) NOT NULL DEFAULT 0,
    stock_quantity INT NOT NULL DEFAULT 0,
    product_sales DECIMAL(10,2) NOT NULL DEFAULT 0,
    PRIMARY KEY (item_id),
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES
('Beauty & Personal Care', 80000),
('Health & Household', 60000),
('Home & Kitchen', 90000),
('Sports & Outdoors', 70000),
('Clothing, Shoes & Jewelry', 3000),
('Arts, Crafts & Sewing', 60000);

INSERT INTO products (product_name, department_id, price, stock_quantity)
SELECT 'Pert Classic Clean 2 in 1 Shampoo and Conditioner 33.8oz (3 pack)', department_id, 26.00, 124
FROM departments
WHERE department_name = 'Beauty & Personal Care'
LIMIT 1;
INSERT INTO products (product_name, department_id, price, stock_quantity)
SELECT 'Tide PODS Plus Febreze Sport Odor Defense 4 in 1 HE Turbo Laundry Detergent Pacs, 61 Count Tub', department_id, 22.66, 483
FROM departments
WHERE department_name = 'Health & Household'
LIMIT 1;
INSERT INTO products (product_name, department_id, price, stock_quantity)
SELECT 'PUR 2-Stage Water Pitcher Replacement Filter, 6-Pack', department_id, 41.00, 33
FROM departments
WHERE department_name = 'Home & Kitchen'
LIMIT 1;
INSERT INTO products (product_name, department_id, price, stock_quantity)
SELECT 'Coway 3304899 Replacement Filter Pack for AP1512HH', department_id, 40.99, 138
FROM departments
WHERE department_name = 'Home & Kitchen'
LIMIT 1;
INSERT INTO products (product_name, department_id, price, stock_quantity)
SELECT 'Ivory Clean Original Bath Bar 4.0oz, 10 count', department_id, 4.99, 466
FROM departments
WHERE department_name = 'Beauty & Personal Care'
LIMIT 1;
INSERT INTO products (product_name, department_id, price, stock_quantity)
SELECT 'Old Spice Aluminum Free Deodorant for Men High Endurance, Fresh Long Lasting Stick, 2.25oz (Pack of 2)', department_id, 4.97, 39
FROM departments
WHERE department_name = 'Beauty & Personal Care'
LIMIT 1;
INSERT INTO products (product_name, department_id, price, stock_quantity)
SELECT 'PUR Classic Water Filtration System, 11-Cup Water Pitcher and Filter', department_id, 37.70, 695
FROM departments
WHERE department_name = 'Home & Kitchen'
LIMIT 1;
INSERT INTO products (product_name, department_id, price, stock_quantity)
SELECT 'Proman Products KSA9030 Natural Wood Kascade Hanger (50 pcs)', department_id, 70.32, 74
FROM departments
WHERE department_name = 'Home & Kitchen'
LIMIT 1;
INSERT INTO products (product_name, department_id, price, stock_quantity)
SELECT 'CamelBak Chute Mag Water Bottle, 20oz', department_id, 13.00, 33
FROM departments
WHERE department_name = 'Sports & Outdoors'
LIMIT 1;
INSERT INTO products (product_name, department_id, price, stock_quantity)
SELECT 'Essentials Mens Regular-Fit Cotton Pique Polo Shirt', department_id, 12.00, 1503
FROM departments
WHERE department_name = 'Clothing, Shoes & Jewelry'
LIMIT 1;
