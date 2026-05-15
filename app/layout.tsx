import "./globals.css";

export const metadata = {
  title: "GEODIMAP",
  description: "Dashboard Territorial",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}