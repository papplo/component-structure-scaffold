// src/types/dataModels.ts

export interface DataEntry {
  deliveryDate: number;
  mtu: number;
  foo: number;
  bar: number;
  baz: number;
}

export interface DataCategory {
  id: string;
  name: string;
  entries: DataEntry[]; // Changed from Record<string, DataEntry> to array
}

export interface AppState {
  flows: Record<string, number>;
  nets: Record<string, number>;
  categories: Record<string, DataCategory>;
}