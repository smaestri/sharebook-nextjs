"use client"
import { createBook } from "@/app/lib/actions";
import { useFormState } from "react-dom";

export default function Home() {

  const [formState, action] = useFormState(createBook,  {message: ''})

  return (<>
    <div>Create a book</div>
    <form action={action}>
      Title: <input className="rounded-md border" name="title" type="text" />
      Author: <input className="rounded-md border" name="author" type="text" />
      {formState.message ? <div className="my-2 p-2 bg-red-200 border rounded border-red-400">{formState.message}</div> : null}
      <button type="submit">Valid</button>
    </form>
  </>
  )
}
