import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import DragonList from "./DragonList";
import * as dragonService from "../../services/dragonService";
import { useDragonStore } from "../../store/DragonStore";

vi.mock("../../services/dragonService", () => ({
  deleteDragon: vi.fn(),
}));

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

type MockDragonType = {
  id: string;
  name: string;
  type: string;
  createdAt?: string;
};

const mockFetchDragons = vi.fn();
const mockFetchDragonById = vi.fn();
let mockDragons: MockDragonType[] = [];
let mockCurrentDragon: MockDragonType | null = null;

vi.mock("../../store/DragonStore", () => ({
  useDragonStore: () => ({
    dragons: mockDragons,
    fetchDragons: mockFetchDragons,
    currentDragon: mockCurrentDragon,
    fetchDragonById: mockFetchDragonById,
  }),
}));

describe("DragonList Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockNavigate.mockReset();
    mockFetchDragons.mockReset();
    mockFetchDragonById.mockReset();
    mockDragons = [];
    mockCurrentDragon = null;
  });

  describe("WHEN rendering the initial state", () => {
    beforeEach(() => {
      render(<DragonList />, { wrapper: MemoryRouter });
    });

    it("SHOULD call fetchDragons on component mount", () => {
      expect(mockFetchDragons).toHaveBeenCalledTimes(1);
    });

    it("SHOULD display the 'Cadastrar Dragão' card", () => {
      expect(screen.getByText("Cadastrar Dragão")).toBeInTheDocument();
      expect(screen.getByAltText("SpikedDragon")).toBeInTheDocument();
    });
  });

  describe("WHEN dragons data is loaded", () => {
    beforeEach(() => {
      mockDragons = [
        { id: "1", name: "Smaug", type: "Red", createdAt: "2025-04-20T12:00:00Z" },
        { id: "2", name: "Draco", type: "Green", createdAt: "2025-04-19T10:00:00Z" },
      ];
      render(<DragonList />, { wrapper: MemoryRouter });
    });

    it("SHOULD render the correct number of dragon cards", () => {
      expect(screen.getByText("Smaug")).toBeInTheDocument();
      expect(screen.getByText("Draco")).toBeInTheDocument();
      expect(screen.getByText("Red")).toBeInTheDocument();
      expect(screen.getByText("Green")).toBeInTheDocument();
    });

    it("SHOULD open modal when a dragon card is clicked", () => {
      const dragonCard = screen.getByText("Smaug").closest(".card-dragon");
      fireEvent.click(dragonCard!);
      
      expect(mockFetchDragonById).toHaveBeenCalledWith("1");
    });
  });

  describe("WHEN testing navigation functionality", () => {
    beforeEach(() => {
      mockDragons = [
        { id: "1", name: "Smaug", type: "Red", createdAt: "2025-04-20T12:00:00Z" },
      ];
      render(<DragonList />, { wrapper: MemoryRouter });
    });

    it("SHOULD navigate to form page when 'Cadastrar Dragão' card is clicked", () => {
      const registerCard = screen.getByText("Cadastrar Dragão").closest(".card-dragon");
      fireEvent.click(registerCard!);
      
      expect(mockNavigate).toHaveBeenCalledWith("/form");
    });
  });

  describe("WHEN modal is open with dragon data", () => {
    beforeEach(() => {
      mockDragons = [
        { id: "1", name: "Smaug", type: "Red", createdAt: "2025-04-20T12:00:00Z" },
      ];
      mockCurrentDragon = { id: "1", name: "Smaug", type: "Red", createdAt: "2025-04-20T12:00:00Z" };
      
      render(<DragonList />, { wrapper: MemoryRouter });
      
      const dragonCard = screen.getByText("Smaug").closest(".card-dragon");
      fireEvent.click(dragonCard!);
    });

    it("SHOULD display the modal with actions", async () => {
      await waitFor(() => {
        expect(screen.getByText(/O que deseja fazer/)).toBeInTheDocument();
      });
      expect(screen.queryByText("Confirmar deleção ?")).not.toBeInTheDocument();
      
      expect(screen.getByText("Ver detalhes")).toBeInTheDocument();
      expect(screen.getByText("Editar")).toBeInTheDocument();
      expect(screen.getByText("Excluir")).toBeInTheDocument();
    });

    it("SHOULD navigate to details page when 'Ver detalhes' is clicked", async () => {

      await waitFor(() => {
        expect(screen.getByText(/O que deseja fazer/)).toBeInTheDocument();
      });
      
      fireEvent.click(screen.getByText("Ver detalhes"));
      
      expect(mockNavigate).toHaveBeenCalledWith("/details/1");
    });

    it("SHOULD navigate to form page when 'Editar' is clicked", async () => {

      await waitFor(() => {
        expect(screen.getByText(/O que deseja fazer/)).toBeInTheDocument();
      });
      

      fireEvent.click(screen.getByText("Editar"));
      
      expect(mockNavigate).toHaveBeenCalledWith("/form/1");
    });

    it("SHOULD show delete confirmation when 'Excluir' is clicked", async () => {

      await waitFor(() => {
        expect(screen.getByText(/O que deseja fazer/)).toBeInTheDocument();
      });
      

      fireEvent.click(screen.getByText("Excluir"));
      
      expect(screen.getByText("Confirmar deleção ?")).toBeInTheDocument();
      expect(screen.getByText(/Todas as informações sobre Smaug serão removidas/)).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /Voltar/i })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /Excluir/i })).toBeInTheDocument();
    });
  });

  describe("WHEN testing delete functionality", () => {
    beforeEach(() => {
      mockDragons = [
        { id: "1", name: "Smaug", type: "Red", createdAt: "2025-04-20T12:00:00Z" },
      ];
      mockCurrentDragon = { id: "1", name: "Smaug", type: "Red", createdAt: "2025-04-20T12:00:00Z" };
      
      render(<DragonList />, { wrapper: MemoryRouter });
      
      const dragonCard = screen.getByText("Smaug").closest(".card-dragon");
      fireEvent.click(dragonCard!);
    });

    it("SHOULD call deleteDragon service when delete is confirmed", async () => {

      (dragonService.deleteDragon as vi.Mock).mockResolvedValueOnce({ data: { success: true } });
      
      await waitFor(() => {
        expect(screen.getByText(/O que deseja fazer/)).toBeInTheDocument();
      });
      
      fireEvent.click(screen.getByText("Excluir"));
      
      fireEvent.click(screen.getByRole("button", { name: /Excluir/i }));
      
      await waitFor(() => {
        expect(dragonService.deleteDragon).toHaveBeenCalledWith("1");
        expect(mockFetchDragons).toHaveBeenCalledTimes(2); // Once on initial render, once after deletion
      });
    });

    it("SHOULD display error message if deletion fails", async () => {
      const errorMessage = "Failed to delete dragon";
      (dragonService.deleteDragon as vi.Mock).mockRejectedValueOnce(errorMessage);
      
      await waitFor(() => {
        expect(screen.getByText(/O que deseja fazer/)).toBeInTheDocument();
      });
      
      fireEvent.click(screen.getByText("Excluir"));
      
      fireEvent.click(screen.getByRole("button", { name: /Excluir/i }));
      
      await waitFor(() => {
        expect(screen.getByText(/Erro ao deletar dragão:/)).toBeInTheDocument();
      });
    });

    it("SHOULD return to the actions dialog when 'Voltar' is clicked on confirmation", async () => {
      const dragonCard = screen.getByText("Smaug").closest(".card-dragon");
      fireEvent.click(dragonCard!);

      await waitFor(() => {
        expect(screen.getByText(/O que deseja fazer/)).toBeInTheDocument();
      });
      
      fireEvent.click(screen.getByText("Excluir"));
      
      await waitFor(() => {
        expect(screen.getByText("Confirmar deleção ?")).toBeInTheDocument();
      });
      
      fireEvent.click(screen.getByRole("button", { name: /Voltar/i }));
      

    });
  });
});

