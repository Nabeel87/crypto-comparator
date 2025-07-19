import React from 'react'
import CryptoContext from '../context/CryptoContext';

const Home = () => {

  const { coins, loading, error } = useContext(CryptoContext);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Top 100 Cryptos</h2>
      <ul>
        {coins.map((coin) => (
          <li key={coin.id}>
            {coin.name} - ${coin.current_price}
          </li>
        ))}
      </ul>
    </div>
  )
};

export default Home;
