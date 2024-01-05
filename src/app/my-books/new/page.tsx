import { Suspense } from "react";
import BookCreateLoading from "../../../components/book-create-loading";
import CreateBook from "./create-book";

export default async function Home() {
 
  return (<>
    <div>Create a book</div>
    <Suspense fallback={<BookCreateLoading />}>
      <CreateBook />
    </Suspense>
  </>
  )
}
