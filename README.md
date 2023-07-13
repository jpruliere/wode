# Wode

Un PoC de binary qui remplace tous les "n" par des "w" (majuscules également) dans les payloads renvoyés par une app Express. Je sais, ça n'a aucun sens, c'est juste un PoC.

## Changelog

### 2.0.0

- Ne nécessite plus d'exporter le serveur dans le point d'entrée spécifié (le serveur est récupéré via un piège sur `http.createServer`)
- Réutilise le même serveur plutôt que de fermer celui créé pour en rouvrir un

## Installation

Le repo n'est pas publié sur NPM mais vous pouvez le cloner et l'ajouter localement

```bash
# dans le repo de votre app
yarn add file:/path/to/wode
```

Pour utiliser Wode, modifiez simplement le script start dans votre `package.json`

```json
{
  "scripts": {
    "start": "wode myServer.js" // au lieu de "node myServer.js"
  }
}
```
