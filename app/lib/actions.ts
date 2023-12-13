'use server';

import { redirect } from "next/navigation";
import { db } from "./db";
import { revalidatePath } from "next/cache";

export async function createBook(formState: { message: string }, formData: FormData) {
    try {
        const title = formData.get('title')
        const author = formData.get('author')
        const category = formData.get('category')


console.log('category' + category)


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
        if (typeof category !== 'string' ) {
            return {
                message: 'Cat incorrect',
            };
        }

        // const categoryDb = await db.category.findFirst({
        //     where: {id: parseInt(category)}
        // })

        const book = await db.book.create({
            data: {
                title,
                author,
                categoryId: parseInt(category)
            }
        })

    } catch (err: unknown) {
        if (err instanceof Error) {
            return {
                message: err.message
            }
        } else {
            return {
                message: "Something went wrong"
            }
        }
    }
    revalidatePath('/books')
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
    revalidatePath('/books')

    redirect('/books')
}

export async function deleteBook(id: number) {

    console.log('delete book ' + id)

    const book = await db.book.delete({
        where: { id },

    })
    revalidatePath('/books')
    redirect('/books')
}