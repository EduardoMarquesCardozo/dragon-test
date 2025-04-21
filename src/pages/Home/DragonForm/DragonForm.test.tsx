import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import DragonForm from "./DragonForm";
import * as dragonService from "../../../services/dragonService";
import { useDragonStore } from "../../../store/DragonStore";

vi.mock("../../../services/dragonService", () => ({
  createDragon: vi.fn(),
  putDragon: vi.fn(),
}));

const mockNavigate = vi.fn();
let mockParams: { id?: string } = {};

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => mockParams,
  };
});

type MockDragonType = {
  id: string;
  name: string;
  type: string;
  createdAt?: string;
};

const mockFetchDragonById = vi.fn();
let mockCurrentDragon: MockDragonType | null = null;

vi.mock("../../../store/DragonStore", () => ({
  useDragonStore: () => ({
    currentDragon: mockCurrentDragon,
    fetchDragonById: mockFetchDragonById,
  }),
}));

describe("DragonForm Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockNavigate.mockReset();
    mockFetchDragonById.mockReset();
    mockCurrentDragon = null;
    mockParams = {};
  });

  describe("WHEN rendering in create mode (no ID param)", () => {
    beforeEach(() => {
      mockParams = {};
      render(<DragonForm />, { wrapper: MemoryRouter });
    });

    it("SHOULD display the correct title and subtitle for create mode", () => {
      expect(screen.getByText("Cadastro")).toBeInTheDocument();
      expect(screen.getByText("Informe os dados do dragão.")).toBeInTheDocument();
    });

    it("SHOULD display empty form fields", () => {
      const nameInput = screen.getByLabelText("Nome:") as HTMLInputElement;
      const typeInput = screen.getByLabelText("Tipo:") as HTMLInputElement;
      
      expect(nameInput.value).toBe("");
      expect(typeInput.value).toBe("");
    });

    it("SHOULD show 'Criar' on the submit button", () => {
      expect(screen.getByRole("button", { name: /Criar/i })).toBeInTheDocument();
    });
  });

  describe("WHEN rendering in edit mode (ID param is present)", () => {
    beforeEach(() => {
      mockParams = { id: "123" };
      mockCurrentDragon = {
        id: "123",
        name: "Smaug",
        type: "Vermelho",
        createdAt: "2025-04-20T12:00:00Z",
      };
      
      render(<DragonForm />, { wrapper: MemoryRouter });
    });

    it("SHOULD call fetchDragonById with the correct ID", () => {
      expect(mockFetchDragonById).toHaveBeenCalledWith("123");
    });

    it("SHOULD display the correct title and subtitle for edit mode", () => {
      expect(screen.getByText("Edição")).toBeInTheDocument();
      expect(screen.getByText("Altere os dados cadastrados do dragão.")).toBeInTheDocument();
    });

    it("SHOULD populate form fields with dragon data", () => {
      const nameInput = screen.getByLabelText("Nome:") as HTMLInputElement;
      const typeInput = screen.getByLabelText("Tipo:") as HTMLInputElement;
      
      expect(nameInput.value).toBe("Smaug");
      expect(typeInput.value).toBe("Vermelho");
    });

    it("SHOULD show 'Salvar' on the submit button", () => {
      expect(screen.getByRole("button", { name: /Salvar/i })).toBeInTheDocument();
    });
  });

  describe("WHEN submitting the form in create mode", () => {
    beforeEach(() => {
      mockParams = {};
      render(<DragonForm />, { wrapper: MemoryRouter });
      
      fireEvent.change(screen.getByLabelText("Nome:"), {
        target: { value: "Draco" },
      });
      
      fireEvent.change(screen.getByLabelText("Tipo:"), {
        target: { value: "Verde" },
      });
    });
    
    it("SHOULD call createDragon and navigate to home on successful submission", async () => {
      (dragonService.createDragon as vi.Mock).mockResolvedValueOnce({
        data: { success: true }
      });
      
      fireEvent.click(screen.getByRole("button", { name: /Criar/i }));
      
      await waitFor(() => {
        expect(dragonService.createDragon).toHaveBeenCalledWith({
          name: "Draco",
          type: "Verde"
        });
        expect(mockNavigate).toHaveBeenCalledWith("/home");
      });
    });

    it("SHOULD display error message if create fails", async () => {
      const errorMessage = "Failed to create dragon";
      (dragonService.createDragon as vi.Mock).mockRejectedValueOnce(errorMessage);
      
      fireEvent.click(screen.getByRole("button", { name: /Criar/i }));
      
      await waitFor(() => {
        expect(screen.getByText(/Erro ao criar dragão/)).toBeInTheDocument();
      });
    });
  });

  describe("WHEN submitting the form in edit mode", () => {
    beforeEach(() => {
      mockParams = { id: "123" };
      mockCurrentDragon = {
        id: "123",
        name: "Smaug",
        type: "Vermelho"
      };
      
      render(<DragonForm />, { wrapper: MemoryRouter });
      
      fireEvent.change(screen.getByLabelText("Nome:"), {
        target: { value: "Smaug The Great" },
      });
      
      fireEvent.change(screen.getByLabelText("Tipo:"), {
        target: { value: "Dourado" },
      });
    });

    it("SHOULD call putDragon and navigate to home on successful submission", async () => {
      (dragonService.putDragon as vi.Mock).mockResolvedValueOnce({
        data: { success: true }
      });
      
      fireEvent.click(screen.getByRole("button", { name: /Salvar/i }));
      
      await waitFor(() => {
        expect(dragonService.putDragon).toHaveBeenCalledWith("123", {
          name: "Smaug The Great",
          type: "Dourado"
        });
        expect(mockNavigate).toHaveBeenCalledWith("/home");
      });
    });

    it("SHOULD display error message if update fails", async () => {
      const errorMessage = "Failed to update dragon";
      (dragonService.putDragon as vi.Mock).mockRejectedValueOnce(errorMessage);
      
      fireEvent.click(screen.getByRole("button", { name: /Salvar/i }));
      
      await waitFor(() => {
        expect(screen.getByText(/Erro ao editar o dragão/)).toBeInTheDocument();
      });
    });
  });

  describe("WHEN validating form inputs", () => {
    beforeEach(() => {
      mockParams = {};
      render(<DragonForm />, { wrapper: MemoryRouter });
    });

    it("SHOULD require name and type fields", () => {
      const nameInput = screen.getByLabelText("Nome:") as HTMLInputElement;
      const typeInput = screen.getByLabelText("Tipo:") as HTMLInputElement;
      
      expect(nameInput).toBeRequired();
      expect(typeInput).toBeRequired();
    });

    it("SHOULD have correct placeholder text", () => {
      expect(screen.getByPlaceholderText("Ex: Smaug")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Ex: Vermelho")).toBeInTheDocument();
    });

    it("SHOULD disable submit button only when both fields are empty", () => {
      const submitButton = screen.getByRole("button", { name: /Criar/i });
      
      expect(submitButton).toBeDisabled();
      
      fireEvent.change(screen.getByLabelText("Nome:"), {
        target: { value: "Draco" },
      });
      
      expect(submitButton).not.toBeDisabled();
      
      fireEvent.change(screen.getByLabelText("Nome:"), {
        target: { value: "" },
      });
      
      fireEvent.change(screen.getByLabelText("Tipo:"), {
        target: { value: "Verde" },
      });
      
      expect(submitButton).not.toBeDisabled();
      
      fireEvent.change(screen.getByLabelText("Nome:"), {
        target: { value: "Draco" },
      });
      
      expect(submitButton).not.toBeDisabled();
    });
  });

  describe("WHEN testing navigation behavior", () => {
    it("SHOULD have a back button that navigates to home", () => {
      mockParams = {};
      
      render(<DragonForm />, { wrapper: MemoryRouter });
      
      expect(screen.getByText("Voltar")).toBeInTheDocument();
    });
  });
});

