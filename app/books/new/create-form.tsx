"use client"
import { createBook } from "@/app/lib/actions";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { Category } from "@prisma/client";
import { useState } from "react";
import { useFormState } from "react-dom";

interface CreateBookFormProps {
  categories: Category[]
}

export default function CreateBookForm({categories}: CreateBookFormProps) {

  const [formState, action] = useFormState(createBook, {
    errors: {}
  })

  return (
    <form action={action}>
      Title: <Input name="title" type="text"
       isInvalid={!!formState.errors.title}
       errorMessage={formState.errors.title?.join(', ')} />
      Author: <Input name="author" type="text"
        isInvalid={!!formState.errors.title}
        errorMessage={formState.errors.title?.join(', ')} /> 
      {/* do not put correct name for test in SA not working*/ }
      Category: <Select name="category">
      {categories.map((category: Category) => 
        <SelectItem key={category.id} value={category.id} >{category.name}</SelectItem>
      )}
      </Select>
      <Button type="submit">Valid</Button>
      {formState.errors._form? <div className="p-2 bg-red-200 border border-red-400">{formState.errors._form?.join(', ')}</div> : null}
    </form>
  )
}
