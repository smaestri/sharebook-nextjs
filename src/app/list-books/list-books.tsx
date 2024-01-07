import { db } from "@/lib/db";
import { Category, Prisma } from "@prisma/client";
import { auth } from "@/auth";
import ListBooksForm from "@/components/list-books-form";
import { ListBooksProps } from "./page";

const booksWithCategory = Prisma.validator<Prisma.BookDefaultArgs>()({
  include: { category: true, user: true },
})
export type BookWithCategoryAndUser = Prisma.BookGetPayload<typeof booksWithCategory>

export default async function ListBooks({ searchParams }: ListBooksProps) {
  let books: BookWithCategoryAndUser[];
  let category: Category | null = null
  const session = await auth();
  books = await db.book.findMany({
    include: {
      category: true,
      user: true
    },
    where: {
      categoryId: parseInt(searchParams.categoryId),
    }
  });
  category = await db.category.findFirst({
    where: { id: parseInt(searchParams.categoryId) }
  })
  return (<>
    <h1 className="text-2xl">Books for category "{category?.name}"</h1>
    <ListBooksForm userId={session?.user?.id} books={books} />
  </>
  )
}


