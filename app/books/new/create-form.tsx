"use client"
import { createBook } from "@/app/lib/actions";
import { useState } from "react";
import { useFormState } from "react-dom";

interface CreateBookFormProps {
  categories: Category[]
}

export default function CreateBookForm({categories}: CreateBookFormProps) {
  const [selectedCategory, setSelectedCategory] = useState('');

  const [formState, action] = useFormState(createBook, { message: '' }, selectedCategory)

  return (
    <form action={action}>
      Title: <input className="rounded-md border" name="title" type="text" />
      Author: <input className="rounded-md border" name="author" type="text" />
      {/* do not put correct name for test in SA not working*/ }
      Category: <select onChange={e => setSelectedCategory(e.target.value)} className="rounded-md border" name="category">
      {categories.map((category: Category) => <option value={category.id} >{category.name}</option>)}
      </select>
      {formState.message ? <div className="my-2 p-2 bg-red-200 border rounded border-red-400">{formState.message}</div> : null}

      <button type="submit">Valid</button>
    </form>
  )
}
