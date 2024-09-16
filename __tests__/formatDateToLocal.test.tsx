import { formatDateToLocal } from "../lib/utils";

describe("formatDateToLocal", () => {
  it("should format the date to the default locale (en-US)", () => {
    const inputDate = "2024-09-16"; // ISO 8601 format
    const formattedDate = formatDateToLocal(inputDate);
    expect(formattedDate).toBe("Sep 16, 2024"); // Expected output in en-US locale
  });

  it("should format the date to a specified locale", () => {
    const inputDate = "2024-09-16";
    const formattedDate = formatDateToLocal(inputDate, "fr-FR");
    expect(formattedDate).toBe("16 sept. 2024"); // Expected output in French locale
  });

  it("should handle different date formats", () => {
    const inputDate = "December 25, 2024";
    const formattedDate = formatDateToLocal(inputDate);
    expect(formattedDate).toBe("Dec 25, 2024");
  });
});
