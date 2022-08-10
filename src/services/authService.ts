import bcrypt from 'bcrypt';
import {User} from "@prisma/client"
import * as authRepository from "../repositories/authRepository.js";

export type createUserData = Omit<User, "id"|"createdAt">;
export type searchUserData = Omit<createUserData, "name">;

async function findUser(searchUserData:searchUserData){
    const user = await authRepository.findUser(searchUserData);
    if(user){
        return user;
    }
    throw { type: "unauthorized", message: "invalid email or password" };
}

async function createUser(createUserData:createUserData){
    const { email, name} = createUserData;
    const password = bcrypt.hashSync(createUserData.password, 10);
    const user = await authRepository.insertUser({email, password, name});
    return user;
}


export {
    findUser,
    createUser
};