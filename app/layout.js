import { Inter, Poppins, Playfair_Display } from 'next/font/google'
import './globals.css'
import dynamic from 'next/dynamic'
import SpaceBackground from '../components/SpaceBackground'
const SmoothScroll = dynamic(() => import('../components/SmoothScroll'), { ssr: false })

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const poppins = Poppins({ subsets: ['latin'], weight: ['400','600'], variable: '--font-poppins' })
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['700'], variable: '--font-playfair' })

export const metadata = {
  title: 'Saad Ifli — Developer Portfolio',
  description: 'Premium, modern developer portfolio of Saad Ifli. React | Next.js | TypeScript | Node.js',
  openGraph: {
    title: 'Saad Ifli — Developer Portfolio',
    description: 'React, Next.js, TypeScript, Node.js, UI engineering and performance.',
    url: 'https://localhost:3000',
    type: 'website'
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${poppins.variable} ${playfair.variable}`}>
        <SpaceBackground />
        <SmoothScroll />
        {children}
      </body>
    </html>
  )
}