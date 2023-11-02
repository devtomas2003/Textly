import { PrismaClient } from "@prisma/client";
import { uuid } from 'uuidv4';
const prisma = new PrismaClient();

export async function SendMessages(req, res){
    const autor = req.body.autor;
    const titulo = req.body.titulo;
    const message = req.body.message;

    if(!autor || !titulo || !message){
        return res.status(400).json({
            message: "Params Missing!"
        });
    }

    await prisma.messages.create({
        data: {
            autor,
            date: new Date(),
            id: uuid(),
            message,
            titulo
        }
    });

    res.status(201).json({
        "message": "Comentario gravado com sucesso!"
    });
}

export async function DeleteMessages(req, res){
    await prisma.messages.deleteMany();

    res.status(200).json({
        "message": "Todos os comentarios foram apagados com sucesso!"
    });
}