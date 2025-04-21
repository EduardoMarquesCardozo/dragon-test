
import { render,screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import DragonDetails from "./DragonDetails";
import { MemoryRouter, useParams } from "react-router-dom";
import { useDragonStore } from "../../../store/DragonStore";



describe("DragonDetails Page", () => {

    
    describe("WHEN the page is loaded with a correct id",() =>{
        beforeEach(() => {
            render(<DragonDetails />, { wrapper: MemoryRouter });
        });
        it("SHOULD show correctly with a title 'Detalhes' and a subtitle 'Confira os dados do dragão'", () => {
            expect(screen.getByText(/Detalhes/i)).toBeInTheDocument();
            expect(screen.getByText(/Confira os dados do dragão/i)).toBeInTheDocument();
        });
        it("SHOULD render a button with the following text 'Voltar'", () => {
            expect(screen.getByRole("button", { name: /voltar/i })).toBeInTheDocument();
        });
    });
    describe("WHEN the page is loaded with the zustand fetch",() =>{
        vi.mock("react-router-dom", async () => {
            const actual = await vi.importActual("react-router-dom");
            return {
                ...actual,
                useParams: () => ({id: "1"}),
            };
        });
        vi.mock("../../../store/DragonStore", async () => {
            const actual = await vi.importActual("react-router-dom");
            return {
                ...actual,
                useDragonStore: () => 
                (
                    {
                        currentDragon: {
                            name: "Smaug",
                            type: "Red",
                            createdAt:"2025-04-20T12:00:00Z"
                        },
                        fetchDragonById: ()=>null
                    }
                ),
            };
        });

        beforeEach(() => {
            render(<DragonDetails />, { wrapper: MemoryRouter });
        });
        it("SHOULD show correctly with a title 'Detalhes' and a subtitle 'Confira os dados do dragão'", () => {
            expect(screen.getByText(/Detalhes/i)).toBeInTheDocument();
            expect(screen.getByText(/Confira os dados do dragão/i)).toBeInTheDocument();
        });
        
        it("SHOULD show correctly with name Smaug", () => {
            expect(screen.getByText(/Smaug/i)).toBeInTheDocument();
        });
        it("SHOULD show correctly with type Red", () => {
            expect(screen.getByText(/Red/i)).toBeInTheDocument();
        });
        it("SHOULD show correctly with date of creation '20/04/2025, 09:00:00'", () => {
            expect(screen.getByText('20/04/2025, 09:00:00')).toBeInTheDocument();
        });
    });
    
});
