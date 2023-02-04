import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import Blog from "../components/BlogForm";

describe("Blog components tests", () => {
  var component;
  const mockHandler = jest.fn();

  beforeEach(() => {
    const blog = {
      title: "Testi blogi",
      author: "Testaaja",
      url: "testi.org",
      likes: 22,
      user: [{ name: "Testaaja Tero" }],
    };
    component = render(<Blog blog={blog} changedBlog={mockHandler} />);
  });

  test("Renders blog title and author", () => {
    expect(component.container).toHaveTextContent("Testi blogi, Testaaja");
  });

  test("More data is displayed, after clicking view", () => {
    const button = component.getByText("View");
    fireEvent.click(button);

    const div = component.container.querySelector(".moreInfo");
    expect(div).not.toHaveStyle("display: none");
  });

  test("Clicking like button twice calls event handler twice", () => {
    fireEvent.click(component.getByText("View"));
    for (var i = 0; i < 2; ++i) {
      fireEvent.click(component.getByText("Like"));
    }
    expect(mockHandler.mock.calls.length).toBe(2);
  });
});
