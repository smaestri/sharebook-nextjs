import Link from "next/link";
import { db } from "../lib/db";
import { borrowBook, deleteBook } from "../lib/actions";
import { Category, Prisma } from "@prisma/client";
import clsx from "clsx";
import { auth } from "@/auth";
import { Button } from "@nextui-org/react";
import FormButton from "../common/form-button";

const booksWithCategory = Prisma.validator<Prisma.BookDefaultArgs>()({
  include: { category: true },
})
export type BookWithCategory = Prisma.BookGetPayload<typeof booksWithCategory>

export default async function ListBooks({ searchParams }: any) {
  let books: BookWithCategory[];
  let category: Category | null = null
  const session = await auth();
  if (searchParams.categoryId) {
    books = await db.book.findMany({
      include: {
        category: true,
      },
      where: {
        categoryId: parseInt(searchParams.categoryId),
      }
    });

    category = await db.category.findFirst({
      where: { id: parseInt(searchParams.categoryId) }

    })

  } else {
    if (!session || !session.user) {
      return <div>Vous n'etes pas connecté</div>
    }
    books = await db.book.findMany({
      where: {
        userId: session.user.id
      },
      include: {
        category: true,
      }
    });
  }

  return (<>
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
            <th scope="col" className="px-3 py-5 font-medium">
              Owner
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
              <td>
                {book.userId}
              </td>
              <td className="whitespace-nowrap py-3 pl-6 pr-3">
                <div className="flex justify-end gap-3">
                  {!category && <div><UpdateBook id={book.id} /><DeleteBook id={book.id} /></div>}
                  {session?.user?.id && category && book.userId !== session?.user?.id && <BorrowBook id={book.id} status={book.status} />}
                  {session?.user?.id && category && book.userId === session?.user?.id && <div><UpdateBook id={book.id} /><DeleteBook id={book.id} /></div>}
                  {!session?.user?.id && <div>Connectez-vous pour emprunter!</div>}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {!category && <Link href="books/new"> Create a book </Link>}
    </>
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
      <Button 
        className="rounded-md border p-2 hover:bg-gray-100">Delete
      </Button>
    </form>
  );
}

export function BorrowBook({ id, status }: { id: number, status: string }) {
  const borrowBookAction = borrowBook.bind(null, id)

  return (
    <form action={borrowBookAction}>
      <FormButton disabled={status === 'BORROWED'} className={clsx(
        {
          "rounded-md border p-2 hover:bg-gray-100": status === 'FREE',
          'rounded-md border p-2 hover:bg-gray-100 cursor-not-allowed': status === 'BORROWED',
        },
      )}>Borrow
      </FormButton>
    </form>
  );
}

