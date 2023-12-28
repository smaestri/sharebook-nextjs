"use client"
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link } from '@nextui-org/react';
import Image from 'next/image';

export default function Account() {
    return (
        <Dropdown>
            <DropdownTrigger>
                <Button
                    variant="bordered"
                >
                <Image width="25" height="25" src="/user-solid.svg" alt="account" />
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="new"><Link href="/books">Mes livres</Link></DropdownItem>
                <DropdownItem key="copy"><Link href="/borrows">Mes emprunts</Link></DropdownItem>
            </DropdownMenu>
        </Dropdown>)
}
