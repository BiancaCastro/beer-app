import { render, screen, act, fireEvent } from "@testing-library/react";
import List from "./List";
import { BrowserRouter } from "react-router-dom";
jest.useFakeTimers();

let getList;
beforeEach(() => {
  getList = jest.fn();
});
describe("It should render the List page", () => {
  beforeEach(() => {});
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test("renders a Loading text because api has been dispatched but waiting for results", () => {
    render(
      <BrowserRouter>
        <List />
      </BrowserRouter>
    );
    const title = screen.getByText("Loading");
    expect(title).toBeInTheDocument();
  });
  test("renders list with basic information about each beer", async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue([
        {
          id: 1,
          name: "Buzz",
          tagline: "A Real Bitter Experience.",
          first_brewed: "09/2007",
          description:
            "A light, crisp and bitter IPA brewed with English and American hops. A small batch brewed only once.",
          image_url: "https://images.punkapi.com/v2/keg.png",
          attenuation_level: 75,
        },
      ]),
    });

    await act(async () => {
      render(
        <BrowserRouter>
          <List />
        </BrowserRouter>
      );
    });
    const beerName = screen.getByText("Buzz");
    const attenuationLevel = screen.getByText("Attenuation level: 75");
    expect(beerName).toBeInTheDocument;
    expect(attenuationLevel).toBeInTheDocument();
  });
  test("should display the button with red background if beer has already been added as favorite", async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue([
        {
          id: 1,
          name: "Buzz",
          tagline: "A Real Bitter Experience.",
          first_brewed: "09/2007",
          description:
            "A light, crisp and bitter IPA brewed with English and American hops. A small batch brewed only once.",
          image_url: "https://images.punkapi.com/v2/keg.png",
          attenuation_level: 75,
        },
      ]),
    });

    await act(async () => {
      render(
        <BrowserRouter>
          <List />
        </BrowserRouter>
      );
    });

    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(button).toHaveStyle("background-color:#ff8e8e");
  });
});
