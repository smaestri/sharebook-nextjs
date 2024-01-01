"use client"
import { createBook, updateBook } from "@/app/lib/actions";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { useFormState } from "react-dom";
import FormButton from "./form-button";
import { BookWithCategory } from "../page";
import React from "react";


interface CreateEditBookFormProps {
  book?: BookWithCategory
  categories: any[]
}

export default function CreateEditBookForm({ categories, book }: CreateEditBookFormProps) {

  // need to transform ID in string to display Select correctly

  const categoriesFormatted = categories.map(cat => ({ ...cat, id: cat.id.toString() }))

  const getAction = () => {
    if (book) {
      return updateBook.bind(null, book.id);
    }
    return createBook
  }

  const [formState, action] = useFormState(getAction(), {
    errors: {}
  })
  //const [isOpen, setIsOpen] = React.useState(false);

  return (
    <form action={action}>
      Title: <Input name="title" type="text"
        isInvalid={!!formState.errors.title}
        errorMessage={formState.errors.title?.join(', ')}
        defaultValue={book ? book.title : undefined} />
      Author: <Input name="author" type="text"
        isInvalid={!!formState.errors.author}
        errorMessage={formState.errors.author?.join(', ')}
        defaultValue={book ? book.author : undefined} />
      {/* do not put correct name for test in SA not working*/}
      <Select
        defaultSelectedKeys={book?.categoryId ? [book.categoryId.toString()] : undefined}
        items={categoriesFormatted} name="category">
        {(category) => (
          <SelectItem key={category.id} value={category.id} >{category.name}</SelectItem>
        )}
      </Select>
      <FormButton>Save</FormButton>
      {formState.errors._form ? <div className="p-2 bg-red-200 border border-red-400">{formState.errors._form?.join(', ')}</div> : null}
    </form>
  )
}
