import './globals.css'

export const metadata = {
  title: 'DriveSuite — Instructor Toolkit',
  description: 'The complete business toolkit for driving instructors',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
