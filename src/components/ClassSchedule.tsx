import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users, Backpack } from "lucide-react";
import EnrollmentModal from "./EnrollmentModal";

const classes = [
  {
    day: "Donnerstag",
    time: "19:00 - 19:55",
    type: "Zumba®",
    location: "Turnhalle Primarschulhaus, 8416 Flaach",
    spotsLeft: 12,
    totalSpots: 20,
    color: "primary",
  },
];

const colorMap: Record<string, string> = {
  primary: "gradient-zumba",
  secondary: "gradient-zumba-green",
  accent: "gradient-zumba",
  energy: "gradient-zumba-party",
};

const ClassSchedule = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="schedule" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black font-display uppercase mb-4">
            <span className="text-gradient-zumba">Wochenplan</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Melde dich einfach via WhatsApp an, direkt über den Button beim Kurs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-1 gap-6 max-w-2xl mx-auto">
          {classes.map((cls, index) => (
            <motion.div
              key={cls.day}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-glow transition-all duration-300"
            >
              {/* Color accent bar */}
              <div className={`h-2 ${colorMap[cls.color]}`} />

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold font-display">{cls.type}</h3>
                    <p className="text-primary font-semibold text-lg">Jeden {cls.day}</p>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="gradient-zumba-party px-5 py-2 rounded-full text-primary-foreground font-display font-bold text-sm hover:scale-105 transition-transform shadow-glow"
                  >
                    Probelektion buchen
                  </button>
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  Zumba® ist ein lateinamerikanisch inspiriertes Tanz-Fitness-Workout, das einfache Choreografien mit mitreissender Musik verbindet. Perfekt für alle, die Spass an Bewegung haben. Keine Vorkenntnisse nötig!
                </p>

                <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{cls.day}, {cls.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-secondary" />
                    <span>{cls.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                  <Backpack className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>Bitte mitbringen: Turnschuhe, Handtuch & Trinkflasche</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <EnrollmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default ClassSchedule;
