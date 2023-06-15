import { ControllerDepense } from "./controller/controllerDepense";
import { ControllerCategorieDepense } from "./controller/controllerCategorieDepense";
import { ControllerUser } from "./controller/controllerUser";
const mongoose = require('mongoose');
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const auth = require('../middleware/auth.ts');

const app = express()
let controllerUser:ControllerUser = new ControllerUser();
let controllerDepense:ControllerDepense = new ControllerDepense();
let controllerCategorieDepense:ControllerCategorieDepense = new ControllerCategorieDepense();

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

// Requêtes dépenses
app.get('/Depenses' ,(req,res)=>controllerDepense.getDepenses(req,res))
app.get('/getDepense/:id',(req,res)=>controllerDepense.getOneDepense(req,res)) 
app.get('/getDepensesFromUser/:id',(req,res)=>controllerDepense.getDepensesFromUser(req,res)) 
app.get('/getDepensesWhereUserIsConcerned/:id',(req,res)=>controllerDepense.getDepensesWhereUserIsConcerned(req,res)) 
app.delete('/deleteDepense/:id',(req,res)=>controllerDepense.deleteDepense(req,res)) 
app.post("/insertDepense", (req,res)=> controllerDepense.insertDepense(req,res));
app.put('/updateDepense/:id',(req,res)=>controllerDepense.updateDepense(req,res)) 
app.post('/addUserConcerneToDepense/:id',(req,res)=>controllerDepense.addUserConcerneToDepense(req,res)) 
app.delete('/removeUserConcerneToDepense/:id',(req,res)=>controllerDepense.removeUserConcerneToDepense(req,res)) 

// Requêtes Catégories de dépenses
app.get('/CategoriesDepense' ,(req,res)=>controllerCategorieDepense.getCategorieDepenses(req,res))
app.get('/getCategorieDepense/:id',(req,res)=>controllerCategorieDepense.getOneCategorieDepense(req,res)) 
app.delete('/deleteCategorieDepense/:id',(req,res)=>controllerCategorieDepense.deleteCategorieDepense(req,res)) 
app.post("/insertCategorieDepense", (req,res)=> controllerCategorieDepense.insertCategorieDepense(req,res));
app.put('/updateCategorieDepense/:id',(req,res)=>controllerCategorieDepense.updateCategorieDepense(req,res)) 

// Requêtes utilisateurs
app.post("/login", (req,res)=> controllerUser.login(req,res));
app.get("/getUsers", (req,res)=> controllerUser.getUsers(req,res));
app.get("/getUserInfo/:id", (req,res)=> controllerUser.getUserInfo(req,res));
app.post('/insertUser',(req,res)=>controllerUser.insertUser(req,res)) 
app.delete('/deleteUser/:id',(req,res)=>controllerUser.deleteUser(req,res)) 

app.listen(3000,()=>{
    "Serveur listening on port :3000"
})

async function main() {
    await mongoose.connect('mongodb://localhost/Gestion_depenses');
    console.log("connected to mongodb")
    
}

function parseJwt (token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}
main().catch(err => console.log(err));
