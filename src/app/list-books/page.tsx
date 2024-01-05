import { Prisma } from "@prisma/client";
import BookCreateLoading from "../../components/book-create-loading";
import { Suspense } from "react";
import ListBooks from "./list-books";

const booksWithCategory = Prisma.validator<Prisma.BookDefaultArgs>()({
  include: { category: true },
})
export type BookWithCategory = Prisma.BookGetPayload<typeof booksWithCategory>

export default async function Books({ searchParams }: any) {
  return (<Suspense fallback={<BookCreateLoading />}>
    <ListBooks searchParams={searchParams} />
  </Suspense>)
}

