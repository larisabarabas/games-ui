import React from "react";
import LiveSearch from "@/components/LiveSearch";

const Search = () => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div>
        <h1 className="text-lg font-semibold md:text-2xl">Search games</h1>
        <p className="text-sm font-light text-gray-400 mt-2">
          Live search through all the games
        </p>
      </div>
      <div className="flex-1">
        <LiveSearch />
      </div>
    </main>
  );
};

export default Search;
