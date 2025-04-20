import { describe, it, vi, beforeEach, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import PrivateRoutes from "./PrivateRoutes";
import { MemoryRouter, Routes, Route } from "react-router-dom";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

describe("PrivateRoutes component", () => {
    beforeEach(() => {
        vi.resetAllMocks();
        localStorage.clear();
    });

    describe("WHEN loggedin correctly", () => {
        it("SHOULD render component with a image, a title, and a logout button", () => {
            localStorage.setItem("token", "fake-jwt-token-123");
    
            render(
                <MemoryRouter initialEntries={["/home"]}>
                    <Routes>
                        <Route path="/" element={<p>Login</p>} />
                        <Route element={<PrivateRoutes />}>
                            <Route path="/home" element={<p>Conteúdo</p>} />
                        </Route>
                    </Routes>
                </MemoryRouter>
            );
            expect(screen.getByAltText("Dragon logo")).toBeInTheDocument();
            expect(screen.getByText("Dragon List")).toBeInTheDocument();
            expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();
        });

        it("SHOULD remove the token and navigate to / when the user clicks on Logout.", () => {
            localStorage.setItem("token", "fake-jwt-token-123");
    
            render(
                <MemoryRouter initialEntries={["/home"]}>
                    <Routes>
                        <Route path="/" element={<p>Login</p>} />
                        <Route element={<PrivateRoutes />}>
                            <Route path="/home" element={<p>Conteúdo</p>} />
                        </Route>
                    </Routes>
                </MemoryRouter>
            );
    
            fireEvent.click(screen.getByText("Logout"));
            expect(localStorage.getItem("token")).toBeNull();
            expect(mockNavigate).toHaveBeenCalledWith("/");
        });
    });

    it("SHOULD redirect to / in case a invalid token is set", () => {
        localStorage.setItem("token", "token");

        render(
            <MemoryRouter initialEntries={["/home"]}>
                <Routes>
                    <Route path="/" element={<p>Login</p>} />
                    <Route element={<PrivateRoutes />}>
                        <Route path="/home" element={<p>Conteúdo</p>} />
                    </Route>
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText("Login")).toBeInTheDocument();
    });


});
