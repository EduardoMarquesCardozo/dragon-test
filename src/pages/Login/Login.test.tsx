import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";
import * as authService from "../../services/authService";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

vi.mock("../../services/authService", () => ({
    dragonLogin: vi.fn(),
}));

describe("Testing Login page", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should reder with two inputs and a button", () => {
        render(<Login />, { wrapper: MemoryRouter });
        
        expect(screen.getByPlaceholderText("Eduardo")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("*****")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Acessar/i })).toBeInTheDocument();
    });

    it("should be able to fail to login", async () => {
        const errorMsg = "Credenciais inválidas";
        (authService.dragonLogin as any).mockRejectedValueOnce({
            response: { data: { message: errorMsg } },
        });

        render(<Login />, { wrapper: MemoryRouter });

        fireEvent.change(screen.getByPlaceholderText("Eduardo"), {
            target: { value: "admin" },
        });
        fireEvent.change(screen.getByPlaceholderText("*****"), {
            target: { value: "admin" },
        });

        fireEvent.click(screen.getByRole("button", { name: /Acessar/i }));

        await waitFor(() => {
            expect(screen.getByText(errorMsg)).toBeInTheDocument();
        });
    });

    it("should be able to successfully login", async () => {
        (authService.dragonLogin as any).mockResolvedValueOnce({
            data: { success: true, user: { token: "fake-jwt-token-123" } },
        });
        
        render(<Login />, { wrapper: MemoryRouter });
        
        fireEvent.change(screen.getByPlaceholderText("Eduardo"), {
            target: { value: "EDUARDO" },
        });
        fireEvent.change(screen.getByPlaceholderText("*****"), {
            target: { value: "ADMIN" },
        });
        
        fireEvent.click(screen.getByRole("button", { name: /Acessar/i }));
        
        await waitFor(() => {
            expect(authService.dragonLogin).toHaveBeenCalledWith("EDUARDO", "ADMIN");
            expect(localStorage.getItem("token")).toBe("fake-jwt-token-123");
            expect(mockNavigate).toHaveBeenCalledWith("/home");
        });
    });
});