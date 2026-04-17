# Déclic Imagerie - Guide d'Authentification

> **ℹ️ Nouvelle Authentification Sécurisée**: Ce site a été migré vers **Netlify Identity** pour une authentification sécurisée par email et mot de passe.

## 🔐 Authentification par Email + Mot de Passe

Tous les utilisateurs se connectent avec:
- **Email** (unique)
- **Mot de passe** (sécurisé)

**Plus besoin de credentials hardcodés!** ✅

---

## 📋 Guides Disponibles

### Pour les Utilisateurs Finaux
👉 **[USER_GUIDE.md](USER_GUIDE.md)** - Comment se connecter, créer un compte, réinitialiser le mot de passe

### Pour les Administrateurs
👉 **[ADMIN_GUIDE.md](ADMIN_GUIDE.md)** - Comment gérer les utilisateurs et configurer le site

### Pour les Développeurs
👉 **[NETLIFY_AUTH_SETUP.md](NETLIFY_AUTH_SETUP.md)** - Détails techniques de l'implémentation

---

## 🚀 Démarrage Rapide

### Administrateur
1. Allez sur https://app.netlify.com → votre site → **Authentication**
2. Cliquez **Enable Identity**
3. Sélectionnez "Invite only" pour contrôler l'accès
4. Invitez des utilisateurs manuellement

### Utilisateur
1. Attendez une invitation ou créez un compte
2. Allez sur `/login.html`
3. Entrez votre email et mot de passe
4. Accédez au contenu protégé! 🎉

---

## 🔒 Sécurité

| Aspect | Avant | Maintenant |
|--------|--------|-----------|
| Credentials | Hardcod😬| Gérés par Netlify✅ |
| Mots de passe | Hardcodés | Chiffrés+Hashés✅ |
| Gestion des utilisateurs | Manuelle | Centralisée✅ |
| Réinitialisations | Aucune | Automatiques✅ |
| Audit trail | Non | Disponible✅ |

---

## 📱 Architecture

```
Utilisateur
     ↓
login.html (Netlify Identity Widget)
     ↓
js/auth.js (Gestion de l'authentification)
     ↓
Pages Protégées (protect() check)
     ↓
Contenu Sécurisé ✅
```

---

## 📂 Fichiers Modifiés / Créés

### Modifiés
- `js/auth.js` - Implémentation Netlify Identity
- `login.html` - Widget officiel Netlify
- `netlify.toml` - Configuration build

### Créés
- `NETLIFY_AUTH_SETUP.md` - Détails techniques
- `ADMIN_GUIDE.md` - Guide administrateur
- `USER_GUIDE.md` - Guide utilisateur final
- `AUTH_MIGRATION.md` - Ce fichier

---

## 🔑 Pages Protégées

Les pages suivantes demandent une authentification:

| Page | URL |
|------|-----|
| Parcours Patient | `/parcours.html` |
| Ressources | `/ressources.html` |
| Scanner | `/examens/scanner.html` |
| IRM | `/examens/irm.html` |
| EEG | `/examens/eeg.html` |
| Mammographie | `/examens/mammographie.html` |
| Scintigraphie | `/examens/scintigraphie.html` |

---

## 🧪 Tester Localement

```bash
# Installer Netlify CLI (une seule fois)
npm install -g netlify-cli

# Lancer le serveur local
netlify dev

# Ouvrir http://localhost:8888
# Utiliser les mêmes emails/mots de passe que le site
```

---

## 🆘 Dépannage Rapide

**Problème**: "Widget not loading"
→ Vérifiez que Netlify Identity est **activé** sur le site

**Problème**: "Can't sign up"  
→ Vérifiez que "Allow signups" est activé dans Settings > Identity

**Problème**: "Forgot password"
→ Cliquez "Forgot your password?" sur la page de login

---

## 📞 Support

- **Utilisateurs**: Consultez [USER_GUIDE.md](USER_GUIDE.md)
- **Administrateurs**: Consultez [ADMIN_GUIDE.md](ADMIN_GUIDE.md)
- **Développeurs**: Consultez [NETLIFY_AUTH_SETUP.md](NETLIFY_AUTH_SETUP.md)
- **Netlify Help**: https://docs.netlify.com/visitor-access/identity/overview/

---

## ✨ Avantages

✅ Plus de hardcoding de mots de passe  
✅ Mots de passe sécurisés (chiffrement Netlify)  
✅ Gestion centralisée des utilisateurs  
✅ Récupération de mot de passe automatique  
✅ Conformité aux normes de sécurité  
✅ Facile à mettre à l'échelle  

---

**Dernière mise à jour**: 16 avril 2026
