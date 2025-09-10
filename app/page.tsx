// File: app/page.tsx
const [luckyData, setLuckyData] = useState<LuckySheetData[] | null>(null);
const [fileName, setFileName] = useState<string>("");
const inputRef = useRef<HTMLInputElement>(null);


const onFile = async (file: File) => {
const buf = await file.arrayBuffer();
const { data, workbook } = await xlsxToLucky(buf);
setLuckyData(data);
setFileName(file.name);
(window as any)._sheetjs_workbook_cache = workbook; // optional debug
};


const onExport = async () => {
if (!luckyData) return;
await luckyToXlsx(luckyData, fileName || "export.xlsx");
};


return (
<main className="mx-auto max-w-7xl p-6">
<div className="mb-4 flex flex-wrap items-center gap-3">
<input
ref={inputRef}
type="file"
accept=".xlsx,.xlsm,.xlsb,.xls"
onChange={(e) => {
const f = e.target.files?.[0];
if (f) onFile(f);
}}
/>
<button
className="rounded-2xl bg-black px-4 py-2 text-white shadow"
onClick={() => inputRef.current?.click()}
>
Upload Excel
</button>
<button
className="rounded-2xl bg-gray-900/80 px-4 py-2 text-white disabled:opacity-40"
disabled={!luckyData}
onClick={onExport}
>
Export to .xlsx
</button>
{fileName && (
<span className="text-sm text-gray-600">Loaded: {fileName}</span>
)}
</div>


{!luckyData ? (
<div className="grid place-items-center rounded-2xl border border-dashed p-12 text-center">
<div>
<h1 className="mb-2 text-2xl font-semibold">Excel‑style React App</h1>
<p className="text-gray-600">
Upload your workbook (.xlsx). We’ll render it with an Excel‑like grid (formulas, formats, multi‑sheet).
</p>
</div>
</div>
) : (
<LuckySheet data={luckyData} />
)}
</main>
);
}
