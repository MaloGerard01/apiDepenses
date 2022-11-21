import mongoose, { Schema } from "mongoose";
import { Aliment } from "../models/aliments";

const platSchema = new Schema({
  nom: String,
  type: String,
  aliments: [{nom:String, quantite:Number,_id:String}],
  prix:Number
});
const PlatModel = mongoose.model("Plat", platSchema);

export class Plat {
  public static async getAllPlats(): Promise<any> {
    return new Promise(async (resolve) => {
      resolve(await PlatModel.find());
    });
  }

  public static async getOnePlat(id: string): Promise<any> {
    return new Promise(async (resolve) => {
      resolve(await PlatModel.findOne({ _id: id }));
    });
  }

  public static async insertPlat(body: {
    nom: string;
    type: string;
    aliments: [{nom: string, quantite: number, _id: string}],
    prix: number;
  }) {
    const Plat = new PlatModel({
      nom: body.nom,
      type: body.type,
      aliments: body.aliments,
      prix: body.prix,
    });

    return await Plat.save();
  }

  public static async updatePlat(
    id: string,
    body: { nom: string, type: string, aliments: [{nom: string, quantite: number, _id: string}], prix: number }
  ) {
    return PlatModel.findOneAndUpdate({ _id: id }, { nom: body.nom, type: body.type, aliments: body.aliments, prix: body.prix } )
  }

  public static async deletePlat(id: string): Promise<any> {
    return new Promise(async (resolve) => {
      resolve(await PlatModel.deleteOne({ _id: id }));
    });
  }

  public static async achatPlats(body: [{_id: string, nom: string, type: string, aliments: [{nom: string, quantite: number, _id: string}], prix: number}]): Promise<any> {
    //console.log(body);
    body.forEach(plat => {
      console.log(plat.nom + ": ")
      plat.aliments.forEach(async aliment => {
        //console.log(aliment._id)
        //console.logz
        let alimentDetail = await Aliment.substractStockFromAliment(aliment._id,aliment.quantite );
        //console.log(alimentDetail);
      })
  });
    //return body;
    //return PlatModel.findOneAndUpdate({ _id: id }, { nom: body.nom, type: body.type, aliments: body.aliments, prix: body.prix } )

  }
}
