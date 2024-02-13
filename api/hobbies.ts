// pages/api/hobbies.js
import { PrismaClient } from "@prisma/client";

export default async function getHobbies(req: { body: { userId: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; hobbies: string; }): void; new(): any; }; }; }) {
  const prisma = new PrismaClient();
  const userId = req.body.userId; // Get the user ID from the request body

  try {
    const hobbies = await prisma.hobbies.findMany({
      where: {
        userId: userId,
      },
    });
    res.status(200).json({
        hobbies: JSON.stringify(hobbies),
        error: ""
    });
  } catch (error) {
    console.error('Error fetching hobbies: ', error);
    res.status(500).json({
        error: 'Error fetching hobbies',
        hobbies: ""
    });
  } 
}


