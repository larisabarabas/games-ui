"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { BE_API } from "@/lib/constants";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import ErrorAlert from "@/components/ErrorAlert";
import Loader from "@/components/Loader";

const Game = ({ params: { id } }: SearchParamProps) => {
  const [game, setGame] = useState<Game>();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const searchParams = useSearchParams();

  const previousPageRoute = searchParams?.toString().includes("from=search")
    ? "/search"
    : "/";
  const previousPageName = searchParams?.toString().includes("from=search")
    ? "Search"
    : "Game";

  useEffect(() => {
    async function fetchGames() {
      try {
        const res = await fetch(`${BE_API}/games/${id}`);
        const data = await res.json();
        if (data.game) setGame(data.game);
        if (data.detail) setErrorMessage(data.detail);
      } catch (error) {
        setErrorMessage("Error while fecthing game data");
      }
      setLoading(false);
    }
    fetchGames();
  }, [id]);

  if (!game && loading) return <Loader />;
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={previousPageRoute}>
              {previousPageName}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-semibold">
              {game?.title}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="rounded-md w-full p-2 ">
        {errorMessage && <ErrorAlert message={errorMessage} />}
        {!errorMessage && (
          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Game Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label className="font-semibold" htmlFor="title">
                        Title
                      </Label>
                      <Input
                        id="title"
                        type="text"
                        className="w-full"
                        defaultValue={game?.title}
                        disabled
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label className="font-semibold" htmlFor="studio">
                        Studio
                      </Label>
                      <Input
                        id="studio"
                        type="text"
                        className="w-full"
                        defaultValue={game?.studio}
                        disabled
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label className="font-semibold" htmlFor="platform">
                        Platform
                      </Label>
                      <Input
                        id="platform"
                        type="text"
                        className="w-full"
                        defaultValue={game?.platform}
                        disabled
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label className="font-semibold" htmlFor="enabled">
                        Enabled
                      </Label>
                      <Switch id="enabled" checked={game?.enabled} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Telemetry Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="flex items-center align-middle gap-2 justify-between">
                      <div className="grid gap-2 w-2/3">
                        <p className="text-sm font-semibold">Event</p>
                      </div>
                      <div className="grid gap-2">
                        <p className="text-sm text-end font-semibold">
                          {" "}
                          Enabled
                        </p>
                      </div>
                    </div>
                    {game?.telemetry_events?.map((event) => (
                      <div
                        key={event.event_name}
                        className="flex items-center align-middle gap-2 justify-between"
                      >
                        <div className="grid gap-2 w-2/3">
                          <Input
                            id="platform"
                            type="text"
                            className="w-full"
                            defaultValue={event.event_name}
                            disabled
                          />
                        </div>
                        <div className="grid gap-2">
                          <Switch checked={event.enabled} disabled />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Game;
