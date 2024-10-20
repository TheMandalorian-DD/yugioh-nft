// components/CardComponent.tsx
import React from 'react'

interface CardProps {
  card: {
    cardId: number
    name: string
    image: string
    rarity: string
  }
}

const CardComponent: React.FC<CardProps> = ({ card }) => {
  return (
    <div className="card">
      <img src={card.image} alt={card.name} className="card-image" />
      <h2 className="card-name">{card.name}</h2>
      <p className="card-rarity">{card.rarity}</p>
    </div>
  )
}

export default CardComponent
