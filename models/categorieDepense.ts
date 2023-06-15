


import mongoose, { Schema } from "mongoose";

const categorieDepenseSchema = new Schema({
  libelle: { type: String, default: "" }
});
const categorieDepenseModel = mongoose.model("categorieDepense", categorieDepenseSchema);

export class categorieDepense {
  public static async getAllCategorieDepenses(): Promise<any> {
    return new Promise(async (resolve) => {
      resolve(await categorieDepenseModel.find());
    });
  }

  public static async getOneCategorieDepense(id: string): Promise<any> {
    return new Promise(async (resolve) => {
      resolve(await categorieDepenseModel.findOne({ _id: id }));
    });
  }

  public static async insertCategorieDepense(body: {
    libelle: string;
  }) {
    const categorieDepense = new categorieDepenseModel({
      libelle: body.libelle
    });

    return await categorieDepense.save();
  }

  public static async updateCategorieDepense(
    id: string,
    body: {
      libelle: string;
    }
  ) {
    return categorieDepenseModel.findOneAndUpdate({ _id: id }, { libelle: body.libelle} )
  }

  public static async deleteCategorieDepense(id: string): Promise<any> {
    return new Promise(async (resolve) => {
      resolve(await categorieDepenseModel.deleteOne({ _id: id }));
    });
  }
}
