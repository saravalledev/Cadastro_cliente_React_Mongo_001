import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(cors())

/* CREATE USERS */
app.post('/usuarios', async (req, res) => {

    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: parseInt(req.body.age, 10)
        }
    })

    res.status(201).json(req.body)
})


/* LIST USERS */
app.get('/usuarios', async (req, res) => {

    let users = [];
    let filters = {};

    if (req.query.name) {
        filters.name = req.query.name;
    }
    if (req.query.email) {
        filters.email = req.query.email;
    }
    if (req.query.age) {
        filters.age = parseInt(req.query.age, 10);
    }

    if (Object.keys(filters).length > 0) {
        users = await prisma.user.findMany({
            where: filters
        });
    } else {
        users = await prisma.user.findMany();
    }

    res.status(200).json(users)
})


/* CHAGE USERS */
app.put('/usuarios/:id', async (req, res) => {


    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json(req.body)
})


/* DELETE USERS */
app.delete('/usuarios/:id', async (req, res) => {


    await prisma.user.delete({
        where: {
            id: req.params.id
        },
    })

    res.status(200).json({ menssage: 'Usuário deletado co sucesso!' })
})

app.listen(3000)

