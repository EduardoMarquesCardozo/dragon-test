import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import DragonForm from "./src/pages/Home/DragonForm/DragonForm";

describe("DragonForm Component", () => {
  beforeEach(() => {
    // Set up the component in create mode
    render(<DragonForm />, { wrapper: MemoryRouter });
  });

  it("SHOULD disable submit button only when both fields are empty", () => {
    const submitButton = screen.getByRole("button", { name: /Criar/i });
      
      // Fields are initially empty, button should be disabled
      expect(submitButton).toBeDisabled();
      
      // Fill in only name field
      fireEvent.change(screen.getByLabelText("Nome:"), {
        target: { value: "Draco" },
      });
      
      // With only name filled, button should be enabled
      expect(submitButton).not.toBeDisabled();
      
      // Clear name field
      fireEvent.change(screen.getByLabelText("Nome:"), {
        target: { value: "" },
      });
      
      // Fill in only type field
      fireEvent.change(screen.getByLabelText("Tipo:"), {
        target: { value: "Verde" },
      });
      
      // With only type filled, button should be enabled
      expect(submitButton).not.toBeDisabled();
      
      // Fill in both fields
      fireEvent.change(screen.getByLabelText("Nome:"), {
        target: { value: "Draco" },
      });
      
      // With both fields filled, button should be enabled
      expect(submitButton).not.toBeDisabled();
    });
});
