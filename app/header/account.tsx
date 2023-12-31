"use client"
import React from 'react';
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { useRouter } from 'next/navigation'
import { signOut } from '../lib/actions';

export default function Account({avatarSrc, mail} : {avatarSrc: string | undefined, mail: string| undefined}) {
    const router = useRouter()

    return (
        <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name={mail}
                size="sm"
                src={avatarSrc}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat" onAction={(key) => {
                if(key === "logout") {
                    signOut();
                    router.push("/")   
                } }}>
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{mail}</p>
              </DropdownItem>
              <DropdownItem href="/books">Mes livres</DropdownItem>
              <DropdownItem href="/borrows">Mes emprunts</DropdownItem>
              <DropdownItem key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )
}
