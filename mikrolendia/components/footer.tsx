import Link from 'next/link'
import { motion } from 'framer-motion'

const footerLinks = [
  { href: '/about', label: 'About' },
  { href: '/terms', label: 'Terms' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/contact', label: 'Contact' },
]

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-xl font-bold hover:text-primary transition-colors">
              MikroLendia
            </Link>
          </div>
          <nav className="flex flex-wrap justify-center md:justify-end space-x-4">
            {footerLinks.map((link) => (
              <motion.div
                key={link.href}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href={link.href} 
                  className="text-sm hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>
        </div>
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} MikroLendia. All rights reserved.</p>
          <p className="mt-2">Empowering individuals through blockchain-based micro-lending.</p>
        </div>
      </div>
    </footer>
  )
}

