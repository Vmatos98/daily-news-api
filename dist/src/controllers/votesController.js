var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as service from "../services/votesService.js";
export function newVote(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = res.locals.userId.userId;
        const { newsId, type } = req.body;
        yield service.insertVote({ newsId, type, userId: id });
        res.sendStatus(200);
    });
}
export function getUserVotes(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = res.locals.userId.userId;
        const votes = yield service.getUserVotes(id);
        res.status(200).send(votes);
    });
}
export function deleteVote(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = res.locals.userId.userId;
        const { newsId } = req.params;
        yield service.deleteVote(id, +newsId);
        res.sendStatus(200);
    });
}
