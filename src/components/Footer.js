import Link from 'next/link'
import { useState } from 'react'

export const Footer = () => {
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [showCookies, setShowCookies] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <footer className="bg-black border-t-4 border-[#8B631A]">
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
          {/* Copywrite */}
          <div className="mb-2 md:mb-0 text-center md:text-left">
            <p className="text-white text-sm">© {new Date().getFullYear()}, Diogo Samuel</p>
          </div>

          {/* Centro: Links úteis */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-4">
              <button onClick={() => setShowCookies(true)} className="text-white/60 text-xs hover:text-white transition">Cookies Preferences</button>
              <button onClick={() => setShowPrivacy(true)} className="text-white/60 text-xs hover:text-white transition">Privacy Policy</button>
            </div>
            <div className="flex gap-2 mt-1">
              <button className="w-6 h-6 opacity-70 hover:opacity-100 transition" title="Português" aria-label="Português">
                {/* Bandeira de Portugal SVG */}
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="32" height="32" rx="4" fill="#006600"/>
                  <rect x="12" width="20" height="32" fill="#FF0000"/>
                  <circle cx="12" cy="16" r="5" fill="#FFD700" stroke="#fff" strokeWidth="1.5"/>
                  <circle cx="12" cy="16" r="2.5" fill="#fff"/>
                </svg>
              </button>
              <button className="w-6 h-6 opacity-70 hover:opacity-100 transition" title="English" aria-label="English">
                {/* Bandeira do Reino Unido SVG simplificada */}
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="32" height="32" rx="4" fill="#00247D"/>
                  <path d="M0 0L32 32M32 0L0 32" stroke="#fff" strokeWidth="4"/>
                  <path d="M0 0L32 32M32 0L0 32" stroke="#CF142B" strokeWidth="2"/>
                  <rect x="13" width="6" height="32" fill="#fff"/>
                  <rect y="13" width="32" height="6" fill="#fff"/>
                  <rect x="14.5" width="3" height="32" fill="#CF142B"/>
                  <rect y="14.5" width="32" height="3" fill="#CF142B"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Redes sociais + Calendário */}
          <div className="flex gap-3">
            {/* Instagram */}
            <Link
              href="https://instagram.com/diogosvmuel"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-black text-white border-2 border-white hover:bg-[#8B631A] hover:text-white hover:border-[#8B631A] transition-all duration-300 shadow-md"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.13.62a1.13 1.13 0 1 1-2.25 0 1.13 1.13 0 0 1 2.25 0z"/></svg>
            </Link>
            {/* YouTube */}
            <Link
              href="https://youtube.com/@diogosvmuel"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-black text-white border-2 border-white hover:bg-[#8B631A] hover:text-white hover:border-[#8B631A] transition-all duration-300 shadow-md"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </Link>
            {/* TikTok */}
            <Link
              href="https://tiktok.com/@diogosvmuel"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-black text-white border-2 border-white hover:bg-[#8B631A] hover:text-white hover:border-[#8B631A] transition-all duration-300 shadow-md"
            >
              <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M34.5 10.5C33.1193 9.11929 32.25 7.2625 32.25 5.25H27.75V32.25C27.75 35.0112 25.5112 37.25 22.75 37.25C19.9888 37.25 17.75 35.0112 17.75 32.25C17.75 29.4888 19.9888 27.25 22.75 27.25V22.75C17.201 22.75 12.75 27.201 12.75 32.75C12.75 38.299 17.201 42.75 22.75 42.75C28.299 42.75 32.75 38.299 32.75 32.75V18.25C34.9492 19.8012 37.6492 20.75 40.5 20.75V16.25C38.1193 16.25 35.8807 15.3807 34.5 13.75V10.5Z" fill="currentColor"/></g></svg>
            </Link>
            {/* X (Twitter) */}
            <Link
              href="https://x.com/diogosvmuel"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-black text-white border-2 border-white hover:bg-[#8B631A] hover:text-white hover:border-[#8B631A] transition-all duration-300 shadow-md"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.53 3.47H20.5L14.62 10.09L21.5 20.5H15.68L11.38 14.5L6.44 20.5H3.47L9.7 13.41L3.09 3.5H9.02L13.01 8.97L17.53 3.47ZM16.48 18.68H18.13L8.6 5.62H6.82L16.48 18.68Z" fill="currentColor"/></svg>
            </Link>
            {/* Calendário (Coming Soon) */}
            <button
              aria-label="Book (Coming Soon)"
              onClick={() => setShowComingSoon(true)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-black text-white border-2 border-white hover:bg-[#8B631A] hover:text-white hover:border-[#8B631A] transition-all duration-300 shadow-md focus:outline-none"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
            </button>
          </div>
        </div>
        {/* Modal/Toast melhorado para Coming Soon */}
        {showComingSoon && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <div className="bg-background-dark p-8 rounded-lg max-w-md w-full text-white relative">
              <button onClick={() => setShowComingSoon(false)} className="absolute top-2 right-2 text-white/60 hover:text-white text-xl">×</button>
              <div className="flex flex-col items-center">
                <svg className="mb-4 w-10 h-10 text-[#8B631A]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                <h2 className="text-lg font-bold mb-4">Booking coming soon</h2>
                <p className="text-sm mb-4 text-white/80">Online bookings are not available yet.<br/>Stay tuned for updates on my social media.</p>
                <button onClick={() => setShowComingSoon(false)} className="mt-2 px-4 py-2 bg-[#8B631A] text-white rounded-none font-bold hover:bg-black transition">Close</button>
              </div>
            </div>
          </div>
        )}
        {/* Cookies Modal */}
        {showCookies && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <div className="bg-background-dark p-8 rounded-lg max-w-md w-full text-white relative">
              <button onClick={() => setShowCookies(false)} className="absolute top-2 right-2 text-white/60 hover:text-white text-xl">×</button>
              <h2 className="text-lg font-bold mb-4">Cookies Preferences</h2>
              <p className="text-sm mb-4">This website uses cookies to ensure you get the best experience. You can manage your preferences here.</p>
              <button onClick={() => setShowCookies(false)} className="mt-2 px-4 py-2 bg-[#8B631A] text-white rounded-none font-bold hover:bg-black transition">Close</button>
            </div>
          </div>
        )}
        {/* Privacy Policy Modal */}
        {showPrivacy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <div className="bg-background-dark p-8 rounded-lg max-w-md w-full text-white relative">
              <button onClick={() => setShowPrivacy(false)} className="absolute top-2 right-2 text-white/60 hover:text-white text-xl">×</button>
              <h2 className="text-lg font-bold mb-4">Privacy Policy</h2>
              <p className="text-sm mb-4">Your privacy is important. This website does not share your data with third parties. For more details, read our full privacy policy.</p>
              <button onClick={() => setShowPrivacy(false)} className="mt-2 px-4 py-2 bg-[#8B631A] text-white rounded-none font-bold hover:bg-black transition">Close</button>
            </div>
          </div>
        )}
      </div>
    </footer>
  )
} 