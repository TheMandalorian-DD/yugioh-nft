import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/AllCollections.css'; // Assure-toi que ce fichier CSS existe pour styliser la page.

interface CollectionItem {
  collectionId: number;
  name: string;
  cardCount: number;
}

const AllCollections: React.FC = () => {
  const [collections, setCollections] = useState<CollectionItem[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fonction pour récupérer les collections depuis ton backend
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get('http://localhost:3000/get-all-collections');
        setCollections(response.data);
        setLoading(false);
      } catch (error) {
        setError('Erreur lors de la récupération des collections');
        setLoading(false);
      }
    };
    fetchCollections();
  }, []);

  if (loading) return <div>Chargement des collections...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="all-collections">
      <h2>Toutes les collections</h2>
      <div className="collection-grid">
        {collections && collections.length > 0 ? (
          collections.map((collection) => (
            <div key={collection.collectionId} className="collection-card">
              <h3>{collection.name}</h3>
              <p>Nombre de cartes : {collection.cardCount}</p>
            </div>
          ))
        ) : (
          <p>Aucune collection trouvée.</p>
        )}
      </div>
    </div>
  );
};

export default AllCollections;
