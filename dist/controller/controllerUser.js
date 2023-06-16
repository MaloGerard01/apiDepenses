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
exports.ControllerUser = void 0;
const users_1 = require("../models/users");
class ControllerUser {
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let UserDetail = yield users_1.User.getAllUsers();
            res.status(201);
            res.send(UserDetail);
        });
    }
    getUserInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.params.id == null) {
                res.status(406);
                res.send();
            }
            else {
                let UserDetail = yield users_1.User.getOneUser(req.params.id);
                res.status(201);
                res.send(UserDetail);
            }
        });
    }
    insertUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body == null || req.body.constructor === Object && Object.keys(req.body).length === 0) {
                res.status(406);
                res.send();
            }
            else if (req.body.nom == "" || req.body.nom == undefined
                || req.body.mdp == "" || req.body.mdp == undefined
                || req.body.email == "" || req.body.email == undefined) {
                res.status(400);
                res.send();
            }
            else {
                let UserDetail = yield users_1.User.insertUser(req.body);
                res.status(201);
                res.send(UserDetail);
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.params.id == null) {
                res.status(406);
                res.send();
            }
            else {
                let UserDetail = yield users_1.User.deleteUser(req.params.id);
                res.status(201);
                res.send(UserDetail);
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield users_1.User.login(req, res);
        });
    }
}
exports.ControllerUser = ControllerUser;
