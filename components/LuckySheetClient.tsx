// File: components/LuckySheetClient.tsx
"use client";
import { useEffect, useRef } from "react";
import "luckysheet/dist/plugins/css/plugins.css";
import "luckysheet/dist/plugins/plugins.css";
import "luckysheet/dist/css/luckysheet.css";
import "luckysheet/dist/assets/iconfont/iconfont.css";
import luckysheet from "luckysheet";
import type { LuckySheetData } from "../types";


export default function LuckySheet({ data }: { data: LuckySheetData[] }) {
const containerRef = useRef<HTMLDivElement>(null);


useEffect(() => {
if (!containerRef.current) return;


// Clear any previous instance
containerRef.current.innerHTML = "";
const id = "luckysheet-container";
const div = document.createElement("div");
div.id = id;
div.style.width = "100%";
div.style.height = "80vh";
containerRef.current.appendChild(div);


luckysheet.create({
container: id,
lang: "en",
showinfobar: false,
showsheetbarConfig: {
add: true,
menu: true,
sheet: true
},
data,
forceCalculation: true,
cellRightClickConfig: true,
sheetRightClickConfig: true
});


return () => {
// Luckysheet doesn't provide a formal destroy; cleaning DOM is sufficient in SPA context
containerRef.current && (containerRef.current.innerHTML = "");
};
}, [data]);


return <div ref={containerRef} className="rounded-2xl border bg-white shadow" />;
}
