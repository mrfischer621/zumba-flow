import { useState } from "react";
import { motion } from "framer-motion";
import { Banknote, Smartphone, X } from "lucide-react";


const methods = [
  {
    icon: Banknote,
    name: "Bargeld",
    description: "Direkt vor Ort bezahlen",
    gradient: "gradient-zumba-green",
    action: null,
  },
  {
    icon: Smartphone,
    name: "TWINT",
    description: "Schnell & einfach per App",
    gradient: "gradient-zumba-green",
    action: "twint",
  },
];

const PaymentMethods = () => {
  const [showQr, setShowQr] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  return (
    <section id="payment" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black font-display uppercase mb-4">
            <span className="text-gradient-zumba">Zahlungsarten</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Bezahle so, wie es für dich am besten passt
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {methods.map((method, index) => (
            <motion.div
              key={method.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => {
                if (method.action === "twint") {
                  setSelectedMethod(method.action);
                  setShowQr(true);
                }
              }}
              className={`bg-card rounded-2xl p-8 text-center shadow-card hover:shadow-glow transition-all duration-300 group ${method.action ? "cursor-pointer" : ""}`}
            >
              <div className={`w-16 h-16 rounded-2xl ${method.gradient} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                <method.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold font-display mb-2">{method.name}</h3>
              <p className="text-muted-foreground">{method.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Payment Method QR Code Modal */}
      {showQr && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-sm" onClick={() => setShowQr(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-3xl p-8 max-w-sm mx-4 text-center shadow-glow relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setShowQr(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
              <X className="w-5 h-5" />
            </button>
            <div className="w-14 h-14 rounded-2xl gradient-zumba-green flex items-center justify-center mx-auto mb-4">
              <Smartphone className="w-7 h-7 text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-bold font-display mb-2">
              TWINT Zahlung
            </h3>
            <div className="text-center">
              <p className="text-muted-foreground mb-4">Sende den Betrag an:</p>
              <p className="text-3xl font-bold text-primary">079 325 85 88</p>
              <p className="text-muted-foreground text-xs mt-4">Welchen Betrag senden? Siehe <a href="#pricing" onClick={() => setShowQr(false)} className="text-primary underline hover:text-primary/80">Preise &amp; Abos</a></p>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default PaymentMethods;
