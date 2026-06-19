import { create } from "zustand";


type Store = {
  section: number
  setSection: (section:number) => void
}
const useSectionStore = create<Store>((set) => ({
  section: 1,
  setSection: (section) => set(() => ({ section })),
}));
export default useSectionStore;
