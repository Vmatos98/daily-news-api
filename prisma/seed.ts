import prisma from "../src/config/database.js"
import bcrypt from "bcrypt";

const categories = [
    // {name: 'anime'},
    {name: 'tecnologia'},
    {name: 'ciencias'},
    {name: 'filmes'},
    {name: 'finanças'},
    {name: 'games'},
    {name: 'moda'},
    {name: 'musica'},
    {name: 'noticias'},
    {name: 'saúde'},
    {name: 'politica'},
]

async function main(){
    await prisma.user.upsert({ 
        where: {
            email:'user@mail.com',
        },
        update:{},
        create:{
            email:'user@mail.com',
            password:bcrypt.hashSync("senhaforte", 10),
            name: 'admin'
        }
    });

    const user = await prisma.user.findFirst({
        where: {
            email:'user@mail.com',
        }
    })

    await prisma.category.createMany({ data: categories });

    const category = await prisma.category.findFirst({
        where: {name:"anime"}
    })

    await prisma.userCategory.upsert({ 
        where:{user_category_unique:{
            userId: user.id,
            categoryId:category.id
            }},
        update:{},
        create:{
            categoryId:category.id,
            userId:user.id
        }
    })
    
}

main().catch((err)=>{
    console.log(err);
    process.exit(1);
}).finally(async()=>{
    await prisma.$disconnect();
});