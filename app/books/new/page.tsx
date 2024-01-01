import { createBook } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import CreateEditBookForm from "./create-edit-form";
import { db } from "@/app/lib/db";

export default async function Home() {
  const categories = await db.category.findMany();
  return (<>
    <div>Create a book</div>
    <CreateEditBookForm categories={categories.map(cat => ({...cat, id: cat.id.toString()}))} />
  </>
  )
}
