'use server';
import { redirect } from "next/navigation";
import { db } from "./db";
import { revalidatePath } from "next/cache";
import * as auth from '@/auth'
import { Book } from "@prisma/client";
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

export async function signIn() {
    return auth.signIn("github")
}

export async function signOut() {
    return auth.signOut()
}

export async function createBook(formState: CreateBookFormState, formData: FormData): Promise<CreateBookFormState> {
    const session = await auth.auth()
    if (!session || !session.user) {
        return {
            errors: {
                _form: ["Please login"]
            }
        }
    }

    const result = createBookSchema.safeParse({
        title: formData.get('title'),
        author: formData.get('author'),
        category: formData.get('category')

    })
    if (!result.success) {
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
    revalidatePath('/my-books')
    redirect('/my-books')
}

export async function updateBook(bookId: number, formState: CreateBookFormState, formData: FormData): Promise<CreateBookFormState> {
    const session = await auth.auth()
    if (!session || !session.user) {
        return {
            errors: {
                _form: ["Please login"]
            }
        }
    }

    const result = createBookSchema.safeParse({
        title: formData.get('title'),
        author: formData.get('author'),
        category: formData.get('category')
    })

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    let book: Book;
    try {

        book = await db.book.update({
            where: { id: bookId },
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

    revalidatePath('/my-books')
    redirect('/my-books')
}

export async function deleteBook(id: number) {
    // check if book already borrowed
    const book = await db.book.findFirst({
        where: {
            id
        }
    })
    if (book?.status === "BORROWED") {
        return {
            message: "The book is currently being borrowed, you can't delete it!"
        }

    }
    await db.book.delete({
        where: { id },

    })
    revalidatePath('/my-books')
    redirect('/my-books')
}

export async function borrowBook(bookId: number) {
    const session = await auth.auth()
    if (!session || !session.user) {
        return
    }
    await db.borrow.create({
        data: {
            bookId,
            borrowerId: session.user.id
        }
    })
    await db.book.update({
        where: { id: bookId },
        data: {
            status: "BORROWED"
        }
    })
    revalidatePath('/borrows')
    redirect('/borrows')
}

export async function closeBorrow(bookId: number) {
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

export async function search(formData: FormData) {
    const term = formData.get('term')
    if (typeof term !== 'string' || !term) {
        redirect("/")
    }
    redirect(`/search?term=${term}`)
}