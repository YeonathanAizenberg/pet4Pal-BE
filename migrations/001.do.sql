CREATE TABLE IF NOT EXISTS users (
    id            VARCHAR(36) DEFAULT (UUID()),
    name          VARCHAR(200) NOT NULL,
    status        VARCHAR(10) NOT NULL,
    created_date  DATE DEFAULT (CURRENT_DATE),
    PRIMARY KEY (id)
    );