import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { BookWithCategoryAndUser } from "../list-books/list-books";
import ListBooksForm from "@/components/list-books-form";
import { auth } from "@/auth";

interface SearchProps {
    searchParams: {
        term: string
    }
}

export default async function SearchPage({ searchParams }: SearchProps) {

    const { term } = searchParams;
    if (!term) {
        redirect('/')
    }
    const session = await auth();

    const books: BookWithCategoryAndUser[] = await db.book.findMany({
        include: {
            category: true,
            user: true
        },
        where: {
            OR: [
                { title: { contains: term } },
                { author: { contains: term } }
            ]
        }
    })

    return (<>
        <h1 className="text-2xl">Résultats</h1>
        <ListBooksForm userId={session?.user?.id} books={books} />
    </>
    )


}