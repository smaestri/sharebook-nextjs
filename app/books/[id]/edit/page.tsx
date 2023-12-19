// "use client"
import { db } from "@/app/lib/db";
import { notFound } from "next/navigation";
import EditBookForm from "./edit-form";

interface EditBookProps {
    params: {
        id: string
    }
}

export default async function EditBook(props: EditBookProps) {
    const id = parseInt(props.params.id)
    const book = await db.book.findFirst({
        where: { id }
    })

console.log('book to update: ' + book)
const categories = await db.category.findMany();

    if (!book) {
        return notFound();
    }
    
    // TODO how to convert TYPE from PRISMA to TS ???
    return <div>

        <EditBookForm categories={categories} book={{
            id,
            title: book.title,
            author: book.author,
            category: {
                id: book.categoryId,
                name: 'toto'
            },
        }} />


    </div>

}
