import ChartData from "./ChartData";

export default function DataGrid({ token }) {
  return (
    <div className="relative">
      <ul
        role="list"
        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-5 xl:gap-x-8"
      >
        {token
          ? token.historyData.map((dataPoint, index) => (
              <li
                key={index}
                className="relative"
                onClick={() => console.log("dataPoint", dataPoint.dataType)}
              >
                <div className="group aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-lg bg-gray-100 border border-transparent hover:border-violet-600 hover:bg-gray-200 transition duration-300 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                  <ChartData dataPoint={dataPoint} />
                  <button
                    type="button"
                    className="absolute inset-0 focus:outline-none"
                  >
                    <span className="sr-only">View details for {token.id}</span>
                  </button>
                </div>
                <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
                  {token.id}
                </p>
                <p className="pointer-events-none block text-sm font-medium text-gray-500">
                  {dataPoint.dataType}
                </p>
              </li>
            ))
          : ""}
      </ul>
    </div>
  );
}
