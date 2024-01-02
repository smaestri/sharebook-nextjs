import { createBook } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import CreateEditBookForm from "./create-edit-form";
import { db } from "@/app/lib/db";
import { Suspense } from "react";
import BookCreateLoading from "../[id]/edit/book-create-loading";

export default async function Home() {
 
  const categories = await db.category.findMany();
  return (<>
    <div>Create a book</div>
    <Suspense fallback={<BookCreateLoading />}>
      <CreateEditBookForm categories={categories} />
    </Suspense>
  </>
  )
}
