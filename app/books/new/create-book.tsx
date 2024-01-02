import CreateEditBookForm from "./create-edit-form";
import { db } from "@/app/lib/db";

export default async function CreateBook() {
  const categories = await db.category.findMany();
  return (<>
    <CreateEditBookForm categories={categories} />
  </>
  )
}
