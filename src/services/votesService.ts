import * as repository from '../repositories/votesRepository.js'
import {Votes} from "@prisma/client";

export type createVoteData = Omit<Votes,"id"|"createdAt">;

export async function getVotes(id:number){
    const votes = await repository.getVotes(id);
    if(votes){
        return votes;
    }
    throw {type:"not_found", message:""}
}

export async function getUserVotes(id:number){
    const votes = await repository.getUserVotes(id);
    if(votes){
        return votes;
    }
    throw {type:"not_found", message:""}
}

export async function insertVote(createVoteData:createVoteData){
    const vote = await repository.insertVote(createVoteData);
    if(vote.type === "HOT"){
        await repository.updateScore(createVoteData.newsId, "increment");
    }else{
        await repository.updateScore(createVoteData.newsId, "decrement");
    }
}

export async function deleteVote(id:number, newsId:number){
    const vote = await repository.getVoteByInfo(id, newsId);
    await repository.deleteVote(id, newsId);
    if(vote.type === "HOT"){
    await repository.updateScore(newsId, "decrement");
    }else{
        await repository.updateScore(newsId, "increment");
    }
}