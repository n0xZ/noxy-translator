
import './globals.css'

export const metadata = {
	title: 'Bienvenido a Noxy-abli!',
	description: 'Traduce lo que quieras a cualquier idioma posible.',
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
