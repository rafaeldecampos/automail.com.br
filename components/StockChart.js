import React, { useEffect, useRef, memo } from 'react';
import styles from './StockChart.module.css';

function StockChart({ symbol, title, description }) {
    const container = useRef();

    useEffect(() => {
        // Limpar o container antes de adicionar novo script para lidar com mudança de símbolo
        if (!container.current) return;
        container.current.innerHTML = '';

        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = JSON.stringify({
            "symbol": symbol || "BMFBOVESPA:IBOV",
            "width": "100%",
            "locale": "br",
            "colorTheme": "light", // Tema Claro
            "isTransparent": true
        });

        const chartScript = document.createElement("script");
        chartScript.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
        chartScript.type = "text/javascript";
        chartScript.async = true;
        chartScript.innerHTML = JSON.stringify({
            "autosize": true,
            "symbol": symbol || "BMFBOVESPA:IBOV",
            "interval": "D",
            "timezone": "America/Sao_Paulo",
            "theme": "light", // Tema Claro
            "style": "1",
            "locale": "br",
            "enable_publishing": false,
            "allow_symbol_change": true,
            "calendar": false,
            "backgroundColor": "rgba(255, 255, 255, 1)", // Fundo Branco
            "support_host": "https://www.tradingview.com"
        });

        const widgetContainer = document.createElement("div");
        widgetContainer.className = "tradingview-widget-container__widget";
        widgetContainer.style.height = "700px";
        widgetContainer.style.width = "100%";

        container.current.appendChild(widgetContainer);
        container.current.appendChild(chartScript);

    }, [symbol]);

    return (
        <div className={styles.chartWrapper}>
            <div className={styles.header}>
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
            <div className="tradingview-widget-container" ref={container} style={{ height: "700px", width: "100%" }}>
            </div>
        </div>
    );
}

export default memo(StockChart);
