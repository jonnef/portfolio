import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection } from "../components/Legal";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
};

const linkClass = "text-accent hover:underline dark:text-emerald-400";

export default function DatenschutzPage() {
  return (
    <LegalPage title="Datenschutzerklärung">
      <LegalSection heading="1. Verantwortlicher">
        <p>
          Verantwortlich für die Datenverarbeitung auf dieser Website ist die im{" "}
          <Link href="/impressum" className={linkClass}>Impressum</Link> genannte Person.
        </p>
      </LegalSection>

      <LegalSection heading="2. Das Wichtigste in Kürze">
        <p>
          Diese Website ist ein privates Portfolio. Sie setzt keine Cookies, verwendet keine Analyse- oder
          Tracking-Dienste, bindet keine Inhalte von Drittanbietern ein und enthält keine Formulare.
          Personenbezogene Daten fallen nur in den unten beschriebenen Fällen an.
        </p>
      </LegalSection>

      <LegalSection heading="3. Hosting und Server-Logfiles">
        <p>
          Diese Website wird bei Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA gehostet.
          Beim Aufruf der Website verarbeitet Vercel automatisch Daten, die Ihr Browser übermittelt
          (Server-Logfiles):
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>IP-Adresse</li>
          <li>Datum und Uhrzeit des Zugriffs</li>
          <li>aufgerufene Seite bzw. Datei</li>
          <li>Referrer-URL (zuvor besuchte Seite)</li>
          <li>verwendeter Browser und Betriebssystem</li>
        </ul>
        <p>
          Die Verarbeitung ist erforderlich, um die Website auszuliefern sowie ihre Stabilität und
          Sicherheit zu gewährleisten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO; mein berechtigtes
          Interesse liegt im sicheren und fehlerfreien Betrieb der Website. Die Logfiles werden von Vercel
          nur für einen begrenzten Zeitraum gespeichert und anschließend gelöscht.
        </p>
        <p>
          Dabei können Daten in die USA übertragen werden. Vercel ist nach dem EU-US Data Privacy
          Framework zertifiziert; für die USA liegt damit ein Angemessenheitsbeschluss der
          EU-Kommission vor (Art. 45 DSGVO). Mit Vercel besteht ein Vertrag zur Auftragsverarbeitung
          (Art. 28 DSGVO). Weitere Informationen:{" "}
          <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className={linkClass}>
            Datenschutzerklärung von Vercel
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection heading="4. Schriftarten">
        <p>
          Die verwendeten Schriftarten werden direkt von diesem Server ausgeliefert. Beim Aufruf der
          Website wird keine Verbindung zu Servern von Google oder anderen Schriftanbietern aufgebaut.
        </p>
      </LegalSection>

      <LegalSection heading="5. Speicherung der Darstellungseinstellung">
        <p>
          Wenn Sie zwischen hellem und dunklem Design wechseln, wird Ihre Auswahl im lokalen Speicher
          (Local Storage) Ihres Browsers abgelegt, damit sie beim nächsten Besuch erhalten bleibt. Diese
          Information verlässt Ihr Gerät nicht und wird nicht an mich übertragen. Die Speicherung ist
          für die von Ihnen ausdrücklich gewünschte Funktion unbedingt erforderlich (§ 25 Abs. 2 Nr. 2
          TDDDG). Sie können sie jederzeit über die Einstellungen Ihres Browsers löschen.
        </p>
      </LegalSection>

      <LegalSection heading="6. Links zu LinkedIn und GitHub">
        <p>
          Diese Website enthält einfache Links zu meinen Profilen bei LinkedIn und GitHub. Es handelt
          sich nicht um eingebettete Plugins: Erst wenn Sie einen Link anklicken, verlassen Sie diese
          Website, und es gelten die Datenschutzbestimmungen des jeweiligen Anbieters.
        </p>
      </LegalSection>

      <LegalSection heading="7. Kontakt per E-Mail">
        <p>
          Wenn Sie mich per E-Mail kontaktieren, verarbeite ich Ihre Angaben (z. B. Name, E-Mail-Adresse,
          Inhalt der Nachricht), um Ihre Anfrage zu beantworten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f
          DSGVO bzw. lit. b DSGVO, wenn die Anfrage auf einen Vertrag abzielt. Die Daten werden gelöscht,
          sobald sie für die Bearbeitung nicht mehr erforderlich sind und keine gesetzlichen
          Aufbewahrungspflichten entgegenstehen.
        </p>
      </LegalSection>

      <LegalSection heading="8. Ihre Rechte">
        <p>Sie haben jederzeit das Recht auf</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO),</li>
          <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO),</li>
          <li>Löschung (Art. 17 DSGVO),</li>
          <li>Einschränkung der Verarbeitung (Art. 18 DSGVO),</li>
          <li>Datenübertragbarkeit (Art. 20 DSGVO),</li>
          <li>Widerspruch gegen Verarbeitungen auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (Art. 21 DSGVO).</li>
        </ul>
        <p>
          Außerdem können Sie sich bei einer Datenschutz-Aufsichtsbehörde beschweren (Art. 77 DSGVO),
          zum Beispiel bei der Landesbeauftragten für Datenschutz und Informationsfreiheit
          Nordrhein-Westfalen (LDI NRW).
        </p>
      </LegalSection>

      <p className="text-sm text-zinc-500">Stand: Oktober 2026</p>
    </LegalPage>
  );
}
