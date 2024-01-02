// "use client"
import { db } from "@/app/lib/db";
import { notFound } from "next/navigation";
import { BookWithCategory } from "../../page";
import CreateEditBookForm from "../../new/create-edit-form";
import { Suspense } from "react";
import BookCreateLoading from "./book-create-loading";
import EditBook from "./edit-book";

interface EditBookProps {
    params: {
        id: string
    }
}

export default async function EditBookSuspense(props: EditBookProps) {
    return <div>
        <Suspense fallback={<BookCreateLoading />}>
            <EditBook params={props.params}/>
        </Suspense>
    </div>

}
