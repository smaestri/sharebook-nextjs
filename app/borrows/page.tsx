import { Borrow } from "@prisma/client";
import { db } from "../lib/db";
import CloseBorrowForm from "./borrow-form";

export default async function Borrows() {
  const borrows = await db.borrow.findMany()

  return (
    <>
      <div>Bienvenur sur my-borrows</div>
      {borrows?.map((borrow: Borrow) => (
        <div>Book : {borrow.bookId} - by : {borrow.borrowerId} - <CloseBorrowForm bookId={borrow.bookId} /></div>
      ))}
    </>
  )
}
