import { render, screen, fireEvent } from "@testing-library/react";
import CardItem from "./CardItem";

describe("It should render the CardItem component", () => {
  test("renders the component with all the props", () => {
    render(
      <CardItem
        text={"button_text"}
        addOrRemove={jest.fn()}
        image_url={"/imgeSrc"}
        name={"nameBeer"}
      />
    );
    const button_text = screen.getByText("button_text");
    const nameOfTheBeer = screen.getByText("nameBeer");
    const image = screen.getByRole("img");
    expect(button_text).toBeInTheDocument();
    expect(nameOfTheBeer).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/imgeSrc");
    expect(image).toHaveAttribute("alt", "nameBeer");
  });

  test("should dispatch the function when user clicks on the button", () => {
    const clickOn = jest.fn();
    render(
      <CardItem
        favorite={true}
        text={"button_text"}
        addOrRemove={clickOn}
        image_url={"/imgeSrc"}
        name={"nameBeer"}
      />
    );
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(clickOn).toHaveBeenCalled();
  });
  test("should have red background color when button it has been added to favorite", () => {
    const clickOn = jest.fn();
    render(
      <CardItem
        favorite={true}
        text={"button_text"}
        addOrRemove={clickOn}
        image_url={"/imgeSrc"}
        name={"nameBeer"}
      />
    );
    const button = screen.getByRole("button");
    expect(button).toHaveStyle("background-color:#ff8e8e");
  });
  test("should have blue background color when button it has not been added to favorite or don't have that prop", () => {
    const clickOn = jest.fn();
    render(
      <CardItem
        text={"button_text"}
        addOrRemove={clickOn}
        image_url={"/imgeSrc"}
        name={"nameBeer"}
      />
    );
    const button = screen.getByRole("button");
    expect(button).toHaveStyle("background-color:#607d8b");
  });
});
