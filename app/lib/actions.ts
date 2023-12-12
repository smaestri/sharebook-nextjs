'use server';

import { redirect } from "next/navigation";
import { db } from "./db";

export async function createBook(formState: { message: string }, formData: FormData) {

    const title = formData.get('title')
    const author = formData.get('author')

    if (typeof title !== 'string' || title.length < 5) {
        return {
            message: 'Title must be longer',
        };
    }
    if (typeof author !== 'string' || author.length < 5) {
        return {
            message: 'Author must be longer',
        };
    }

    // const book = await db.book.create({
    //     data: {
    //         title,
    //         author
    //     }
    // })

    throw new Error('test')
   // console.log(book)

    redirect('/books')
}

export async function updateBook(id: number, formData: FormData) {

    console.log('updateBook ' + id + ' ' + formData)

    const title = formData.get('title') as string
    const author = formData.get('author') as string

    const book = await db.book.update({
        where: { id },
        data: {
            title,
            author
        }
    })
    console.log(book)

    redirect('/books')
}

export async function deleteBook(id: number) {

    console.log('delete book ' + id)

    const book = await db.book.delete({
        where: { id },

    })

    redirect('/books')
}