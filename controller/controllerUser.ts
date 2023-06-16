import { User } from "../models/users";


export class ControllerUser{

    public async getUsers(req,res){
            let UserDetail = await User.getAllUsers();
            res.status(201);
            res.send(UserDetail);
        
    }

    public async getUserInfo(req,res){
        if(req.params.id == null)
        {
            res.status(406);
            res.send();
        }
        else
        {
            let UserDetail = await User.getOneUser(req.params.id);
            res.status(201);
            res.send(UserDetail);
        }
        
    }
    

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

    public async deleteUser(req,res){
        if(req.params.id == null)
        {
            res.status(406);
            res.send();
        }
        else
        {
            let UserDetail = await User.deleteUser(req.params.id);
            res.status(201);
            res.send(UserDetail);
        }
        
    }

    public async login(req, res) {
        await User.login(req, res)
    }

}