import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
if (req.method === 'GET') {
    const { id } = req.query;
    const { nome } = req.body;
 
    if (!id) {
      return res.status(400).json({
        error: 'O campo id é obrigatório.',
      });
    }

    try {
      const user = await prisma.user.findUnique({
        where: {
          id: Number(id),
        
      }} );

      return res.status(200).json({ message: 'Usuário deletado', user });
    } catch (error) {
      return res.status(500).json({
        error: 'Ocorreu um erro ao excluir o usuário.',
      });
    }
}else {
        return res.status(405).json({
          error: 'Método não permitido.',
        });
      }
};