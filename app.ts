import { Schema } from "mongoose";
import { ControlerAliment } from "./controller/controllerAliment";
import { ControlerPlat } from "./controller/controllerPlat";
import { ControlerUser } from "./controller/controllerUser";
const mongoose = require('mongoose');
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const auth = require('../middleware/auth.ts');
const swaggerUi= require('swagger-ui-express');
import YAML from 'yamljs';
const swaggerDocument = YAML.load('./swagger.yaml');

/**
 * On créé une nouvelle "application" express
 */
const app = express()
let controllerAliment:ControlerAliment = new ControlerAliment();
let controllerPlat:ControlerPlat = new ControlerPlat(); // a corriger
let controllerUser:ControlerUser = new ControlerUser();
/**
 * On dit à Express que l'on souhaite parser le body des requêtes en JSON
 *
 * @example app.post('/', (req) => req.body.prop)
 */

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json())
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.time();
    if(req.headers.authorization != null || req.headers.authorization != undefined)
    {
        console.log(parseJwt(req.headers.authorization));
    }
    
    console.log(`${req.hostname} : ${req.method} ${req.originalUrl} `);
    console.timeEnd();
    next()
})


app.get('/Aliments' ,(req,res)=>controllerAliment.getAliments(req,res))
app.get('/getAliment/:id',(req,res)=>controllerAliment.getOneAliment(req,res)) 
app.post('/deleteAliment/:id',auth,(req,res)=>controllerAliment.deleteAliment(req,res)) 
app.post("/insertAliment", auth, (req,res)=> controllerAliment.insertAliment(req,res));
app.post('/updateAliment/:id',auth,(req,res)=>controllerAliment.updateAliment(req,res)) 

app.get('/Plats',(req,res)=>controllerPlat.getPlats(req,res))
app.get('/getPlat/:id',(req,res)=>controllerPlat.getOnePlat(req,res)) 
app.post('/deletePlat/:id',auth,(req,res)=>controllerPlat.deletePlat(req,res)) 
app.post("/insertPlat", auth,(req,res)=> controllerPlat.insertPlat(req,res));
app.post('/updatePlat/:id',auth,(req,res)=>controllerPlat.updatePlat(req,res)) 
app.post('/achatPlats',(req,res)=>controllerPlat.achatPlats(req,res)) 
 
app.post("/login", (req,res)=> controllerUser.login(req,res));
app.post('/insertUser',(req,res)=>controllerUser.insertUser(req,res)) 
app.listen(3000,()=>{
    "Serveur listening on port :3000"
})

async function main() {
    await mongoose.connect('mongodb://localhost/Gestion_stock');
    console.log("connected to mongodb")
    
}

function parseJwt (token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}
main().catch(err => console.log(err));
