import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="bg-gray-900 text-white py-16 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold grid place-items-center">L</span>
            <span className="text-2xl font-bold tracking-tight">Loading Happiness</span>
          </div>
          <p className="text-gray-400 mb-8 max-w-sm leading-relaxed">
            Technology with a human heart. Reliable IT, clear security, and calm support for teams that value stability.
          </p>
          <div className="space-y-3 text-sm text-gray-400">
            <p>hello@loadinghappiness.com</p>
            <p>+1 (555) 123-4567</p>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-6">Explore</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
            <li><Link href="/news" className="hover:text-white transition-colors">News</Link></li>
            <li><Link href="/impact" className="hover:text-white transition-colors">Impact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-6">Company</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-gray-800 text-center text-xs text-gray-500 tracking-widest uppercase">
        &copy; {new Date().getFullYear()} Loading Happiness. Engineered for Stability.
      </div>
    </footer>
  );
}
