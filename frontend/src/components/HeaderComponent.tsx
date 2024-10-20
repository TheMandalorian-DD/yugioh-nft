// components/HeaderComponent.tsx
import React from 'react'
import Link from 'next/link'

const HeaderComponent: React.FC = () => {
  return (
    <header className="header">
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/profile">
          <a>My Cards</a>
        </Link>
      </nav>
    </header>
  )
}

export default HeaderComponent
