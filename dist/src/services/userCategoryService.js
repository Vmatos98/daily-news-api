var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as repository from "../repositories/userCategoryRepository.js";
export function revomeManyCategories(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            for (let i of data) {
                const { userId, categoryId } = i;
                yield removeUserCategory({ userId, categoryId });
            }
        }
        catch (error) {
            throw { type: "bad_request" };
        }
    });
}
export function removeUserCategory(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield repository.removeUserCategory(data);
        }
        catch (error) {
            throw { type: "bad_request", message: error.message };
        }
    });
}
export function createManycategories(data) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("array");
        try {
            for (let i of data) {
                console.log("dado", i);
                const { userId, categoryId } = i;
                yield insertUserCategory({ userId, categoryId });
            }
        }
        catch (error) {
            throw { type: "bad_request" };
        }
    });
}
export function insertUserCategory(data) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("data", data);
        try {
            yield repository.insertUserCategory(data);
        }
        catch (error) {
            throw { type: "bad_request", message: error.message };
        }
    });
}
