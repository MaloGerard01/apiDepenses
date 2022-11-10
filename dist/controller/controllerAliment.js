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
exports.ControlerAliment = void 0;
const aliments_1 = require("../models/aliments");
const bodyParser = require('body-parser');
/* Controller qui nous servira par la suite à vérifier que :
*
* La requete contient les élements demandés (id dans le cas d'un get, un formulaire post complet,etc...)
*
* L'appel est bien authentifié
*
* Pour le moment nous avons un controlerAliment, mais nous pourrons faire évoluer le nom du controller plus tard
*/
class ControlerAliment {
    getAliments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let listeAliments = yield aliments_1.Aliment.getAllAliments();
            res.send(listeAliments);
        });
    }
    getOneAliment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.params.id == null || req.params.id.length != 24) {
                res.status(406);
                res.send();
            }
            else {
                let alimentId = req.params.id;
                let alimentDetail = yield aliments_1.Aliment.getOneAliment(alimentId);
                res.send(alimentDetail);
            }
        });
    }
    insertAliment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body == null || req.body.constructor === Object && Object.keys(req.body).length === 0) {
                res.status(406);
                res.send();
            }
            else if (req.body.nom == "" || req.body.nom == undefined
                || req.body.type == "" || req.body.type == undefined
                || req.body.stock == "" || req.body.stock == undefined) {
                res.status(400);
                res.send();
            }
            else {
                let alimentDetail = yield aliments_1.Aliment.insertAliment(req.body);
                res.status(201);
                res.send(alimentDetail);
            }
        });
    }
    updateAliment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.params.id == null || req.params.id.length != 24 || req.body == null || req.body.constructor === Object && Object.keys(req.body).length === 0) {
                res.status(406);
                res.send();
            }
            else if (req.body.nom == "" || req.body.nom == undefined
                || req.body.type == "" || req.body.type == undefined
                || req.body.stock == "" || req.body.stock == undefined) {
                res.status(400);
                res.send();
            }
            else {
                let alimentId = req.params.id;
                let alimentDetail = yield aliments_1.Aliment.updateAliment(alimentId, req.body);
                res.status(201);
                res.send(alimentDetail);
            }
        });
    }
    deleteAliment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.params.id == null || req.params.id.length != 24) {
                res.status(406);
                res.send();
            }
            else {
                let alimentId = req.params.id;
                let alimentDetail = yield aliments_1.Aliment.deleteAliment(alimentId);
                res.send(alimentDetail);
            }
        });
    }
}
exports.ControlerAliment = ControlerAliment;
