import TickerBar from "./TickerBar";

export default function TickerContainer() {
  return (
    <div className="my-4 rounded-lg bg-gray-200">
      <TickerBar pauseOnHover={true} />
    </div>
  );
}
