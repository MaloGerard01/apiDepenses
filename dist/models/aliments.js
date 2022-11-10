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
exports.Aliment = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const alimentSchema = new mongoose_1.Schema({
    nom: String,
    type: String,
    stock: Number,
    date: { type: Date, default: Date.now },
});
const AlimentModel = mongoose_1.default.model("Aliment", alimentSchema);
class Aliment {
    static getAllAliments() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                resolve(yield AlimentModel.find());
            }));
        });
    }
    static getOneAliment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                resolve(yield AlimentModel.findOne({ _id: id }));
            }));
        });
    }
    static insertAliment(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const aliment = new AlimentModel({
                nom: body.nom,
                type: body.type,
                stock: body.stock,
                date: new Date(),
            });
            return yield aliment.save();
        });
    }
    static updateAliment(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return AlimentModel.findOneAndUpdate({ _id: id }, { nom: body.nom, type: body.type, stock: body.stock });
        });
    }
    static deleteAliment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                resolve(yield AlimentModel.deleteOne({ _id: id }));
            }));
        });
    }
}
exports.Aliment = Aliment;
