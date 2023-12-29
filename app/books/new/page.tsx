import { createBook } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import CreateBookForm from "./create-form";
import { db } from "@/app/lib/db";

export default async function Home() {
  const categories = await db.category.findMany();
  return (<>
    <div>Create a book</div>
    <CreateBookForm categories={categories} />
  </>
  )
}
