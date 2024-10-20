// pages/api/collections.ts
import { NextApiRequest, NextApiResponse } from 'next'
import { getAllCollections } from '../../backend/controllers/collectionController'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const collections = await getAllCollections()
    res.status(200).json(collections)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching collections' })
  }
}
