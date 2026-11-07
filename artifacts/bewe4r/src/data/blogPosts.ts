import deliveryImg from "@/assets/real/lieferung.jpg";
import patternImg from "@/assets/real/sample.jpg";
import garmentRailImg from "@/assets/real/garment-rail.jpg";

export type BlogLang = "en" | "de";

export interface BlogPostText {
  title: string;
  /** Shorter title for <title> / Open Graph (search results cut off after about 60 characters) */
  seoTitle?: string;
  excerpt: string;
  description: string;
  keywords: string;
  category: string;
  tags: string[];
  /** Markdown: ## / ### headings, bullet and numbered lists, **bold**, [links](/path) */
  content: string;
}

export interface BlogPostData {
  slug: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  en: BlogPostText;
  de: BlogPostText;
}

export const BLOG_POSTS: BlogPostData[] = [
  {
    slug: "how-long-does-clothing-production-take",
    publishedAt: "2026-11-05",
    updatedAt: "2026-11-05",
    author: "BEWE4R Team",
    image: deliveryImg,
    imageWidth: 1600,
    imageHeight: 1200,
    en: {
      title: "How Long Does It Take to Produce Your Clothing Line? A Realistic Timeline",
      seoTitle: "How Long Does Clothing Production Take?",
      excerpt:
        "Production is only one part of the timeline. Here is how a clothing project moves from techpack to delivery, and what really decides how long it takes.",
      description:
        "How long does clothing production take? A realistic timeline from techpack and sample to bulk production and shipping, and how to plan from your launch date.",
      keywords:
        "clothing production timeline, how long does clothing production take, garment manufacturing lead time, sample to bulk production, clothing manufacturer Istanbul",
      category: "Production",
      tags: ["Production time", "Sampling", "Shipping"],
      content: `Planning a clothing line means planning backwards from a launch date. Whether it is a first drop, a collaboration or a seasonal collection, the question we hear most often is simple: how long will it take? The honest answer is that production itself is only one part of the timeline. Most of the calendar is made up of the steps around it.

## The journey from idea to delivery

A typical project with BEWE4R moves through six stages:

1. **Brief and techpack.** You send us your concept, sketches or a full techpack.
2. **Review.** We check your requirements: product, quantities, fabrics, print or embroidery technique and labels.
3. **Offer.** You receive a custom offer with pricing and the production time for your specific order.
4. **Sample.** After final approval we produce your sample.
5. **Bulk production.** Once the sample is approved, your full order goes into production in Istanbul.
6. **Shipping and delivery.** Your order travels to you, or straight to your customers.

## What decides how long each stage takes

### Brief, review and offer

The fastest projects start with clear information. A techpack is ideal, but it is not strictly required. If you only have a concept or sketches, we help you build the techpack, which simply adds a little preparation time. Missing details such as fit, colours, print placement and quantities are the most common reason an offer takes longer than it should.

### Sampling

The sample is where timelines are won or lost. Every round of changes means another round of production and feedback. Collect all your corrections in one message, decide quickly, and you save more time than any faster factory could.

### Bulk production

Production time depends on the product, the quantity, the number of colours and designs, and the technique. Screen print, DTF, DTG, embroidery, 3D patches and embossing each have their own workflow. For this reason we do not quote one generic number. The production time is confirmed in your individual offer, based on your actual order.

### Shipping

Shipping is the one stage with firm numbers. Standard DDP shipping, with customs and duties included, typically takes 7–15 business days depending on the destination. Express shipping takes an estimated 4–5 business days after dispatch. Germany and Austria are usually 7–14 business days, Switzerland 10–16, and other EU countries and the UK 10–18.

## What slows projects down

- Unclear or changing designs after the offer
- Quantities that change late in the process
- Slow feedback on samples
- Several sample revisions instead of one consolidated round
- A deadline that leaves no buffer for shipping

## How to plan your timeline

1. **Start with the date your customers should have the product** and work backwards from there.
2. **Add a buffer** for one extra sample round and for shipping.
3. **Approve fast.** Reply to samples and offers within a day or two.
4. **Consider a pre-order.** A pre-order window typically runs one to two weeks. It collects orders before production starts and reduces your risk.

## Ready to plan your drop?

Send us your techpack or concept and we will come back with a realistic schedule for your project. [Start your sample](/your-brand/sample), check our [delivery times](/your-brand/delivery), or [contact us](/contact).`,
    },
    de: {
      title: "Wie lange dauert die Produktion deiner Kleidungsmarke? Ein realistischer Zeitplan",
      excerpt:
        "Die Produktion ist nur ein Teil des Zeitplans. So läuft ein Kleidungsprojekt vom Techpack bis zur Lieferung, und das entscheidet wirklich über die Dauer.",
      description:
        "Wie lange dauert die Kleidungsproduktion? Ein realistischer Zeitplan vom Techpack über das Sample bis zur Serienproduktion und zum Versand, plus Planung ab deinem Launch-Termin.",
      keywords:
        "Kleidungsproduktion Dauer, Produktionszeit Kleidung, Textilproduktion Zeitplan, Sample bis Serienproduktion, Kleidungshersteller Istanbul",
      category: "Produktion",
      tags: ["Produktionszeit", "Sampling", "Versand"],
      content: `Eine Kleidungsmarke zu planen heißt, vom Launch-Termin aus rückwärts zu rechnen. Ob erster Drop, Kollaboration oder saisonale Kollektion: Die Frage, die wir am häufigsten hören, ist einfach: Wie lange dauert das? Die ehrliche Antwort: Die Produktion selbst ist nur ein Teil des Zeitplans. Der größte Teil des Kalenders besteht aus den Schritten drumherum.

## Der Weg von der Idee bis zur Lieferung

Ein typisches Projekt mit BEWE4R durchläuft sechs Stationen:

1. **Briefing und Techpack.** Du schickst uns dein Konzept, deine Skizzen oder einen vollständigen Techpack.
2. **Prüfung.** Wir prüfen deine Anforderungen: Produkt, Stückzahlen, Stoffe, Druck- oder Stickverfahren und Labels.
3. **Angebot.** Du erhältst ein individuelles Angebot mit Preisen und der Produktionszeit für deine konkrete Bestellung.
4. **Sample.** Nach der finalen Freigabe produzieren wir dein Sample.
5. **Serienproduktion.** Sobald das Sample freigegeben ist, geht deine komplette Bestellung in Istanbul in Produktion.
6. **Versand und Lieferung.** Deine Ware reist zu dir oder direkt zu deinen Kunden.

## Was die Dauer der einzelnen Phasen bestimmt

### Briefing, Prüfung und Angebot

Die schnellsten Projekte starten mit klaren Informationen. Ein Techpack ist ideal, aber nicht zwingend erforderlich. Wenn du nur ein Konzept oder Skizzen hast, helfen wir dir beim Erstellen des Techpacks, was lediglich etwas Vorbereitungszeit kostet. Fehlende Angaben zu Passform, Farben, Druckplatzierung und Stückzahlen sind der häufigste Grund, warum ein Angebot länger dauert als nötig.

### Sampling

Beim Sample werden Zeitpläne gewonnen oder verloren. Jede Änderungsrunde bedeutet eine weitere Runde aus Produktion und Feedback. Sammle alle Korrekturen in einer Nachricht und entscheide zügig: Das spart mehr Zeit als jede schnellere Fabrik.

### Serienproduktion

Die Produktionszeit hängt vom Produkt, der Stückzahl, der Anzahl der Farben und Designs und dem Verfahren ab. Siebdruck, DTF, DTG, Stickerei, 3D-Patches und Prägung haben jeweils ihren eigenen Ablauf. Deshalb nennen wir keine pauschale Zahl. Die Produktionszeit wird in deinem individuellen Angebot bestätigt, auf Basis deiner tatsächlichen Bestellung.

### Versand

Der Versand ist die einzige Phase mit festen Zahlen. Der Standard-DDP-Versand, inklusive Zoll und Einfuhrabgaben, dauert je nach Zielland typischerweise 7–15 Werktage. Der Expressversand dauert geschätzt 4–5 Werktage nach dem Versand. Deutschland und Österreich liegen meist bei 7–14 Werktagen, die Schweiz bei 10–16 und andere EU-Länder sowie das Vereinigte Königreich bei 10–18.

## Was Projekte ausbremst

- Unklare oder nachträglich geänderte Designs nach dem Angebot
- Stückzahlen, die sich spät im Prozess ändern
- Langsames Feedback zu Samples
- Mehrere Sample-Korrekturen statt einer gebündelten Runde
- Ein Termin, der keinen Puffer für den Versand lässt

## So planst du deinen Zeitplan

1. **Starte mit dem Datum, an dem deine Kunden das Produkt haben sollen,** und rechne von dort rückwärts.
2. **Plane einen Puffer ein** für eine zusätzliche Sample-Runde und für den Versand.
3. **Gib schnell frei.** Antworte auf Samples und Angebote innerhalb von ein bis zwei Tagen.
4. **Denke an einen Pre-Order.** Ein Pre-Order-Zeitraum dauert typischerweise ein bis zwei Wochen. So sammelst du Bestellungen vor dem Produktionsstart und senkst dein Risiko.

## Bereit, deinen Drop zu planen?

Schick uns deinen Techpack oder dein Konzept und wir melden uns mit einem realistischen Zeitplan für dein Projekt. [Starte dein Sample](/your-brand/sample), sieh dir unsere [Lieferzeiten](/your-brand/delivery) an oder [kontaktiere uns](/contact).`,
    },
  },
  {
    slug: "what-you-need-before-starting-production",
    publishedAt: "2026-10-29",
    updatedAt: "2026-10-29",
    author: "BEWE4R Team",
    image: patternImg,
    imageWidth: 1600,
    imageHeight: 1200,
    en: {
      title: "Before You Start Production: The Checklist for Your First Clothing Order",
      seoTitle: "First Clothing Order Checklist: What to Prepare",
      excerpt:
        "You do not need a perfect techpack to begin, but you do need clarity on a handful of decisions. Here is what to prepare before you send your first inquiry.",
      description:
        "What do you need before starting clothing production? A practical checklist covering fit, quantities, fabric, artwork, labels, timeline, budget and techpack.",
      keywords:
        "before starting clothing production, clothing production checklist, techpack, minimum order quantity clothing, start a clothing brand, first production order",
      category: "Getting started",
      tags: ["Techpack", "MOQ", "Checklist"],
      content: `Most delays in a first production run are not caused by the factory. They start earlier, with a brief that is missing key details. The good news: you do not need a perfect techpack to begin. You need clarity on a handful of decisions. Here is what to prepare before you send your first inquiry.

## 1. The product and the fit

Be specific about what you want to make. "A premium hoodie" is a starting point; "a boxy, heavyweight hoodie with a dropped shoulder" is a brief. Describe the silhouette first, then the details. Reference photos of garments you like are worth more than long explanations.

## 2. Quantities

Minimum quantities are counted per colour and design. At BEWE4R, T-shirts, hoodies and crewnecks start at 30 pieces, and caps, shorts and joggers at 50. You can split the total freely across sizes from XS to 3XL, and volume discounts are possible from 100 pieces. A rough range is enough for the first message, you do not need final numbers.

## 3. Fabric and feel

Think about how the garment should feel: heavy or light, soft or structured, brushed or smooth. If you have a favourite piece, tell us. A physical reference is the fastest way to align on fabric.

## 4. Artwork and decoration

Decide how your design reaches the garment: screen print, DTF, DTG, embroidery, 3D patches or embossing. Each suits different artwork, colours and budgets. Send your artwork as vector files (AI, EPS, SVG or PDF) where possible, and mark the placement: chest, back, sleeve or hem.

## 5. Labels and packaging

Labels change how a garment feels in the hand. Neck tags, hang tags, design tags and jeans tags all carry your brand. Pick the ones that support your positioning rather than adding everything. BEWE4R also offers packaging and brand essentials such as zip bags, mailer bags, boxes, thank-you cards and stickers.

## 6. Timeline and budget

Share your launch date and a target price range early. They steer decisions about fabric, techniques and quantities, and they tell us whether a pre-order or a staged launch makes sense.

## 7. The techpack

A techpack is ideal because it removes guesswork, but it is not strictly required. If you only have a concept or sketches, send them. We help you turn them into a techpack.

## A simple checklist for your first inquiry

- Product type and fit
- Quantity per colour and design
- Colours and sizes
- Fabric direction or a reference garment
- Artwork files and decoration technique
- Labels and packaging
- Launch date
- Target price range
- Destination country
- Reference images and sketches

## Next step

Once you have these points, you are ready to start. Begin with a [sample](/your-brand/sample), read the details on [minimum quantities](/your-brand/moq), or [get in touch](/contact).`,
    },
    de: {
      title: "Bevor du startest: Die Checkliste für deine erste Kleidungsbestellung",
      excerpt:
        "Du brauchst keinen perfekten Techpack, um anzufangen, aber Klarheit bei ein paar Entscheidungen. Das solltest du vorbereiten, bevor du deine erste Anfrage schickst.",
      description:
        "Was brauchst du vor dem Start der Kleidungsproduktion? Eine praktische Checkliste zu Passform, Stückzahlen, Stoff, Artwork, Labels, Zeitplan, Budget und Techpack.",
      keywords:
        "Kleidungsproduktion starten, Checkliste Kleidungsproduktion, Techpack, Mindestbestellmenge Kleidung, eigene Kleidungsmarke gründen, erste Produktion",
      category: "Einstieg",
      tags: ["Techpack", "MOQ", "Checkliste"],
      content: `Die meisten Verzögerungen bei der ersten Produktion verursacht nicht die Fabrik. Sie beginnen früher, mit einem Briefing, dem wichtige Angaben fehlen. Die gute Nachricht: Du brauchst keinen perfekten Techpack, um anzufangen. Du brauchst Klarheit bei ein paar Entscheidungen. Das solltest du vorbereiten, bevor du deine erste Anfrage schickst.

## 1. Produkt und Passform

Sei konkret, was du herstellen willst. „Ein Premium-Hoodie“ ist ein Anfang, „ein boxy, schwerer Hoodie mit tiefer Schulter“ ist ein Briefing. Beschreibe zuerst die Silhouette, dann die Details. Referenzfotos von Kleidungsstücken, die dir gefallen, sagen mehr als lange Erklärungen.

## 2. Stückzahlen

Mindestmengen gelten pro Farbe und Design. Bei BEWE4R starten T-Shirts, Hoodies und Crewnecks bei 30 Stück, Caps, Shorts und Jogger bei 50. Die Gesamtmenge kannst du frei auf die Größen XS bis 3XL verteilen, ab 100 Stück sind Mengenrabatte möglich. Für die erste Nachricht reicht eine grobe Spanne, endgültige Zahlen brauchst du noch nicht.

## 3. Stoff und Haptik

Überlege, wie sich das Kleidungsstück anfühlen soll: schwer oder leicht, weich oder strukturiert, angeraut oder glatt. Wenn du ein Lieblingsteil hast, sag es uns. Eine physische Referenz ist der schnellste Weg, sich beim Stoff abzustimmen.

## 4. Artwork und Veredelung

Entscheide, wie dein Design aufs Kleidungsstück kommt: Siebdruck, DTF, DTG, Stickerei, 3D-Patches oder Prägung. Jedes Verfahren passt zu anderem Artwork, anderen Farben und anderen Budgets. Schick dein Artwork möglichst als Vektordatei (AI, EPS, SVG oder PDF) und markiere die Platzierung: Brust, Rücken, Ärmel oder Saum.

## 5. Labels und Verpackung

Labels verändern, wie sich ein Kleidungsstück in der Hand anfühlt. Neck Tags, Hang Tags, Design Tags und Jeans Tags tragen deine Marke. Wähle die, die deine Positionierung unterstützen, statt alles hinzuzufügen. BEWE4R bietet außerdem Verpackungen und Brand Essentials wie Zip Bags, Versandtaschen, Kartons, Dankeskarten und Sticker.

## 6. Zeitplan und Budget

Teile deinen Launch-Termin und eine Ziel-Preisspanne früh mit. Sie steuern Entscheidungen bei Stoff, Verfahren und Stückzahlen und zeigen uns, ob ein Pre-Order oder ein gestaffelter Launch sinnvoll ist.

## 7. Der Techpack

Ein Techpack ist ideal, weil er Raten überflüssig macht, aber er ist nicht zwingend erforderlich. Wenn du nur ein Konzept oder Skizzen hast, schick sie uns. Wir helfen dir, daraus einen Techpack zu machen.

## Eine einfache Checkliste für deine erste Anfrage

- Produkttyp und Passform
- Stückzahl pro Farbe und Design
- Farben und Größen
- Stoffrichtung oder ein Referenzteil
- Artwork-Dateien und Veredelungsverfahren
- Labels und Verpackung
- Launch-Termin
- Ziel-Preisspanne
- Zielland
- Referenzbilder und Skizzen

## Nächster Schritt

Wenn du diese Punkte beisammen hast, kann es losgehen. Starte mit einem [Sample](/your-brand/sample), lies die Details zu den [Mindestmengen](/your-brand/moq) oder [melde dich bei uns](/contact).`,
    },
  },
  {
    slug: "blank-customisation-vs-custom-production",
    publishedAt: "2026-10-22",
    updatedAt: "2026-10-22",
    author: "BEWE4R Team",
    image: garmentRailImg,
    imageWidth: 1000,
    imageHeight: 1000,
    en: {
      title: "Blank Customisation vs. Fully Custom Production: Which One Fits Your Brand?",
      seoTitle: "Blank Customisation vs. Custom Production",
      excerpt:
        "Start from a premium blank or develop a garment from scratch? Neither is better in general. Here is how to decide based on your goal, budget and timeline.",
      description:
        "Blank customisation or fully custom production? Compare quantities, timeline, budget and use cases to decide which route fits your clothing brand.",
      keywords:
        "blank customisation, custom clothing production, premium blanks, private label clothing, custom cut and sew, start a clothing brand, first drop",
      category: "Strategy",
      tags: ["Blanks", "Custom production", "Private label"],
      content: `Every clothing brand eventually faces the same decision: start from a premium blank and brand it, or develop a garment from scratch. Neither is better in general. They solve different problems, and the right choice depends on your goal, your budget and your timeline.

## What is blank customisation?

You start with a premium blank, a finished high-quality garment such as a T-shirt, hoodie or crewneck, and turn it into your product with print, embroidery and your own label. The fit and fabric are already proven, so your effort goes into branding. At BEWE4R, blanks start from 30 pieces.

## What is fully custom production?

You define the garment itself: silhouette, fabric, proportions and details, described in a techpack. We develop a sample, you approve it, and the full run follows. The result is a product nobody else has.

## When blanks make sense

- A first drop where you want to test the market with limited risk
- Merch for events, creators, teams or communities
- Collections where the story is in the graphic, not in the cut
- Tight timelines, since there is no pattern or fabric development

## When custom makes sense

- Brands whose identity depends on a signature fit or fabric
- Hero pieces that should be impossible to compare with anyone else's
- Larger collections with a consistent design language
- Products with special construction or details

## Minimum quantities, timeline and budget

**Quantities.** Minimums start at 30 pieces for T-shirts, hoodies and crewnecks and at 50 for caps, shorts and joggers, per colour and design. For a fully custom design we confirm the minimum in your offer, because it depends on fabric and construction.

**Timeline.** Blanks are generally faster because the garment already exists. Custom takes longer because the sample has to be developed and approved first.

**Budget.** Blanks usually mean a lower entry cost. Custom is a bigger investment up front, but it gives you a product base that you can reuse in future seasons. Printing, embroidery, labels, washes and sample development all influence the final price.

## A middle path

You do not have to choose once. Many brands launch with branded blanks, learn what their customers actually buy, and then develop one or two custom hero pieces.

## Which one fits your project?

Ask yourself three questions:

1. **Is the product defined by the design or by the cut?** Design points to blanks, cut points to custom.
2. **How soon do you need it?** A short timeline points to blanks.
3. **How much risk can you take on the first run?** Lower risk points to blanks.

Not sure? [Send us your idea](/contact) and we will tell you which route fits, or see how a blank becomes a finished product on our [print page](/your-brand/print).`,
    },
    de: {
      title: "Blank-Veredelung oder komplett eigene Produktion: Was passt zu deiner Marke?",
      excerpt:
        "Mit einem Premium-Blank starten oder ein Kleidungsstück von Grund auf entwickeln? Keines ist grundsätzlich besser. So entscheidest du nach Ziel, Budget und Zeitplan.",
      description:
        "Blank-Veredelung oder komplett eigene Produktion? Vergleiche Stückzahlen, Zeitplan, Budget und Einsatzfälle und finde die passende Route für deine Kleidungsmarke.",
      keywords:
        "Blank-Veredelung, eigene Kleidungsproduktion, Premium Blanks, Private Label Kleidung, Cut and Sew, Kleidungsmarke gründen, erster Drop",
      category: "Strategie",
      tags: ["Blanks", "Eigenproduktion", "Private Label"],
      content: `Jede Kleidungsmarke steht irgendwann vor derselben Entscheidung: mit einem Premium-Blank starten und ihn branden oder ein Kleidungsstück von Grund auf entwickeln. Keines von beiden ist grundsätzlich besser. Sie lösen unterschiedliche Probleme, und die richtige Wahl hängt von deinem Ziel, deinem Budget und deinem Zeitplan ab.

## Was ist Blank-Veredelung?

Du startest mit einem Premium-Blank, einem fertigen, hochwertigen Kleidungsstück wie T-Shirt, Hoodie oder Crewneck, und machst es mit Druck, Stickerei und deinem eigenen Label zu deinem Produkt. Passform und Stoff sind bereits bewährt, dein Aufwand fließt ins Branding. Bei BEWE4R starten Blanks ab 30 Stück.

## Was ist komplett eigene Produktion?

Du definierst das Kleidungsstück selbst: Silhouette, Stoff, Proportionen und Details, beschrieben in einem Techpack. Wir entwickeln ein Sample, du gibst es frei, danach folgt die Serie. Das Ergebnis ist ein Produkt, das es so kein zweites Mal gibt.

## Wann Blanks sinnvoll sind

- Ein erster Drop, mit dem du den Markt bei begrenztem Risiko testest
- Merch für Events, Creator, Teams oder Communities
- Kollektionen, bei denen die Geschichte in der Grafik liegt und nicht im Schnitt
- Knappe Zeitpläne, weil keine Schnitt- und Stoffentwicklung nötig ist

## Wann Eigenproduktion sinnvoll ist

- Marken, deren Identität von einer typischen Passform oder einem besonderen Stoff abhängt
- Hero-Pieces, die sich mit nichts anderem vergleichen lassen sollen
- Größere Kollektionen mit durchgängiger Designsprache
- Produkte mit besonderer Konstruktion oder besonderen Details

## Mindestmengen, Zeitplan und Budget

**Mengen.** Die Mindestmengen starten bei 30 Stück für T-Shirts, Hoodies und Crewnecks und bei 50 für Caps, Shorts und Jogger, jeweils pro Farbe und Design. Bei einem komplett eigenen Design bestätigen wir die Mindestmenge in deinem Angebot, weil sie von Stoff und Konstruktion abhängt.

**Zeitplan.** Blanks sind in der Regel schneller, weil das Kleidungsstück bereits existiert. Eigenproduktion dauert länger, weil zuerst ein Sample entwickelt und freigegeben werden muss.

**Budget.** Blanks bedeuten meist geringere Einstiegskosten. Eigenproduktion ist eine größere Investition zu Beginn, liefert dir aber eine Produktbasis, die du in kommenden Saisons wiederverwenden kannst. Druck, Stickerei, Labels, Waschungen und Sample-Entwicklung beeinflussen den Endpreis.

## Ein Mittelweg

Du musst dich nicht einmalig entscheiden. Viele Marken starten mit gebrandeten Blanks, lernen, was ihre Kunden tatsächlich kaufen, und entwickeln dann ein bis zwei eigene Hero-Pieces.

## Was passt zu deinem Projekt?

Stell dir drei Fragen:

1. **Wird das Produkt durch das Design oder durch den Schnitt bestimmt?** Design spricht für Blanks, Schnitt für Eigenproduktion.
2. **Wie schnell brauchst du es?** Ein kurzer Zeitplan spricht für Blanks.
3. **Wie viel Risiko willst du beim ersten Lauf eingehen?** Weniger Risiko spricht für Blanks.

Unsicher? [Schick uns deine Idee](/contact) und wir sagen dir, welcher Weg passt, oder sieh auf unserer [Print-Seite](/your-brand/print), wie aus einem Blank ein fertiges Produkt wird.`,
    },
  },
];

export function getBlogPost(slug: string): BlogPostData | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

/** Newest first. */
export function getSortedBlogPosts(): BlogPostData[] {
  return [...BLOG_POSTS].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

/** Reading time in minutes (about 200 words per minute, at least 1). */
export function readingMinutes(markdown: string): number {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function formatBlogDate(iso: string, lang: BlogLang): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString(lang === "de" ? "de-DE" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
