import{Request, Response} from "express";
import * as service from "../services/votesService.js";

export async function newVote(req: Request, res: Response){
    const id = res.locals.userId.userId;
    const {newsId, type} = req.body;
    await service.insertVote({newsId, type, userId: id});
    res.sendStatus(200);
}

export async function getUserVotes(req: Request, res: Response){
    const id = res.locals.userId.userId;
    const votes = await service.getUserVotes(id);
    res.status(200).send(votes);
}

export async function deleteVote(req: Request, res: Response){
    const id = res.locals.userId.userId;
    const {newsId} = req.params;
    await service.deleteVote(id, +newsId);
    res.sendStatus(200);
}