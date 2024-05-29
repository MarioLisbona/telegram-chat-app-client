import { useState } from "react";
import ChartData from "./ChartData";

export default function DataGrid({ files }) {
  const [showDataGrid, setShowDataGrid] = useState(true);

  const toggleDataGrid = () => {
    setShowDataGrid(!showDataGrid);
  };

  return (
    <div className="relative">
      <div>
        {showDataGrid && (
          <button
            type="button"
            className=" bg-white border border-gray-300 rounded-full p-2 my-2 hover:bg-gray-200 focus:outline-none"
            onClick={toggleDataGrid}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-600 hover:text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
      {showDataGrid && (
        <ul
          role="list"
          className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-5 xl:gap-x-8"
        >
          {files
            ? files.map((file, index) => (
                <li key={index} className="relative">
                  <div className="group aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-lg bg-gray-100 border border-transparent hover:border-violet-600 hover:bg-gray-200 transition duration-300 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                    <ChartData />
                    <button
                      type="button"
                      className="absolute inset-0 focus:outline-none"
                    >
                      <span className="sr-only">
                        View details for {file.title}
                      </span>
                    </button>
                  </div>
                  <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
                    {file.title}
                  </p>
                  <p className="pointer-events-none block text-sm font-medium text-gray-500">
                    {file.size}
                  </p>
                </li>
              ))
            : ""}
        </ul>
      )}
      {/* {showDataGrid && (
        <button
          type="button"
          className="absolute top-2 left-2 bg-white border border-gray-300 rounded-full p-2 hover:bg-gray-200 focus:outline-none"
          onClick={toggleDataGrid}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600 hover:text-gray-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )} */}
    </div>
  );
}
