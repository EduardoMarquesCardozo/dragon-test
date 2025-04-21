import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "./Modal";
import { describe, it, expect, vi } from "vitest";

describe("Modal component", () => {
    it("SHOULD the isOpen variable be false, the component will not be rendered", () => {
        const { container } = render(
            <Modal isOpen={false} onClose={vi.fn()}>
                <p>Conteúdo</p>
            </Modal>
        );

        expect(container.firstChild).toBeNull();
        expect(screen.queryByText(/conteúdo/i)).not.toBeInTheDocument();
    });

    it("SHOULD isOpen be true, the component will be rendered with it's content", () => {
        render(
            <Modal isOpen={true} onClose={vi.fn()}>
                <p>Conteúdo</p>
            </Modal>
        );

        expect(screen.getByText(/conteúdo/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /x/i })).toBeInTheDocument();
    });

    it("SHOULD call onClose in case user click on 'X' button", () => {
        const mockOnClose = vi.fn();

        render(
            <Modal isOpen={true} onClose={mockOnClose}>
                <p>Conteúdo</p>
            </Modal>
        );

        const closeButton = screen.getByRole("button", { name: /x/i });
        fireEvent.click(closeButton);

        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
});