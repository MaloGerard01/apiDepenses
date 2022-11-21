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
exports.ControlerPlat = void 0;
const plats_1 = require("../models/plats");
/* Controller qui nous servira par la suite à vérifier que :
*
* La requete contient les élements demandés (id dans le cas d'un get, un formulaire post complet,etc...)
*
* L'appel est bien authentifié
*
* Pour le moment nous avons un controlerPlat, mais nous pourrons faire évoluer le nom du controller plus tard
*/
class ControlerPlat {
    getPlats(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let listePlats = yield plats_1.Plat.getAllPlats();
            res.send(listePlats);
        });
    }
    getOnePlat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.params.id.length);
            if (req.params.id == null || req.params.id.length != 24) {
                res.status(406);
                res.send();
            }
            else {
                let PlatId = req.params.id;
                let PlatDetail = yield plats_1.Plat.getOnePlat(PlatId);
                res.send(PlatDetail);
            }
        });
    }
    insertPlat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body == null || req.body.constructor === Object && Object.keys(req.body).length === 0) {
                res.status(406);
                res.send();
            }
            else if (req.body.nom == "" || req.body.nom == undefined
                || req.body.type == "" || req.body.type == undefined
                || req.body.aliments == "[]" || req.body.aliments == undefined
                || req.body.prix == "" || req.body.prix == undefined) {
                res.status(400);
                res.send();
            }
            else {
                let PlatDetail = yield plats_1.Plat.insertPlat(req.body);
                res.status(201);
                res.send(PlatDetail);
            }
        });
    }
    updatePlat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            if (req.params.id == null || req.params.id.length != 24 || req.body == null || req.body.constructor === Object && Object.keys(req.body).length === 0) {
                res.status(406);
                res.send();
            }
            else if (req.body.nom == "" || req.body.nom == undefined
                || req.body.type == "" || req.body.type == undefined
                || req.body.aliments == "[]" || req.body.aliments == undefined
                || req.body.prix == "" || req.body.prix == undefined) {
                res.status(400);
                res.send();
            }
            else {
                let PlatId = req.params.id;
                let PlatDetail = yield plats_1.Plat.updatePlat(PlatId, req.body);
                res.status(201);
                res.send(PlatDetail);
            }
        });
    }
    deletePlat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.params.id == null || req.params.id.length != 24) {
                res.status(406);
                res.send();
            }
            else {
                let PlatId = req.params.id;
                let PlatDetail = yield plats_1.Plat.deletePlat(PlatId);
                res.send(PlatDetail);
            }
        });
    }
    achatPlats(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log(req.body)
            let PlatDetail = yield plats_1.Plat.achatPlats(req.body);
            res.send(PlatDetail);
        });
    }
}
exports.ControlerPlat = ControlerPlat;
