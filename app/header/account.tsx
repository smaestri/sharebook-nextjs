"use client"
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link } from '@nextui-org/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'

export default function Account() {
    const router = useRouter()

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button
                    variant="bordered"
                >
                <Image width="25" height="25" src="/user-solid.svg" alt="account" />
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions" onAction={(key) => router.push(`/${key}`)}>
                <DropdownItem key="books">Mes livres</DropdownItem>
                <DropdownItem key="borrows">Mes emprunts</DropdownItem>
            </DropdownMenu>
        </Dropdown>)
}
