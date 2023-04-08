CREATE TABLE IF NOT EXISTS pets (
    id            VARCHAR(36) DEFAULT (UUID()),
    name          VARCHAR(200) NOT NULL,
    type        VARCHAR(20) NOT NULL,
    adoption_status        VARCHAR(20) NOT NULL,
    owner_id        VARCHAR(20),
    height        VARCHAR(20) NOT NULL,
    weight        VARCHAR(20) NOT NULL,
    color        VARCHAR(20) NOT NULL,
    bio        VARCHAR(100),
    hypoallergenic        VARCHAR(20) NOT NULL,
    dietary_restrictions        VARCHAR(100) NOT NULL,
    breed_of_animal        VARCHAR(100) NOT NULL,
    picture        VARCHAR(100),
    created_date  DATE DEFAULT (CURRENT_DATE),
    PRIMARY KEY (id)
    );