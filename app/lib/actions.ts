'use server';

import { redirect } from "next/navigation";
import { db } from "./db";
import { revalidatePath } from "next/cache";


import * as auth from '@/auth'

export async function signIn() {
    return auth.signIn("github")
}

export async function signOut() {
    return auth.signOut()
}

export async function createBook(formState: { message: string }, formData: FormData) {



    try {
        const session = await auth.auth()
        if (!session || !session.user) {
            throw new Error("user is null!")
        }

        const title = formData.get('title')
        const author = formData.get('author')
        const category = formData.get('category')

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
        if (typeof category !== 'string') {
            return {
                message: 'Cat incorrect',
            };
        }

        await db.book.create({
            data: {
                title,
                author,
                categoryId: parseInt(category),
                userId: session.user.id
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
    const title = formData.get('title') as string
    const author = formData.get('author') as string
    const category = formData.get('category')
    if (typeof category !== 'string') {
        return {
            message: 'Cat incorrect',
        };
    }

    const book = await db.book.update({
        where: { id },
        data: {
            title,
            author,
            categoryId: parseInt(category)

        }
    })
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

export async function borrowBook(bookId: number) {

    const session = await auth.auth()
    if (!session || !session.user) {
        return
    }

    console.log('borrow book ' + bookId)

    await db.borrow.create({
        data: {
            bookId,
            borrowerId: session.user.id
        }
    })
    const book = await db.book.update({
        where: { id: bookId },
        data: {
            status: "BORROWED"
        }
    })

    revalidatePath('/borrows')
    redirect('/borrows')
}

export async function closeBorrow(bookId: number) {

    console.log('closeBorrow ' + bookId)

    await db.borrow.deleteMany({
        where: {
            bookId,
        }
    })
    await db.book.update({
        where: { id: bookId },
        data: {
            status: "FREE"
        }
    })

    revalidatePath('/borrows')
    redirect('/borrows')
}