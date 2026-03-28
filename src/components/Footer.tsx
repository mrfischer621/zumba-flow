import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-10 px-4 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="font-display font-black text-lg uppercase">
            <span className="text-gradient-zumba">Groupfitness</span>
            <span className="text-foreground ml-1">by Katja</span>
          </span>
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Groupfitness by Katja
          </p>
          <p className="text-muted-foreground text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-primary fill-primary" /> in Flaach
          </p>
        </div>
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <a href="#schedule" className="hover:text-primary transition-colors">Wochenplan</a>
          <a href="#pricing" className="hover:text-primary transition-colors">Preise</a>
          <a href="#bring-a-friend" className="hover:text-primary transition-colors">Bring a Friend</a>
          <a href="#payment" className="hover:text-primary transition-colors">Zahlungsarten</a>
          <a href="#events" className="hover:text-primary transition-colors">Events</a>
          <a href="#contact" className="hover:text-primary transition-colors">Kontakt</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
