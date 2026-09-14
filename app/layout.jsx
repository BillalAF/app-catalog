import "./globals.css";

export const metadata = {
  title: "Application Catalog",
  description: "Internal catalog of applications",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
