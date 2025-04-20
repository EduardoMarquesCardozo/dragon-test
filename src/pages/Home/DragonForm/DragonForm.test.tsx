
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, beforeEach, vi, expect } from "vitest";
import DragonForm from "./DragonForm";
import { MemoryRouter } from "react-router-dom";

vi.mock("../../../services/dragonService", () => ({
    createDragon: vi.fn(),
    putDragon: vi.fn()
}));
const mockFetch = vi.fn();
const mockNavigate = vi.fn();

describe("DragonForm Page", () => {
    describe("WHEN there is no ID param (creating)", () => {
        beforeEach(() => {
            vi.mock("react-router-dom", async () => {
                const actual = await vi.importActual("react-router-dom");
                return {
                    ...actual,
                    useParams: () => ({id: ''}),
                    useNavigate: () => vi.fn(),
                };
            });

            vi.mock("../../../store/DragonStore", async () => {
                return {
                        useDragonStore: () => ({
                        currentDragon: null,
                        fetchDragonById: vi.fn()
                    }),
                };
            });

            render(<DragonForm />, { wrapper: MemoryRouter });
        });

        it("SHOULD show title 'Cadastro de Dragão'", () => {
            expect(screen.getByText(/Cadastro de Dragão/i)).toBeInTheDocument();
        });

        it("SHOULD render the name and type input fields", () => {
            expect(screen.getByLabelText(/Nome:/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/Tipo:/i)).toBeInTheDocument();
        });
    });
    
    describe("WHEN there is an ID param (editing)", () => {
        beforeEach(() => {
            vi.mock("react-router-dom", async () => {
                const actual = await vi.importActual("react-router-dom");
                return {
                    ...actual,
                    useParams: () => ({ id: "1" }),
                    useNavigate: () => mockNavigate,
                };
            });

            vi.mock("../../../store/DragonStore", async () => {
                return {
                    useDragonStore: () => ({
                    currentDragon: {
                        id: "1",
                        name: "Smaug",
                        type: "Red",
                        createdAt: "2025-04-18T12:00:00Z"
                    },
                    fetchDragonById: mockFetch
                    }),
                };
            });

            render(<DragonForm />, { wrapper: MemoryRouter });
        });

        it("SHOULD show title 'Edição de Dragão'", () => {
            console.log("EDICAO DE DRAGAO TA CERTINHO");
            expect(screen.getByText(/Edição de Dragão/i)).toBeInTheDocument();
        });

        it("SHOULD fill the fields with dragon data", () => {
            expect(screen.getByDisplayValue("Smaug")).toBeInTheDocument();
            expect(screen.getByDisplayValue("Red")).toBeInTheDocument();
        });

        it("SHOULD render the BackButton", () => {
            expect(screen.getByRole("button", { name: /voltar/i })).toBeInTheDocument();
        });
    });


});