import mongoose, { Schema } from "mongoose";
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
  prenom: String,
  nom: String,
  mdp: String,
  email: String,
});
const UserModel = mongoose.model("Utilisateur", userSchema);

export class User {
  public static async getAllUsers(): Promise<any> {
    return new Promise(async (resolve) => {
      resolve(await UserModel.find());
    });
  }

  public static async getOneUser(id: string): Promise<any> {
    return new Promise(async (resolve) => {
      resolve(await UserModel.findOne({ _id: id }));
    });
  }

  public static async insertUser(body: {
    prenom: string,
    nom: string,
    mdp: string,
    email: string,
  }) {
    const hash = await bcrypt.hash(body.mdp, 10);

    console.log("password : " + hash);


    const User = new UserModel({
      prenom: body.prenom,
      nom: body.nom,
      mdp: hash,
      email: body.email,
    });

    return await User.save();
  }

  public static async updateUser(
    id: string,
    body: { prenom:string, nom: string, mdp: string, email: string , }
  ) {
// a faire
  }

  public static async deleteUser(id: string): Promise<any> {
    return new Promise(async (resolve) => {
      resolve(await UserModel.deleteOne({ _id: id }));
    });
  }

  public static async login(req, res) {
    await UserModel.findOne({ email: req.body.email }).then(
      (user) => {
        if (!user) {
          return res.status(401).json({
            error: 'User not found!'
          });
        }
        bcrypt.compare(req.body.mdp, user.mdp).then(
          (valid) => {
            if (!valid) {
              return res.status(401).json({
                error: 'Incorrect password!'
              });
            }
            const token = jwt.sign(
              { userId: user._id },
              'sj4hOPdqZvxsDClm',
              { expiresIn: '24h' });
            res.status(200).json({
              userId: user._id,
              token: token
            });
          }
        ).catch(
          (error) => {
            console.log(error)
            res.status(500).json({
              error: error
            });
          }
        );
      }
    ).catch(
      (error) => {
        console.log(error)
        res.status(500).json({
          error: error
        });
      }
    );
  }
}
