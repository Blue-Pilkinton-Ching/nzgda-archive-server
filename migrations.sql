CREATE TABLE games (
    id INT AUTO_INCREMENT PRIMARY  KEY,
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    description TEXT,
    thumbnail VARCHAR(511) NULL,
    banner VARCHAR(511) NULL,
    url VARCHAR(511) NULL,
    approved BOOLEAN NOT NULL,
    educational BOOLEAN NOT NULL,
    tags TEXT,
    exclude TEXT, -- Retained this 'exclude' field and removed the duplicate
    width INT NULL,
    height INT NULL,
    display_app_badge BOOLEAN NOT NULL,
    studio VARCHAR(511),
    sort INT NOT NULL
);

CREATE TABLE admins (
    uid VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    studio INT,
    PRIMARY KEY (uid) NOT NULL
);