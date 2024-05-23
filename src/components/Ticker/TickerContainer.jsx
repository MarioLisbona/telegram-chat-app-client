import { useState, useEffect } from "react";
import MarqueeContainer from "./MarqueeContainer";
import { fetchTickerData } from "../../lib/chatUtils";
import TickerCoinData from "./TickerCoinData";
import { PlusIcon } from "@heroicons/react/20/solid";

export default function TickerContainer() {
  const [tickerData, setTickerData] = useState([]);
  const [isTickerVisible, setIsTickerVisible] = useState(true);

  useEffect(() => {
    fetchTickerData(setTickerData);
  }, []);

  const toggleTickerVisibility = () => {
    setIsTickerVisible(!isTickerVisible);
  };

  console.log("Ticker data", tickerData);
  return (
    <>
      <div className="fixed bottom-8 left-8 z-50">
        {" "}
        {/* Position the button */}
        <button
          type="button"
          className="rounded-full bg-indigo-400 p-1 text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={toggleTickerVisibility}
        >
          <PlusIcon
            className={`h-5 w-5 transition-transform duration-300 ${
              isTickerVisible ? "rotate-[45deg]" : ""
            }`}
            aria-hidden="true"
          />
        </button>
      </div>
      {isTickerVisible ? (
        <>
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
          <MarqueeContainer speed={130}>
            {tickerData.map((coin, idx) => (
              <div
                key={idx}
                onClick={() => console.log("Clicking this coin data", coin)}
              >
                {/* <TickerCoinData item={coin} /> */}
                {coin.name}
              </div>
            ))}
          </MarqueeContainer>
        </>
      ) : (
        ""
      )}
    </>

    // </div>
  );
}
