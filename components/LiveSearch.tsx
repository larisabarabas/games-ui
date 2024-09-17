"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import SearchBar from "@/components/SearchBar";
import { BE_API } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";

const LiveSearch = () => {
  const [showList, setShowList] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<Game[]>([]);

  const router = useRouter();

  async function searchGame(query: string) {
    try {
      const res = await fetch(`${BE_API}/search?query=${query}`);
      const data = await res.json();
      if (data.games) setSearchResults(data.games);
    } catch (error) {
      console.error(error);
    }
  }

  const handleOnType = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    const query: string = e.target.value;
    setSearchValue(query);

    setShowList(true);
    searchGame(query);
  };

  const handleRedirect = (id: string) => {
    console.log(router);
    router.push(`/games/${id}?from=search`);
  };

  return (
    <div>
      <SearchBar
        value={searchValue}
        onInputChange={(e) => {
          handleOnType(e);
        }}
        placeholder="Search games ..."
      />
      {showList && (
        <ul className="bg-white rounded-md border  shadow p-4 mt-4 max-h-80 overflow-y-auto">
          {searchResults.map((result) => (
            <li
              key={result.id}
              className="flex gap-3 hover:bg-slate-100 p-2 rounded mb-2 cursor-pointer"
              onClick={() => handleRedirect(result.id)}
            >
              <div className="flex justify-center items-center">
                <Image
                  className="rounded-md"
                  src="/assets/images/placeholder-games-2.png"
                  alt="Game image placeholder"
                  height={34}
                  width={34}
                />
              </div>

              <div className="flex-1">
                <p className="text-left font-semibold ">{result.title}</p>
                <p className="text-sm text-slate-500">{result.platform}</p>
              </div>
              <div>
                <Badge
                  variant="secondary"
                  className="text-right text-sm font-semibold text-slate-400 "
                >
                  {result.studio}
                </Badge>
              </div>
            </li>
          ))}
          {searchResults.length === 0 && (
            <li className="flex gap-3 hover:bg-slate-100 p-2 rounded mb-2 cursor-pointer">
              <div>
                <p className="text-slate-600 text-sm font-semibold">
                  No matches found ...
                </p>
                <p className="text-slate-500 text-sm ">
                  Please try another search
                </p>
              </div>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default LiveSearch;
