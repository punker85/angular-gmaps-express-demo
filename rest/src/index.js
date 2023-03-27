const express = require("express");
var cors = require('cors');
const db = require("./database");
require('dotenv').config();
const app = express();

const api_port = process.env.API_PORT || 3000;

//app.use(express.json());
app.use(cors());

app.get("/event/all", async (req, res, next) => {
    try {
        res.json(await db.getAllEvents());
    } catch (err) {
        console.error(`GET /event/all Error: ${err.message}`);
        next(err);
    }
});

app.get("/event/:report", async (req, res, next) => {
    try {
        res.json(await db.getEvent(req.params.report));
    } catch (err) {
        console.error(`GET /event/{report} Error: ${err.message}`);
        next(err);
    }
});

app.get("/vehicle/all", async (req, res, next) => {
    try {
        res.json(await db.getAllVehicles());
    } catch (err) {
        console.error(`GET /vehicle/all Error: ${err.message}`);
        next(err);
    }
});

app.get("/vehicle/:report", async (req, res, next) => {
    try {
        res.json(await db.getVehicles(req.params.report));
    } catch (err) {
        console.error(`GET /vehicle/{report} Error: ${err.message}`);
        next(err);
    }
});

app.get("/vehicle/:report/:vehicle", async (req, res, next) => {
    try {
        res.json(await db.getVehicle(req.params.report, req.params.vehicle));
    } catch (err) {
        console.error(`GET /vehicle/{report}/{vehicle} Error: ${err.message}`);
        next(err);
    }
});

app.get("/driver/all", async (req, res, next) => {
    try {
        res.json(await db.getAllDrivers());
    } catch (err) {
        console.error(`GET /driver/all Error: ${err.message}`);
        next(err);
    }
});

app.get("/driver/:report/:vehicle", async (req, res, next) => {
    try {
        res.json(await db.getDriver(req.params.report, req.params.vehicle));
    } catch (err) {
        console.error(`GET /driver/{report}/{vehicle} Error: ${err.message}`);
        next(err);
    }
});

app.listen(api_port, () => {
    console.log(`FDOT Crash Data REST API\n - Listening on port ${api_port}\n`)
});