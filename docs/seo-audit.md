# SEO Audit — Groupfitness by Katja
**Erstellt:** 30.04.2026  
**Ziel-Keywords:** Zumba Flaach, Gruppenfitness Flaach, Zumba Zürcher Weinland  
**Trainingsstandort:** Schulhausstrasse 5b, 8416 Flaach ZH  
**Zielregion:** Zürcher Weinland (Flaach, Andelfingen, Marthalen, Berg am Irchel, Buch am Irchel, Oerlingen, Ossingen, Stammheim)

---

## Executive Summary

Die Website hat eine solide technische Basis (React + Vite + Tailwind, Mobile-first, HTTPS via Vercel) und gutes UX-Design. Die SEO-Fundamentals sind jedoch **kritisch unzureichend**. Das grösste strukturelle Problem ist die React SPA ohne SSR/SSG — Google muss JavaScript rendern, bevor es Content indexieren kann. Zusätzlich fehlen alle lokalen SEO-Signale fast vollständig.

**Das Potenzial ist enorm:** Die Nische "Zumba Zürcher Weinland" ist SEO-technisch praktisch unbesetzt. Wer zuerst eine sauber optimierte Seite + aktives Google Business Profile hat, dominiert diese Keywords auf Jahre.

### Gesamtstatus

| Bereich | Status | Priorität |
|---|---|---|
| Technical SEO | ❌ Kritisch | P0 |
| On-Page Content & Keywords | ❌ Kritisch | P0 |
| Local SEO | ⚠️ Lückenhaft | P1 |
| Performance / Core Web Vitals | ⚠️ Verbesserungswürdig | P1 |
| Keyword-Positionierung | 🟢 Riesige Chance | P0 |
| Tracking (GSC, GA4, GTM) | ❌ Nicht vorhanden | P0 |

---

## Top 10 Kritische Findings

| # | Problem | Impact | Fix-Aufwand |
|---|---|---|---|
| 1 | `lang="en"` — Site ist Deutsch | Ranking für DE-CH Suchen | 2 Min |
| 2 | Title & Meta Description auf Englisch, kein Ortsname | Kein Ranking für lokale Keywords | 10 Min |
| 3 | Kein LocalBusiness JSON-LD Schema | Kein Local Pack, kein Rich Snippet | 30 Min |
| 4 | OG Image & Twitter:site zeigt auf Lovable-Platzhalter | Unprofessionelles Social Sharing | 20 Min |
| 5 | Keine sitemap.xml | Schlechte Crawlability | 15 Min |
| 6 | "Zürcher Weinland" & alle 8 Gemeinden fehlen im Content | 0 Ranking-Chancen für regionale Keywords | 1–2h |
| 7 | H1 "Musik an. Kopf aus. Tanzen." — kein Keyword | Wichtigstes On-Page-Signal ungenutzt | 5 Min |
| 8 | React SPA ohne SSR/SSG | Verzögerte Indexierung, schwacher LCP | Architekturentscheid |
| 9 | Hero-Bild 412 KB JPEG, kein `fetchpriority="high"` | LCP geschätzt 4–6s | 30 Min |
| 10 | Kein Google Business Profile | Kein Local Pack, kein Maps-Listing | 20 Min (extern) |

---

## 1. Technical SEO

### 1.1 HTML-Grundlagen

| Element | Ist-Zustand | Soll-Zustand | Status |
|---|---|---|---|
| `lang`-Attribut | `lang="en"` | `lang="de-CH"` | ❌ |
| Charset | UTF-8 | UTF-8 | ✅ |
| Viewport | korrekt | — | ✅ |
| Title | "Groupfitness by Katja \| Zumba Classes" (EN) | "Zumba Flaach – Gruppenfitness mit Katja" (DE, 50-60 Zeichen) | ❌ |
| Meta Description | Englisch, kein Ort | Deutsch, Flaach + Weinland + CTA, 140–160 Zeichen | ❌ |
| Canonical | fehlt | `<link rel="canonical" href="https://[domain]/" />` | ❌ |
| robots.txt | vorhanden, aber kein Sitemap-Verweis | Sitemap-Zeile hinzufügen | ⚠️ |
| sitemap.xml | fehlt | generieren & in /public/ ablegen | ❌ |

