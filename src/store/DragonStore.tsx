import { create } from 'zustand';
import { IDragon } from '../models/Dragon';
import { getDragon, getDragonById } from '../services/dragonService';


interface DragonState {
  dragons: IDragon[];
  currentDragon: IDragon | null;
  setDragons: (dragons: IDragon[]) => void;
  setCurrentDragon: (dragon: IDragon | null) => void;
  fetchDragons: () => Promise<void>;
  fetchDragonById: (id: string) => Promise<void>;
}

export const useDragonStore = create<DragonState>((set) => ({
    dragons: [],
    currentDragon: null,
    setDragons: (dragons) => set({ dragons }),
    setCurrentDragon: (dragon) => set({ currentDragon: dragon }),
    fetchDragons: async () => {
        try {
        const res = await getDragon();
        set({ dragons: res.data });
        } catch (err) {
        console.error('Erro ao buscar dragões', err);
        }
    },
    fetchDragonById: async (id: string) => {
        try {
        const res = await getDragonById(id);
        set({ currentDragon: res.data });
        } catch (err) {
        console.error('Erro ao buscar dragão por id', err);
        }
    },
}));