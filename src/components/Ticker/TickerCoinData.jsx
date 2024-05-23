import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function TickerCoinData({ item }) {
  const increase = item.price_change_percentage_24h > 0;

  return (
    <div
      key={item.id}
      className="relative overflow-hidden rounded-lg bg-gray-100 sm:px-4  sm:py-6 hover:bg-slate-200 cursor-pointer"
    >
      <dt>
        <div className="absolute rounded-md bg-indigo-500 p-2">
          <img
            className="h-6 w-6 text-white"
            aria-hidden="true"
            src={item.image}
            alt={item.symbol}
          />
        </div>
        <p className="ml-12 truncate text-sm font-medium text-gray-500">
          {item.name}
        </p>
      </dt>
      <dd className="ml-9 flex items-baseline">
        <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
        <p
          className={classNames(
            increase ? "text-green-600" : "text-red-600",
            "ml-2 flex items-baseline text-sm font-semibold"
          )}
        >
          {increase ? (
            <ArrowUpIcon
              className="h-5 w-5 flex-shrink-0 self-center text-green-500"
              aria-hidden="true"
            />
          ) : (
            <ArrowDownIcon
              className="h-5 w-5 flex-shrink-0 self-center text-red-500"
              aria-hidden="true"
            />
          )}

          <span className="sr-only">
            {" "}
            {increase ? "Increased" : "Decreased"} by{" "}
          </span>
          {item.market_cap_change_percentage_24h}
        </p>
      </dd>
    </div>
  );
}
