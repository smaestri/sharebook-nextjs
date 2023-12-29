// "use client"
import { db } from "@/app/lib/db";
import { notFound } from "next/navigation";
import EditBookForm from "./edit-form";
import { BookWithCategory } from "../../page";

interface EditBookProps {
    params: {
        id: string
    }
}

export default async function EditBook(props: EditBookProps) {
    const id = parseInt(props.params.id)
    const bookWithCategory: BookWithCategory | null = await db.book.findFirst({
        include: {
            category: true,
        },
        where: { id }
    })

    const categories = await db.category.findMany();

    if (!bookWithCategory) {
        return notFound();
    }

    return <div>

        <EditBookForm categories={categories} book={bookWithCategory} />


    </div>

}
