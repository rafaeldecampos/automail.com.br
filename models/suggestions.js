export const SUGGESTIONS = [
  // Países
  {
    id: "country-brazil",
    title: "Brasil - Dados do País",
    description: "População, área, moeda e informações geográficas",
    category: "Geografia",
    type: "country-data",
    dataSource: "restcountries",
    source: "REST Countries API",
    popular: true,
    params: { country: "Brazil" },
  },
  {
    id: "country-argentina",
    title: "Argentina - Dados do País",
    description: "Informações econômicas e geográficas",
    category: "Geografia",
    type: "country-data",
    dataSource: "restcountries",
    source: "REST Countries API",
    params: { country: "Argentina" },
  },
  {
    id: "country-chile",
    title: "Chile - Dados do País",
    description: "Dados populacionais e econômicos",
    category: "Geografia",
    type: "country-data",
    dataSource: "restcountries",
    source: "REST Countries API",
    params: { country: "Chile" },
  },
  {
    id: "countries-comparison",
    title: "Comparação: Brasil, Argentina e Chile",
    description: "Comparação de população e área entre países",
    category: "Geografia",
    type: "countries-comparison",
    dataSource: "restcountries",
    source: "REST Countries API",
    popular: true,
    params: { countries: ["Brazil", "Argentina", "Chile"] },
  },
  // Criptomoedas
  {
    id: "crypto-bitcoin",
    title: "Bitcoin - Últimos 30 dias",
    description: "Histórico de preços do Bitcoin em USD",
    category: "Criptografia",
    type: "crypto-chart",
    dataSource: "coingecko",
    source: "CoinGecko API",
    popular: true,
    params: { coinId: "bitcoin", days: 30 },
  },
  {
    id: "crypto-ethereum",
    title: "Ethereum - Últimos 30 dias",
    description: "Histórico de preços do Ethereum em USD",
    category: "Criptografia",
    type: "crypto-chart",
    dataSource: "coingecko",
    source: "CoinGecko API",
    popular: true,
    params: { coinId: "ethereum", days: 30 },
  },
  {
    id: "crypto-solana",
    title: "Solana - Últimos 7 dias",
    description: "Variação do preço da Solana",
    category: "Criptografia",
    type: "crypto-chart",
    dataSource: "coingecko",
    source: "CoinGecko API",
    params: { coinId: "solana", days: 7 },
  },
  // Dados econômicos
  {
    id: "gdp-brazil",
    title: "PIB do Brasil (últimos 20 anos)",
    description: "Produto Interno Bruto do Brasil desde 2004",
    category: "Economia",
    type: "economic-indicator",
    dataSource: "worldbank",
    source: "World Bank API",
    popular: true,
    params: { countryCode: "BRA", indicatorCode: "NY.GDP.MKTP.CD" },
  },
  {
    id: "population-growth",
    title: "Crescimento Populacional Brasil",
    description: "Taxa de crescimento populacional",
    category: "Demografia",
    type: "population-chart",
    dataSource: "worldbank",
    source: "World Bank API",
    popular: true,
    params: { countryCode: "BRA", indicatorCode: "SP.POP.TOTL" },
  },
  // Simulados
  {
    id: "stock-simulation",
    title: "Simulação: Ações Tech",
    description: "Variação simulada de ações (30 dias)",
    category: "Finanças",
    type: "stock-simulation",
    dataSource: "simulator",
    source: "Simulação interna",
    params: { label: "Preço de Ações Tech", days: 30 },
  },
  {
    id: "market-distribution",
    title: "Distribuição de Mercado",
    description: "Distribuição simulada de setores do mercado",
    category: "Mercado",
    type: "market-distribution",
    dataSource: "simulator",
    source: "Simulação interna",
    params: {
      title: "Market Share",
      labels: ["Tech", "Finance", "Energy", "Healthcare", "Retail"],
      data: [30, 25, 20, 15, 10],
    },
  },
  {
    id: "regional-revenue",
    title: "Receita por Região",
    description: "Comparação de receitas por região",
    category: "Negócios",
    type: "revenue-comparison",
    dataSource: "simulator",
    source: "Simulação interna",
    params: {
      title: "Receita Anual",
      categories: ["Sul", "Nordeste", "Norte", "Centro-Oeste", "Sudeste"],
      values: [2500000, 1800000, 950000, 1200000, 4500000],
    },
  },
  // Mercado Financeiro (Ao Vivo)
  {
    id: "stock-petr4",
    title: "Petrobras (PETR4)",
    description: "Cotação e gráfico em tempo real da Petrobras",
    category: "Ações",
    type: "stock-chart",
    dataSource: "tradingview",
    source: "TradingView",
    popular: true,
    params: { symbol: "BMFBOVESPA:PETR4" },
  },
  {
    id: "stock-vale3",
    title: "Vale (VALE3)",
    description: "Cotação e gráfico em tempo real da Vale",
    category: "Ações",
    type: "stock-chart",
    dataSource: "tradingview",
    source: "TradingView",
    popular: true,
    params: { symbol: "BMFBOVESPA:VALE3" },
  },
  {
    id: "stock-itub4",
    title: "Itaú Unibanco (ITUB4)",
    description: "Cotação e gráfico em tempo real do Itaú",
    category: "Ações",
    type: "stock-chart",
    dataSource: "tradingview",
    source: "TradingView",
    popular: true,
    params: { symbol: "BMFBOVESPA:ITUB4" },
  },
  {
    id: "stock-aapl",
    title: "Apple (AAPL)",
    description: "Cotação e gráfico em tempo real da Apple Inc.",
    category: "Ações EUA",
    type: "stock-chart",
    dataSource: "tradingview",
    source: "TradingView",
    popular: true,
    params: { symbol: "NASDAQ:AAPL" },
  },
  {
    id: "index-ibov",
    title: "Ibovespa (IBOV)",
    description: "Índice Bovespa em tempo real",
    category: "Índices",
    type: "stock-chart",
    dataSource: "tradingview",
    source: "TradingView",
    popular: true,
    params: { symbol: "BMFBOVESPA:IBOV" },
  },
  {
    id: "forex-usdbrl",
    title: "Dólar Comercial (USD/BRL)",
    description: "Cotação do Dólar em relação ao Real",
    category: "Moedas",
    type: "stock-chart",
    dataSource: "tradingview",
    source: "TradingView",
    popular: true,
    params: { symbol: "FX_IDC:USDBRL" },
  },
  {
    id: "crypto-btc",
    title: "Bitcoin (BTC/USD)",
    description: "Gráfico profissional do Bitcoin",
    category: "Criptomoedas",
    type: "stock-chart",
    dataSource: "tradingview",
    source: "TradingView",
    popular: true,
    params: { symbol: "BITSTAMP:BTCUSD" },
  }
];

export function getPopularSuggestions(limit = 6) {
  return SUGGESTIONS.filter((s) => s.popular).slice(0, limit);
}

export function searchSuggestions(query) {
  if (!query || query.trim() === "") {
    return [];
  }

  const lowerQuery = query.toLowerCase();
  return SUGGESTIONS.filter(
    (suggestion) =>
      suggestion.title.toLowerCase().includes(lowerQuery) ||
      suggestion.description.toLowerCase().includes(lowerQuery) ||
      suggestion.category.toLowerCase().includes(lowerQuery),
  );
}

export function getSuggestionById(id) {
  return SUGGESTIONS.find((s) => s.id === id) || null;
}
