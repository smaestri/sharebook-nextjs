import { PrismaClient } from "@prisma/client";

export const db = new PrismaClient();

// db.book.create({
//     data: {
//         title: 'book',
//         author: 'sma'
//     }
// })