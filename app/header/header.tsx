"use client"
import { NextUIProvider } from "@nextui-org/react";
import Account from "./account";

export default async function Header() {
    return (<div className="flex flex-row justify-around">
        <div>
            <input type="text" placeholder="Search book, author, etc..."></input>
        </div>
        <div>
        <NextUIProvider>

            <Account />

            </NextUIProvider>
        </div>
    </div>)

}