import { auth } from "@/auth";
import Account from "./account";
import Link from "next/link";
import { signIn } from "../lib/actions";
import { Button, Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import SaerchInput from "./search-input";

export default async function Header() {

  const session = await auth();

  return (
    <Navbar isBordered maxWidth={'full'}>
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <Link href="/">
            <img />
            <p className="hidden sm:block font-bold text-inherit">Sharebook</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <SaerchInput />
        {session?.user ? <Account
          avatarSrc={session?.user?.image || undefined}
          mail={session?.user?.email || undefined} /> :
          <form action={signIn}><Button type="submit">Sign In</Button>
          </form>}
      </NavbarContent>
    </Navbar>

  )

}