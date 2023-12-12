// "use client"
import { db } from "@/app/lib/db";
import { notFound, redirect } from "next/navigation";
import { useState } from "react";
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

    if (!book) {
        return notFound();
    }

    return <div>

        <EditBookForm book={book as Book} />


    </div>

}
