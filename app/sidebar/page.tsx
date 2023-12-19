import Link from "next/link";
import { db } from "../lib/db";
import Counter from "./Counter";

export default async function SideBar() {
   const categories = await db.category.findMany();

   const renderCategories = categories.map((cat: Category) => {
     return (<div key={cat.id}><Link href={{ pathname: `/books`, query: { categoryId: cat.id } }} >{cat.name} (<Counter categoryId={cat.id} />)</Link></div>)
   })
  return (<div className="flex flex-col">
    {renderCategories}
    </div>
  )
}