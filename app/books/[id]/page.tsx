import { db } from "@/app/lib/db"
import { notFound } from "next/navigation"

interface BookProps {
    params: {
        id: string
    }
}

export default async function Book(props: BookProps) {

    const book = await db.book.findFirst({
        where: {id: parseInt(props.params.id)}
    })

    if(!book) {
        return notFound();
    }
return <div>{book.title}</div>
}

export async function generateStaticParams() {
    const books = await db.book.findMany();
  
    return books.map((book) => {
      return {
        id: book.id.toString(),
      };
    });
  }