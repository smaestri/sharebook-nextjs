"use client"
import Link from "next/link";
import { borrowBook, deleteBook } from "../lib/actions";
import { Category } from "@prisma/client";
import clsx from "clsx";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import FormButton from "../common/form-button";
import { BookWithCategory } from "./list-books";
import { useFormState } from "react-dom";
import { useEffect } from "react";

interface ListBooksFormProps {
  books: BookWithCategory[]
  category?: Category
  userId?: string
  search?: boolean
}

export default function ListBooksForm({ category, books, userId, search=false}: ListBooksFormProps) {

  return (<>
  {search && <h1>Results</h1>}
  {category && <h1>Books for category {category.name}</h1>}
  {!category && !search && <h1>My Books</h1>}

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
                  {userId && book.userId !== userId && <BorrowBook id={book.id} status={book.status} />}
                  {userId && book.userId === userId && <div><UpdateBook id={book.id} /><DeleteBook id={book.id} /></div>}
                  {!userId && <div>Connectez-vous pour emprunter!{userId}</div>}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {!category && !search && <Link href="books/new"> Create a book </Link>}
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
  const [formState, action] = useFormState(deleteBookAction, {message: ''})
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  useEffect(()=> {
    if(formState.message){
      onOpen()
    }
  }, [formState])

  return (<>test: {isOpen}
    <form action={action}>
      <FormButton
        className="rounded-md border p-2 hover:bg-gray-100">Delete
      </FormButton>
    </form>
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
            <ModalBody>
              <p> 
              The book is currently being borrowed, you can't delete it!
              </p>

            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
    </>
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

