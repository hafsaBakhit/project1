import '@testing-library/jest-dom';
import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import About from "../src/Components/About";

describe("About", () => {
  it("should render the About component", () => {
    render(<About />);
    const AboutElement = screen.getByRole('heading', { level: 1 });
    expect(AboutElement).toBeInTheDocument();
  });

    it("should have the text about", () => {
    render(<About />);
    const text = screen.queryByText(/about/i);
    expect(text).toBeInTheDocument();
  });

  it("should have the image", () => {
    render(<About />);
    const image = screen.getByAltText('devimage');
    expect(image).toHaveClass('userImage');
  });

  it("should render an <img> element", () => {
    render(<About />);
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
  });
   it("should have a src attribute ", () => {
    render(<About />);
    const image = screen.getByAltText('devimage');
    expect(image).toHaveAttribute('src');
  });

  it("should have the correct CSS class ", () => {
    render(<About />);
    const image = screen.getByAltText('devimage');
    expect(image).toHaveClass('userImage');
  });




});
