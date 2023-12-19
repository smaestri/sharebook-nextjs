"use client"

import { updateBook } from "@/app/lib/actions";
import { Book, Category } from "@prisma/client";
import { useState } from "react"

export default function EditBookForm({ book, categories }: {
    book: Book, categories: Category[]
}) {
    const updateBookAction = updateBook.bind(null, book.id)
    const [selectedCategory, setSelectedCategory] = useState('');

    return (
        <form action={updateBookAction}>
            Title: <input className="rounded-md border" name="title" type="text" defaultValue={book.title} />
            Author: <input className="rounded-md border" name="author" type="text" defaultValue={book.author} />
            Category: <select value={selectedCategory || book.categoryId} onChange={e => setSelectedCategory(e.target.value)} className="rounded-md border" name="category">
                {categories.map((category: Category) => <option key={category.id} value={category.id} >{category.name}</option>)}
            </select>
            <button type="submit">Valid</button>
        </form>)

}
