import Link from "next/link";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { auth } from "@/auth";
import ListBooksForm from "@/components/list-books-form";
import { Button } from "@nextui-org/react";

const booksWithCategory = Prisma.validator<Prisma.BookDefaultArgs>()({
  include: { category: true, user: true },
})
export type BookWithCategoryAndUser = Prisma.BookGetPayload<typeof booksWithCategory>

export default async function MyBooks() {
  let books: BookWithCategoryAndUser[];
  const session = await auth();
  if (!session || !session.user) {
    return <div>Connectez-vous SVP.</div>
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

  return (
    <>
      <h1 className="text-2xl">Mes livres</h1>
      <ListBooksForm userId={session?.user?.id} books={books} />
      <Link href="my-books/new">
        <Button>Créer un livre</Button>
      </Link>
    </>
  )
}


