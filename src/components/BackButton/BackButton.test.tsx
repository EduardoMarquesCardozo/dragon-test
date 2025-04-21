import { render, screen, fireEvent } from "@testing-library/react";
import BackButton from "./BackButton";
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

describe("BackButton component", () => {
    it("SHOULD render a button with the following text 'Voltar'", () => {
        render(<BackButton />, { wrapper: MemoryRouter });

        expect(screen.getByRole("button", { name: /voltar/i })).toBeInTheDocument();
    });

    it("WHEN pressed should redirect the page back to home", () => {
        render(<BackButton />, { wrapper: MemoryRouter });

        const button = screen.getByRole("button", { name: /voltar/i });
        fireEvent.click(button);

        expect(mockNavigate).toHaveBeenCalledWith("/home");
    });
});
