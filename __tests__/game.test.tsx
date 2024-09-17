import { render, screen, waitFor, act } from "@testing-library/react";
import Game from "../app/(root)/games/[id]/page"; // Update this import path to match your project

// Mock the global fetch API
(global.fetch as jest.Mock) = jest.fn();

describe("Game Component", () => {
  const mockGame = {
    id: 2,
    title: "Test Game",
    studio: "Test Studio",
    platform: "Test Platform",
    enabled: true,
    telemetry_events: [
      { event_name: "Event1", enabled: true },
      { event_name: "Event2", enabled: false },
    ],
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("displays an error if fetch fails", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error("Network error")
    );

    await act(async () => {
      render(<Game params={{ id: "30" }} />);
    });

    await waitFor(() =>
      expect(
        screen.getByText(/Error while fecthing game data/i)
      ).toBeInTheDocument()
    );
  });

  it("displays game details when fetch is successful", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ game: mockGame }),
    });

    await act(async () => {
      render(<Game params={{ id: "2" }} />);
    });

    await waitFor(() =>
      expect(screen.getByDisplayValue(mockGame.title)).toBeInTheDocument()
    );
    expect(screen.getByDisplayValue(mockGame.studio)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockGame.platform)).toBeInTheDocument();
    expect(screen.getByLabelText("Enabled")).toBeChecked();
    expect(screen.getByDisplayValue("Event1")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Event2")).toBeInTheDocument();
  });
});
