const BASE_URL = "https://api.coinpaprika.com/v1";

export function fetchCoins() {
      return fetch(`${BASE_URL}/coins`).then(response => response.json());
}

export function fetchInfoData(coinId: string) {
    return fetch(`${BASE_URL}/coins/${coinId}`).then(response => response.json());
}

export function fetchPriceData(coinId:string) {
    return fetch(`${BASE_URL}/tickers/${coinId}`).then(response => response.json());
}

export function fetchChartData(coinId: string, during: number) {
    const endDate = Math.floor(Date.now() / 1000);
    const startDate = endDate - 60 * 60 * 24 *7 * during;
    return fetch(`${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`).then(response => response.json());
}