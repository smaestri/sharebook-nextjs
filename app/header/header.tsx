import { auth } from "@/auth";
import Account from "./account";
import Link from "next/link";
import { signIn } from "../lib/actions";
import { Button, Input, Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import { SearchIcon } from "./SearchIcon";

export default async function Header() {

  const session = await auth();

  return (
    <Navbar isBordered  maxWidth={'full'}>
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <img />
          <p className="hidden sm:block font-bold text-inherit">Sharebook</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
        />
        {session?.user ? <Account avatarSrc={session.user.image} mail={session.user.email} /> : <form action={signIn}><Button type="submit">Sign In</Button>
        </form>}
      </NavbarContent>
    </Navbar>

  )

}