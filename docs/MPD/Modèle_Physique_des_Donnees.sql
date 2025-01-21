BEGIN; -- Début de la transaction

-- Suppression des tables si elles existent (ordre inverse des dépendances)
DROP TABLE IF EXISTS order_item, orders, customer CASCADE;
DROP TABLE IF EXISTS coffee, category CASCADE;

-- Création de la table "category"
CREATE TABLE category (
    id SERIAL PRIMARY KEY, -- Identifiant unique auto-incrémenté
    name VARCHAR(100) UNIQUE NOT NULL, -- Nom unique de la catégorie
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), -- Date de création
    updated_at TIMESTAMPTZ -- Date de modification
);

-- Création de la table "coffee"
CREATE TABLE coffee (
    id SERIAL PRIMARY KEY, -- Identifiant unique auto-incrémenté
    name VARCHAR(255) UNIQUE NOT NULL, -- Nom unique du café
    description TEXT, -- Description du café
    reference CHAR(9) UNIQUE NOT NULL, -- Référence unique du produit
    origin_country VARCHAR(255) NOT NULL, -- Pays d'origine du café
    price_per_kg DECIMAL NOT NULL, -- Prix au kilogramme
    available BOOLEAN NOT NULL DEFAULT false, -- Disponibilité du produit
    category_id INTEGER NOT NULL REFERENCES category(id), -- Clé étrangère référant à "category"
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), -- Date de création
    updated_at TIMESTAMPTZ -- Date de modification
);

-- Création de la table "customer"
CREATE TABLE customer (
    id SERIAL PRIMARY KEY, -- Identifiant unique auto-incrémenté
    email VARCHAR(255) UNIQUE NOT NULL, -- Adresse email unique du client
    password VARCHAR(255) NOT NULL, -- Mot de passe du client
    address VARCHAR(255), -- Adresse de livraison du client
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), -- Date de création
    updated_at TIMESTAMPTZ -- Date de modification
);

-- Création de la table "orders"
CREATE TABLE orders (
    id SERIAL PRIMARY KEY, -- Identifiant unique auto-incrémenté
    order_date TIMESTAMPTZ NOT NULL DEFAULT NOW(), -- Date de la commande
    status VARCHAR(50) NOT NULL DEFAULT 'pending', -- Statut de la commande
    total_amount DECIMAL(10,2) NOT NULL DEFAULT 0, -- Montant total de la commande
    customer_id INTEGER NOT NULL REFERENCES customer(id), -- Clé étrangère référant à "customer"
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), -- Date de création
    updated_at TIMESTAMPTZ -- Date de modification
);

-- Création de la table "order_item"
CREATE TABLE order_item (
    id SERIAL PRIMARY KEY, -- Identifiant unique auto-incrémenté
    order_id INTEGER NOT NULL REFERENCES orders(id), -- Clé étrangère référant à "orders"
    coffee_id INTEGER NOT NULL REFERENCES coffee(id), -- Clé étrangère référant à "coffee"
    quantity INTEGER NOT NULL DEFAULT 1 -- Quantité commandée
    -- Pas de 'created_at' systématique ici (optionnel)
);

-- Insertion des données dans "category"
INSERT INTO category (name)
VALUES 
  ('Corsé'), -- Catégorie pour cafés corsés
  ('Acide'), -- Catégorie pour cafés acides
  ('Fruité'), -- Catégorie pour cafés fruités
  ('Doux'), -- Catégorie pour cafés doux
  ('Épicé'), -- Catégorie pour cafés épicés
  ('Chocolaté'); -- Catégorie pour cafés chocolatés

