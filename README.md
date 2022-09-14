# Wode

Un PoC de binary (qui n'a rien de binaire en fait) qui remplace tous les "n" par des "w" (majuscules également) dans les payloads renvoyés par une app Express. Je sais, ça n'a aucun sens, c'est juste un PoC.

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

L'unique contrainte pour que tout roule, c'est que votre point d'entrée exporte l'instance de `Server` retournée par `app.listen()`

```js
// la modif à effectuer dans myServer.js
module.exports = app.listen(port)

// si la création du serveur est async, ça marche aussi
module.exports = createServerAsync().then(app => app.listen(port))

```

