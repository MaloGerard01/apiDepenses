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
exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose_1.Schema({
    prenom: String,
    nom: String,
    mdp: String,
    email: String,
});
const UserModel = mongoose_1.default.model("Utilisateur", userSchema);
class User {
    static getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                resolve(yield UserModel.find());
            }));
        });
    }
    static getOneUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                resolve(yield UserModel.findOne({ _id: id }));
            }));
        });
    }
    static insertUser(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const hash = yield bcrypt.hash(body.mdp, 10);
            console.log("password : " + hash);
            const User = new UserModel({
                prenom: body.prenom,
                nom: body.nom,
                mdp: hash,
                email: body.email,
            });
            return yield User.save();
        });
    }
    static updateUser(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            // a faire
        });
    }
    static deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                resolve(yield UserModel.deleteOne({ _id: id }));
            }));
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield UserModel.findOne({ email: req.body.email }).then((user) => {
                if (!user) {
                    return res.status(401).json({
                        error: 'User not found!'
                    });
                }
                bcrypt.compare(req.body.mdp, user.mdp).then((valid) => {
                    if (!valid) {
                        return res.status(401).json({
                            error: 'Incorrect password!'
                        });
                    }
                    const token = jwt.sign({ userId: user._id }, 'sj4hOPdqZvxsDClm', { expiresIn: '24h' });
                    res.status(200).json({
                        userId: user._id,
                        token: token
                    });
                }).catch((error) => {
                    console.log(error);
                    res.status(500).json({
                        error: error
                    });
                });
            }).catch((error) => {
                console.log(error);
                res.status(500).json({
                    error: error
                });
            });
        });
    }
}
exports.User = User;
