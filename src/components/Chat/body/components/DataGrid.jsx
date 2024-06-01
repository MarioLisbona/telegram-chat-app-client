import ChartData from "./ChartData";

export default function DataGrid() {
  const data = [
    {
      title: "IMG_4985.HEIC",
      size: "3.9 MB",
    },
    {
      title: "IMG_4985.HEIC",
      size: "3.9 MB",
    },
    {
      title: "IMG_4985.HEIC",
      size: "3.9 MB",
    },
    {
      title: "IMG_4985.HEIC",
      size: "3.9 MB",
    },
    {
      title: "IMG_4985.HEIC",
      size: "3.9 MB",
    },
    // More files...
  ];

  return (
    <div className="relative">
      <ul
        role="list"
        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-5 xl:gap-x-8"
      >
        {data
          ? data.map((dataPoint, index) => (
              <li key={index} className="relative">
                <div className="group aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-lg bg-gray-100 border border-transparent hover:border-violet-600 hover:bg-gray-200 transition duration-300 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                  <ChartData />
                  <button
                    type="button"
                    className="absolute inset-0 focus:outline-none"
                  >
                    <span className="sr-only">
                      View details for {dataPoint.title}
                    </span>
                  </button>
                </div>
                <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
                  {dataPoint.title}
                </p>
                <p className="pointer-events-none block text-sm font-medium text-gray-500">
                  {dataPoint.size}
                </p>
              </li>
            ))
          : ""}
      </ul>
    </div>
  );
}
