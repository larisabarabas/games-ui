/**
 * @jest-environment jsdom
 */
import { render } from "@testing-library/react";
import Games from "../app/(root)/page";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

it("renders games page unchanged", () => {
  const { container } = render(<Games />);
  expect(container).toMatchSnapshot();
});
