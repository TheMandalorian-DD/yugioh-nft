// pages/index.tsx
import { useEffect, useState } from 'react'
import axios from 'axios'
import CollectionListComponent from '../components/CollectionListComponent'

interface Collection {
  collectionId: number
  name: string
  cardCount: string
}

const HomePage: React.FC = () => {
  const [collections, setCollections] = useState<Collection[]>([])

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get('/api/collections')
        setCollections(response.data)
      } catch (error) {
        console.error('Error fetching collections:', error)
      }
    }

    fetchCollections()
  }, [])

  return (
    <div className="home-page">
      <h1>Available Collections</h1>
      <CollectionListComponent collections={collections} />
    </div>
  )
}

export default HomePage
