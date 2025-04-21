import { render, screen, fireEvent } from "@testing-library/react";
import OptionCard from "./OptionCard";
import { describe, it, vi, expect } from "vitest";

const mockIcon = "../../assets/info.svg";

describe("OptionCard", () => {
    it("SHOULD render the card with text 'Ver Detalhes', alt 'detalhes' and icons", () => {
        render(
            <OptionCard
                icon={mockIcon}
                text="Ver Detalhes"
                onClick={() => {}}
                alt="detalhes"
            />
        );

        expect(screen.getByText("Ver Detalhes")).toBeInTheDocument();
        expect(screen.getByAltText("detalhes")).toBeInTheDocument();
        expect(screen.getByAltText("Seta para direita")).toBeInTheDocument();
    });

    it("SHOULD call onClick when clicked", () => {
        const mockClick = vi.fn();

        render(
            <OptionCard
                icon={mockIcon}
                text="Ver Detalhes"
                onClick={mockClick}
            />
        );

        fireEvent.click(screen.getByText("Ver Detalhes"));
        expect(mockClick).toHaveBeenCalled();
    });
});
