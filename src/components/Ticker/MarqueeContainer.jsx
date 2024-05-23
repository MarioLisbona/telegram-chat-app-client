import Marquee from "react-fast-marquee";

export default function MarqueeContainer({ children, speed = 70 }) {
  return (
    <div className="w-full overflow-hidden bg-gray-100 ">
      <Marquee
        play={false}
        pauseOnHover
        speed={speed}
        gradient
        gradientColor={"#F3F4F6"}
        gradientWidth={50}
      >
        {children}
      </Marquee>
    </div>
  );
}
