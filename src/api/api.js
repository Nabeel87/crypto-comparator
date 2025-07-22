const BASE_URL = "https://api.coingecko.com/api/v3";

export const fetchTopCoins = async (currency = "usd") => {
  const res = await fetch(`${BASE_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`);
  if (!res.ok) throw new Error("Failed to fetch coins");
  return await res.json();
};

export const fetchCoinDetails = async (coinId) => {
  const res = await fetch(`${BASE_URL}/coins/${coinId}`);
  if (!res.ok) throw new Error("Failed to fetch coin details");
  return await res.json();
};

export const fetchCoinHistory = async (coinId, days = 30) => {
  const res = await fetch(`${BASE_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`);
  if (!res.ok) throw new Error("Failed to fetch history");
  return await res.json();
};