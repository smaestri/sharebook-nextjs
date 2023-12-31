import { Button } from "@nextui-org/react";
import { signIn, signOut } from "./lib/actions";
import { auth } from "@/auth"

export default async function Home() {

  const session = await auth();

  return (<>
    <div>Bienvenur sur sharebook</div>

    {session?.user ? <div>{JSON.stringify(session.user)}</div> : <div>Signed out</div>}

  </>
  )
}
