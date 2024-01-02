import Link from "next/link";
import { db } from "../lib/db";
import { borrowBook, deleteBook } from "../lib/actions";
import { Category, Prisma } from "@prisma/client";
import clsx from "clsx";
import { auth } from "@/auth";
import { Button } from "@nextui-org/react";
import FormButton from "../common/form-button";
import ListBooksForm from "./list-books-form";

const booksWithCategory = Prisma.validator<Prisma.BookDefaultArgs>()({
  include: { category: true },
})
export type BookWithCategory = Prisma.BookGetPayload<typeof booksWithCategory>

export default async function ListBooks({ searchParams }: any) {
  let books: BookWithCategory[];
  let category: Category | null = null
  const session = await auth();
  if (!session || !session.user) {
    return <div>Vous n'etes pas connecté</div>
  }

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

    books = await db.book.findMany({
      where: {
        userId: session.user.id
      },
      include: {
        category: true,
      }
    });
  }

  return (<ListBooksForm userId={session?.user?.id} category={category || undefined} books={books} />)
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
      <FormButton 
        className="rounded-md border p-2 hover:bg-gray-100">Delete
      </FormButton>
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

