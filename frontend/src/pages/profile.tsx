// pages/profile.tsx
import { useEffect, useState } from 'react'
import axios from 'axios'
import CardComponent from '../components/CardComponent'

interface Card {
  cardId: number
  name: string
  image: string
  rarity: string
}

const ProfilePage: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([])

  useEffect(() => {
    const fetchUserCards = async () => {
      try {
        const response = await axios.post('/api/user/cards', { userAddress: '0x...' })
        setCards(response.data.ownedCards)
      } catch (error) {
        console.error('Error fetching user cards:', error)
      }
    }

    fetchUserCards()
  }, [])

  return (
    <div className="profile-page">
      <h1>My Cards</h1>
      <div className="card-list">
        {cards.map((card) => (
          <CardComponent key={card.cardId} card={card} />
        ))}
      </div>
    </div>
  )
}

export default ProfilePage
