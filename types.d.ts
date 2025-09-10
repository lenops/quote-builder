// File: types.d.ts
export interface LuckyCell {
v?: string | number | boolean;
m?: string; // display text
f?: string; // formula
ct?: any; // cell type (number/date)
}


export interface LuckySheetData {
name?: string;
index?: number;
order?: number;
row?: number;
column?: number;
celldata: Array<{ r: number; c: number; v: LuckyCell }>;
config?: any;
rowlen?: Record<string, number>;
columnlen?: Record<string, number>;
}
