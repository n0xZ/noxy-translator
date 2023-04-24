import './globals.css'

export const metadata = {
  title: 'Bienvenido a Noxy-abli!',
  description: 'No se lo que hay acá la verdad.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
