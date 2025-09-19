ASSISTANT IA - Extension Chrome
==============================

Une extension Chrome simple pour poser vos questions à une IA directement depuis votre navigateur en utilisant le modèle GPT-3.5-turbo d'OpenAI.

Fonctionnalités
---------------
- Interface popup intuitive avec zone de texte et bouton d'envoi
- Alimentée par l'API OpenAI pour des réponses intelligentes
- Temps de réponse rapide avec un design moderne et épuré
- Image de fond personnalisable

Installation
------------
Prérequis :
- Google Chrome (version 88+)
- Clé API OpenAI valide

Installation manuelle :
1. Clonez le dépôt :
   git clone https://github.com/gabrieldrdt/Extension-Ia.git
   cd assistant-ia-extension

2. Configurez votre clé API :
   - Ouvrez `popup.js`
   - Remplacez "TON_API" par votre clé API OpenAI :
     const apiKey = "sk-votre-cle-api-openai";

3. Chargez l'extension :
   - Allez dans chrome://extensions/
   - Activez le "Mode développeur" (coin supérieur droit)
   - Cliquez "Charger l'extension non empaquetée" et sélectionnez le dossier du projet

4. Testez-la :
   - Cliquez sur l'icône de l'extension dans Chrome
   - Saisissez une question et cliquez "ENVOYER"

Structure du projet
-------------------
image/
├── Assistant.png       # Icône de l'extension
└── assistantia3.png    # Image de fond
popup.html             # Interface principale
popup.css              # Styles
popup.js               # Logique API
manifest.json          # Configuration de l'extension

Configuration
-------------
Obtenir une clé API OpenAI :
1. Inscrivez-vous sur https://platform.openai.com/
2. Allez dans "API Keys" et créez une nouvelle clé secrète
3. Copiez la clé dans `popup.js`

Personnalisation :
- Changez le modèle dans `popup.js` (ex: de gpt-3.5-turbo à gpt-4)
- Ajustez `max_tokens` (par défaut : 150) pour la longueur des réponses
- Modifiez le prompt système dans `popup.js`

Dépannage
---------
- "Erreur communication IA" : Vérifiez votre clé API
- Extension ne se charge pas : Assurez-vous que le mode développeur est activé
- Pas de réponse : Vérifiez votre connexion internet

Contribution
------------
1. Fork du dépôt
2. Créez une branche : git checkout -b feature/nouvelle-fonctionnalite
3. Commit des changements : git commit -m 'Ajout : nouvelle fonctionnalité'
4. Push de la branche : git push origin feature/nouvelle-fonctionnalite
5. Ouvrez une Pull Request

Licence
-------
Licence MIT - voir le fichier LICENSE

Contact
-------
Pour les problèmes, ouvrez un ticket sur https://github.com/gabrieldrdt

---
Fait avec ❤️ pour les passionnés d'IA
Version : 1.0
Dernière mise à jour : 19 Septembre 2025