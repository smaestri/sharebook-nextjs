import Link from "next/link";
import { db } from "../lib/db";
import { borrowBook, deleteBook } from "../lib/actions";
// import { useSearchParams } from "next/navigation";
import { formatDateToLocal } from "../lib/utils";
import { Category, Prisma } from "@prisma/client";
import clsx from "clsx";

const booksWithCategory = Prisma.validator<Prisma.BookDefaultArgs>()({
  include: { category: true },
})
export type BookWithCategory = Prisma.BookGetPayload<typeof booksWithCategory>


export default async function Books({ searchParams }: any) {
  let books: BookWithCategory[];
  let category: Category | null = null
  if (searchParams.categoryId) {
    books = await db.book.findMany({
      include: {
        category: true,
      },
      where: {
        categoryId: parseInt(searchParams.categoryId),
        // NOT: {
        //   userId: {
        //     equals: 2
        //   }
        // }

      }
    });

    category = await db.category.findFirst({
      where: { id: parseInt(searchParams.categoryId) }

    })

  } else {
    books = await db.book.findMany({
      where: {
        // TODO change when auth
        userId: 2
      },
      include: {
        category: true,
      }
    });
  }

  return (<div>

    {!category && <h1>My Books</h1>}
    {category && <div>Books for category: {category.name}</div>}
    <div className="rounded-lg bg-gray-50 p-2 md:pt-0">

      <table className="hidden min-w-full text-gray-900 md:table">
        <thead className="rounded-lg text-left text-sm font-normal">
          <tr>
            <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
              Title
            </th>
            <th scope="col" className="px-3 py-5 font-medium">
              Author
            </th>
            <th scope="col" className="px-3 py-5 font-medium">
              Category
            </th>
            <th scope="col" className="px-3 py-5 font-medium">
              Status
            </th>
            <th scope="col" className="relative py-3 pl-6 pr-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {books?.map((book: BookWithCategory) => (
            <tr
              key={book.id}
              className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
            >
              <td className="whitespace-nowrap py-3 pl-6 pr-3">
                <div className="flex items-center gap-3">
                  {/* <Image
                  // src={book.image_url}
                  src="toto"
                  className="rounded-full"
                  width={28}
                  height={28}
                  alt={`${book.title}`}
                /> */}
                  <p>{book.id}: {book.title}</p>
                </div>
              </td>
              <td className="whitespace-nowrap px-3 py-3">
                {book.author}
              </td>
              <td className="whitespace-nowrap px-3 py-3">
                {book.category.name}
              </td>
              <td>
                {book.status === 'FREE' ? (
                  <>
                    Libre
                    {/* <ClockIcon className="ml-1 w-4 text-gray-500" /> */}
                  </>
                ) : null}
                {book.status === 'BORROWED' ? (
                  <>
                    Emprunté
                    {/* <CheckIcon className="ml-1 w-4 text-white" /> */}
                  </>
                ) : null}
              </td>
              <td className="whitespace-nowrap py-3 pl-6 pr-3">
                <div className="flex justify-end gap-3">
                  {!category && <div><UpdateBook id={book.id} /><DeleteBook id={book.id} /></div>}
                  {/* TODO change userId later */}
                  {category && book.userId !== 2 && <BorrowBook id={book.id} status={book.status} />}
                  {category && book.userId === 2 && <div><UpdateBook id={book.id} /><DeleteBook id={book.id} /></div>}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {!category && <Link href="books/new"> Create a book </Link>}
  </div>
  )
}

export function UpdateBook({ id }: { id: number }) {
  return (
    <Link href={`/books/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      Edit
    </Link>
  );
}

export function DeleteBook({ id }: { id: number }) {
  const deleteBookAction = deleteBook.bind(null, id)

  return (
    <form action={deleteBookAction}>
      <button className="rounded-md border p-2 hover:bg-gray-100">Delete
      </button>
    </form>
  );
}

export function BorrowBook({ id, status }: { id: number, status: string }) {
  const borrowBookAction = borrowBook.bind(null, id, 2)

  return (
    <form action={borrowBookAction}>
      <button disabled={status === 'BORROWED'} className={clsx(
        {
          "rounded-md border p-2 hover:bg-gray-100": status === 'FREE',
          'rounded-md border p-2 hover:bg-gray-100 cursor-not-allowed': status === 'BORROWED',
        },
      )}>Borrow
      </button>
    </form>
  );
}

