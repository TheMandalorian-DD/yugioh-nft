// components/CollectionListComponent.tsx
import React from 'react'
import Link from 'next/link'

interface Collection {
  collectionId: number
  name: string
  cardCount: string
}

interface CollectionListProps {
  collections: Collection[]
}

const CollectionListComponent: React.FC<CollectionListProps> = ({ collections }) => {
  return (
    <div className="collection-list">
      {collections.map((collection) => (
        <Link href={`/auctions/${collection.collectionId}`} key={collection.collectionId}>
          <a className="collection-item">
            <h2>{collection.name}</h2>
            <p>Cards: {collection.cardCount}</p>
          </a>
        </Link>
      ))}
    </div>
  )
}

export default CollectionListComponent
