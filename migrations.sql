CREATE TABLE games (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    description TEXT,
    thumbnail VARCHAR(255) NULL,
    banner VARCHAR(255) NULL,
    url VARCHAR(511) NULL,
    approved BOOLEAN NOT NULL,
    featured BOOLEAN NOT NULL,
    educational BOOLEAN NOT NULL,
    tags VARCHAR(255),
    exclude VARCHAR(255),
    width INT NULL,
    height INT NULL,
    display_app_badge BOOLEAN NOT NULL,
    studio VARCHAR(511),
    sort INT NOT NULL,
    hidden BOOLEAN NOT NULL
);

CREATE TABLE admins (
    uid VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    studio INT NOT NULL,
    PRIMARY KEY (uid)
);

CREATE TABLE requests (
    UID VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    PRIMARY KEY (UID)
);

CREATE TABLE studios (
  id INT NOT NULL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);
