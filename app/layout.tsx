import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './header/header'
import SideBar from './sidebar/page'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className='container mx-auto flex flex-row'>
          <SideBar />
          <div className='container'>
            <Header />
            <main className='container mx-auto'>
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
