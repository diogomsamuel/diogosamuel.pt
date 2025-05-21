import Image from 'next/image'
import Link from 'next/link'

export const SocialSection = () => {
  // Primeira imagem é a grande, as outras 6 são menores
  const images = [
    '/images/insta1.jpg', // imagem grande
    '/images/insta2.jpg',
    '/images/insta3.jpg',
    '/images/insta4.jpg',
    '/images/insta5.jpg',
    '/images/insta6.jpg',
    '/images/insta7.jpg',
  ];

  return (
    <section id="social" className="py-8 bg-white text-black">
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-6 md:gap-0 items-center text-center">
          <div className="md:w-2/3 w-full text-center md:text-left flex flex-col items-center md:items-start">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 uppercase">JOIN THE BROTHERHOOD</h2>
            <p className="text-base md:text-lg text-gray-700 max-w-xl">
              Follow me on Instagram <span className="font-semibold">@diogosamuel</span> for style inspiration, behind-the-scenes, e conteúdo exclusivo.
            </p>
          </div>
          <div className="md:w-1/3 w-full flex md:justify-end justify-center">
            <Link href="https://instagram.com/diogosamuel" target="_blank" rel="noopener noreferrer">
              <button className="border-2 border-black px-8 py-3 text-base font-bold rounded-none hover:bg-black hover:text-white transition-colors">
                Follow me on Instagram
              </button>
            </Link>
          </div>
        </div>
        {/* Flex layout: imagem grande + grid de pequenas */}
        <div className="flex flex-col md:flex-row gap-5 w-full items-stretch min-h-0 justify-center">
          {/* Imagem grande à esquerda */}
          <div className="w-full md:w-2/5 flex-shrink-0 flex flex-col">
            <div className="h-full w-full bg-gray-200 overflow-hidden rounded-none flex-1">
              <Image src={images[0]} alt="Instagram post 1" fill className="object-cover w-full h-full" />
            </div>
          </div>
          {/* Grid das 6 imagens pequenas à direita */}
          <div className="w-full md:w-3/5 grid grid-cols-3 grid-rows-2 gap-5 h-full">
            {images.slice(1).map((src, idx) => (
              <div key={idx} className="aspect-square bg-gray-200 overflow-hidden rounded-none w-full h-full">
                <Image src={src} alt={`Instagram post ${idx+2}`} fill className="object-cover w-full h-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}; 