import { useState, useEffect } from "react";
import MarqueeContainer from "./MarqueeContainer";
import { fetchTickerData } from "../../lib/chatUtils";
import TickerCoinData from "./TickerCoinData";

export default function TickerContainer() {
  const [tickerData, setTickerData] = useState([]);

  useEffect(() => {
    fetchTickerData(setTickerData);
  }, []);

  console.log("Ticker data", tickerData);
  return (
    <MarqueeContainer>
      {tickerData.map((coin, idx) => (
        <div
          key={idx}
          onClick={() => console.log("Clicking this coin data", coin)}
        >
          <TickerCoinData item={coin} />
        </div>
      ))}
    </MarqueeContainer>
    // </div>
  );
}
