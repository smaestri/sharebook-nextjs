import Link from "next/link";

export default function Header() {
    return (<nav>
            <div>
                <Link href="/books">Mes livres</Link>
                <Link href="/borrows">Mes emprunts</Link>
                <Link href="/search-books">Livres disponibles</Link>
            </div>
            <div>
                <div className="me-2">Bienvenue, ...</div>
                <button type="button" >Se déconnecter</button>
            </div>
    </nav>)

}