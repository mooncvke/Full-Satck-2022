import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import NewBlog from "../components/NewBlog";

describe("NewBlog components tests", () => {
  test("New blog is created with the right info", () => {
    const mockHandler = jest.fn();

    const component = render(<NewBlog newBlogObject={mockHandler} />);

    const title = component.container.querySelector("#title");
    const author = component.container.querySelector("#author");

    fireEvent.change(title, { target: { value: "New title" } });
    fireEvent.change(author, { target: { value: "Author" } });

    fireEvent.submit(component.container.querySelector("form"));

    expect(mockHandler.mock.calls.length).toBe(1);
    expect(mockHandler.mock.calls[0][0].title).toBe("New title");
    expect(mockHandler.mock.calls[0][0].author).toBe("Author");
  });
});
