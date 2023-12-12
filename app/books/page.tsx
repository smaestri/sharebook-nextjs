import Link from "next/link";
import { db } from "../lib/db";
import { deleteBook } from "../lib/actions";

export default async function Books() {

  const books = await db.book.findMany();

  const renderBooks = books.map((book) => {
    const deleteBookAction = deleteBook.bind(null, book.id)
    return <div key={book.id}>{book.title} - {book.author} -<Link href={`/books/${book.id}`}>View</Link> - <Link href={`/books/${book.id}/edit`}>Edit</Link>-<form action={deleteBookAction}><button>Delete</button></form>  </div>
  })
  return (<>
    <div>Bienvenur sur books</div>
    {renderBooks}
    <Link href="books/new"> Create a book </Link>
    </>
    )
}
