import prisma from "../config/database.js";

import {createUserData, searchUserData} from "../services/authService.js";

async function findUser(searchUserData:searchUserData){
    return await prisma.user.findFirst({
        where: {
            email: searchUserData.email
        }
    });
}

async function findUserById(id:number){
    return await prisma.user.findFirst({
        where: {
            id: id
        }
    });
}

async function insertUser(createUserData:createUserData){
    return await prisma.user.create({
        data: 
            createUserData
    });
}

export {
    findUser,
    insertUser,
    findUserById
};