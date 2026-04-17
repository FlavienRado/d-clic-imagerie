# ⚙️ Configuration Netlify Identity - Étapes Détaillées

## 📌 Résumé Rapide

Le site utilise maintenant **Netlify Identity** pour sécuriser l'accès. Les utilisateurs se connectent avec:
- **Email** (créé par eux ou par invitation)
- **Mot de passe** (créé par eux ou défini lors de l'activation du compte)

---

## 🎯 Étapes à Suivre (Environ 5-10 minutes)

### 1️⃣ Aller sur Netlify Dashboard
```
https://app.netlify.com
→ Sélectionner "d-clic-imagerie"
→ Aller dans "Authentication"
```

### 2️⃣ Activer Netlify Identity
```
Bouton "Enable Identity" (section gris)
↓
Cliquez dessus
↓
Confirmation: "Identity is enabled"
```

### 3️⃣ Configurer les Paramètres
```
Authentication → Settings
↓
À propos de "External providers & External OAuth"
↓
Scroll jusqu'à "Registration"
```

**Choisir une option:**

#### Option A: Inscriptions Ouvertes (Auto-Signup)
✅ Les utilisateurs créent leurs propres comptes
❌ N'importe qui peut s'inscrire

```
Cochez: "Allow signups"
```

#### Option B: Invitations Uniquement (Recommandé)
✅ Vous contrôlez qui s'inscrit
✅ Plus sécurisé

```
Ne cochez PAS "Allow signups"
→ Les utilisateurs doivent être invités
```

### 4️⃣ Créer les Premiers Utilisateurs

#### Méthode A: Inviter Manuellement

```
Authentication → Users
↓
Bouton "Invite user"
↓
Entrer email (ex: jean@example.com)
↓
Cliquer "Send invite"
```

L'utilisateur recevra un email avec:
- Un lien pour **créer son mot de passe**
- Un lien pour **confirmer son identité**

#### Méthode B: Laisser les Utilisateurs S'Inscrire
Si "Allow signups" est coché:

```
Utilisateur va sur /login.html
↓
Clique "Sign up"
↓
Entre email + mot de passe
↓
Vérifie email (lien dans le mail)
↓
Peut se connecter!
```

### 5️⃣ Tester la Connexion

Testez depuis une page protégée:
- `/parcours.html`
- `/ressources.html`
- `/examens/scanner.html`

Vous devez:
1. Être redirigé vers `/login.html`
2. Voir le formulaire de connexion
3. Pouvoir entrer email + mot de passe

---

## 📧 Emails Automatiques

Netlify envoie automatiquement ces emails:

| Type | Quand | Contient |
|------|-------|----------|
| **Invitation** | Vous invitez quelqu'un | Lien pour créer compte |
| **Confirmation** | Après inscription | Lien pour valider email |
| **Oubli mot de passe** | Utilisateur clique "Forgot" | Lien pour réinitialiser |
| **Changement email** | Utilisateur change email | Lien de confirmation |

---

## 🔒 Recommandations de Sécurité

### ✅ À FAIRE:
- Utilisez "Invite only" pour contrôler l'accès
- Vérifiez que HTTPS est activé (il l'est par défaut sur Netlify)
- Encouragez les utilisateurs à utiliser des mots de passe forts

### ❌ À ÉVITER:
- Ne shararez jamais les mots de passe par email
- Ne pas partager les emails de recupération
- N'activez pas "Allow signups" sauf si nécessaire

---

## 🧪 Tester Localement

### Installation
```bash
npm install -g netlify-cli
```

### Lancer en local
```bash
netlify dev
```

### URL de test
```
http://localhost:8888
```

Le widget Netlify fonctionne exactement comme en production.

---

## 📊 Voir les Utilisateurs Connectés

```
Authentication → Users
↓
Liste de tous les comptes
```

Colonnes visibles:
- **Email** - Adresse de l'utilisateur
- **Confirmed at** - Date de confirmation d'email
- **Last login** - Dernière connexion

---

## 🆘 Problèmes Courants & Solutions

### ❌ "Identity is not enabled"
**Solution:**
1. Allez dans **Authentication**
2. Cliquez **Enable Identity**
3. Attendez ~30 secondes
4. Rafraîchissez la page

### ❌ "Can't sign up" ou "Signup is closed"
**Solution:**
1. Allez dans **Settings** → **Identity**
2. Cochez **Allow signups**
3. Sauvegardez
4. Attendez ~30 secondes
5. Testez à nouveau

### ❌ Widget ne s'affiche pas
**Solution:**
1. Vérifiez qu'Identity est **enabled**
2. Vérifiez la console (F12) pour erreurs
3. Videz le cache du navigateur (Ctrl+Shift+Delete)
4. Rafraîchissez

### ❌ Email de confirmation ne s'envoie pas
**Solution:**
1. Vérifiez les **SPAMS**
2. Attendez 5 minutes
3. Vérifiez dans **Settings** → **Emails** qu'il y a une adresse d'envoi
4. Réessayez l'invitation

### ❌ Utilisateur oublie mot de passe
**Solution:**
L'utilisateur:
1. Va sur `/login.html`
2. Clique **Forgot your password?**
3. Entre son email
4. Reçoit un email avec lien de réinitialisation
5. Crée un nouveau mot de passe

---

## 📱 Pages Protégées

Les pages suivantes **demandent** une authentification:

```
/parcours.html
/ressources.html
/examens/scanner.html
/examens/irm.html
/examens/eeg.html
/examens/mammographie.html
/examens/scintigraphie.html
```

Les pages suivantes **n'exigent pas** de connexion:

```
/index.html (Accueil)
/notions.html (Notions de base)
/equipe.html (Équipe)
/radioprotection.html
/examens/radiographie.html
/examens/echographie.html
/examens/fibroscopie.html
/examens/ecg.html
/examens/radiodentaire.html
```

---

## 🔗 Ressources Utiles

- [Documentation Netlify Identity](https://docs.netlify.com/visitor-access/identity/overview/)
- [Widget Configuration Options](https://docs.netlify.com/visitor-access/identity/overview/#interaction-with-the-widget)
- [API Reference](https://github.com/netlify/gotrue-js)

---

## ✨ Résultat Final

Après configuration, votre site aura:
✅ Authentification sécurisée  
✅ Gestion centralisée des utilisateurs  
✅ Aucun mot de passe en dur dans le code  
✅ Récupération de mot de passe automatique  
✅ Compatible avec tous les navigateurs  

---

**Besoin d'aide?** Consultez [ADMIN_GUIDE.md](ADMIN_GUIDE.md)
