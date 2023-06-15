


import mongoose, { Schema } from "mongoose";

const depenseSchema = new Schema({
  idUser: String,
  libelle: { type: String, default: "" },
  categorie: String,
  total: { type: Number, default: 0 },
  paiementConcerne:[{nom: String,_id:{ type: String, default: "" }}],
  date: { type: Date, default: Date.now },
});
const depenseModel = mongoose.model("depense", depenseSchema);

export class Depense {
  public static async getAllDepenses(): Promise<any> {
    return new Promise(async (resolve) => {
      resolve(await depenseModel.find());
    });
  }

  public static async getOneDepense(id: string): Promise<any> {
    return new Promise(async (resolve) => {
      resolve(await depenseModel.findOne({ _id: id }));
    });
  }

  public static async getDepensesFromUser(idUser: string): Promise<any> {
    return new Promise(async (resolve) => {
      resolve(await depenseModel.find({ idUser: idUser }));
    });
  }

  public static async getDepensesWhereUserIsConcerned(idUser: string): Promise<any> {
    return new Promise(async (resolve) => {
      resolve(await depenseModel.find({ "paiementConcerne._id" : idUser }));
    });
  }

  public static async insertDepense(body: {
    idUser: string,
    libelle: string,
    categorie: String,
    total: number,
    paiementConcerne:[{nom: String,_id:{ type: String, default: "" }}],
  }) {
    const depense = new depenseModel({
      idUser: body.idUser,
      libelle: body.libelle,
      categorie: body.categorie,
      total: body.total,
      paiementConcerne: body.paiementConcerne,
      date: new Date(),
    });

    return await depense.save();
  }

  public static async updateDepense(
    id: string,
    body:{
      idUser: string,
      libelle: string,
      categorie: String,
      total: number,
      paiementConcerne:[{nom: String,_id:{ type: String, default: "" }}],
    }
  ) {
    return depenseModel.findOneAndUpdate({ _id: id }, {
      idUser: body.idUser, 
      libelle: body.libelle, 
      categorie: body.categorie,
      total: body.total,
      paiementConcerne: body.paiementConcerne
    });
  }

  public static async deleteDepense(id: string): Promise<any> {
    return new Promise(async (resolve) => {
      resolve(await depenseModel.deleteOne({ _id: id }));
    });
  }


  public static async addUserConcerneToDepense(id: string, body: {_id:string}): Promise<any> {
    return new Promise(async (resolve) => {
      let depense = await depenseModel.findOne({ _id: id })
      
      const _id = body._id;

      const paiementConcerne:{_id:string} = {_id}
      depense.paiementConcerne.push(paiementConcerne);
      let newPaiements = depense.paiementConcerne;
      return depenseModel.findOneAndUpdate({ _id: id }, {paiementConcerne: newPaiements} )
    });
  }

  public static async removeUserConcerneToDepense(id: string, body: {_id:string}): Promise<any> {
    return new Promise(async (resolve) => {
      let depense = await depenseModel.findOne({ _id: id })

      const _id = body._id;
      console.log(_id);
      const paiementConcerne:{_id:string} = {_id}
      console.log(depense);
      const index = depense.paiementConcerne.indexOf(paiementConcerne);
      depense.paiementConcerne.splice(index, 1);
      console.log(depense);
      let newPaiements = depense.paiementConcerne;
      return depenseModel.findOneAndUpdate({ _id: id }, {paiementConcerne: newPaiements} )
    });
  }
}
