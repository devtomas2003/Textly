import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GetMessages(req, res){
    const messages = await prisma.messages.findMany();

    res.status(200).json(messages);
}