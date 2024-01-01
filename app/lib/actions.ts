'use server';

import { redirect } from "next/navigation";
import { db } from "./db";
import { revalidatePath } from "next/cache";

import { z } from "zod"

const createBookSchema = z.object({
    title: z.string().min(3).regex(/^[a-z]+$/, { message: "Must be lowercase" }),
    author: z.string().min(3),
    category: z.string()
})

interface CreateBookFormState {
    errors: {
        title?: string[];
        author?: string[];
        _form?: string[];
    }
}


import * as auth from '@/auth'
import { Book } from "@prisma/client";

export async function signIn() {
    return auth.signIn("github")
}

export async function signOut() {
    return auth.signOut()
}

export async function createBook(formState: CreateBookFormState, formData: FormData): Promise<CreateBookFormState> {

    console.log('formState' + JSON.stringify(formState))
    const session = await auth.auth()
    if (!session || !session.user) {
        return {
            errors: {
                _form: ["Please login"]
            }
        }
    }
    console.log('create 2')

    const result = createBookSchema.safeParse({
        title: formData.get('title'),
        author: formData.get('author'),
        category: formData.get('category')

    })


    if (!result.success) {
        console.log('create 3' + JSON.stringify(result.error.flatten().fieldErrors))

        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    let book: Book;
    try {

        book = await db.book.create({
            data: {
                title: result.data.title,
                author: result.data.author,
                categoryId: parseInt(result.data.category),
                userId: session.user.id
            }
        })
    } catch (err: unknown) {
        if (err instanceof Error) {
            return {
                errors: {
                    _form: [err.message]
                }
            }
        } else {
            return {
                errors: {
                    _form: ['Something went wrong']
                }
            }
        }

    }

    console.log('create 4')

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