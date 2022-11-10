"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const controllerAliment_1 = require("./controller/controllerAliment");
const controllerPlat_1 = require("./controller/controllerPlat");
const controllerUser_1 = require("./controller/controllerUser");
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const auth = require('../middleware/auth.ts');
/**
 * On créé une nouvelle "application" express
 */
const app = express();
let controllerAliment = new controllerAliment_1.ControlerAliment();
let controllerPlat = new controllerPlat_1.ControlerPlat(); // a corriger
let controllerUser = new controllerUser_1.ControlerUser();
/**
 * On dit à Express que l'on souhaite parser le body des requêtes en JSON
 *
 * @example app.post('/', (req) => req.body.prop)
 */
app.engine('php', require('ejs').renderFile);
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    console.time();
    if (req.headers.authorization != null || req.headers.authorization != undefined) {
        console.log(parseJwt(req.headers.authorization));
    }
    console.log(`${req.hostname} : ${req.method} ${req.originalUrl} `);
    console.timeEnd();
    next();
});
app.get('/', (req, res) => res.render('index.php'));
app.get('/Aliments', (req, res) => controllerAliment.getAliments(req, res));
app.get('/getAliment/:id', auth, (req, res) => controllerAliment.getOneAliment(req, res));
app.post('/deleteAliment/:id', auth, (req, res) => controllerAliment.deleteAliment(req, res));
app.post("/insertAliment", auth, (req, res) => controllerAliment.insertAliment(req, res));
app.post('/updateAliment/:id', auth, (req, res) => controllerAliment.updateAliment(req, res));
app.get('/Plats', (req, res) => controllerPlat.getPlats(req, res));
app.get('/getPlat/:id', (req, res) => controllerPlat.getOnePlat(req, res));
app.post('/deletePlat/:id', auth, (req, res) => controllerPlat.deletePlat(req, res));
app.post("/insertPlat", auth, (req, res) => controllerPlat.insertPlat(req, res));
app.post('/updatePlat/:id', auth, (req, res) => controllerPlat.updatePlat(req, res));
app.post("/login", (req, res) => controllerUser.login(req, res));
app.post('/insertUser', (req, res) => controllerUser.insertUser(req, res));
app.listen(3000, () => {
    "Serveur listening on port :3000";
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose.connect('mongodb://localhost/Gestion_stock');
        console.log("connected to mongodb");
    });
}
function parseJwt(token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}
main().catch(err => console.log(err));
// const alimentSchema = new Schema({
//     nom: String, // String isshorthandfor {type: String}
//     type: String,
//     quantite: String,
//     date: { type: Date, default: Date.now},
// });
// const AlimentModel = mongoose.model ('Aliment', alimentSchema); 
// export class Aliment{
//     public static async getAllAliments():Promise<any>{
//         return new Promise(async (resolve) => {
//             let listeAliments: any[] 
//         })
//     }
// }
// const navet = new AlimentModel({
//     nom: "Navet", // String isshorthandfor {type: String}
//     type: "légume",
//     quantite: 50,
//     date: new Date(),
// });
// AlimentModel.create(navet, function(err, small) {
//     if (err) console.log(err);// OK !
// });
// AlimentModel.insertMany([
//     {
//         nom: "Navet", 
//         type: "légume",
//         quantite: 50,
//         date: new Date()
//     },
//     {
//         nom: "Pain à burger",
//         type: "epicerie",
//         quantite: 20,
//         date: new Date()
//     },
//     {
//         nom: "Cheddar",
//         type: "fromage",
//         quantite: 20,
//         date: new Date()
//     }
// ],function(err) {});
