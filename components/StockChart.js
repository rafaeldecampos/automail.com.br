import React, { useEffect, useRef, memo } from 'react';
import styles from './StockChart.module.css';

function StockChart({ symbol, title, description }) {
    const container = useRef(null);

    useEffect(() => {
        if (!container.current) return;

        container.current.innerHTML = '';

        const widgetContainer = document.createElement("div");
        widgetContainer.className = "tradingview-widget-container__widget";
        widgetContainer.style.width = "100%";
        widgetContainer.style.height = "100%";

        const chartScript = document.createElement("script");
        chartScript.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
        chartScript.type = "text/javascript";
        chartScript.async = true;

        chartScript.innerHTML = JSON.stringify({
            symbol: symbol || "BMFBOVESPA:IBOV",
            interval: "D",
            timezone: "America/Sao_Paulo",
            theme: "light",
            style: "1",
            locale: "br",
            enable_publishing: false,
            allow_symbol_change: true,
            calendar: false,
            backgroundColor: "rgba(255, 255, 255, 1)",
            support_host: "https://www.tradingview.com",
            width: "100%",
            height: 500
        });

        container.current.appendChild(widgetContainer);
        container.current.appendChild(chartScript);

    }, [symbol]);

    return (
        <div className={styles.chartWrapper}>
            <div className={styles.header}>
                <h2>{title}</h2>
                <p>{description}</p>
            </div>

            <div
                ref={container}
                className="tradingview-widget-container"
                style={{ width: "100%" }}
            />
        </div>
    );
}

export default memo(StockChart);
