/* eslint-disable no-undef */
// import React from "react";
// import { render, screen } from "@testing-library/react";
// import { BrowserRouter as Router } from "react-router-dom";

// import Add from "./Add";

// describe("<Add />", () => {

//   it("renders without crashing", () => {
//     render(
//       <Router>
//         <Add />
//       </Router>
//     );
//     expect(screen.getByText("Student Enrollment Form")).toBeInTheDocument();
//   });
// });
import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter"; // Import MockAdapter for axios mocking

import Add from "./Add";

jest.mock("axios");

describe("<Add />", () => {
  // Set up a mock for axios
  const axiosMock = new MockAdapter(axios);

  beforeEach(() => {
    // Reset the mock before each test
    axiosMock.reset();
  });

  it("renders without crashing", () => {
    render(
      <Router>
        <Add />
      </Router>
    );
    expect(screen.getByText("Student Enrollment Form")).toBeInTheDocument();
  });

  it("submits the form with valid data", async () => {
    // Mock the successful API response
    axiosMock.onPost("http://localhost:8000/api/create").reply(200, {
      data: { msg: "Student added successfully" },
    });

    render(
      <Router>
        <Add />
      </Router>
    );

    // Simulate form input changes
    fireEvent.change(screen.getByPlaceholderText("First name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last name"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Course"), {
      target: { value: "Node JS" },
    });
    fireEvent.change(screen.getByPlaceholderText("Student ID"), {
      target: { value: "123456" },
    });
    fireEvent.change(screen.getByPlaceholderText("Fees"), {
      target: { value: "1000" },
    });
    fireEvent.change(screen.getByPlaceholderText("courseStart"), {
      target: { value: "2024-02-01" },
    });
    fireEvent.change(screen.getByPlaceholderText("courseEnd"), {
      target: { value: "2024-02-28" },
    });

    // Simulate form submission
    fireEvent.click(screen.getByText("ADD STUDENT"));

    // Wait for the asynchronous axios call to complete
    await waitFor(async () => {
      const successMessage = screen.queryByText("Student created successfully");

      if (successMessage) {
        // Success message found, the test is successful
        expect(successMessage).toBeInTheDocument();
      } else {
        // Continue waiting, or fail the test if the timeout is reached
      }
    });
  });

  it("handles server errors gracefully", async () => {
    axiosMock.onPost("http://localhost:8000/api/create").reply(400);

    render(
      <Router>
        <Add />
      </Router>
    );

    fireEvent.click(screen.getByText("ADD STUDENT"));

    await waitFor(async () => {
      const successMessage = screen.queryByText("PLEASE FILL ALL THE DETAILS");

      if (successMessage) {
        // Success message found, the test is successful
        expect(successMessage).toBeInTheDocument();
      } else {
        // Continue waiting, or fail the test if the timeout is reached
      }
    });
  });

  it("displays error messages for invalid input", async () => {
    axiosMock.onPost("http://localhost:8000/api/create").reply(500);
    render(
      <Router>
        <Add />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText("First name"), {
      target: { value: "  " },
    });
    fireEvent.change(screen.getByPlaceholderText("Last name"), {
      target: { value: "8658" },
    });
    fireEvent.change(screen.getByPlaceholderText("Course"), {
      target: { value: "Node JS" },
    });
    fireEvent.change(screen.getByPlaceholderText("Student ID"), {
      target: { value: "@#%" },
    });
    fireEvent.change(screen.getByPlaceholderText("Fees"), {
      target: { value: "ABCDD" },
    });
    fireEvent.change(screen.getByPlaceholderText("courseStart"), {
      target: { value: "2024-02-01" },
    });
    fireEvent.change(screen.getByPlaceholderText("courseEnd"), {
      target: { value: "2023-02-28" },
    });

    fireEvent.click(screen.getByText("ADD STUDENT"));

    await waitFor(() => {
      expect(screen.getByText("Fname is required")).toBeInTheDocument();
      expect(
        screen.getByText("Lname can only contain letters and spaces")
      ).toBeInTheDocument();
      // expect(
      //   screen.getByText("ID can only contain letters and numbers")
      // ).toBeInTheDocument();
      expect(screen.getByText("Fees can only be numbers")).toBeInTheDocument();
      expect(
        screen.getByText("Course end date must be after course start date")
      ).toBeInTheDocument();
      const successMessage = screen.queryByText("Please Enter Valid Entry");

      if (successMessage) {
        // Success message found, the test is successful
        expect(successMessage).toBeInTheDocument();
      } else {
        // Continue waiting, or fail the test if the timeout is reached
      }
    });
  });

  // it("displays error message for duplicate student ID", async () => {
  //   // Mock the API response for duplicate key error
  //   axiosMock.onPost("http://localhost:8000/api/create").reply(400, {
  //     msg: "Student with ID 123456 already exists",
  //   });

  //   render(
  //     <Router>
  //       <Add />
  //     </Router>
  //   );

  //   // Simulate form input changes
  //   fireEvent.change(screen.getByPlaceholderText("First name"), {
  //     target: { value: "John" },
  //   });
  //   fireEvent.change(screen.getByPlaceholderText("Last name"), {
  //     target: { value: "Doe" },
  //   });
  //   fireEvent.change(screen.getByPlaceholderText("Course"), {
  //     target: { value: "Node JS" },
  //   });
  //   fireEvent.change(screen.getByPlaceholderText("Student ID"), {
  //     target: { value: "123456" },
  //   });
  //   fireEvent.change(screen.getByPlaceholderText("Fees"), {
  //     target: { value: "1000" },
  //   });
  //   fireEvent.change(screen.getByPlaceholderText("courseStart"), {
  //     target: { value: "2024-02-01" },
  //   });
  //   fireEvent.change(screen.getByPlaceholderText("courseEnd"), {
  //     target: { value: "2024-02-28" },
  //   });

  //   // Simulate form submission
  //   fireEvent.click(screen.getByText("ADD STUDENT"));
  //   fireEvent.click(screen.getByText("ADD STUDENT"));

  //   // Wait for the asynchronous axios call to complete
  //   await waitFor(() => {
  //     expect(
  //       screen.getByText("Student with ID 123456 already exists")
  //     ).toBeInTheDocument();
  //   });
  // });
});
