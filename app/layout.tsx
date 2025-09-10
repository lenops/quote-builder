// File: app/layout.tsx
export const metadata = {
title: "Excel‑Style Quote App",
description: "Upload an Excel and work with it in the browser (Excel‑like UI)",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="en">
<body className="min-h-screen bg-gray-50 text-gray-900">{children}</body>
</html>
);
}
