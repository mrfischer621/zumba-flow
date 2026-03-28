import { motion } from "framer-motion";
import { Gift, Users, ArrowRight } from "lucide-react";

const BringAFriendSection = () => {
  return (
    <section id="bring-a-friend" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-card rounded-3xl overflow-hidden shadow-card"
        >
          {/* Gradient accent */}
          <div className="h-2 gradient-zumba-party" />

          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Icon */}
              <div className="w-20 h-20 rounded-2xl gradient-zumba flex items-center justify-center flex-shrink-0">
                <Gift className="w-10 h-10 text-primary-foreground" />
              </div>

              {/* Content */}
              <div className="text-center md:text-left flex-1">
                <h2 className="text-3xl md:text-4xl font-black font-display uppercase mb-3">
                  <span className="text-gradient-zumba">Bring a Friend</span>
                </h2>
                <p className="text-muted-foreground text-lg mb-6">
                  Gemeinsam macht's einfach mehr Spass! Bring eine Freundin oder einen Freund mit in die Lektion - entscheidet sich dein Workout Buddy für ein 10er-Abo, erhaltet ihr <span className="text-primary font-bold">beide eine Lektion geschenkt</span>.
                </p>

                {/* Steps */}
                <div className="grid sm:grid-cols-3 gap-4 mb-6">
                  {[
                    { step: "1", text: "Freund:in mitbringen" },
                    { step: "2", text: "10er-Abo abschliessen" },
                    { step: "3", text: "Beide 1 Lektion gratis" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 sm:flex-col sm:text-center">
                       <div className={`w-10 h-10 rounded-full ${i === 1 ? 'gradient-zumba-party' : 'gradient-zumba'} flex items-center justify-center flex-shrink-0`}>
                        <span className="text-primary-foreground font-bold font-display">{item.step}</span>
                      </div>
                      <span className="text-sm text-foreground/80 font-medium">{item.text}</span>
                      {i < 2 && <ArrowRight className="w-4 h-4 text-muted-foreground hidden sm:block" />}
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4 text-primary" />
                  <span>Aktion gilt pro Person und Neukund:in mit 10er-Abo.</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BringAFriendSection;
