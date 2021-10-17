import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  test("renders a list of brands", () => {
    render(<App />);
    const brands = screen.getAllByRole("checkbox");
    expect(brands).toHaveLength(8);
  });

  test("toggles unchecked select to checked", () => {
    render(<App />);
    const brands = screen.getAllByRole("checkbox")[0];
    expect(brands.value).toBe("false");
    fireEvent.click(brands);
    const brandsAfter = screen.getAllByRole("checkbox")[0];
    expect(brandsAfter.value).toBe("true");
  });

  test("toggles multiple unchecked selected to checked", () => {
    render(<App />);
    const brand1 = screen.getAllByRole("checkbox")[0];
    const brand2 = screen.getAllByRole("checkbox")[1];
    fireEvent.click(brand1);
    fireEvent.click(brand2);
    const brand1After = screen.getAllByRole("checkbox")[0];
    const brand2After = screen.getAllByRole("checkbox")[1];
    expect(brand1After.value).toBe("true");
    expect(brand2After.value).toBe("true");
  });

  test("purchase brands on purchase button", () => {
    render(<App />);
    const brand2 = screen.getAllByRole("checkbox")[2];
    const brand3 = screen.getAllByRole("checkbox")[3];
    fireEvent.click(brand2);
    fireEvent.click(brand3);
    const purchaseButton = screen.getByText("Purchase!");
    fireEvent.click(purchaseButton);
    const receipt = screen.getByText("Receipt 1");
    expect(receipt).toBeVisible();
    const list = screen.getByText("CB2, JoyBird");
    expect(list).toBeVisible();
  });
});
