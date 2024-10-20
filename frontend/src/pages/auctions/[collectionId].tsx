// pages/auctions/[collectionId].tsx
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import CardComponent from '../../components/CardComponent'

interface Card {
  cardId: number
  name: string
  image: string
  rarity: string
}

const CollectionPage: React.FC = () => {
  const router = useRouter()
  const { collectionId } = router.query
  const [cards, setCards] = useState<Card[]>([])

  useEffect(() => {
    if (collectionId) {
      const fetchCards = async () => {
        try {
          const response = await axios.get(`/api/collections/${collectionId}`)
          setCards(response.data.ownedCards)
        } catch (error) {
          console.error('Error fetching cards:', error)
        }
      }

      fetchCards()
    }
  }, [collectionId])

  return (
    <div className="collection-page">
      <h1>Collection {collectionId}</h1>
      <div className="card-list">
        {cards.map((card) => (
          <CardComponent key={card.cardId} card={card} />
        ))}
      </div>
    </div>
  )
}

export default CollectionPage
