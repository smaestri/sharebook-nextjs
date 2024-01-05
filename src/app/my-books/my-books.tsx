import Link from "next/link";
import { db } from "../../lib/db";
import { borrowBook, deleteBook } from "../../lib/actions";
import { Category, Prisma } from "@prisma/client";
import clsx from "clsx";
import { auth } from "@/auth";
import FormButton from "../../components/form-button";
import ListBooksForm from "../../components/list-books-form";

const booksWithCategory = Prisma.validator<Prisma.BookDefaultArgs>()({
  include: { category: true, user: true },
})
export type BookWithCategoryAndUser = Prisma.BookGetPayload<typeof booksWithCategory>

export default async function MyBooks() {
  let books: BookWithCategoryAndUser[];
  let category: Category | null = null
  const session = await auth();
  if (!session || !session.user) {
    return <div>Please sign in</div>
  }

  books = await db.book.findMany({
    where: {
      userId: session.user.id
    },
    include: {
      category: true,
      user: true
    }
  });

  return (<ListBooksForm userId={session?.user?.id} category={category || undefined} books={books} />)
}

export function UpdateBook({ id }: { id: number }) {
  return (
    <Link href={`/my-books/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      Edit
    </Link>
  );
}

