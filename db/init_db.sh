echo
echo "  *** MariaDB Database - Building Database ***"

mysql -u root -p$MYSQL_ROOT_PASSWORD --execute \
"CREATE DATABASE IF NOT EXISTS $MYSQL_DATABASE;"

echo "      - $MYSQL_DATABASE"

echo "  *** MariaDB Database - Configuring Tables ***"

mysql -u root -p$MYSQL_ROOT_PASSWORD --execute \
"CREATE TABLE IF NOT EXISTS $MYSQL_DATABASE.events (
REPORT_NUMBER int unsigned not null,
CRASH_DATE date not null,
CRASH_TIME time not null,
COUNTY varchar(12) not null,
CITY varchar(50),
INVESTIGATING_AGENCY text,
ON_STREET text,
OFFSET_FEET int,
OFFSET_DIRECTION text,
FROM_INTERSECTING_STREET text,
CRASH_SEVERITY text,
LATITUDE decimal(9,6) not null,
LONGITUDE decimal(9,6) not null,
CONSTRAINT pk_crash_event
PRIMARY KEY (REPORT_NUMBER)
) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci';"

echo "      - events"

mysql -u root -p$MYSQL_ROOT_PASSWORD --execute \
"CREATE TABLE IF NOT EXISTS $MYSQL_DATABASE.vehicles (
REPORT_NUMBER int unsigned not null,
VEHICLE_NUMBER int unsigned not null,
YEAR int unsigned not null,
MAKE varchar(10) not null,
MODEL varchar(20) not null,
COLOR varchar(10) not null,
TRAVELING_ON_STREET text,
TRAVELING_DIRECTION text,
MANEUVER text,
CONSTRAINT pk_crash_vehicle
PRIMARY KEY (REPORT_NUMBER, VEHICLE_NUMBER),
CONSTRAINT fk_crash_event
FOREIGN KEY (REPORT_NUMBER) REFERENCES $MYSQL_DATABASE.events (REPORT_NUMBER)
ON DELETE CASCADE
ON UPDATE RESTRICT
) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci';"

echo "      - vehicles"

mysql -u root -p$MYSQL_ROOT_PASSWORD --execute \
"CREATE TABLE IF NOT EXISTS $MYSQL_DATABASE.drivers (
REPORT_NUMBER int unsigned not null,
VEHICLE_NUMBER int unsigned not null,
PERSON_NUMBER int unsigned not null,
INJURY_SEVERITY text,
SEX char(1),
AGE tinyint,
RESTRAINT_SYSTEMS text,
CONSTRAINT pk_crash_driver
PRIMARY KEY (REPORT_NUMBER, VEHICLE_NUMBER, PERSON_NUMBER),
CONSTRAINT fk_crash_vehicle
FOREIGN KEY (REPORT_NUMBER, VEHICLE_NUMBER) REFERENCES $MYSQL_DATABASE.vehicles (REPORT_NUMBER, VEHICLE_NUMBER)
ON DELETE CASCADE
ON UPDATE RESTRICT
) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci';"

echo "      - drivers"

echo "  *** MariaDB Database - Loading Data ***"

mysql -u root -p$MYSQL_ROOT_PASSWORD --execute \
"LOAD DATA INFILE '/docker-entrypoint-initdb.d/init_data/crash-database_events.csv'
INTO TABLE $MYSQL_DATABASE.events
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '\"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(REPORT_NUMBER,@var1,@var2,COUNTY,CITY,INVESTIGATING_AGENCY,ON_STREET,
@var3,OFFSET_DIRECTION,FROM_INTERSECTING_STREET,CRASH_SEVERITY,LATITUDE,LONGITUDE)
SET CRASH_DATE = DATE_FORMAT(STR_TO_DATE(@var1,'%m/%d/%Y'),'%Y-%m-%d'),
CRASH_TIME = STR_TO_DATE(@var2,'%h:%i %p'),
OFFSET_FEET = NULLIF(@var3,'');"

echo "      - crash-database_events.csv"

mysql -u root -p$MYSQL_ROOT_PASSWORD --execute \
"LOAD DATA INFILE '/docker-entrypoint-initdb.d/init_data/crash-database_vehicles.csv'
INTO TABLE $MYSQL_DATABASE.vehicles
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '\"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(REPORT_NUMBER,VEHICLE_NUMBER,YEAR,MAKE,MODEL,COLOR,TRAVELING_ON_STREET,TRAVELING_DIRECTION,MANEUVER);"

echo "      - crash-database_vehicles.csv"

mysql -u root -p$MYSQL_ROOT_PASSWORD --execute \
"LOAD DATA INFILE '/docker-entrypoint-initdb.d/init_data/crash-database_drivers.csv'
INTO TABLE $MYSQL_DATABASE.drivers
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '\"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(REPORT_NUMBER,VEHICLE_NUMBER,PERSON_NUMBER,INJURY_SEVERITY,SEX,AGE,RESTRAINT_SYSTEMS);"

echo "      - crash-database_drivers.csv"

echo "  *** MariaDB Database - Setup Complete ***"