import TickerBar from "./TickerBar";

export default function TickerContainer() {
  return (
    <div className="m-4 p-2 bg-transparent ">
      <TickerBar pauseOnHover={true} />
      <TickerBar speed={30} />
      <TickerBar speed={100} />
    </div>
  );
}
