import Marquee from "react-fast-marquee";
import { useState, useEffect } from "react";
export default function TickerBar({
  pauseOnHover,
  direction = "left",
  speed = 70,
}) {
  const marqueeStyle = {};
  const [first20Tokens, setFirst20Tokens] = useState([]);
  const [last20Tokens, setLast20Tokens] = useState([]);

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

  console.log("first 20 prices", first20Tokens);
  return (
    <>
      <Marquee
        pauseOnHover
        direction={direction}
        speed={speed}
        gradient
        gradientColor={"#F3F4F6"}
        gradientWidth={100}
        style={marqueeStyle}
      >
        {first20Tokens.map((token, idx) => (
          <>
            <div
              onClick={() => console.log("Clicking this token data", token)}
              key={idx}
            >{` --- ${token.symbol}: ${token.price} ${" "}`}</div>
          </>
        ))}
      </Marquee>
      <Marquee
        pauseOnHover={pauseOnHover}
        direction={direction}
        speed={130}
        gradient
        gradientColor={"#F3F4F6"}
        gradientWidth={100}
        style={marqueeStyle}
      >
        {last20Tokens.map((token, idx) => (
          <>
            <div
              onClick={() => console.log("Clicking this token data", token)}
              key={idx}
            >{` --- ${token.symbol}: ${token.price} ${" "}`}</div>
          </>
        ))}
      </Marquee>
    </>
  );
}
