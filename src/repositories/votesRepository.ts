import prisma from "../config/database.js";
import {createVoteData} from "../services/votesService.js";


export async function getVotes(id:number){
    const hotVotes= await prisma.votes.count({
        where: {
            type: "HOT",
            newsId: id
        }
    });
    const coldVotes= await prisma.votes.count({
        where: {
            newsId: id,
            type: "COLD",
        }
    });
    return {hotVotes, coldVotes};
}

export async function getUserVotes(id:number){
    const votes = await prisma.votes.findMany({
        where: {
            userId: id
        }
    });
    return votes;
}

export async function getVoteByInfo(id:number, newsId:number){
    const vote = await prisma.votes.findUnique({
        where:{
            votes_unique: {
                userId: id,
                newsId: newsId
            }
        }
    })
    return vote;
}

export async function insertVote(createVoteData:createVoteData){
    return await prisma.votes.create({
        data: createVoteData
    });
}

export async function updateScore(id:number, operation: "increment" | "decrement"){
    return await prisma.news.update({
        where: {id},
        data: {
            score: {[operation]: 1}
        }
    });
}

export async function deleteVote(id:number, newsId:number){
    return await prisma.votes.delete({
        where: {
            votes_unique: {
                newsId,
                userId: id
            }
        }
    });
}