import { motion } from "framer-motion";
import { Check, Star, Zap, Heart } from "lucide-react";

const plans = [
  {
    name: "Probelektion",
    price: "10",
    period: "",
    description: "Perfekt zum Ausprobieren",
    icon: Star,
    features: ["Keine Vorkenntnisse nötig"],
    gradient: "gradient-zumba",
    popular: false,
  },
  {
    name: "10er-Abo",
    price: "185",
    period: "",
    description: "Das volle Programm",
    icon: Heart,
    features: [
      "10 Lektionen nach Wahl",
    ],
    gradient: "gradient-zumba-green",
    popular: true,
  },
  {
    name: "Einzellektion",
    price: "21",
    period: "",
    description: "Für maximale Flexibilität",
    icon: Zap,
    features: ["Ohne Verpflichtungen"],
    gradient: "gradient-zumba-party",
    popular: false,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 px-4 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 id="pricing-title" className="text-4xl md:text-5xl font-black font-display uppercase mb-4">
            <span className="text-gradient-zumba">Preise & Abos in Flaach</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Wähle das passende Angebot für dich
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className={`relative bg-card rounded-3xl overflow-hidden shadow-card hover:shadow-glow transition-all duration-300 ${
                plan.popular ? "ring-2 ring-primary scale-105 md:scale-110" : ""
              }`}
            >
              <div className="p-8">
                <div className={`w-14 h-14 rounded-2xl ${plan.gradient} flex items-center justify-center mb-4`}>
                  <plan.icon className="w-7 h-7 text-primary-foreground" />
                </div>

                <h3 className="text-2xl font-bold font-display mb-1">{plan.name}</h3>
                <p className="text-muted-foreground mb-6">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-5xl font-black font-display">CHF {plan.price}</span>
                  <span className="text-muted-foreground ml-1">{plan.period}</span>
                </div>

                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full gradient-zumba flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-primary-foreground" />
                      </div>
                      <span className="text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