**Empfohlene index.html Korrekturen:**
```html
<html lang="de-CH">
<title>Zumba Flaach – Gruppenfitness mit Katja | Zürcher Weinland</title>
<meta name="description" content="Wöchentliche Zumba-Kurse in Flaach (Zürcher Weinland) mit Katja Zumsteg. Für alle Fitnessstufen. Donnerstag 19:00 Uhr in der Turnhalle Primarschulhaus. Probelektion ab CHF 10." />
<link rel="canonical" href="https://[deine-domain].ch/" />
```

### 1.2 Open Graph & Social

```html
<!-- Ersetzen: -->
<meta property="og:title" content="Zumba Flaach – Gruppenfitness mit Katja" />
<meta property="og:description" content="Wöchentliche Zumba-Kurse in Flaach, Zürcher Weinland. Jetzt anmelden." />
<meta property="og:url" content="https://[deine-domain].ch/" />
<meta property="og:image" content="https://[deine-domain].ch/og-image.jpg" />
<meta property="og:locale" content="de_CH" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@[katjas-account]" />
<meta name="twitter:image" content="https://[deine-domain].ch/og-image.jpg" />
```

### 1.3 robots.txt — Ergänzung

```
User-agent: *
Allow: /

Sitemap: https://[deine-domain].ch/sitemap.xml
```

### 1.4 Structured Data — komplett fehlend

Alle drei JSON-LD-Blöcke gehören in den `<head>` von `index.html`:

