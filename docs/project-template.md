# Vorlage: Neues Projekt

Ausfüllen und an Claude schicken – Stichpunkte auf Deutsch reichen, die englischen
Texte für die Seite formuliert Claude. Was du nicht weißt oder nicht nennen willst,
einfach leer lassen.

```
=== NEUES PROJEKT ===

1. NAME
   Wie soll das Projekt heißen?

2. WORUM GEHT ES? (1–2 Sätze)
   Was ist es, und welches Problem löst es?

3. KONTEXT
   Job / Ausbildung / Studium / privat?
   Zeitraum (ungefähr):
   Status: läuft noch / abgeschlossen / nicht im Einsatz
   Darf der Firmenname genannt werden? ja / nein

4. TECHNOLOGIEN
   Sprachen, Frameworks, Datenbanken, Cloud, Tools:

5. AUFBAU (für die Grafik)
   Wer nutzt es bzw. ruft es auf?
   Welche Teile hat es (z. B. API, Datenbank, Queue, Frontend)?
   Mit welchen anderen Systemen oder APIs ist es verbunden?
   Wie fließen die Daten (wann passiert was)?

6. MEINE ROLLE
   Was habe ich konkret gemacht?
   Allein oder im Team (wie groß)?
   War ich an Architektur oder Konzept beteiligt?
   Hat KI geholfen? Wenn ja, wofür?

7. HIGHLIGHTS (2–4 Punkte)
   Worauf bin ich stolz?
   Was war technisch knifflig, und wie habe ich es gelöst?
   Gibt es Ergebnisse oder Verbesserungen (auch ungefähr, z. B. "viel schneller")?

8. BILD
   Ich habe einen Screenshot  /  Bitte Grafik erstellen

9. SONSTIGES (optional)
   Was soll NICHT erwähnt werden?
   Live-Link, falls öffentlich?
```

## Ablauf

1. Unklares oder Widersprüchliches fragt Claude nach, bevor etwas angenommen wird.
2. Claude erstellt die Grafik und schreibt Kurzbeschreibung, Überblick, „My role“ und „Highlights“.
3. Du bekommst Screenshots zum Prüfen; Annahmen werden ausdrücklich genannt.
4. Wenn alles passt, erstellt Claude den Pull Request.

Bei Arbeitsprojekten dürfen Interna (Systemnamen, Zahlen) im Chat genannt werden –
unter Punkt 9 vermerken, dass sie nicht auf die Seite sollen.
