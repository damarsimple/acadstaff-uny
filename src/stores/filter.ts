"use client";
import {create} from 'zustand';

interface FilterStore {
    search: string;
    setSearch: (e: string) => void;
    selected: number[]
    setSelected: (e: number[] ) =>void 
}

const useFilterStore = create<FilterStore>((set,get) => ({
    search: "",
    setSearch: (search) => set({search}),
    selected:[],
    setSelected: (selected) => set({selected})
}))

export default useFilterStore;