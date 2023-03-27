const mysql = require('mysql2/promise');
require('dotenv').config();

// DB Connection Config
const config = {
    db: {
        host: 'database',
        port: process.env.MYSQL_PORT_IN || 3306,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    }
};

// DB Connection Query Service
async function query(sql, params) {
    const connection = await mysql.createConnection(config.db);
    const [results, ] = await connection.execute(sql, params);
    connection.end();
    return results;
}

// Query Result Helper Functions
function emptyOrRows(rows) {
    if (!rows) {
        return [];
    }
    return rows;
}

// Query All Crash Events
async function getAllEvents() {
    const rows = await query(
        `SELECT REPORT_NUMBER, CRASH_DATE, CRASH_TIME, COUNTY, CITY, INVESTIGATING_AGENCY, 
        ON_STREET, OFFSET_FEET, OFFSET_DIRECTION, FROM_INTERSECTING_STREET, CRASH_SEVERITY, 
        LATITUDE, LONGITUDE 
        FROM events 
        LIMIT 100`
    );
    const data = emptyOrRows(rows);
    return {data};
}

// Query Single Crash Event
async function getEvent(report_num) {
    const rows = await query(
        `SELECT REPORT_NUMBER, CRASH_DATE, CRASH_TIME, COUNTY, CITY, INVESTIGATING_AGENCY, 
        ON_STREET, OFFSET_FEET, OFFSET_DIRECTION, FROM_INTERSECTING_STREET, CRASH_SEVERITY, 
        LATITUDE, LONGITUDE 
        FROM events 
        WHERE REPORT_NUMBER = ${report_num} 
        LIMIT 1`
    );
    const data = emptyOrRows(rows);
    return {data};
}

// Query All Crash Vehicles
async function getAllVehicles() {
    const rows = await query(
        `SELECT REPORT_NUMBER, VEHICLE_NUMBER, YEAR, MAKE, MODEL, COLOR, 
        TRAVELING_ON_STREET, TRAVELING_DIRECTION, MANEUVER 
        FROM vehicles 
        LIMIT 100`
    );
    const data = emptyOrRows(rows);
    return {data};
}

// Query Multiple Crash Vehicles from Event
async function getVehicles(report_num) {
    const rows = await query(
        `SELECT VEHICLE_NUMBER 
        FROM vehicles 
        WHERE REPORT_NUMBER = ${report_num} 
        LIMIT 100`
    );
    const data = emptyOrRows(rows);
    return {data};
}

// Query Single Crash Vehicle
async function getVehicle(report_num, vehicle_num) {
    const rows = await query(
        `SELECT REPORT_NUMBER, VEHICLE_NUMBER, YEAR, MAKE, MODEL, COLOR, 
        TRAVELING_ON_STREET, TRAVELING_DIRECTION, MANEUVER 
        FROM vehicles 
        WHERE REPORT_NUMBER = ${report_num} 
        AND VEHICLE_NUMBER = ${vehicle_num}
        LIMIT 1`
    );
    const data = emptyOrRows(rows);
    return {data};
}

// Query All Crash Drivers
async function getAllDrivers() {
    const rows = await query(
        `SELECT REPORT_NUMBER, VEHICLE_NUMBER, PERSON_NUMBER, 
        INJURY_SEVERITY, SEX, AGE, RESTRAINT_SYSTEMS 
        FROM drivers 
        LIMIT 100`
    );
    const data = emptyOrRows(rows);
    return {data};
}

// Query Single Crash Driver
async function getDriver(report_num, vehicle_num) {
    const rows = await query(
        `SELECT REPORT_NUMBER, VEHICLE_NUMBER, PERSON_NUMBER, 
        INJURY_SEVERITY, SEX, AGE, RESTRAINT_SYSTEMS 
        FROM drivers 
        WHERE REPORT_NUMBER = ${report_num} 
        AND VEHICLE_NUMBER = ${vehicle_num} 
        LIMIT 1`
    );
    const data = emptyOrRows(rows);
    return {data};
}

module.exports = { 
    getAllEvents, 
    getEvent, 
    getAllVehicles,
    getVehicles,
    getVehicle,
    getAllDrivers,
    getDriver
};