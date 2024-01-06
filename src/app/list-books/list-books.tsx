import { db } from "../../lib/db";
import { Category, Prisma } from "@prisma/client";
import { auth } from "@/auth";
import ListBooksForm from "@/components/list-books-form";

const booksWithCategory = Prisma.validator<Prisma.BookDefaultArgs>()({
  include: { category: true, user: true },
})
export type BookWithCategoryAndUser = Prisma.BookGetPayload<typeof booksWithCategory>

export default async function ListBooks({ searchParams }: any) {
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

  console.log('books' + JSON.stringify(books))
  return (<ListBooksForm userId={session?.user?.id} category={category || undefined} books={books} />)
}


