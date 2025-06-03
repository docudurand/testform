# Serveur d'envoi d'emails pour Render

Ce dépôt contient un serveur Express minimaliste capable d'envoyer des emails via **Nodemailer**.  
Il est prêt à être déployé gratuitement sur [Render](https://render.com/) en connectant ce dépôt GitHub.

## Fonctionnalités

- **API REST** avec deux routes :
  - `GET /` : vérifie que le serveur fonctionne.
  - `POST /send-email` : envoie un email.  
    Corps JSON accepté :
    ```json
    {
      "to": "destinataire@example.com",
      "subject": "Hello",
      "text": "Courriel en texte brut",
      "html": "<h1>Version HTML facultative</h1>"
    }
    ```

- **Nodemailer** configuré par variables d'environnement (`SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`).

## Déploiement rapide sur Render

1. **Fork ou cloner** ce dépôt puis poussez-le sur votre GitHub.
2. Créez un nouveau service **Web** sur Render :
   - Source : votre repo GitHub.
   - Environnement : **Node**.
   - Commande de build : `npm install` (déjà remplie par Render en général).
   - Commande de démarrage : `node index.js`.
3. Dans l'onglet **Environment** de Render, ajoutez vos variables SMTP (host, port, etc.).
4. Cliquez sur **Create Web Service** puis patientez jusqu'à la fin du déploiement.
5. Visitez l'URL fournie par Render ; un `GET /` doit renvoyer `{"status":"OK"}`.

## Test local

```bash
# Installation
npm install
# Copiez .env.example en .env et complétez vos informations SMTP
cp .env.example .env
# Lancement
node index.js
# Dans un second terminal
curl -X POST http://localhost:3000/send-email \
  -H "Content-Type: application/json" \
  -d '{"to":"destinataire@example.com","subject":"Test","text":"Hello from local server"}'
```

## Licence

MIT
