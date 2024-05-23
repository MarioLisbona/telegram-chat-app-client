import { useState, useEffect } from "react";
import MarqueeContainer from "./MarqueeContainer";
import { fetchTickerData } from "../../lib/chatUtils";

export default function TickerContainer() {
  const [tickerData, setTickerData] = useState([]);

  useEffect(() => {
    fetchTickerData(setTickerData);
  }, []);

  console.log("Ticker data", tickerData);
  return (
    <div className="my-4 rounded-lg bg-gray-200">
      <MarqueeContainer>
        {tickerData.map((coin, idx) => (
          <div
            key={idx}
            onClick={() => console.log("Clicking this token data", coin)}
          >
            <img
              src={coin.image}
              alt={coin.symbol}
              style={{ width: "20px", height: "20px", marginRight: "5px" }}
            />
            {`${coin.symbol} - USD$ ${coin.current_price}`}
          </div>
        ))}
      </MarqueeContainer>
    </div>
  );
}
