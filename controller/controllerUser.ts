import { User } from "../models/users";


export class ControlerUser{

    public async insertUser(req,res){
        
        if(req.body == null || req.body.constructor === Object && Object.keys(req.body).length === 0)
        {
            res.status(406);
            res.send();
        }
        else if (req.body.nom == "" || req.body.nom == undefined  
        || req.body.mdp == "" || req.body.mdp == undefined 
        || req.body.email == "" || req.body.email == undefined  )
        {
            res.status(400);
            res.send();
        }
        else
        {
            let UserDetail = await User.insertUser(req.body);
            res.status(201);
            res.send(UserDetail);
        }
    }

    public async updateUser(req,res){
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
        let UserId:string = req.params.id;
        let UserDetail = await User.updateUser(UserId, req.body);
        res.status(201);
        res.send(UserDetail);
        }
    }

    public async login(req, res) {
        await User.login(req, res)
    }

}