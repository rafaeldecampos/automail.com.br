import React, { useEffect, useRef, memo } from 'react';
import styles from './FinancialTicker.module.css';

function FinancialTicker() {
    const container = useRef();

    useEffect(() => {
        // Evita duplicar o script se o componente renderizar novamente
        if (container.current && container.current.childElementCount > 0) return;

        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
        script.async = true;
        script.innerHTML = JSON.stringify({
            "symbols": [
                {
                    "proName": "BMFBOVESPA:IBOV",
                    "title": "Ibovespa"
                },
                {
                    "proName": "FX_IDC:USDBRL",
                    "title": "Dólar"
                },
                {
                    "proName": "BMFBOVESPA:PETR4",
                    "title": "Petrobras"
                },
                {
                    "proName": "BMFBOVESPA:VALE3",
                    "title": "Vale"
                },
                {
                    "proName": "BITSTAMP:BTCUSD",
                    "title": "Bitcoin"
                },
                {
                    "proName": "FOREXCOM:SPXUSD",
                    "title": "S&P 500"
                },
                {
                    "proName": "FOREXCOM:NSXUSD",
                    "title": "Nasdaq 100"
                }
            ],
            "showSymbolLogo": true,
            "colorTheme": "light", // Tema Claro
            "isTransparent": true,
            "displayMode": "adaptive",
            "locale": "br"
        });

        // Pequeno delay para garantir que o DOM esteja pronto se necessário, mas geralmente append funciona bem
        if (container.current) {
            container.current.appendChild(script);
        }
    }, []);

    return (
        <div className={styles.tickerContainer}>
            <div className="tradingview-widget-container" ref={container}>
                <div className="tradingview-widget-container__widget"></div>
            </div>
        </div>
    );
}

export default memo(FinancialTicker);
