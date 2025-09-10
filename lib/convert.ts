// File: lib/convert.ts
const addr = XLSX.utils.encode_cell({ r, c });
const cell = ws[addr] as XLSX.CellObject | undefined;
if (!cell) continue;
if (!data[r]) data[r] = {};


const lc: LuckyCell = {};
// Value / display
if (cell.f) {
lc.f = cell.f; // formula
}
if (cell.v !== undefined) {
// store raw & display
lc.v = cell.v as any;
lc.m = cell.w || String(cell.v);
}
// Basic type mapping for numbers/dates
if (cell.t === "n" && cell.z && String(cell.z).includes("yy")) {
lc.ct = { fa: cell.z as string, t: "d" } as any;
} else if (cell.t === "n") {
lc.ct = { t: "n" } as any;
} else if (cell.t === "s" || cell.t === "str") {
lc.ct = { t: "s" } as any;
} else if (cell.t === "b") {
lc.ct = { t: "b" } as any;
}
data[r][c] = lc;
}
}


return {
name,
index: idx,
row: rowCount,
column: colCount,
celldata: Object.entries(data).flatMap(([r, cols]) =>
Object.entries(cols as Record<string, LuckyCell>).map(([c, lc]) => ({
r: Number(r),
c: Number(c),
v: lc,
}))
),
config: {},
order: idx,
columnlen: {},
rowlen: {},
} as LuckySheetData;
});
return { data: sheets, workbook: wb };
}


// Convert Luckysheet JSON back to .xlsx and download
export async function luckyToXlsx(sheets: LuckySheetData[], fileName: string) {
const wb = XLSX.utils.book_new();
for (const s of sheets) {
const ws: XLSX.WorkSheet = {};
let maxR = 0;
let maxC = 0;
for (const cell of s.celldata) {
const { r, c, v } = cell as any;
if (!v) continue;
const addr = XLSX.utils.encode_cell({ r, c });
const o: any = {};
if (v.f) o.f = v.f;
if (v.v !== undefined) o.v = v.v;
if (v.m) o.w = v.m;
ws[addr] = o;
if (r > maxR) maxR = r;
if (c > maxC) maxC = c;
}
ws["!ref"] = XLSX.utils.encode_range({ s: { r: 0, c: 0 }, e: { r: maxR, c: maxC } });
XLSX.utils.book_append_sheet(wb, ws, s.name?.slice(0, 31) || "Sheet");
}
XLSX.writeFile(wb, fileName.endsWith(".xlsx") ? fileName : `${fileName}.xlsx`);
}
