import { db } from "@/app/lib/db";
import { redirect } from "next/navigation";

export default function Home() {

  async function createBook(formData: FormData) {
    'use server';

    const title = formData.get('title') as string
    const author = formData.get('author') as string

    const book = await db.book.create({
      data: {
        title,
        author
      }
    })
    console.log(book)

    redirect('/books')
  }


  return (<>
    <div>Create a book</div>
    <form action={createBook}>
      Title: <input className="rounded-md border" name="title" type="text" />
      Author: <input className="rounded-md border" name="author" type="text" />
      <button type="submit">Valid</button>
    </form>
  </>
  )
}
