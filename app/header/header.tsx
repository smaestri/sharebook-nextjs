import Link from "next/link";
import Account from "./Account";

export default async function Header() {
    return (<div className="flex flex-row justify-around">
        <div>
            <input type="text" placeholder="Search book, author, etc..."></input>
        </div>
        <div>
            <Account />
        </div>
    </div>)

}