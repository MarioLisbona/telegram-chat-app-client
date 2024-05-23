import { useState, useEffect } from "react";
import MarqueeContainer from "./MarqueeContainer";
import { fetchTickerData } from "../../lib/chatUtils";

export default function TickerContainer() {
  const [first20Tokens, setFirst20Tokens] = useState([]);
  const [last20Tokens, setLast20Tokens] = useState([]);
  const [tickerData, setTickerData] = useState([]);

  useEffect(() => {
    const fetchTokenData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/tokens");
        if (!response.ok) {
          throw new Error("Failed to fetch token data");
        }
        const data = await response.json();
        console.log("data inside useeffect", data);
        setFirst20Tokens(data.firstTwentyPrices);
        setLast20Tokens(data.lastTwentyPrices);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchTokenData();
  }, []);

  useEffect(() => {
    fetchTickerData(setTickerData);
  }, []);

  console.log("Ticker data", tickerData);
  return (
    <div className="my-4 rounded-lg bg-gray-200">
      <MarqueeContainer>
        {tickerData.map((coin, idx) => (
          <div key={idx}>
            <img
              src={coin.image}
              alt={coin.symbol}
              style={{ width: "20px", height: "20px", marginRight: "5px" }}
            />
            {`${coin.symbol} - USD$ ${coin.current_price}`}
          </div>
        ))}
      </MarqueeContainer>
      {/* <MarqueeContainer>
        {first20Tokens.map((token, idx) => (
          <div
            onClick={() => console.log("Clicking this token data", token)}
            key={idx}
          >{` --- ${token.symbol}: ${token.price} ${" "}`}</div>
        ))}
      </MarqueeContainer>
      <MarqueeContainer speed={130}>
        {last20Tokens.map((token, idx) => (
          <div
            onClick={() => console.log("Clicking this token data", token)}
            key={idx}
          >{` --- ${token.symbol}: ${token.price} ${" "}`}</div>
        ))}
      </MarqueeContainer> */}
    </div>
  );
}
