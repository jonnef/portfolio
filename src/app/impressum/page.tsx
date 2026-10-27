import type { Metadata } from "next";
import { LegalPage, LegalSection, Missing } from "../components/Legal";
import { site } from "../data/site";

export const metadata: Metadata = {
  title: "Impressum",
};

export default function ImpressumPage() {
  const { address, email } = site.legal;

  return (
    <LegalPage title="Impressum">
      <LegalSection heading="Angaben gemäß § 5 DDG">
        <p>
          {site.name}
          <br />
          {address ? (
            address.map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))
          ) : (
            <Missing>Anschrift folgt</Missing>
          )}
        </p>
      </LegalSection>

      <LegalSection heading="Kontakt">
        <p>
          E-Mail:{" "}
          {email ? (
            <a href={`mailto:${email}`} className="text-accent hover:underline dark:text-emerald-400">
              {email}
            </a>
          ) : (
            <Missing>E-Mail-Adresse folgt</Missing>
          )}
        </p>
      </LegalSection>

      <LegalSection heading="Verantwortlich für den Inhalt">
        <p>{site.name}, Anschrift wie oben.</p>
      </LegalSection>
    </LegalPage>
  );
}
