import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useTranslation } from "react-i18next";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function TermsPage() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [lang, setLang] = useState<"en" | "de">("en");

  const isEn = lang === "en";

  return (
    <div className="bg-black text-white">
      {/* Hero */}
      <section
        className="relative min-h-[35svh] flex items-end overflow-hidden"
        style={{ backgroundColor: "#ffffff", color: "#0f0f0f" }}
      >
        <div className="max-w-7xl mx-auto w-full px-6 pb-12 pt-24 flex items-end justify-between">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] tracking-tight"
          >
            {isEn ? "Terms and Conditions" : "AGB"}
          </motion.h1>
          {/* Inline language switch */}
          <div className="flex items-center gap-2 text-sm pb-2">
            <button
              onClick={() => setLang("en")}
              className="px-3 py-1 rounded-[2px] transition-colors"
              style={
                isEn
                  ? { backgroundColor: "#0f0f0f", color: "#ffffff" }
                  : { color: "rgba(15,15,15,0.5)" }
              }
            >
              EN
            </button>
            <button
              onClick={() => setLang("de")}
              className="px-3 py-1 rounded-[2px] transition-colors"
              style={
                !isEn
                  ? { backgroundColor: "#0f0f0f", color: "#ffffff" }
                  : { color: "rgba(15,15,15,0.5)" }
              }
            >
              DE
            </button>
          </div>
        </div>
      </section>

      {/* Content */}
      <section ref={ref} className="relative" style={{ backgroundColor: "#ffffff", color: "#0f0f0f" }}>
        <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
            className="space-y-12"
          >
            <PolicySection t={t} title={isEn ? "1. Scope of Application" : "1. Geltungsbereich"}>
              {isEn ? (
                <>
                  <p>
                    These Terms and Conditions (“T&Cs”) apply to all contracts between BEWE4R LLC (hereinafter referred to as the “Provider”) and its customers (businesses and consumers) concerning the manufacture and supply of custom-made textile products.
                  </p>
                  <p>
                    Any terms and conditions of the customer that differ from or conflict with these T&Cs shall not apply unless expressly accepted by the Provider in writing.
                  </p>
                  <p>
                    These T&Cs also apply to all inquiries, quotations, sample productions, repeat productions, bulk orders, and any other orders for products or services provided by the Provider.
                  </p>
                  <p>
                    By placing an order, confirming an order in writing, paying an invoice or deposit, or approving a production sample, the customer acknowledges and accepts these T&Cs in their current version as legally binding.
                  </p>
                  <p>
                    These Terms and Conditions apply regardless of whether the order concerns a sample, repeat production, small production run, or bulk order.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen BEWE4R LLC (nachfolgend „Anbieter“) und ihren Kunden (Unternehmen und Verbraucher) über die Herstellung und Lieferung individuell gefertigter Textilprodukte. Abweichende Bedingungen des Kunden werden nicht anerkannt, es sei denn, sie wurden ausdrücklich schriftlich bestätigt.
                  </p>
                  <p>
                    Zusätzlich gelten diese Allgemeinen Geschäftsbedingungen für sämtliche Anfragen, Angebote, Musterproduktionen (Samples), Nachproduktionen, Großbestellungen (Bulk Orders) sowie jede weitere Beauftragung von Dienstleistungen oder Waren des Anbieters.
                  </p>
                  <p>
                    Mit der Erteilung einer Bestellung, der schriftlichen Auftragsbestätigung, der Zahlung einer Rechnung oder Anzahlung oder der Freigabe eines Samples erkennt der Kunde diese Allgemeinen Geschäftsbedingungen in ihrer jeweils gültigen Fassung als verbindlich an.
                  </p>
                  <p>
                    Die Geltung dieser Allgemeinen Geschäftsbedingungen ist unabhängig davon, ob es sich um eine Sample-Bestellung, eine Nachproduktion, eine Kleinserie oder eine Großbestellung handelt.
                  </p>
                </>
              )}
            </PolicySection>

            <PolicySection t={t} title={isEn ? "2. Subject of the Contract" : "2. Vertragsgegenstand"}>
              {isEn ? (
                <>
                  <p>The Provider manufactures custom textile products according to the customer’s specifications.</p>
                  <p>A contract shall only become effective upon written confirmation of the order by the Provider.</p>
                </>
              ) : (
                <>
                  <p>Der Anbieter stellt nach Kundenvorgaben maßgefertigte Textilprodukte her.</p>
                  <p>Ein Vertrag kommt erst durch eine schriftliche Bestätigung der Bestellung durch den Anbieter zustande.</p>
                </>
              )}
            </PolicySection>

            <PolicySection t={t} title={isEn ? "3. Ordering Process & Production Procedure" : "3. Bestellprozess & Produktionsablauf"}>
              {isEn ? (
                <>
                  <p>The customer submits an inquiry containing the desired product specifications.</p>
                  <p>After mutual agreement, a paid production sample is created.</p>
                  <p>Once the sample has been approved by the customer, production of the complete order begins.</p>
                  <p>Upon completion, the finished products are shipped to the customer.</p>
                  <p>
                    All samples, designs, tech packs, size charts, color specifications, print files, embroidery files, production files, quantities, and any other production documents approved by the customer shall be deemed final and binding. After approval, the customer assumes full responsibility for the accuracy of all approved specifications.
                  </p>
                  <p>Any requested changes after approval may result in additional costs and corresponding extensions of the agreed production and delivery schedule.</p>
                </>
              ) : (
                <>
                  <p>Der Kunde übermittelt eine Anfrage mit den gewünschten Spezifikationen.</p>
                  <p>Nach Abstimmung wird ein kostenpflichtiges Sample erstellt.</p>
                  <p>Nach Freigabe des Samples beginnt die Produktion der Gesamtbestellung.</p>
                  <p>Nach Fertigstellung wird die Ware an den Kunden versandt.</p>
                  <p>
                    Sämtliche durch den Kunden freigegebenen Samples, Designs, Tech Packs, Maßtabellen, Farbangaben, Druckdaten, Stickdateien, Produktionsdaten, Stückzahlen oder sonstigen Produktionsunterlagen gelten als verbindlich genehmigt. Nach erfolgter Freigabe trägt der Kunde die alleinige Verantwortung für die Richtigkeit der freigegebenen Angaben.
                  </p>
                  <p>Spätere Änderungswünsche können zusätzliche Kosten verursachen und verlängern die vereinbarten Lieferzeiten entsprechend.</p>
                </>
              )}
            </PolicySection>

            <PolicySection t={t} title={isEn ? "4. Minimum Order Quantities & Production Overage" : "4. Mindestbestellmengen & Produktionsüberschuss"}>
              {isEn ? (
                <>
                  <p>The minimum order quantity (MOQ) varies depending on the product category and ranges between 50 and 70 pieces.</p>
                  <p>Due to manufacturing processes, a small production overage may occur and must be accepted by the customer.</p>
                  <ul className="mt-2 space-y-1 list-disc pl-5">
                    <li>Orders below 100 pieces: maximum overage of 10–20 pieces</li>
                    <li>Orders up to 1,000 pieces: maximum overage of 50 pieces</li>
                  </ul>
                  <p>
                    Because production utilizes full fabric rolls, slight quantity deviations are unavoidable. The Provider will make every reasonable effort to keep any overage as low as possible.
                  </p>
                  <p>
                    For repeat productions, replacement productions, reproductions, or goodwill productions, the customer has no claim to an exact reproduction of the originally ordered size distribution or quantities of individual sizes. The Provider may reasonably adjust the size distribution where required by production constraints, provided that the overall production remains technically and economically feasible.
                  </p>
                  <p>Production-related deviations in individual sizes shall not constitute a defect.</p>
                </>
              ) : (
                <>
                  <p>Die Mindestbestellmenge (MOQ) variiert je nach Produktgruppe zwischen 50 und 70 Stück.</p>
                  <p>Aufgrund der Produktionsprozesse kann ein geringer Überschuss entstehen, der vom Kunden abgenommen werden muss.</p>
                  <ul className="mt-2 space-y-1 list-disc pl-5">
                    <li>Bei Bestellungen unter 100 Stück liegt der mögliche Überschuss bei max. 10–20 Stück.</li>
                    <li>Bei Bestellungen bis 1.000 Stück bei max. 50 Stück.</li>
                  </ul>
                  <p>
                    Da mit ganzen Stoffrollen gearbeitet wird, sind Abweichungen unvermeidbar. Der Anbieter bemüht sich, den Überschuss stets so gering wie möglich zu halten.
                  </p>
                  <p>
                    Bei Nachproduktionen, Ersatzproduktionen, Reproduktionen oder Kulanzproduktionen besteht kein Anspruch auf die exakte Einhaltung ursprünglich bestellter Größenverteilungen oder Stückzahlen einzelner Größen. Der Anbieter ist berechtigt, die Größenverteilung im Rahmen der produktionstechnischen Möglichkeiten anzupassen, sofern die Gesamtproduktion wirtschaftlich und technisch sinnvoll umgesetzt werden kann.
                  </p>
                  <p>Produktionsbedingte Abweichungen bei einzelnen Größen stellen keinen Sachmangel dar.</p>
                </>
              )}
            </PolicySection>

            <PolicySection t={t} title={isEn ? "5. Prices & Payment Terms" : "5. Preise & Zahlungsbedingungen"}>
              {isEn ? (
                <>
                  <p>Samples: Full payment is required in advance.</p>
                  <p>
                    Production Orders: A deposit of 50% of the total order value is due before production begins. The remaining 50% must be paid upon completion of production and before shipment.
                  </p>
                  <p>Goods will only be shipped after full payment has been received.</p>
                </>
              ) : (
                <>
                  <p>Samples: Zahlung erfolgt vollständig vorab (Vorkasse).</p>
                  <p>
                    Gesamtbestellung: 50 % des Gesamtbetrags sind vor Produktionsbeginn zu zahlen, die restlichen 50 % nach Fertigstellung, jedoch vor Versand. Die Auslieferung erfolgt erst nach vollständiger Zahlung.
                  </p>
                </>
              )}
            </PolicySection>

            <PolicySection t={t} title={isEn ? "6. Delivery Times" : "6. Lieferzeiten"}>
              {isEn ? (
                <>
                  <p>Delivery times depend on material availability, production capacity, and manufacturing requirements.</p>
                  <p>
                    Delays caused by external factors, including but not limited to supply chain disruptions, customs clearance, or public holidays, may occur.
                  </p>
                  <p>No claims for damages shall arise as long as the total delivery time does not exceed 10 weeks.</p>
                  <p>
                    If delivery exceeds 10 weeks and the delay is demonstrably attributable solely to the Provider, the customer’s sole remedy shall be a credit note or price reduction of up to 30% of the order value. Any further claims are excluded.
                  </p>
                  <p>
                    Losses, delays, or damage caused by external shipping companies (including but not limited to DHL, UPS, DPD, Yurtiçi Kargo, etc.) shall not be considered delivery delays under this section. Such cases are governed exclusively by Section 8.
                  </p>
                </>
              ) : (
                <>
                  <p>Die Lieferzeiten hängen von Materialverfügbarkeit, Auftragslage und Produktionsaufwand ab.</p>
                  <p>Verzögerungen durch externe Faktoren (z. B. Lieferkettenprobleme, Zoll, Feiertage) können auftreten.</p>
                  <p>Bis zu einer Gesamtlieferzeit von 10 Wochen besteht kein Anspruch auf Schadensersatz.</p>
                  <p>
                    Wird die Lieferzeit von 10 Wochen überschritten und liegt die Verzögerung nachweislich im Verantwortungsbereich des Anbieters, erfolgt eine Gutschrift oder Preisminderung von maximal 30 % des Auftragswertes. Weitergehende Ansprüche sind ausgeschlossen.
                  </p>
                  <p>
                    Verluste während des Transports oder durch externe Versanddienstleister (z. B. DPD, DHL, UPS, Yurtici Cargo u. a.) gelten nicht als Lieferverzögerung im Sinne dieser Regelung. In solchen Fällen greift ausschließlich § 8 (Haftungsausschluss bei Versand).
                  </p>
                </>
              )}
            </PolicySection>

            <PolicySection t={t} title={isEn ? "7. Product Defects & Cancellation" : "7. Haftung für Mängel & Stornierung"}>
              {isEn ? (
                <>
                  <p>
                    Cash refunds relating to manufacturing defects are generally excluded because all production materials have already been purchased and irreversibly processed.
                  </p>
                  <p>
                    If any production defect does not materially affect the overall marketability or resale value of the goods, the customer shall not be entitled to compensation, replacement, or reimbursement.
                  </p>
                  <p>
                    Any reproduction of defective goods shall be made solely at the Provider’s discretion and subject to available production capacity. The customer has no legal entitlement to a replacement production.
                  </p>
                  <p>
                    Where the products remain commercially usable despite any defect, the Provider may, at its sole discretion, grant a goodwill discount on a future order. No legal claim exists for such goodwill.
                  </p>
                  <p>
                    All complaints must be submitted in writing within 7 calendar days after the delivery date shown in the shipment tracking information.
                  </p>
                  <p>After this period, all claims regarding obvious defects shall be excluded.</p>
                  <p>Late complaints shall not entitle the customer to refunds or replacement production.</p>
                </>
              ) : (
                <>
                  <p>
                    Jegliche Rückerstattung in Geldform im Zusammenhang mit Produktionsmängeln ist grundsätzlich ausgeschlossen, da sämtliche für die Produktion erforderlichen Materialien bereits beschafft und unwiderruflich verarbeitet wurden.
                  </p>
                  <p>
                    Im Falle von Produktionsmängeln, die die allgemeine Marktfähigkeit oder den Weiterverkaufswert der Ware nicht wesentlich beeinträchtigen, besteht kein Anspruch auf Ersatz, Entschädigung oder sonstige Rückerstattung.
                  </p>
                  <p>
                    Eine etwaige Neuproduktion mangelhafter Ware erfolgt ausschließlich nach freiem Ermessen des Anbieters und nur unter dem Vorbehalt verfügbarer Kapazitäten in der Produktionslinie. Ein Anspruch hierauf besteht nicht.
                  </p>
                  <p>
                    Sofern die Ware trotz etwaiger Mängel weiterhin kommerziell verwertbar ist, kann der Anbieter nach eigenem Ermessen einen Kulanzrabatt auf eine zukünftige Bestellung gewähren. Ein rechtlicher Anspruch hierauf besteht nicht.
                  </p>
                  <p>
                    Reklamationen jeglicher Art sind innerhalb von 7 Kalendertagen nach der in der Tracking-ID ausgewiesenen Zustellung schriftlich geltend zu machen.
                  </p>
                  <p>Nach Ablauf dieser Frist sind sämtliche Ansprüche aus offensichtlichen Mängeln ausgeschlossen.</p>
                  <p>Eine spätere Beanstandung berechtigt weder zu einer Rückerstattung noch zu einer Nachproduktion.</p>
                </>
              )}
            </PolicySection>

            <PolicySection t={t} title={isEn ? "8. Shipping Disclaimer" : "8. Haftungsausschluss bei Versand"}>
              {isEn ? (
                <>
                  <p>
                    The Provider assumes no liability for loss, damage, or delays caused by third-party shipping carriers, including but not limited to DHL, UPS, DPD, Yurtiçi Kargo, or similar logistics providers.
                  </p>
                  <p>The Provider will reasonably assist the customer in communicating with the shipping company where appropriate.</p>
                  <p>
                    Any voluntary refund or replacement shipment provided by the Provider shall be made purely as a gesture of goodwill and shall not constitute any legal obligation or acknowledgment of liability.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Der Anbieter übernimmt keine Haftung für Verlust, Beschädigung oder Verzögerung der Ware durch externe Versanddienstleister (z. B. DPD, DHL, UPS, Yurtici Cargo etc.).
                  </p>
                  <p>Der Anbieter unterstützt den Kunden kulanzweise bei der Klärung und Nachverfolgung mit dem Versandunternehmen.</p>
                  <p>
                    In Fällen, in denen der Anbieter freiwillig eine teilweise Rückzahlung oder Neuversendung vornimmt, geschieht dies ohne rechtliche Verpflichtung.
                  </p>
                </>
              )}
            </PolicySection>

            <PolicySection t={t} title={isEn ? "9. Limitation of Liability" : "9. Haftungsbeschränkung"}>
              {isEn ? (
                <>
                  <p>The Provider shall not be liable for:</p>
                  <ul className="mt-2 space-y-1 list-disc pl-5">
                    <li>production delays caused by force majeure, material shortages, or transportation disruptions;</li>
                    <li>industry-standard tolerances relating to color, fabric texture, stitching, or measurements;</li>
                    <li>damage resulting from improper storage or use of the goods by the customer.</li>
                  </ul>
                  <p>
                    The Provider shall not be liable for lost profits, lost revenue, delayed product launches, missed sales opportunities, reputational damage, marketing expenses, storage costs, or any other indirect or consequential economic losses.
                  </p>
                  <p>
                    The Provider shall also not be liable for the customer’s subjective expectations regarding sales performance, market success, product demand, or commercial profitability.
                  </p>
                  <p>
                    To the fullest extent permitted by law, the Provider’s maximum liability shall be limited to the amount actually paid by the customer for the relevant order.
                  </p>
                </>
              ) : (
                <>
                  <p>Der Anbieter haftet nicht für:</p>
                  <ul className="mt-2 space-y-1 list-disc pl-5">
                    <li>Produktionsverzögerungen durch höhere Gewalt, Materialengpässe oder Transportprobleme;</li>
                    <li>branchenübliche Toleranzen bei Farbe, Stoffstruktur, Nähten oder Maßen;</li>
                    <li>Schäden durch unsachgemäße Lagerung oder Nutzung der Ware durch den Kunden.</li>
                  </ul>
                  <p>
                    Der Anbieter haftet nicht für entgangenen Gewinn, ausgebliebene Umsätze, verzögerte Produkt-Releases, verpasste Verkaufsaktionen, Reputationsschäden, Marketingkosten, Lagerkosten oder sonstige mittelbare wirtschaftliche Schäden des Kunden.
                  </p>
                  <p>
                    Eine Haftung für subjektive Erwartungen des Kunden hinsichtlich Verkaufszahlen, Markterfolg, Nachfrageentwicklung oder wirtschaftlicher Verwertbarkeit der Ware ist ausgeschlossen.
                  </p>
                  <p>
                    Die maximale Haftung des Anbieters ist – soweit gesetzlich zulässig – auf den tatsächlich vom Kunden gezahlten Auftragswert beschränkt.
                  </p>
                </>
              )}
            </PolicySection>

            <PolicySection t={t} title={isEn ? "10. No Right of Withdrawal for Custom-Made Products" : "10. Kein Widerrufsrecht für maßgefertigte Ware"}>
              {isEn ? (
                <>
                  <p>
                    As all products are manufactured individually according to the customer’s specifications, no statutory right of withdrawal or cancellation applies.
                  </p>
                  <p>The application of the United Nations Convention on Contracts for the International Sale of Goods (CISG) is expressly excluded.</p>
                </>
              ) : (
                <>
                  <p>
                    Da die angebotenen Produkte individuell nach Kundenspezifikationen gefertigt werden, besteht kein Widerrufsrecht gemäß § 312g Abs. 2 Nr. 1 BGB (Deutschland) sowie Artikel 16 lit. c der Richtlinie 2011/83/EU über die Rechte der Verbraucher.
                  </p>
                  <p>Die Anwendung des Übereinkommens der Vereinten Nationen über Verträge über den internationalen Warenkauf (UN-Kaufrecht / CISG) wird ausdrücklich ausgeschlossen.</p>
                </>
              )}
            </PolicySection>

            <PolicySection t={t} title={isEn ? "11. Governing Law & Jurisdiction" : "11. Gerichtsstand & anwendbares Recht"}>
              {isEn ? (
                <>
                  <p>
                    These Terms and Conditions shall be governed exclusively by the laws of the State of New Mexico, United States, unless mandatory statutory provisions require otherwise.
                  </p>
                  <p>
                    For customers acting as businesses, the exclusive place of performance and jurisdiction shall be Albuquerque, New Mexico, USA.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Es gilt ausschließlich das Recht des US-Bundesstaates New Mexico, soweit dem keine zwingenden gesetzlichen Vorschriften entgegenstehen.
                  </p>
                  <p>
                    Erfüllungsort und Gerichtsstand ist Albuquerque, New Mexico, USA, sofern der Kunde Unternehmer im Sinne der jeweils anwendbaren gesetzlichen Bestimmungen ist.
                  </p>
                </>
              )}
            </PolicySection>

            {/* Address */}
            <motion.div variants={fadeUp} className="pt-4">
              <p className="font-display text-lg tracking-tight mb-3">{isEn ? "Company Address" : "Firmenanschrift"}</p>
              <p className="text-base leading-relaxed" style={{ color: "rgba(15,15,15,0.75)" }}>
                BEWE4R LLC
                <br />
                1209 MOUNTAIN ROAD PL NE, STE R
                <br />
                ALBUQUERQUE, NM 87110
                <br />
                United States
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function PolicySection({
  t,
  title,
  children,
}: {
  t: (key: string) => string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div variants={fadeUp} className="border-b pb-10" style={{ borderColor: "rgba(15,15,15,0.12)" }}>
      <h2 className="font-display text-xl md:text-2xl tracking-tight mb-4">{title}</h2>
      <div className="text-base leading-relaxed space-y-3" style={{ color: "rgba(15,15,15,0.75)" }}>
        {children}
      </div>
    </motion.div>
  );
}
