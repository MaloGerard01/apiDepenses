"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Depense = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const depenseSchema = new mongoose_1.Schema({
    idUser: String,
    libelle: { type: String, default: "" },
    categorie: String,
    total: { type: Number, default: 0 },
    paiementConcerne: [{ nom: String, _id: { type: String, default: "" } }],
    date: { type: Date, default: Date.now },
});
const depenseModel = mongoose_1.default.model("depense", depenseSchema);
class Depense {
    static getAllDepenses() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                resolve(yield depenseModel.find());
            }));
        });
    }
    static getOneDepense(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                resolve(yield depenseModel.findOne({ _id: id }));
            }));
        });
    }
    static getDepensesFromUser(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                resolve(yield depenseModel.find({ idUser: idUser }));
            }));
        });
    }
    static getDepensesWhereUserIsConcerned(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                resolve(yield depenseModel.find({ "paiementConcerne._id": idUser }));
            }));
        });
    }
    static insertDepense(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const depense = new depenseModel({
                idUser: body.idUser,
                libelle: body.libelle,
                categorie: body.categorie,
                total: body.total,
                paiementConcerne: body.paiementConcerne,
                date: new Date(),
            });
            return yield depense.save();
        });
    }
    static updateDepense(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return depenseModel.findOneAndUpdate({ _id: id }, {
                idUser: body.idUser,
                libelle: body.libelle,
                categorie: body.categorie,
                total: body.total,
                paiementConcerne: body.paiementConcerne
            });
        });
    }
    static deleteDepense(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                resolve(yield depenseModel.deleteOne({ _id: id }));
            }));
        });
    }
    static addUserConcerneToDepense(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                let depense = yield depenseModel.findOne({ _id: id });
                const _id = body._id;
                const paiementConcerne = { _id };
                depense.paiementConcerne.push(paiementConcerne);
                let newPaiements = depense.paiementConcerne;
                return depenseModel.findOneAndUpdate({ _id: id }, { paiementConcerne: newPaiements });
            }));
        });
    }
    static removeUserConcerneToDepense(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                let depense = yield depenseModel.findOne({ _id: id });
                const _id = body._id;
                console.log(_id);
                const paiementConcerne = { _id };
                console.log(depense);
                const index = depense.paiementConcerne.indexOf(paiementConcerne);
                depense.paiementConcerne.splice(index, 1);
                console.log(depense);
                let newPaiements = depense.paiementConcerne;
                return depenseModel.findOneAndUpdate({ _id: id }, { paiementConcerne: newPaiements });
            }));
        });
    }
}
exports.Depense = Depense;
