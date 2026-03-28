import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Check, Download, Banknote, Smartphone, ChevronLeft } from "lucide-react";
import { format, addDays, isThursday, isWithinInterval, parseISO } from "date-fns";
import { de } from "date-fns/locale";

// School holidays Schulgemeinde Flaach (Turnhalle closed)
const schoolHolidays: { start: string; end: string }[] = [
  { start: "2025-12-22", end: "2026-01-03" },
  { start: "2026-02-02", end: "2026-02-14" },
  { start: "2026-04-20", end: "2026-05-02" },
  { start: "2026-07-13", end: "2026-08-15" },
  { start: "2026-10-05", end: "2026-10-17" },
  { start: "2026-12-21", end: "2027-01-02" },
  { start: "2027-02-08", end: "2027-02-20" },
  { start: "2027-04-19", end: "2027-05-01" },
  { start: "2027-07-12", end: "2027-08-14" },
];

const publicHolidays: string[] = [
  "2026-01-01", "2026-04-02", "2026-05-14", "2026-12-25",
  "2027-01-01", "2027-03-25", "2027-05-06",
];

function isInSchoolHoliday(date: Date): boolean {
  return schoolHolidays.some(({ start, end }) =>
    isWithinInterval(date, { start: parseISO(start), end: parseISO(end) })
  );
}

function isPublicHoliday(date: Date): boolean {
  return publicHolidays.includes(format(date, "yyyy-MM-dd"));
}

function getAvailableThursdays(): Date[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let current = new Date(today);
  while (!isThursday(current)) current = addDays(current, 1);

  const thursdays: Date[] = [];
  for (let i = 0; i < 52; i++) {
    const thursday = addDays(current, i * 7);
    if (!isInSchoolHoliday(thursday) && !isPublicHoliday(thursday)) {
      thursdays.push(thursday);
    }
  }
  return thursdays;
}

