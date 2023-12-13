"use client"

import { updateBook } from "@/app/lib/actions";
import { useState } from "react"

export default function EditBookForm({ book }: { book: Book }) {
    const updateBookAction = updateBook.bind(null, book.id)

    return (
        <form action={updateBookAction}>
            Title: <input className="rounded-md border" name="title" type="text" defaultValue={book.title}  />
            Author: <input className="rounded-md border" name="author" type="text" defaultValue={book.author} />
            <button type="submit">Valid</button>
        </form>)

}
