import { categorieDepense } from "../models/categorieDepense";
const bodyParser = require('body-parser');


export class ControllerCategorieDepense{
    
    public async getCategorieDepenses(req,res){
        
        let listeCategorieDepenses = await categorieDepense.getAllCategorieDepenses();
        res.send(listeCategorieDepenses);
    }

    public async getOneCategorieDepense(req,res){
        if(req.params.id == null || req.params.id.length != 24)
        {
            res.status(406);
            res.send();
        }
        else
        {
        let categorieDepenseId:string = req.params.id;
        let depenseDetail = await categorieDepense.getOneCategorieDepense(categorieDepenseId);
        res.send(depenseDetail);
        }
    }

    public async insertCategorieDepense(req,res){
        if(req.body == null || req.body.constructor === Object && Object.keys(req.body).length === 0)
        {
            res.status(406);
            res.send();
        }
        else if (req.body.libelle == "" || req.body.libelle == undefined)
        {
            res.status(400);
            res.send();
        }
        else
        {
        let categorieDepenseDetail = await categorieDepense.insertCategorieDepense(req.body);
        res.status(201);
        res.send(categorieDepenseDetail);
        }
    }

    public async updateCategorieDepense(req,res){
        if(req.params.id == null || req.params.id.length != 24 || req.body == null || req.body.constructor === Object && Object.keys(req.body).length === 0)
        {
            res.status(406);
            res.send();
        }
        else if (req.body.libelle == "" || req.body.libelle == undefined)
        {
            res.status(400);
            res.send();
        }
        else
        {
        let categorieDepenseId:string = req.params.id;
        let categorieDepenseDetail = await categorieDepense.updateCategorieDepense(categorieDepenseId, req.body);
        res.status(201);
        res.send(categorieDepenseDetail);
        }
    }

    public async deleteCategorieDepense(req,res){
        if(req.params.id == null || req.params.id.length != 24)
        {
            res.status(406);
            res.send();
        }
        else
        {
        let categorieDepenseId:string = req.params.id;
        let categorieDepenseDetail = await categorieDepense.deleteCategorieDepense(categorieDepenseId);
        res.send(categorieDepenseDetail);
        }
    }
}