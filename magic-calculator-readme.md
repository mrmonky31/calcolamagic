# Calcolatrice Magica

Questa è una calcolatrice web interattiva con funzionalità "magiche" nascoste. È progettata per essere utilizzata in performance di magia matematica e può essere installata come Progressive Web App (PWA).

## Caratteristiche

- Design ispirato alla calcolatrice iOS
- Operazioni aritmetiche di base
- Tre slot magici nascosti per memorizzare valori
- Menu nascosto accessibile con una sequenza speciale di tasti
- Effetti visivi per il feedback dei tasti
- Funzionalità PWA per l'installazione su dispositivi

## Come usare

1. Apri `index.html` nel tuo browser web o installa l'app se supportato dal tuo dispositivo.
2. Usa la calcolatrice come una normale calcolatrice.
3. Per accedere al menu nascosto, premi il tasto % tre volte in rapida successione (entro 1,5 secondi).
4. Nel menu nascosto, puoi impostare valori per gli slot magici.
5. Usa il tasto ± per selezionare tra i tre slot quando non sei nel menu nascosto.
6. Durante una moltiplicazione, il risultato mostrerà il valore dello slot magico selezionato.

## Sviluppo

Per contribuire al progetto:

1. Clona il repository
2. Modifica i file `index.html`, `styles.css`, o `script.js` secondo necessità
3. Aggiorna `manifest.json` e `sw.js` se necessario per modifiche alla PWA

## File del progetto

- `index.html`: Struttura HTML principale
- `styles.css`: Stili CSS
- `script.js`: Logica JavaScript
- `manifest.json`: Manifest per la PWA
- `sw.js`: Service Worker per funzionalità offline e caching
- `icon-192x192.png` e `icon-512x512.png`: Icone per la PWA (da aggiungere)

Nota: Assicurati di aggiungere le icone menzionate nel manifest per una completa funzionalità PWA.

## Licenza

Questo progetto è rilasciato sotto la licenza MIT. Vedi il file `LICENSE` per i dettagli.