**LocalBusiness (kritisch):**
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Groupfitness by Katja",
  "description": "Zumba® und Gruppenfitness Kurse in Flaach, Zürcher Weinland. Leitung: Katja Zumsteg.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Schulhausstrasse 5b",
    "addressLocality": "Flaach",
    "postalCode": "8416",
    "addressRegion": "ZH",
    "addressCountry": "CH"
  },
  "telephone": "+41772325777",
  "email": "[katja@email.ch]",
  "url": "https://[deine-domain].ch",
  "geo": { "@type": "GeoCoordinates", "latitude": 47.5697, "longitude": 8.5986 },
  "areaServed": ["Flaach", "Andelfingen", "Marthalen", "Berg am Irchel", "Buch am Irchel", "Oerlingen", "Ossingen", "Stammheim"],
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": "Thursday",
    "opens": "19:00",
    "closes": "19:55"
  }],
  "priceRange": "CHF 10–25",
  "sameAs": [
    "https://www.instagram.com/groupfitness_by_katja/",
    "https://www.zumba.com/de-DE/class_detail/cf4e5ba0-49b3-458c-9f70-05dd4072ea55"
  ]
}
```

### 1.5 SPA ohne SSR/SSG — Architekturproblem

**Situation:** Die App ist ein reines Client-Side-Rendered React SPA. Google bekommt initial nur `<div id="root"></div>` — Content wird erst nach JS-Ausführung sichtbar.

**Optionen (nach Aufwand):**
| Option | Aufwand | Impact |
|---|---|---|
| A: Meta-Tags & Schema im `<head>` optimieren (Minimum) | Gering | Teilweise Verbesserung |
| B: `vite-plugin-ssg` nachrüsten | Mittel | Starke Verbesserung |
| C: Migration zu Astro (React Islands) | Hoch | Maximale SEO-Performance |

**Empfehlung für jetzt:** Option A sofort umsetzen (Quick Win), Option B mittelfristig evaluieren.

---

## 2. On-Page Content & Keyword-Mapping

### 2.1 Heading-Hierarchie

| Element | Ist-Zustand | Soll-Zustand | Status |
|---|---|---|---|
| H1 | "Musik an. Kopf aus. Tanzen." | "Zumba Flaach – Gruppenfitness mit Katja" | ❌ |
| H2 Kursplan | "Wochenplan" | "Zumba-Kursplan in Flaach" | ⚠️ |
| H2 Preise | "Preise & Abos" | "Preise für Zumba-Kurse in Flaach" | ⚠️ |
| H2 Kontakt | "Kontakt aufnehmen" | "Zumba in Flaach – so erreichst du Katja" | ⚠️ |

### 2.2 Keyword-Abdeckung

| Keyword | Im Content vorhanden? | Wo? |
|---|---|---|
| "Zumba Flaach" | ❌ | Nirgends |
| "Gruppenfitness Flaach" | ❌ | Nirgends |
| "Zumba Zürcher Weinland" | ❌ | Nirgends |
| "Zumba Andelfingen" | ❌ | Nirgends |
| "Flaach" | ✅ | Adresse, Footer |
| "Zumba®" | ✅ | Mehrfach im Body |

### 2.3 Content-Volumen

**Problem:** ~500 Wörter gesamter Text auf der ganzen Site. Google braucht ~300–500 Wörter pro Thema für Ranking und E-E-A-T-Signale.

**Fehlende Sections:**
- Über Katja (Zertifikationen, Erfahrung) → fehlt komplett
- "Zumba für Anfänger" Erklärtext → zu kurz (45 Wörter)
- FAQ-Section → fehlt
- Regionale Abdeckung → fehlt

### 2.4 Bilder

| Bild | Alt-Text | Optimiert? |
|---|---|---|
| dance-class-hero.jpg | ✅ vorhanden | ⚠️ kein "Flaach" darin |
| katja-profile.jpeg | ✅ vorhanden | ✅ |
| groupfitness-hero.jpg | unbekannt (nicht in Komponenten gefunden) | ❌ |

### 2.5 Fehlende Landing Pages

Für lokales SEO sind dedizierte Unterseiten stark empfohlen:

| Seite | Ziel-Keywords | Priorität |
|---|---|---|
| `/zumba-flaach/` | "Zumba Flaach", "Gruppenfitness Flaach" | 🔴 Hoch |
| `/zumba-zuercher-weinland/` | "Zumba Zürcher Weinland", alle 8 Gemeinden | 🔴 Hoch |
| `/ueber-katja/` | "Katja Zumba Instruktorin Flaach" | 🟡 Mittel |
| `/faq/` | Long-Tail-Keywords, Featured Snippets | 🟡 Mittel |

---

## 3. Local SEO

### 3.1 NAP-Konsistenz

| Element | Status | Details |
|---|---|---|
| Name | ✅ | "Groupfitness by Katja" — konsistent |
| Adresse | ✅ | Schulhausstrasse 5b, 8416 Flaach — mehrfach |
| Telefon | ✅ | +41 77 232 57 77 — WhatsApp-Link |
| E-Mail | ❌ | Keine E-Mail-Adresse auf der Website |
| JSON-LD Schema | ❌ | NAP nicht maschinenlesbar |

### 3.2 Lokale Signale

| Signal | Status |
|---|---|
| "Flaach" im Content | ✅ (5×, aber meist nur Adresse) |
| "Zürcher Weinland" | ❌ — 0 Erwähnungen |
| Nachbargemeinden | ❌ — 0 Erwähnungen |
| Google Maps Embed | ✅ — vorhanden |
| Geo-Koordinaten | ✅ — im ICS-Export (47.5697, 8.5986) |
| "Flaach" in H1/H2 | ❌ — fehlt |

### 3.3 Google Business Profile

**Status:** Noch nicht erstellt — höchste Priorität für lokales Ranking.

**Empfohlene GBP-Konfiguration:**

| Feld | Wert |
|---|---|
| Name | Groupfitness by Katja |
| Kategorie (primär) | Fitnesskurs |
| Kategorien (sekundär) | Tanzstudio, Zumba-Kurs |
| Adresse | Schulhausstrasse 5b, 8416 Flaach |
| Telefon | +41 77 232 57 77 |
| Website | [deine-domain].ch |
| Öffnungszeiten | Donnerstag 19:00–19:55 |
| Beschreibung | Zumba® und Gruppenfitness Kurse in Flaach (Zürcher Weinland). Wöchentlich Do 19:00 in der Turnhalle Primarschulhaus. Leitung: Katja Zumsteg, zert. Zumba® & Les Mills® Instruktorin. |
| Attribute | Geführt von Frauen, Kurse auf Deutsch |

---

## 4. Performance & Core Web Vitals

### 4.1 Einschätzung (basierend auf Code-Analyse)

| Metrik | Einschätzung | Problem |
|---|---|---|
| LCP | ❌ ~4–6s | Hero-Bild 412 KB JPEG, kein `fetchpriority`, JS-blockiert |
| INP | ⚠️ Mittel | Framer Motion 50 KB, aber einfache Interaktionen |
| CLS | ⚠️ Mittel | `font-display: swap` + Bilder ohne Dimensionen |

### 4.2 Bilder — grösste Baustelle

| Datei | Grösse | Problem |
|---|---|---|
| groupfitness-hero.jpg | 1.4 MB | Massiv überdimensioniert |
| katja-profile.jpeg | 528 KB | Zu gross für Profilbild |
| dance-class-hero.jpg | 412 KB | Kein WebP, kein fetchpriority |
| zumba-hero.jpg | 217 KB | Kein WebP |

**Fix:**
```tsx
<img
  src="/dance-class-hero.webp"
  fetchPriority="high"
  decoding="async"
  width={1920}
  height={1080}
  alt="Zumba-Kurs in Flaach – Gruppenfitness mit Katja"
