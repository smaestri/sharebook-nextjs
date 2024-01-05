import CreateEditBookForm from "./create-edit-form";
import { db } from "@/src/lib/db";

export default async function CreateBook() {
  const categories = await db.category.findMany();
  return (<>
    <CreateEditBookForm categories={categories} />
  </>
  )
}