-- Insertion des données dans "coffee"
INSERT INTO coffee (name, reference, origin_country, price_per_kg, available, category_id, description)
VALUES
  ('Espresso', '100955890', 'Italie', 20.99, true, 1, 'Café fort et concentré préparé en faisant passer de l''eau chaude à travers du café finement moulu.'),
  ('Columbian', '100955894', 'Colombie', 18.75, true, 2, 'Café moyennement corsé avec une acidité vive et une saveur riche.'),
  ('Ethiopian Yirgacheffe', '105589090', 'Éthiopie', 22.50, true, 3, 'Réputé pour son arôme floral, son acidité vive et ses notes citronnées.'),
  ('Brazilian Santos', '134009550', 'Brésil', 17.80, true, 4, 'Café doux et lisse avec un profil de saveur de noisette.'),
  ('Guatemalan Antigua', '256505890', 'Guatemala', 21.25, true, 6, 'Café corsé avec des nuances chocolatées et une pointe d''épice.'),
  ('Kenyan AA', '295432730', 'Kenya', 23.70, true, 2, 'Café complexe connu pour son acidité rappelant le vin et ses saveurs fruitées.'),
  ('Sumatra Mandheling', '302932754', 'Indonésie', 19.95, true, 1, 'Café profond et terreux avec un corps lourd et une faible acidité.'),
  ('Costa Rican Tarrazu', '327302954', 'Costa Rica', 24.50, true, 2, 'Café vif et net avec une finition propre et une acidité vive.'),
  ('Vietnamese Robusta', '549549090', 'Vietnam', 16.75, true, 5, 'Café audacieux et fort avec une saveur robuste distinctive.'),
  ('Tanzanian Peaberry', '582954954', 'Tanzanie', 26.80, true, 3, 'Acidité vive avec un profil de saveur rappelant le vin et un corps moyen.'),
  ('Jamaican Blue Mountain', '589100954', 'Jamaïque', 39.25, true, 4, 'Reconnu pour sa saveur douce, son acidité vive et son absence d''amertume.'),
  ('Rwandan Bourbon', '650753915', 'Rwanda', 21.90, true, 3, 'Café avec des notes florales prononcées, une acidité vive et un corps moyen.'),
  ('Panamanian Geisha', '795501340', 'Panama', 42.00, true, 3, 'Café rare aux arômes floraux complexes, une acidité brillante et un profil de saveur distinctif.'),
  ('Peruvian Arabica', '954589100', 'Pérou', 19.40, false, 6, 'Café équilibré avec des notes de chocolat, une acidité modérée et un corps velouté.'),
  ('Hawaiian Kona', '958090105', 'Hawaï', 55.75, false, 4, 'Café rare au goût riche, une acidité douce et des nuances subtiles.'),
  ('Nicaraguan Maragogipe', '691550753', 'Nicaragua', 28.60, false, 3, 'Café avec des notes de fruits, une acidité vive et un corps plein.');

-- Insertion de données dans "customer"
INSERT INTO customer (email, password, address)
VALUES
  ('john.doe@example.com', 'hashedpassword123', '123 Coffee Ave'), -- Client John Doe
  ('jane.smith@example.com', 'mySecurePass', '456 Espresso Blvd'), -- Cliente Jane Smith
  ('lucy.latte@example.com', 'lucypass', '789 Arabica Road'); -- Cliente Lucy Latte

-- Insertion de données dans "orders"
INSERT INTO orders (customer_id, total_amount, status)
VALUES
  (1, 0, 'pending'),   -- Commande en attente pour John Doe
  (2, 0, 'pending');   -- Commande en attente pour Jane Smith

-- Insertion de données dans "order_item"
INSERT INTO order_item (order_id, coffee_id, quantity)
VALUES
  -- Order #1 (John)
  (1, 1, 2),  -- Espresso x2
  (1, 2, 1),  -- Columbian x1

  -- Order #2 (Jane)
  (2, 3, 1),  -- Ethiopian Yirgacheffe x1
  (2, 4, 2),  -- Brazilian Santos x2
  (2, 9, 1);  -- Vietnamese Robusta x1

-- Mise à jour du total_amount dans "orders"
UPDATE orders o
SET total_amount = subquery.sum_amount
FROM (
  SELECT order_id, SUM(coffee.price_per_kg * order_item.quantity) AS sum_amount
  FROM order_item
  JOIN coffee ON order_item.coffee_id = coffee.id
  GROUP BY order_id
) AS subquery
WHERE o.id = subquery.order_id;

COMMIT; -- Fin de la transaction