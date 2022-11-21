import { Plat } from "../models/plats";


/* Controller qui nous servira par la suite à vérifier que :
* 
* La requete contient les élements demandés (id dans le cas d'un get, un formulaire post complet,etc...)
* 
* L'appel est bien authentifié
* 
* Pour le moment nous avons un controlerPlat, mais nous pourrons faire évoluer le nom du controller plus tard
*/
export class ControlerPlat{
    
    public async getPlats(req,res){
        
        let listePlats = await Plat.getAllPlats();
        res.send(listePlats);
    }

    public async getOnePlat(req,res){
        console.log(req.params.id.length);
        
        if(req.params.id == null || req.params.id.length != 24)
        {
            res.status(406);
            res.send();
        }
        else
        {
            let PlatId:string = req.params.id;
            let PlatDetail = await Plat.getOnePlat(PlatId);
            res.send(PlatDetail);
        }

    }

    public async insertPlat(req,res){
        
        if(req.body == null || req.body.constructor === Object && Object.keys(req.body).length === 0)
        {
            res.status(406);
            res.send();
        }
        else if (req.body.nom == "" || req.body.nom == undefined  
        || req.body.type == "" || req.body.type == undefined 
        || req.body.aliments == "[]" || req.body.aliments == undefined
        || req.body.prix == "" || req.body.prix == undefined  )
        {
            res.status(400);
            res.send();
        }
        else
        {
            let PlatDetail = await Plat.insertPlat(req.body);
            res.status(201);
            res.send(PlatDetail);
        }
    }

    public async updatePlat(req,res){
        console.log(req.body);
        if(req.params.id == null || req.params.id.length != 24 || req.body == null || req.body.constructor === Object && Object.keys(req.body).length === 0)
        {
            res.status(406);
            res.send();
        }
        else if (req.body.nom == "" || req.body.nom == undefined  
        || req.body.type == "" || req.body.type == undefined 
        || req.body.aliments == "[]" || req.body.aliments == undefined
        || req.body.prix == "" || req.body.prix == undefined  )
        {
            res.status(400);
            res.send();
        }
        else
        {
        let PlatId:string = req.params.id;
        let PlatDetail = await Plat.updatePlat(PlatId, req.body);
        res.status(201);
        res.send(PlatDetail);
        }
    }

    public async deletePlat(req,res){
        if(req.params.id == null || req.params.id.length != 24)
        {
            res.status(406);
            res.send();
        }
        else
        {
        let PlatId:string = req.params.id;
        let PlatDetail = await Plat.deletePlat(PlatId);
        res.send(PlatDetail);
        }
    }

    public async achatPlats(req,res){
        //console.log(req.body)
        let PlatDetail = await Plat.achatPlats(req.body);
        res.send(PlatDetail);
        
    }



}