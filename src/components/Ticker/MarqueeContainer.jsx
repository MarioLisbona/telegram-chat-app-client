import Marquee from "react-fast-marquee";

export default function MarqueeContainer({ children, speed = 70 }) {
  return (
    <Marquee
      pauseOnHover
      speed={speed}
      gradient
      gradientColor={"#F3F4F6"}
      gradientWidth={100}
    >
      {children}
    </Marquee>
  );
}
