export function Footer() {
  return (
    <footer className="border-t border-white/6 px-6 py-10 text-center text-xs text-lurra-muted md:px-10">
      <p className="lurra-display text-lg text-lurra-cream">Lurra Projects</p>
      <p className="mt-2">Premium landscape design & construction · Mentone & Bayside Melbourne</p>
      <p className="mt-4">
        <a href="tel:0400810107" className="hover:text-lurra-gold">0400 810 107</a>
        {" · "}
        <a href="mailto:Lachie@lurraprojects.com.au" className="hover:text-lurra-gold">
          Lachie@lurraprojects.com.au
        </a>
      </p>
      <p className="mt-6 opacity-60">© {new Date().getFullYear()} Lurra Projects. All rights reserved.</p>
    </footer>
  );
}