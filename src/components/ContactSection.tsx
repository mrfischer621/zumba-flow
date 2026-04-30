import { useState } from "react";
import katjaProfile from "@/assets/katja-profile.jpeg";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MessageCircle, Instagram, MapPin, Send } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";

const PHONE_REGEX = /^\+?[\d\s\-\(\)]{7,20}$/;

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", mobile: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.mobile.trim() || !formData.message.trim()) {
      toast({ title: "Bitte fülle alle Pflichtfelder aus.", variant: "destructive" });
      return;
    }
    if (!PHONE_REGEX.test(formData.mobile.trim())) {
      toast({ title: "Bitte gib eine gültige Mobilnummer ein.", variant: "destructive" });
      return;
    }
    const text = encodeURIComponent(
      `Hallo Katja! Mein Name ist ${formData.name.slice(0, 100)}. Mobile: ${formData.mobile.slice(0, 20)}. ${formData.message.slice(0, 1000)}`
    );
    window.open(`https://wa.me/41772325777?text=${text}`, "_blank");
    setFormData({ name: "", mobile: "", message: "" });
    toast({ title: "Nachricht wird via WhatsApp gesendet! 💃" });
  };

  return (
    <section id="contact" className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Zumba in Flaach – <span className="text-primary">Kontakt</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Hast du Fragen? Melde dich bei mir!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Profile Photo */}
            <div className="flex justify-center md:justify-start mb-6">
              <div className="w-36 h-36 rounded-full overflow-hidden ring-4 ring-primary/30 shadow-glow">
                <img
                  src={katjaProfile}
                  alt="Katja Zumsteg, Zumba® und Les Mills® Instruktorin in Flaach"
                  className="w-full h-full object-cover scale-[1.3]"
                  style={{ objectPosition: "50% 20%" }}
                  loading="lazy"
                  width={144}
                  height={144}
                />
              </div>
            </div>

            <h3 className="text-2xl font-bold font-heading text-center md:text-left">Katja Zumsteg</h3>
            <p className="text-muted-foreground text-center md:text-left">
              Zumba® und Les Mills® Dance Instruktorin. Ich freue mich auf dich! Bis bald auf dem Dancefloor. 💃🕺
            </p>

            <div className="space-y-4">
              <a
                href="https://wa.me/41772325777"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center text-white">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold group-hover:text-[#25D366] transition-colors">WhatsApp</p>
                  <p className="text-muted-foreground">077 232 57 77</p>
                </div>
              </a>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Schulhausstrasse+5b+8416+Flaach"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-secondary/10 hover:bg-secondary/20 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold group-hover:text-secondary transition-colors">Kursort</p>
                  <p className="text-muted-foreground">Turnhalle Primarschulhaus</p>
                  <p className="text-muted-foreground text-sm">Schulhausstrasse 5b, 8416 Flaach</p>
                </div>
              </a>

              {/* Google Maps Embed */}
              <div className="rounded-xl overflow-hidden border border-border mt-2">
                <iframe
                  title="Kursort Turnhalle Primarschulhaus Flaach"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2696.5!2d8.5965!3d47.5805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zU2NodWxoYXVzc3RyYXNzZSA1YiwgODQxNiBGbGFhY2g!5e0!3m2!1sde!2sch!4v1700000000000"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </div>

              <a
                href="https://www.instagram.com/groupfitness_by_katja/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-pink-500/10 hover:bg-pink-500/20 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center text-white">
                  <Instagram className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold group-hover:text-pink-500 transition-colors">Instagram</p>
                  <p className="text-muted-foreground">@groupfitness_by_katja</p>
                </div>
              </a>

              <a
                href="https://www.zumba.com/de-DE/class_detail/cf4e5ba0-49b3-458c-9f70-05dd4072ea55?lat=47.5754244&lng=8.608530199999999"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                  Z
                </div>
                <div>
                  <p className="font-semibold group-hover:text-primary transition-colors">Zumba® Profil</p>
                  <p className="text-muted-foreground">zumba.com</p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="border-primary/20 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold font-heading mb-6">Nachricht senden</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      placeholder="Dein Name"
                      maxLength={100}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="mobile">Mobile Nummer *</Label>
                    <Input
                      id="mobile"
                      type="tel"
                      placeholder="079 123 45 67"
                      maxLength={20}
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Nachricht *</Label>
                    <Textarea
                      id="message"
                      placeholder="Deine Nachricht..."
                      maxLength={1000}
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    <Send className="w-4 h-4 mr-2" />
                    Via WhatsApp senden
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
