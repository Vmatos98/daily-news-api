var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import prisma from "../config/database.js";
export function getVotes(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const hotVotes = yield prisma.votes.count({
            where: {
                type: "HOT",
                newsId: id
            }
        });
        const coldVotes = yield prisma.votes.count({
            where: {
                newsId: id,
                type: "COLD",
            }
        });
        return { hotVotes, coldVotes };
    });
}
export function getUserVotes(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const votes = yield prisma.votes.findMany({
            where: {
                userId: id
            }
        });
        return votes;
    });
}
export function getVoteByInfo(id, newsId) {
    return __awaiter(this, void 0, void 0, function* () {
        const vote = yield prisma.votes.findUnique({
            where: {
                votes_unique: {
                    userId: id,
                    newsId: newsId
                }
            }
        });
        return vote;
    });
}
export function insertVote(createVoteData) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.votes.create({
            data: createVoteData
        });
    });
}
export function updateScore(id, operation) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.news.update({
            where: { id },
            data: {
                score: { [operation]: 1 }
            }
        });
    });
}
export function deleteVote(id, newsId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.votes.delete({
            where: {
                votes_unique: {
                    newsId,
                    userId: id
                }
            }
        });
    });
}
