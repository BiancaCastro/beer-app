import { render, screen, act, fireEvent } from "@testing-library/react";
import Favourites from "./Favourites";
import { BrowserRouter } from "react-router-dom";
jest.useFakeTimers();
const localStorageMock = (() => {
  let store = {};
  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("It should render the Favouries page", () => {
  beforeEach(() => {
    window.localStorage.clear();
    jest.restoreAllMocks();
  });
  test("should renders information text when there isn't any beer saved as favourite", async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Favourites />
        </BrowserRouter>
      );
    });
    const result = screen.getByText(
      "Seems like there isn't any items added as favourites"
    );
    expect(result).toBeInTheDocument();
  });
  test("should renders the beer and its information when there is any in our local storage", async () => {
    window.localStorage.setItem(
      "favorites",
      JSON.stringify([
        {
          id: 1,
          name: "Buzz",
          description:
            "A light, crisp and bitter IPA brewed with English and American hops. A small batch brewed only once.",
        },
      ])
    );
    await act(async () => {
      render(
        <BrowserRouter>
          <Favourites />
        </BrowserRouter>
      );
    });
    expect(localStorage.getItem("favorites")).toBeDefined();
    const resultName = screen.getByText("Buzz");
    expect(resultName).toBeInTheDocument();
  });
  test("should remove the beer from the list when delete it", async () => {
    window.localStorage.setItem(
      "favorites",
      JSON.stringify([
        {
          id: 1,
          name: "Buzz",
          description:
            "A light, crisp and bitter IPA brewed with English and American hops. A small batch brewed only once.",
        },
      ])
    );
    await act(async () => {
      render(
        <BrowserRouter>
          <Favourites />
        </BrowserRouter>
      );
    });
    const resultName = screen.getByText("Buzz");
    expect(resultName).toBeInTheDocument();
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(resultName).not.toBeInTheDocument();
  });
});
