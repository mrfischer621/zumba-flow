import { motion } from "framer-motion";
import heroImage from "@/assets/dance-class-hero.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[60vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Gruppenfitness Klasse mit vibranten Farben und energischer Atmosphäre"
          className="w-full h-full object-cover object-[center_20%] sm:object-[center_30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/50 via-foreground/30 to-background/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 sm:px-8 max-w-4xl mx-auto pt-16 sm:pt-0 pb-12 sm:pb-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-display uppercase tracking-tight text-primary-foreground mb-4">
            <span className="text-gradient-zumba">Gruppenfitness</span>
            <br />
            <span className="text-primary-foreground/90">mit Energie</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-primary-foreground/80 font-body max-w-3xl mx-auto mb-8">
            Deine wöchentliche Zumba-Stunde in Flaach, mit Musik, Bewegung und guter Laune.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#schedule"
            className="gradient-zumba px-8 py-4 rounded-full font-display font-bold text-lg text-primary-foreground shadow-glow hover:scale-105 transition-transform"
          >
            Klassen ansehen
          </a>
          <a
            href="#pricing"
            className="bg-card/20 backdrop-blur-sm border border-primary-foreground/30 px-8 py-4 rounded-full font-display font-bold text-lg text-primary-foreground hover:bg-card/30 transition-colors"
          >
            Preise & Abos
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
