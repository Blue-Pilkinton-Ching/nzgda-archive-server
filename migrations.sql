CREATE TABLE games (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    thumbnail VARCHAR(255) NOT NULL,
    banner VARCHAR(255), -- nullable
    approved BOOLEAN NOT NULL,
    featured BOOLEAN NOT NULL,
    educational BOOLEAN NOT NULL,
    hidden BOOLEAN NOT NULL,
    isApp BOOLEAN NOT NULL,
    studio_id INT NOT NULL,
    url VARCHAR(511), -- nullable
    tags VARCHAR(255),
    width INT,
    height INT,
    sort INT,
    yearOfRelease INT NOT NULL,
    iosLink VARCHAR(511),
    androidLink VARCHAR(511),
    steamLink VARCHAR(511),
    websiteLink VARCHAR(511),
    otherLinks TEXT,
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE admins (
    uid VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    studio INT NOT NULL,
    PRIMARY KEY (uid)
);

CREATE TABLE requests (
    uid VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    PRIMARY KEY (UID)
);

CREATE TABLE studios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
  ALTER TABLE studio
  steam VARCHAR(255),
  ios VARCHAR(255),
  android VARCHAR(255),
  cityOrRegion VARCHAR(255),
  yearFounded INT,
  otherLinks TEXT,
  website VARCHAR(255),
  description TEXT,
  date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
  date_updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  nzgdaMember BOOLEAN DEFAULT FALSE;
);

CREATE TRIGGER set_sort_value
AFTER INSERT ON games
FOR EACH ROW
BEGIN
    UPDATE games SET sort = NEW.id * 100 WHERE id = NEW.id;
END$$