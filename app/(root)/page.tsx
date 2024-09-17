"use client";
import { useEffect, useState } from "react";

import { columns } from "@/lib/columns";
import { BE_API } from "@/lib/constants";

import { DataTable } from "@/components/DataTable";
import ErrorAlert from "@/components/ErrorAlert";

export default function Games() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [tableErrorMessage, setTableErrorMessage] = useState("");
  const [pagination, setPagination] = useState<Pagination>();
  const [currentPage, setCurrentPage] = useState(1);

  async function fetchGames(page: number) {
    try {
      const res = await fetch(`${BE_API}/games?page=${page}`);
      const data = await res.json();
      setGames(data.games);
      setPagination({
        total: data.total,
        page: data.page,
        limit: data.limit,
        totalPages: Math.ceil(data.total / data.limit),
      });
    } catch (error) {
      if (error) {
        setGames([]);
        setTableErrorMessage("Error occured while fetching the list of games");
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchGames(currentPage);
  }, []);

  const handleDataFetchOnPaginationNext = () => {
    setCurrentPage(currentPage + 1);
    fetchGames(currentPage + 1);
  };

  const handleDataFetchOnPaginationPrevious = () => {
    setCurrentPage(currentPage - 1);
    fetchGames(currentPage - 1);
  };

  if (!games && loading) return <div>Loading...</div>;
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      {tableErrorMessage && <ErrorAlert message={tableErrorMessage} />}
      <div className="flex items-center">
        <div>
          <h1 className="text-lg font-semibold md:text-2xl">Games Dashboard</h1>
          <p className="text-sm font-light text-gray-400 mt-2">
            A general preview of all the games
          </p>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={games}
        totalPages={pagination?.totalPages || 0}
        rowCount={pagination?.limit || 0}
        onTablePaginationNext={handleDataFetchOnPaginationNext}
        onTablePaginationPrevious={handleDataFetchOnPaginationPrevious}
      />
    </main>
  );
}
