import mongoose, { Schema } from "mongoose";

const alimentSchema = new Schema({
  nom: String,
  type: String,
  stock: Number,
  date: { type: Date, default: Date.now },
});
const AlimentModel = mongoose.model("Aliment", alimentSchema);

export class Aliment {
  public static async getAllAliments(): Promise<any> {
    return new Promise(async (resolve) => {
      resolve(await AlimentModel.find());
    });
  }

  public static async getOneAliment(id: string): Promise<any> {
    return new Promise(async (resolve) => {
      resolve(await AlimentModel.findOne({ _id: id }));
    });
  }

  public static async insertAliment(body: {
    nom: string;
    type: string;
    stock: number;
  }) {
    const aliment = new AlimentModel({
      nom: body.nom,
      type: body.type,
      stock: body.stock,
      date: new Date(),
    });

    return await aliment.save();
  }

  public static async updateAliment(
    id: string,
    body: { nom: string; type: string; stock: number }
  ) {
    return AlimentModel.findOneAndUpdate({ _id: id }, { nom: body.nom, type: body.type, stock: body.stock } )
  }

  public static async deleteAliment(id: string): Promise<any> {
    return new Promise(async (resolve) => {
      resolve(await AlimentModel.deleteOne({ _id: id }));
    });
  }
}
