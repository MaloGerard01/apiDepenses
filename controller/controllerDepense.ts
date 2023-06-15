import { Depense } from "../models/depense";
const bodyParser = require('body-parser');


export class ControllerDepense{
    
    public async getDepenses(req,res){
        
        let listeDepenses = await Depense.getAllDepenses();
        res.send(listeDepenses);
    }

    public async getOneDepense(req,res){
        if(req.params.id == null || req.params.id.length != 24)
        {
            res.status(406);
            res.send();
        }
        else
        {
        let depenseId:string = req.params.id;
        let depenseDetail = await Depense.getOneDepense(depenseId);
        res.send(depenseDetail);
        }
    }

    public async getDepensesFromUser(req,res){
        if(req.params.id == null || req.params.id.length != 24)
        {
            res.status(406);
            res.send();
        }
        else
        {
        let depenseId:string = req.params.id;
        let depenseDetail = await Depense.getDepensesFromUser(depenseId);
        res.send(depenseDetail);
        }
    }

    public async getDepensesWhereUserIsConcerned(req,res){
        if(req.params.id == null || req.params.id.length != 24)
        {
            res.status(406);
            res.send();
        }
        else
        {
        let depenseId:string = req.params.id;
        let depenseDetail = await Depense.getDepensesWhereUserIsConcerned(depenseId);
        res.send(depenseDetail);
        }
    }

    public async insertDepense(req,res){
        console.log(req.body);
        if(req.body == null || req.body.constructor === Object && Object.keys(req.body).length === 0)
        {
            res.status(406);
            res.send();
        }
        else if (req.body.paiementConcerne == undefined)
        {
            res.status(400);
            res.send();
        }
        else
        {
        let depenseDetail = await Depense.insertDepense(req.body);
        res.status(201);
        res.send(depenseDetail);
        }
    }

    public async updateDepense(req,res){
        if(req.params.id == null || req.params.id.length != 24 || req.body == null || req.body.constructor === Object && Object.keys(req.body).length === 0)
        {
            res.status(406);
            res.send();
        }
        else if (req.body.total == "" || req.body.total == undefined  
        || req.body.paiementConcerne == undefined)
        {
            res.status(400);
            res.send();
        }
        else
        {
            console.log("in update")
        let depenseId:string = req.params.id;
        let depenseDetail = await Depense.updateDepense(depenseId, req.body);
        res.status(201);
        res.send(depenseDetail);
        }
    }

    public async deleteDepense(req,res){
        if(req.params.id == null || req.params.id.length != 24)
        {
            res.status(406);
            res.send();
        }
        else
        {
        let depenseId:string = req.params.id;
        let depenseDetail = await Depense.deleteDepense(depenseId);
        res.send(depenseDetail);
        }
    }

    public async addUserConcerneToDepense(req,res){
        if(req.params.id == null || req.params.id.length != 24)
        {
            res.status(406);
            res.send();
        }
        else
        {
        let depenseId:string = req.params.id;
        let depenseDetail = await Depense.addUserConcerneToDepense(depenseId,req.body);
        res.status(201);
        res.send(depenseDetail);
        }
    }

    public async removeUserConcerneToDepense(req,res){
        if(req.params.id == null || req.params.id.length != 24)
        {
            res.status(406);
            res.send();
        }
        else
        {
        let depenseId:string = req.params.id;
        let depenseDetail = await Depense.removeUserConcerneToDepense(depenseId,req.body);
        res.status(201);
        res.send(depenseDetail);
        }
    }
}