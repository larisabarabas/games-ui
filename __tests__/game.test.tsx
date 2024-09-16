import { render, screen, waitFor } from "@testing-library/react";
import Game from "../app/(root)/games/[id]/page";
import "@testing-library/jest-dom";

// Mock fetch
global.fetch = jest.fn();

const mockGameData = {
  game: {
    title: "Example Game",
    studio: "Example Studio",
    platform: "PC",
    enabled: true,
    telemetry_events: [
      { event_name: "Start Event", enabled: true },
      { event_name: "End Event", enabled: false },
    ],
  },
};

const mockErrorData = {
  detail: "Game not found",
};

describe("Game Component", () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it("renders loading state initially", () => {
    render(<Game params={{ id: "1" }} />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("renders game details on successful fetch", async () => {
    // Mock successful fetch response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockGameData,
    });

    render(<Game params={{ id: "1" }} />);

    // Wait for the game details to be rendered
    await waitFor(() =>
      expect(screen.getByLabelText(/title/i)).toHaveValue("Example Game")
    );
    expect(screen.getByLabelText(/studio/i)).toHaveValue("Example Studio");
    expect(screen.getByLabelText(/platform/i)).toHaveValue("PC");
    expect(screen.getByLabelText(/enabled/i)).toBeChecked();

    // Check that telemetry events are rendered correctly
    expect(screen.getByDisplayValue("Start Event")).toBeInTheDocument();
    expect(screen.getByDisplayValue("End Event")).toBeInTheDocument();
  });

  it("renders error message on fetch failure", async () => {
    // Mock error response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockErrorData,
    });

    render(<Game params={{ id: "1" }} />);

    // Wait for the error message to appear
    await waitFor(() =>
      expect(screen.getByText(/game not found/i)).toBeInTheDocument()
    );
  });

  it("displays an error if fetch fails unexpectedly", async () => {
    // Simulate a network or unexpected error
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error("Network error")
    );

    render(<Game params={{ id: "60" }} />);

    await waitFor(() =>
      expect(
        screen.getByText(/Error while fecthing game data/i)
      ).toBeInTheDocument()
    );
  });
});
