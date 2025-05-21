import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-background-dark-lighter">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-foreground text-sm">
              © {new Date().getFullYear()} Diogo Samuel. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-6">
            <Link
              href="https://instagram.com/diogosamuel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-accent transition-colors"
            >
              Instagram
            </Link>
            <Link
              href="https://youtube.com/@diogosamuel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-accent transition-colors"
            >
              YouTube
            </Link>
            <Link
              href="https://calendly.com/diogosamuel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-accent transition-colors"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
} 