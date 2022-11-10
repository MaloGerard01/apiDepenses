import { Aliment } from "../models/aliments";
const bodyParser = require('body-parser');


/* Controller qui nous servira par la suite à vérifier que :
* 
* La requete contient les élements demandés (id dans le cas d'un get, un formulaire post complet,etc...)
* 
* L'appel est bien authentifié
* 
* Pour le moment nous avons un controlerAliment, mais nous pourrons faire évoluer le nom du controller plus tard
*/
export class ControlerAliment{
    
    public async getAliments(req,res){
        
        let listeAliments = await Aliment.getAllAliments();
        res.send(listeAliments);
    }

    public async getOneAliment(req,res){
        if(req.params.id == null || req.params.id.length != 24)
        {
            res.status(406);
            res.send();
        }
        else
        {
        let alimentId:string = req.params.id;
        let alimentDetail = await Aliment.getOneAliment(alimentId);
        res.send(alimentDetail);
        }
    }

    public async insertAliment(req,res){
        if(req.body == null || req.body.constructor === Object && Object.keys(req.body).length === 0)
        {
            res.status(406);
            res.send();
        }
        else if (req.body.nom == "" || req.body.nom == undefined  
        || req.body.type == "" || req.body.type == undefined 
        || req.body.stock == "" || req.body.stock == undefined  )
        {
            res.status(400);
            res.send();
        }
        else
        {
        let alimentDetail = await Aliment.insertAliment(req.body);
        res.status(201);
        res.send(alimentDetail);
        }
    }

    public async updateAliment(req,res){
        if(req.params.id == null || req.params.id.length != 24 || req.body == null || req.body.constructor === Object && Object.keys(req.body).length === 0)
        {
            res.status(406);
            res.send();
        }
        else if (req.body.nom == "" || req.body.nom == undefined  
        || req.body.type == "" || req.body.type == undefined 
        || req.body.stock == "" || req.body.stock == undefined  )
        {
            res.status(400);
            res.send();
        }
        else
        {
        let alimentId:string = req.params.id;
        let alimentDetail = await Aliment.updateAliment(alimentId, req.body);
        res.status(201);
        res.send(alimentDetail);
        }
    }

    public async deleteAliment(req,res){
        if(req.params.id == null || req.params.id.length != 24)
        {
            res.status(406);
            res.send();
        }
        else
        {
        let alimentId:string = req.params.id;
        let alimentDetail = await Aliment.deleteAliment(alimentId);
        res.send(alimentDetail);
        }
    }



}