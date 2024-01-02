// "use client"
import { db } from "@/app/lib/db";
import { notFound } from "next/navigation";
import { BookWithCategory } from "../../page";
import CreateEditBookForm from "../../new/create-edit-form";
import { Suspense } from "react";
import BookCreateLoading from "./book-create-loading";

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
        <Suspense fallback={<BookCreateLoading />}>
            <CreateEditBookForm categories={categories} book={bookWithCategory} />
        </Suspense>
    </div>

}
