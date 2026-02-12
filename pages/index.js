import { useState, useEffect } from "react";
import SearchBar from "components/SearchBar";
import ContentDisplay from "components/ContentDisplay";
import ChartDisplay from "components/ChartDisplay";
import CountryDataDisplay from "components/CountryDataDisplay";
import FinancialTicker from "components/FinancialTicker";
import StockChart from "components/StockChart";
import TechBackground from "components/TechBackground";
import styles from "pages/index.module.css";
import { getPopularSuggestions } from "models/suggestions";

export default function Home() {
  const [suggestions, setSuggestions] = useState([]);
  const [selectedContent, setSelectedContent] = useState(null);
  const [contentData, setContentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [popularSuggestions, setPopularSuggestions] = useState([]);

  useEffect(() => {
    setPopularSuggestions(getPopularSuggestions(6));
  }, []);

  const handleSearch = async (query) => {
    if (!query || query.trim() === "") {
      setSuggestions([]);
      setError(null);
      return;
    }

    try {
      const response = await fetch(
        `/api/v1/search/suggestions?q=${encodeURIComponent(query)}`,
      );
      const data = await response.json();
      setSuggestions(data.suggestions || []);
      setError(null);
    } catch (error) {
      console.error("Search error:", error);
      setSuggestions([]);
      setError("Erro ao buscar sugestões");
    }
  };

  const handleSelect = async (suggestion) => {
    setSelectedContent(suggestion);
    setSelectedContent(suggestion);
    setError(null);

    // Se for gráfico de ações, não precisa buscar no backend (usa Widget)
    if (suggestion.type === "stock-chart") {
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`/api/v1/content/${suggestion.id}`);
      if (response.ok) {
        const data = await response.json();
        setContentData(data);
      } else if (response.status === 404) {
        setError("Conteúdo não encontrado");
      } else {
        setError("Erro ao carregar conteúdo");
      }
    } catch (error) {
      console.error("Content fetch error:", error);
      setError("Erro ao buscar dados da API");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      <TechBackground />
      <FinancialTicker />
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Portal de Análise de Dados</h1>
          <p className={styles.tagline}>
            Informações públicas e dados em tempo real
          </p>
        </div>
        <div className={styles.searchContainer}>
          <SearchBar
            suggestions={suggestions}
            onSearch={handleSearch}
            onSelect={handleSelect}
          />
        </div>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      {selectedContent && !loading ? (
        <div className={styles.container}>
          <div className={styles.content}>
            {selectedContent.type === "stock-chart" ? (
              <StockChart
                symbol={selectedContent.params.symbol}
                title={selectedContent.title}
                description={selectedContent.description}
              />
            ) : (
              <>
                <ContentDisplay suggestion={selectedContent} />
                {contentData?.chartData && (
                  contentData.chartData.chartType === "table" ? (
                    <CountryDataDisplay
                      data={contentData.chartData}
                      source={selectedContent.source}
                    />
                  ) : (
                    <ChartDisplay
                      data={{
                        ...contentData.chartData,
                        title: selectedContent.title,
                        subtitle: selectedContent.description,
                      }}
                      source={selectedContent.source}
                    />
                  )
                )}
              </>
            )}
          </div>
        </div>
      ) : loading ? (
        <div className={styles.container}>
          <div className={styles.loading}>Carregando dados...</div>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.popularSection}>
            <h2 className={styles.sectionTitle}>Pesquisas Populares</h2>
            <div className={styles.suggestionsGrid}>
              {popularSuggestions.map((suggestion) => (
                <button
                  key={suggestion.id}
                  className={styles.suggestionCard}
                  onClick={() => handleSelect(suggestion)}
                >
                  <div className={styles.cardTitle}>{suggestion.title}</div>
                  <div className={styles.cardDescription}>
                    {suggestion.description}
                  </div>
                  <div className={styles.cardSource}>
                    {suggestion.source || "Fonte interna"}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
