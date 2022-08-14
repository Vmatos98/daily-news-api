var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as repository from '../repositories/votesRepository.js';
export function getVotes(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const votes = yield repository.getVotes(id);
        if (votes) {
            return votes;
        }
        throw { type: "not_found", message: "" };
    });
}
export function getUserVotes(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const votes = yield repository.getUserVotes(id);
        if (votes) {
            return votes;
        }
        throw { type: "not_found", message: "" };
    });
}
export function insertVote(createVoteData) {
    return __awaiter(this, void 0, void 0, function* () {
        const vote = yield repository.insertVote(createVoteData);
        if (vote.type === "HOT") {
            yield repository.updateScore(createVoteData.newsId, "increment");
        }
        else {
            yield repository.updateScore(createVoteData.newsId, "decrement");
        }
    });
}
export function deleteVote(id, newsId) {
    return __awaiter(this, void 0, void 0, function* () {
        const vote = yield repository.getVoteByInfo(id, newsId);
        yield repository.deleteVote(id, newsId);
        if (vote.type === "HOT") {
            yield repository.updateScore(newsId, "decrement");
        }
        else {
            yield repository.updateScore(newsId, "increment");
        }
    });
}
