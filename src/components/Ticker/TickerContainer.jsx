import { useState, useEffect } from "react";
import MarqueeContainer from "./MarqueeContainer";
import { fetchTickerData } from "../../lib/chatUtils";
import TickerCoinData from "./TickerCoinData";
import { PlusIcon, UserCircleIcon } from "@heroicons/react/20/solid";

export default function TickerContainer() {
  const [tickerData, setTickerData] = useState([]);
  const [isTickerVisible, setIsTickerVisible] = useState(true);

  useEffect(() => {
    fetchTickerData(setTickerData);

    // // Set up interval to fetch data every 5 minutes (300,000 milliseconds)

    // TODO: Put confitional on setInterval - only when isTickerVisible = true
    // const interval = setInterval(() => {
    //   fetchTickerData(setTickerData);
    // }, 300000);

    // // Clear the interval when the component unmounts
    // return () => clearInterval(interval);
  }, []);

  const toggleTickerVisibility = () => {
    setIsTickerVisible(!isTickerVisible);
  };

  console.log("Ticker data", tickerData);
  return (
    <>
      <div className="fixed bottom-12 left-8 z-50">
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
        <div className="flex flex-col mb-2">
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
                <div className="flex w-full items-center flex-none gap-x-2 p-2">
                  <dt className="flex-none">
                    <span className="sr-only ">Market Cap</span>
                    <img
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                      src={coin.image}
                      alt={coin.symbol}
                    />
                  </dt>
                  <div className="flex flex-col">
                    <dd className="text-xs font-medium text-gray-500">
                      Market Cap
                    </dd>
                    <dd className="text-xs font-semibold text-gray-900">
                      {`$${coin.market_cap}`}
                    </dd>
                  </div>
                </div>
              </div>
            ))}
          </MarqueeContainer>
        </div>
      ) : (
        ""
      )}
    </>

    // </div>
  );
}
