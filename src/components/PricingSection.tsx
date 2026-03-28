import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Star, Zap, Heart, X, Banknote, Smartphone } from "lucide-react";

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

const paymentMethods = [
  {
    icon: Banknote,
    name: "Bargeld",
    description: "Direkt vor Ort bezahlen",
    gradient: "gradient-zumba-green",
    action: "cash",
  },
  {
    icon: Smartphone,
    name: "TWINT",
    description: "Schnell & einfach per App",
    gradient: "gradient-zumba-green",
    action: "twint",
  },
];

type ModalStep = "payment" | "detail" | "done";

const PricingSection = () => {
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null);
  const [modalStep, setModalStep] = useState<ModalStep>("payment");
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const handleBook = (plan: typeof plans[0]) => {
    setSelectedPlan(plan);
    setModalStep("payment");
    setSelectedPayment(null);
  };

  const handleSelectPayment = (action: string) => {
    setSelectedPayment(action);
    if (action === "cash") {
      setModalStep("done");
    } else {
      setModalStep("detail");
    }
  };

  const handlePaymentDone = () => {
    setModalStep("done");
  };

  const handleClose = () => {
    setSelectedPlan(null);
    setModalStep("payment");
    setSelectedPayment(null);
  };

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
            <span className="text-gradient-zumba">Preise & Abos</span>
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

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full gradient-zumba flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-primary-foreground" />
                      </div>
                      <span className="text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleBook(plan)}
                  className={`w-full py-4 rounded-full font-display font-bold text-lg transition-all duration-200 ${
                    plan.popular
                      ? "gradient-zumba-party text-primary-foreground shadow-glow hover:scale-105"
                      : "gradient-zumba text-primary-foreground hover:scale-105 transition-transform shadow-glow"
                  }`}
                >
                  Jetzt buchen
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {selectedPlan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card rounded-2xl shadow-xl max-w-md w-full max-h-[80vh] flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="gradient-zumba-party p-5 flex items-center justify-between flex-shrink-0">
                <div>
                  <h3 className="text-primary-foreground font-display font-bold text-xl">
                    {modalStep === "payment" && "Bezahlmethode wählen"}
                    {modalStep === "detail" && "TWINT Zahlung"}
                    {modalStep === "done" && "Buchung bestätigt"}
                  </h3>
                  <p className="text-primary-foreground/80 text-sm">
                    {selectedPlan.name} – CHF {selectedPlan.price}
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
                <AnimatePresence mode="wait">
                  {/* Step: Choose payment method */}
                  {modalStep === "payment" && (
                    <motion.div
                      key="payment"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="p-5"
                    >
                      <p className="text-sm text-muted-foreground mb-4">
                        Wie möchtest du bezahlen?
                      </p>
                      <div className="space-y-3">
                        {paymentMethods.map((method) => (
                          <button
                            key={method.name}
                            onClick={() => handleSelectPayment(method.action)}
                            className="w-full flex items-center gap-4 p-4 rounded-xl bg-muted/50 border-2 border-transparent hover:bg-muted hover:border-primary/20 transition-all duration-200 text-left"
                          >
                            <div className={`w-12 h-12 rounded-xl ${method.gradient} flex items-center justify-center flex-shrink-0`}>
                              <method.icon className="w-6 h-6 text-primary-foreground" />
                            </div>
                            <div>
                              <p className="font-display font-bold text-foreground">{method.name}</p>
                              <p className="text-sm text-muted-foreground">{method.description}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Step: Payment detail (TWINT) */}
                  {modalStep === "detail" && (
                    <motion.div
                      key="detail"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex flex-col flex-1 min-h-0"
                    >
                      <div className="p-6 text-center flex-1 overflow-y-auto">
                        <div className="w-14 h-14 rounded-2xl gradient-zumba-green flex items-center justify-center mx-auto mb-4">
                          <Smartphone className="w-7 h-7 text-primary-foreground" />
                        </div>

                        <div className="text-center">
                          <p className="text-muted-foreground mb-4">Sende den Betrag an:</p>
                          <p className="text-3xl font-bold text-primary">079 325 85 88</p>
                          <p className="text-muted-foreground text-xs mt-4">Welchen Betrag senden? Siehe Preise &amp; Abos</p>
                        </div>
                      </div>

                      <div className="px-5 py-4 border-t border-border flex-shrink-0 bg-card">
                        <button
                          onClick={handlePaymentDone}
                          className="w-full py-3 rounded-full font-display font-bold text-sm gradient-zumba-party text-primary-foreground hover:scale-[1.02] transition-transform shadow-glow"
                        >
                          Zahlung erledigt
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step: Done */}
                  {modalStep === "done" && (
                    <motion.div
                      key="done"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-5 text-center py-8"
                    >
                      <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                        <Check className="w-8 h-8 text-secondary-foreground" />
                      </div>
                      <h4 className="font-display font-bold text-lg text-foreground">
                        Buchung bestätigt!
                      </h4>
                      <p className="text-muted-foreground text-sm mt-1 mb-2">
                        {selectedPlan.name} – CHF {selectedPlan.price}
                      </p>
                      <p className="text-muted-foreground text-xs mb-6">
                        {selectedPayment === "cash" && "Bitte vor Ort bar bezahlen."}
                        {selectedPayment === "twint" && "Vielen Dank für deine TWINT-Zahlung."}
                      </p>
                      <button
                        onClick={handleClose}
                        className="gradient-zumba-party text-primary-foreground px-8 py-3 rounded-full font-display font-bold text-sm hover:scale-[1.02] transition-transform shadow-glow"
                      >
                        Schliessen
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PricingSection;
