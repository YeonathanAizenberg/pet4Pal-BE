ALTER TABLE pets DROP COLUMN height;
ALTER TABLE pets DROP COLUMN weight;
ALTER TABLE pets ADD COLUMN height INT NOT NULL;
ALTER TABLE pets ADD COLUMN weight INT NOT NULL;