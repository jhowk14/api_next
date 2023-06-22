import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
if (req.method === 'POST') {
    const { nome } = req.body;

    if (!nome) {
      return res.status(400).json({
        error: 'O campo nome é obrigatório.',
      });
    }

    try {
      const user = await prisma.user.create({
        data: {
          nome,
        },
      });

      return res.status(201).json({
        data: user,
      });
    } catch (error) {
      return res.status(500).json({
        error: 'Ocorreu um erro ao criar o usuário.',
      });
    }
  }else {
    return res.status(405).json({
      error: 'Método não permitido.',
    });
  } }