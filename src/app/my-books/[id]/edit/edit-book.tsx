import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { BookWithCategory } from "@/app/my-books/page";
import CreateEditBookForm from "@/app/my-books/new/create-edit-form";

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

    return (
        <>
            <h1 className="text-2xl">Modifier un Livre</h1>
            <CreateEditBookForm categories={categories} book={bookWithCategory} />
        </>
    )

}
