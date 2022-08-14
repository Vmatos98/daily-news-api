var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import prisma from "../src/config/database.js";
import bcrypt from "bcrypt";
const categories = [
    { name: 'anime' },
    { name: 'tech' },
    { name: 'science' },
];
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.user.upsert({
            where: {
                email: 'user@mail.com',
            },
            update: {},
            create: {
                email: 'user@mail.com',
                password: bcrypt.hashSync("senhaforte", 10),
                name: 'admin'
            }
        });
        const user = yield prisma.user.findFirst({
            where: {
                email: 'user@mail.com',
            }
        });
        yield prisma.category.createMany({ data: categories });
        const category = yield prisma.category.findFirst({
            where: { name: "anime" }
        });
        yield prisma.userCategory.upsert({
            where: { user_category_unique: {
                    userId: user.id,
                    categoryId: category.id
                } },
            update: {},
            create: {
                categoryId: category.id,
                userId: user.id
            }
        });
    });
}
main().catch((err) => {
    console.log(err);
    process.exit(1);
}).finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
