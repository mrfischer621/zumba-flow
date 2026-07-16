import { motion } from "framer-motion";
import { PartyPopper, MapPin, Calendar, ExternalLink } from "lucide-react";

const events: EventItem[] = [];

const typeBadge = {
  special: { label: "Special", className: "gradient-zumba text-primary-foreground" },
  external: { label: "Extern", className: "gradient-zumba-green text-primary-foreground" },
};

const EventsSection = () => {
  return (
    <section id="events" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black font-display uppercase mb-4">
            <span className="text-gradient-zumba">Events & Specials</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Besondere Stunden & externe Zumba® Events
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {events.map((event, index) => {
            const badge = typeBadge[event.type];
            return (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-glow transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <PartyPopper className="w-5 h-5 text-primary" />
                      <span
                        className={`text-xs font-bold font-display uppercase px-3 py-1 rounded-full ${badge.className}`}
                      >
                        {badge.label}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold font-display mb-2">{event.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{event.description}</p>

                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>
                        {event.date}, {event.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-secondary" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  {event.link ? (
                    <a
                      href={event.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 gradient-zumba-green px-5 py-2 rounded-full text-primary-foreground font-display font-bold text-sm hover:scale-105 transition-transform"
                    >
                      Tickets & Infos <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : (
                    <span className="mt-4 inline-block gradient-zumba px-5 py-2 rounded-full text-primary-foreground font-display font-bold text-sm opacity-75">
                      Bald verfügbar
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
