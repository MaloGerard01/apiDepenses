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
exports.ControllerDepense = void 0;
const depense_1 = require("../models/depense");
const bodyParser = require('body-parser');
class ControllerDepense {
    getDepenses(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let listeDepenses = yield depense_1.Depense.getAllDepenses();
            res.send(listeDepenses);
        });
    }
    getOneDepense(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.params.id == null || req.params.id.length != 24) {
                res.status(406);
                res.send();
            }
            else {
                let depenseId = req.params.id;
                let depenseDetail = yield depense_1.Depense.getOneDepense(depenseId);
                res.send(depenseDetail);
            }
        });
    }
    getDepensesFromUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.params.id == null || req.params.id.length != 24) {
                res.status(406);
                res.send();
            }
            else {
                let depenseId = req.params.id;
                let depenseDetail = yield depense_1.Depense.getDepensesFromUser(depenseId);
                res.send(depenseDetail);
            }
        });
    }
    getDepensesWhereUserIsConcerned(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.params.id == null || req.params.id.length != 24) {
                res.status(406);
                res.send();
            }
            else {
                let depenseId = req.params.id;
                let depenseDetail = yield depense_1.Depense.getDepensesWhereUserIsConcerned(depenseId);
                res.send(depenseDetail);
            }
        });
    }
    insertDepense(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            if (req.body == null || req.body.constructor === Object && Object.keys(req.body).length === 0) {
                res.status(406);
                res.send();
            }
            else if (req.body.paiementConcerne == undefined) {
                res.status(400);
                res.send();
            }
            else {
                let depenseDetail = yield depense_1.Depense.insertDepense(req.body);
                res.status(201);
                res.send(depenseDetail);
            }
        });
    }
    updateDepense(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.params.id == null || req.params.id.length != 24 || req.body == null || req.body.constructor === Object && Object.keys(req.body).length === 0) {
                res.status(406);
                res.send();
            }
            else if (req.body.total == "" || req.body.total == undefined
                || req.body.paiementConcerne == undefined) {
                res.status(400);
                res.send();
            }
            else {
                console.log("in update");
                let depenseId = req.params.id;
                let depenseDetail = yield depense_1.Depense.updateDepense(depenseId, req.body);
                res.status(201);
                res.send(depenseDetail);
            }
        });
    }
    deleteDepense(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.params.id == null || req.params.id.length != 24) {
                res.status(406);
                res.send();
            }
            else {
                let depenseId = req.params.id;
                let depenseDetail = yield depense_1.Depense.deleteDepense(depenseId);
                res.send(depenseDetail);
            }
        });
    }
    addUserConcerneToDepense(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.params.id == null || req.params.id.length != 24) {
                res.status(406);
                res.send();
            }
            else {
                let depenseId = req.params.id;
                let depenseDetail = yield depense_1.Depense.addUserConcerneToDepense(depenseId, req.body);
                res.status(201);
                res.send(depenseDetail);
            }
        });
    }
    removeUserConcerneToDepense(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.params.id == null || req.params.id.length != 24) {
                res.status(406);
                res.send();
            }
            else {
                let depenseId = req.params.id;
                let depenseDetail = yield depense_1.Depense.removeUserConcerneToDepense(depenseId, req.body);
                res.status(201);
                res.send(depenseDetail);
            }
        });
    }
}
exports.ControllerDepense = ControllerDepense;
