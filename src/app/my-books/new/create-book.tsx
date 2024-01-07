import CreateEditBookForm from "./create-edit-form";
import { db } from "@/lib/db";

export default async function CreateBook() {
  const categories = await db.category.findMany();
  return (<>
  <h1 className="text-2xl">Créer un Livre</h1>
    <CreateEditBookForm categories={categories} />
  </>
  )
}