/>
```

### 4.3 Fonts

**Problem:** Google Fonts via `@import` in CSS — startet erst nach CSS-Parsing.

**Fix in index.html:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;900&family=Nunito:wght@400;600&display=swap">
```

### 4.4 Bundle

**Radix UI:** 23 Pakete installiert, aber nur ~8–10 tatsächlich genutzt. Bereinigung spart ~20–40 KB.

**Framer Motion:** In allen 9 Komponenten (~50 KB gzipped). Für einfache Fades könnte CSS Animationen ausreichen.

---

## 5. Keyword- & Wettbewerbsanalyse

### 5.1 Schnellste Ranking-Chancen (3-Monats-Horizont)

| Keyword | Konkurrenz | Potenzial | Priorität |
|---|---|---|---|
| "Zumba Flaach" | Praktisch keine | Top 1 sofort erreichbar | 🔴 P0 |
| "Gruppenfitness Flaach" | Keine | Top 1 sofort erreichbar | 🔴 P0 |
| "Zumba Kurs Zürcher Weinland" | Sehr gering | Top 3 in Wochen | 🔴 P0 |
| "Zumba Andelfingen" | Gering | Top 3 in Wochen | 🟡 P1 |
| "Zumba Schnupperkurs Weinland" | Keine | Top 1 sofort | 🟡 P1 |

### 5.2 Long-Tail Keywords (Conversion-stark)

```
"Zumba Kurs Flaach" — sehr niedrig — transaktional
"Zumba Anfänger Andelfingen" — sehr niedrig — transaktional
"Gruppenfitness Weinland Zürich" — niedrig — transaktional
"Fitness Kurs Frauen Weinland" — niedrig — transaktional
"Zumba Stammheim ZH" — sehr niedrig — transaktional
"Latintanz Fitness Weinland" — sehr niedrig — informational
"Abnehmen mit Zumba Winterthur Nord" — niedrig — informational
```

### 5.3 Content-Gap: Fragen, die Kundinnen stellen

- "Was kostet ein Zumba-Kurs in Flaach?"
- "Ist Zumba für Anfänger geeignet?"
- "Brauche ich Tanzerfahrung?"
- "Wo findet der Kurs statt? Parkplätze?"
- "Gibt es eine Probestunde?"
- "Was zieht man zum Zumba an?"
- "Gibt es Zumba in der Nähe von Andelfingen?"

→ Empfehlung: FAQ-Sektion mit diesen Fragen anlegen (auch gut für Featured Snippets).

---

## 6. Tracking-Setup (fehlt komplett)

