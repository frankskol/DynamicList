##SQLs für Datenbank:

#TABLE erstellen:

CREATE TABLE User (
username VARCHAR2(30) PRIMARY KEY,
password VARCHAR2(30) NOT NULL,
longitude DOUBLE(30,5) NOT NULL,
latitude DOUBLE(30,5) NOT NULL,
status BOOLEAN
);

#SQLs für Java-Code:

INSERT INTO User (username, password, longitude, latitude);

UPDATE User
SET longitude = '', latitude= ''; status = ''
WHERE username = '';

SELECT * from User;


