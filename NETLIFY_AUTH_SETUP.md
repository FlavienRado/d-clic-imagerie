# Configuration Netlify Identity

Ce site utilise **Netlify Identity** pour l'authentification à la place de credentials hardcodés.

## 🔑 Authentification par Email et Mot de Passe

Netlify Identity supporte l'authentification par **email + mot de passe**. Les utilisateurs peuvent:

### Option 1: S'inscrire eux-mêmes (Signup)
Sur la page de connexion, les utilisateurs peuvent cliquer sur **"Sign up"** pour:
1. Entrer leur email
2. Créer un mot de passe sécurisé
3. Valider leur email
4. Accéder au contenu protégé

### Option 2: Être invités par l'administrateur
1. Vous invitez l'utilisateur dans Netlify
2. Il reçoit un email avec un lien de confirmation
3. Il crée son mot de passe
4. Il peut alors se connecter avec email + mot de passe

## 📋 Configuration sur Netlify Dashboard

### 1. Activer Netlify Identity
1. Allez sur votre site dans le [dashboard Netlify](https://app.netlify.com)
2. Cliquez sur **Authentication** dans la sidebar
3. Sélectionnez **Enable Identity** 
4. Cliquez **Save**

### 2. Configurer le Social Login (Optionnel)
Si vous voulez en plus supporter Google/GitHub:
1. Allez dans **Settings** > **Identity** > **Providers**
2. Cliquez sur le provider (Google, GitHub, etc.)
3. Configurez les credentials

### 3. Créer des Utilisateurs

**Méthode A: Invitation directe**
1. Allez dans **Authentication** > **Users**
2. Cliquez **Invite user**
3. Entrez l'email
4. Cliquez **Send invite**
5. L'utilisateur recevra un email pour créer son mot de passe

**Méthode B: Auto-inscription**
1. Allez dans **Settings** > **Identity**
2. Cochez **Allow signups** pour permettre aux utilisateurs de créer leur compte eux-mêmes
3. Les utilisateurs peuvent alors s'inscrire directement via le widget

### 4. Gérer les Inscriptions

Pour **restreindre les inscriptions** (invitations uniquement):
1. Dans **Settings** > **Identity**
2. Décochez **Allow signups**
3. Seules les personnes invitées peuvent se connecter

## 📱 Interface Utilisateur

### Formulaire de Connexion (Login)
L'utilisateur entre:
- Email
- Mot de passe
- Clique "Log In"

### Formulaire d'Inscription (Sign Up)
L'utilisateur entre:
- Email
- Mot de passe sécurisé
- Email is automatically verified (pour d'autres providers)
- Clique "Sign Up"

## 🔐 Sécurité des Mots de Passe

✅ Les mots de passe sont:
- Hashés et chiffrés par Netlify
- Jamais stockés en clair
- Jamais visibles dans votre code
- Conformes aux standards de sécurité (bcrypt)

## 📄 Pages Protégées
Les pages suivantes nécessitent une authentification:
- `/examens/scanner.html`
- `/examens/irm.html`
- `/examens/eeg.html`
- `/examens/mammographie.html`
- `/examens/scintigraphie.html`
- `/parcours.html`
- `/ressources.html`

## ✨ Avantages
✅ Pas de credentials hardcodés  
✅ Mots de passe sécurisés  
✅ Gestion centralisée des utilisateurs  
✅ Récupération de mot de passe automatique  
✅ Authentification multi-facteurs disponible  
✅ Audit trail des connexions  

## 🧪 Test Local

Pour tester avec Netlify CLI:
```bash
npm install -g netlify-cli
netlify dev
```
Puis allez sur http://localhost:8888 - le widget d'authentification fonctionnera complètement.

## 🆘 Troubleshooting

### "Widget not loading"
- Vérifiez que Netlify Identity est activé sur le site
- Vérifiez la connexion internet
- Ouvrez la console (F12) pour voir les erreurs

### "Unable to create account"
- Vérifiez que "Allow signups" est activé dans Settings > Identity
- L'utilisateur doit utiliser un email valide

### "Password reset"
Les utilisateurs peuvent réinitialiser leur mot de passe depuis le forgottena password sur la page de connexion (le widget affiche automatiquement cette option).