Folgendes muss aufgesetzt werden, bevor wir Ranking-Erfolge messen können:

| Tool | Priorität | Zweck |
|---|---|---|
| Google Search Console | 🔴 P0 | Ranking, Impressions, Indexierung überwachen |
| Google Analytics 4 | 🟡 P1 | Traffic, Conversions, Nutzerverhalten |
| Google Tag Manager | 🟡 P1 | GA4 & andere Tags ohne Code-Deploy verwalten |
| Bing Webmaster Tools | 🟢 P2 | Bing-Indexierung (kleiner Marktanteil CH) |
| Sitemap in GSC einreichen | 🔴 P0 | Nach sitemap.xml Erstellung |

**Umami ist bereits eingebunden** (`8f8d68f2-8d6c-4ed0-b8a7-c28480221f4d`) — gut für Privacy-freundliches Analytics, ersetzt aber nicht GSC für SEO-Monitoring.

---

## 7. Priorisierte Roadmap

### Woche 1 — Quick Wins (0–4h Aufwand, max. SEO-Impact)

- [ ] `lang="de-CH"` in `index.html`
- [ ] Title: "Zumba Flaach – Gruppenfitness mit Katja | Zürcher Weinland"
- [ ] Meta Description: Deutsch, Flaach + Weinland + CTA
- [ ] OG/Twitter Tags: Eigenes Bild, eigener Brand-Account, `og:url`, `og:locale`
- [ ] LocalBusiness JSON-LD in `<head>` einfügen
- [ ] `robots.txt` um Sitemap-Zeile ergänzen
- [ ] `sitemap.xml` generieren und in `/public/` ablegen
- [ ] Canonical-Tag hinzufügen
- [ ] H1 keyword-optimieren: "Zumba Flaach – Gruppenfitness mit Katja"
- [ ] H2s in Sektionen mit lokalen Keywords versehen
- [ ] Google Business Profile erstellen + vollständig befüllen
- [ ] Google Search Console einrichten + Sitemap einreichen

### Woche 2–3 — Content & Local

- [ ] "Zürcher Weinland" + alle 8 Gemeinden im Body-Text erwähnen
- [ ] Neue Section: Regionaler Text ("Gut erreichbar aus Andelfingen, Marthalen, Stammheim...")
- [ ] FAQ-Sektion mit 8–10 häufigen Fragen anlegen
- [ ] E-Mail-Adresse hinzufügen
- [ ] Katja-Bio ausbauen (Zertifikationen, Erfahrung, Persönlichkeit)
- [ ] Hero-Bild nach WebP konvertieren + `fetchpriority="high"` setzen
- [ ] Google Fonts Preconnect in `index.html` optimieren
- [ ] Erste 5 Google-Bewertungen von bestehenden Kursteilnehmerinnen einholen

### Woche 4+ — Skalierung

- [ ] Dedizierte Seite `/zumba-zuercher-weinland/` (alle 8 Gemeinden)
- [ ] Dedizierte Seite `/ueber-katja/`
- [ ] GA4 + GTM einrichten
- [ ] Unused Radix UI Pakete bereinigen
- [ ] Alle Bilder auf WebP/AVIF konvertieren, `srcset` hinzufügen
- [ ] Erster Blog-Artikel: "Zumba für Anfänger – was dich beim ersten Kurs in Flaach erwartet"
- [ ] Lokale Verlinkungen: Gemeindewebsite Flaach, Vereinsverzeichnisse, Facebook-Gruppen Weinland
- [ ] Local Citations: local.ch, search.ch, das örtliche Branchenverzeichnis

---

## Positives Fazit

Die technische Basis ist solide. Alle kritischen SEO-Lücken sind mit begrenztem Aufwand schliessbar. Da die Nische praktisch unbesetzt ist, sind schnelle Top-3-Rankings für "Zumba Flaach" und verwandte Keywords realistisch — sobald GBP + LocalBusiness-Schema + optimierte Meta-Tags live sind.

**Nächster Schritt: Welche Punkte aus Woche 1 sollen wir als erstes implementieren?**