function generateICS(dates: Date[]): string {
  const formatICSDate = (d: Date, hours: number, minutes: number) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}${m}${day}T${String(hours).padStart(2, "0")}${String(minutes).padStart(2, "0")}00`;
  };

  const events = dates.map((date) => {
    const uid = `zumba-${format(date, "yyyyMMdd")}@zumba-flaach`;
    return [
      "BEGIN:VEVENT",
      `DTSTART:${formatICSDate(date, 19, 0)}`,
      `DTEND:${formatICSDate(date, 19, 55)}`,
      `SUMMARY:Zumba® Kurs`,
       `LOCATION:Turnhalle Primarschulhaus\\, Schulhausstrasse 5b\\, 8416 Flaach`,
       `X-APPLE-STRUCTURED-LOCATION;VALUE=URI;X-ADDRESS=Schulhausstrasse 5b\\, 8416 Flaach;X-APPLE-RADIUS=70;X-TITLE=Turnhalle Primarschulhaus:geo:47.5697,8.5986`,
      `DESCRIPTION:Zumba® Kurs mit Katja. Bitte mitbringen: Turnschuhe\\, Handtuch & Trinkflasche`,
      `UID:${uid}`,
      "END:VEVENT",
    ].join("\r\n");
  });

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Zumba Flaach//DE",
    "CALSCALE:GREGORIAN",
    ...events,
    "END:VCALENDAR",
  ].join("\r\n");
}

function downloadICS(dates: Date[]) {
  const ics = generateICS(dates);
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = dates.length === 1 ? "zumba-termin.ics" : "zumba-termine.ics";
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
}

type Step = "dates" | "payment" | "twint" | "done";

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

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EnrollmentModal = ({ isOpen, onClose }: EnrollmentModalProps) => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [step, setStep] = useState<Step>("dates");
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const availableThursdays = useMemo(() => getAvailableThursdays(), []);

  const toggleDate = (date: Date) => {
    setSelectedDates((prev) => {
      const exists = prev.some((d) => d.getTime() === date.getTime());
      return exists ? prev.filter((d) => d.getTime() !== date.getTime()) : [...prev, date];
    });
  };

  const selectAll = () => {
    setSelectedDates(
      selectedDates.length === availableThursdays.length ? [] : [...availableThursdays]
    );
  };

  const handleConfirmDates = () => {
    if (selectedDates.length > 0) {
      setStep("payment");
    }
  };

  const handleSelectPayment = (action: string) => {
    setSelectedPayment(action);
    if (action === "twint") {
      setStep("twint");
    } else {
      setStep("done");
    }
  };

  const handleCalendarExport = () => {
    if (selectedDates.length > 0) {
      const sorted = [...selectedDates].sort((a, b) => a.getTime() - b.getTime());
      downloadICS(sorted);
    }
  };

  const handleClose = () => {
    setSelectedDates([]);
    setStep("dates");
    setSelectedPayment(null);
    onClose();
  };

  const stepTitle = step === "dates"
    ? "Zumba® Anmeldung"
    : step === "payment"
      ? "Bezahlmethode wählen"
      : step === "twint"
        ? "TWINT Zahlung"
        : "Anmeldung abgeschlossen";

  const stepSubtitle = step === "dates"
    ? "Donnerstag, 19:00 – 19:55"
    : step === "payment"
      ? `${selectedDates.length} Termin${selectedDates.length > 1 ? "e" : ""} gewählt`
      : undefined;

  return (
    <AnimatePresence>
      {isOpen && (
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
              <div className="flex items-center gap-3">
                {(step === "payment" || step === "twint") && (
                  <button
                    onClick={() => setStep(step === "twint" ? "payment" : "dates")}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}
                <div>
                  <h3 className="text-primary-foreground font-display font-bold text-xl">
                    {stepTitle}
                  </h3>
                  {stepSubtitle && (
                    <p className="text-primary-foreground/80 text-sm">{stepSubtitle}</p>
                  )}
                </div>
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

                {/* STEP: TWINT Detail */}
                {step === "twint" && (
                  <motion.div
                    key="twint"
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
                        <p className="text-muted-foreground text-xs mt-4">Welchen Betrag senden? Siehe <a href="#pricing" onClick={(e) => { e.preventDefault(); handleClose(); document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-primary underline hover:text-primary/80">Preise &amp; Abos</a></p>
                      </div>
                    </div>
                    <div className="px-5 py-4 border-t border-border flex-shrink-0 bg-card">
                      <button
                        onClick={() => setStep("done")}
                        className="w-full py-3 rounded-full font-display font-bold text-sm gradient-zumba-party text-primary-foreground hover:scale-[1.02] transition-transform shadow-glow"
                      >
                        Zahlung erledigt
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP: Done */}
                {step === "done" && (
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
                      {selectedDates.length === 1
                        ? "Anmeldung bestätigt!"
                        : `${selectedDates.length} Termine bestätigt!`}
                    </h4>
                    <p className="text-muted-foreground text-sm mt-1 mb-6">
                      {selectedDates
                        .sort((a, b) => a.getTime() - b.getTime())
                        .slice(0, 3)
                        .map((d) => format(d, "d. MMM", { locale: de }))
                        .join(", ")}
                      {selectedDates.length > 3 && ` + ${selectedDates.length - 3} weitere`}
                    </p>
                    <button
                      onClick={handleCalendarExport}
                      className="inline-flex items-center gap-2 gradient-zumba-party text-primary-foreground px-6 py-3 rounded-full font-display font-bold text-sm hover:scale-[1.02] transition-transform shadow-glow"
                    >
                      <Download className="w-4 h-4" />
                      In Kalender übertragen
                    </button>
                    <button
                      onClick={handleClose}
                      className="block mx-auto mt-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Schliessen
                    </button>
                  </motion.div>
                )}

                {/* STEP: Payment method selection */}
                {step === "payment" && (
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

                {/* STEP: Date selection */}
                {step === "dates" && (
                  <motion.div
                    key="dates"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col flex-1 min-h-0"
                  >
                    <div className="flex items-center justify-between px-5 pt-5 pb-2 flex-shrink-0">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Wähle einen oder mehrere Donnerstage:
                        </p>
                        <p className="text-xs text-muted-foreground/70 mt-1">
                          Flaacher Schulferien und Feiertage ausgenommen
                        </p>
                      </div>
                      <button
                        onClick={selectAll}
                        className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                      >
                        {selectedDates.length === availableThursdays.length ? "Keine" : "Alle"}
                      </button>
                    </div>
                    <div className="space-y-2 overflow-y-auto px-5 pb-2 flex-1 min-h-0">
                      {availableThursdays.map((date) => {
                        const isSelected = selectedDates.some(
                          (d) => d.getTime() === date.getTime()
                        );
                        return (
                          <button
                            key={date.toISOString()}
                            onClick={() => toggleDate(date)}
                            className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200 ${
                              isSelected
                                ? "bg-primary/10 border-2 border-primary shadow-sm"
                                : "bg-muted/50 border-2 border-transparent hover:bg-muted"
                            }`}
                          >
                            <div
                              className={`w-5 h-5 rounded flex-shrink-0 flex items-center justify-center border-2 transition-colors ${
                                isSelected
                                  ? "bg-primary border-primary"
                                  : "border-muted-foreground/30"
                              }`}
                            >
                              {isSelected && (
                                <Check className="w-3 h-3 text-primary-foreground" />
                              )}
                            </div>
                            <Calendar
                              className={`w-4 h-4 flex-shrink-0 ${
                                isSelected ? "text-primary" : "text-muted-foreground"
                              }`}
                            />
                            <span
                              className={`font-medium text-sm ${
                                isSelected ? "text-foreground" : "text-muted-foreground"
                              }`}
                            >
                              {format(date, "EEEE, d. MMMM yyyy", { locale: de })}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Sticky bottom button */}
                    <div className="px-5 py-4 border-t border-border flex-shrink-0 bg-card">
                      <button
                        onClick={handleConfirmDates}
                        disabled={selectedDates.length === 0}
                        className={`w-full py-3 rounded-full font-display font-bold text-sm transition-all duration-200 ${
                          selectedDates.length > 0
                            ? "gradient-zumba-party text-primary-foreground hover:scale-[1.02] shadow-glow"
                            : "bg-muted text-muted-foreground cursor-not-allowed"
                        }`}
                      >
                        {selectedDates.length > 0
                          ? `Weiter zur Bezahlung`
                          : "Anmelden"}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnrollmentModal;
