"use strict";
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
exports.ControllerCategorieDepense = void 0;
const categorieDepense_1 = require("../models/categorieDepense");
const bodyParser = require('body-parser');
class ControllerCategorieDepense {
    getCategorieDepenses(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let listeCategorieDepenses = yield categorieDepense_1.categorieDepense.getAllCategorieDepenses();
            res.send(listeCategorieDepenses);
        });
    }
    getOneCategorieDepense(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.params.id == null || req.params.id.length != 24) {
                res.status(406);
                res.send();
            }
            else {
                let categorieDepenseId = req.params.id;
                let depenseDetail = yield categorieDepense_1.categorieDepense.getOneCategorieDepense(categorieDepenseId);
                res.send(depenseDetail);
            }
        });
    }
    insertCategorieDepense(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body == null || req.body.constructor === Object && Object.keys(req.body).length === 0) {
                res.status(406);
                res.send();
            }
            else if (req.body.libelle == "" || req.body.libelle == undefined) {
                res.status(400);
                res.send();
            }
            else {
                let categorieDepenseDetail = yield categorieDepense_1.categorieDepense.insertCategorieDepense(req.body);
                res.status(201);
                res.send(categorieDepenseDetail);
            }
        });
    }
    updateCategorieDepense(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.params.id == null || req.params.id.length != 24 || req.body == null || req.body.constructor === Object && Object.keys(req.body).length === 0) {
                res.status(406);
                res.send();
            }
            else if (req.body.libelle == "" || req.body.libelle == undefined) {
                res.status(400);
                res.send();
            }
            else {
                let categorieDepenseId = req.params.id;
                let categorieDepenseDetail = yield categorieDepense_1.categorieDepense.updateCategorieDepense(categorieDepenseId, req.body);
                res.status(201);
                res.send(categorieDepenseDetail);
            }
        });
    }
    deleteCategorieDepense(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.params.id == null || req.params.id.length != 24) {
                res.status(406);
                res.send();
            }
            else {
                let categorieDepenseId = req.params.id;
                let categorieDepenseDetail = yield categorieDepense_1.categorieDepense.deleteCategorieDepense(categorieDepenseId);
                res.send(categorieDepenseDetail);
            }
        });
    }
}
exports.ControllerCategorieDepense = ControllerCategorieDepense;
