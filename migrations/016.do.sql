CREATE TABLE IF NOT EXISTS saved_pets (
    id            VARCHAR(36) DEFAULT (UUID()),
    userId          VARCHAR(200) NOT NULL,
    PetId        VARCHAR(10) NOT NULL,
    created_date  DATE DEFAULT (CURRENT_DATE),
    PRIMARY KEY (id)
    );