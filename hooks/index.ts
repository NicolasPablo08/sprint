import { atomWithStorage } from "jotai/utils";

export interface Medicamento {
  id: string;
  nombre: string;
  time: string;
  obs: string;
  lastTakenDate: string | null;
}
export const medicamentosAtom = atomWithStorage<Medicamento[]>("medicamentos", []);
