import Marquee from "react-fast-marquee";

export default function TickerBar({
  pauseOnHover = false,
  direction = "left",
  speed = 70,
}) {
  return (
    <Marquee pauseOnHover={pauseOnHover} direction={direction} speed={speed}>
      I can be a React component, multiple React components, or just some text.
    </Marquee>
  );
}
