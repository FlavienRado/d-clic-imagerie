# 🔐 Guide Administrateur - Configuration des Utilisateurs Netlify Identity

Ce guide explique comment configurer et gérer les utilisateurs qui peuvent accéder au site avec un email et un mot de passe.

## ⚙️ Configuration Initiale (Une seule fois)

### Étape 1: Accéder au Dashboard Netlify
1. Allez sur https://app.netlify.com
2. Sélectionnez votre site "d-clic-imagerie"
3. Cliquez sur l'onglet **Authentication**

### Étape 2: Activer Netlify Identity
1. Cliquez sur **Enable Identity**
2. Choisissez la méthode d'enregistrement:
   - **Open** - Les utilisateurs peuvent s'inscrire eux-mêmes
   - **Invite only** - Vous invitez les utilisateurs manuellement (recommandé pour un contrôle)

## 👥 Ajouter des Utilisateurs

### Méthode 1: Invitation Manuelle (Recommandée pour contrôle)

1. Dans **Authentication** → **Users**
2. Cliquez sur **Invite user**
3. Entrez l'email de l'utilisateur (ex: jean@example.com)
4. Cliquez **Send invite**
5. L'utilisateur reçoit un email avec:
   - Un lien de confirmation
   - Une option pour créer son mot de passe

**Actions de l'utilisateur:**
- L'utilisateur clique le lien dans l'email
- Il crée un mot de passe sécurisé
- Il peut maintenant se connecter avec son email + ce mot de passe

### Méthode 2: Auto-Inscription (Ouvert à tous)

Si vous activez "Open" dans la configuration:

1. Un utilisateur va sur `/login.html`
2. Il clique sur **Sign up**
3. Il rentre:
   - Son email
   - Un mot de passe
   - Valide l'email
4. Il peut se connecter immédiatement

## 🔄 Gérer les Utilisateurs Existants

### Voir tous les utilisateurs
- **Authentication** → **Users**
- Liste tous les comptes créés/invités

### Supprimer un utilisateur
1. Cliquez sur l'utilisateur dans la liste
2. Cliquez **Delete user**
3. Confirmez

### Réinitialiser un mot de passe oublié
1. L'utilisateur clique "Forgot your password?" sur la page de connexion
2. Netlify envoie un email de réinitialisation
3. L'utilisateur crée un nouveau mot de passe

### Options avancées
Dans **Settings** → **Identity**, vous pouvez:
- Configurer les emails de confirmation
- Activer/Désactiver l'auto-inscription
- Ajouter des providers sociaux (Google, GitHub)
- Configurer les redirections après connexion

## 📧 Emails Automatiques

Netlify envoie automatiquement des emails pour:
- **Invitation** - Lorsque vous invitez un utilisateur
- **Confirmation** - Pour valider l'adresse email
- **Oubli de mot de passe** - Pour réinitialiser le mot de passe
- **Changement d'email** - Pour confirmer un nouveau email

Vous pouvez personnaliser ces emails dans **Settings** → **Emails**.

## 🔒 Sécurité - Points Importants

✅ Les mots de passe:
- Sont chiffrés en transit (HTTPS)
- Sont hashés par Netlify (jamais stockés en clair)
- Jamais visibles aux administrateurs
- Jamais transmis par email (Netlify envoie un lien de création)

⚠️ Recommandations:
- Utilisez "Invite only" si vous contrôlez qui peut accéder
- Utilisez "Open" seulement si votre contenu est public par essence
- Vérifiez régulièrement la liste des utilisateurs

## 📱 Interface de Connexion Utilisateur

Quand un utilisateur va sur `/login.html`, il voit:

**Onglet "Log In":**
- Email
- Mot de passe
- "Log In" bouton
- "Forgot your password?" lien

**Onglet "Sign up" (si enabled):**
- Email
- Mot de passe
- "Sign Up" bouton

## 🆘 Problèmes Courants

### Les utilisateurs ne peuvent pas accéder à la page de connexion
→ Vérifiez que Netlify Identity est **Enable Identity**

### Les utilisateurs reçoivent "Signup is closed"
→ Changez **Settings** → **Identity** : cochez "Allow signups"

### L'email de confirmation ne s'envoie pas
→ Dans **Settings** → **Emails**, vérifiez qu'il y a une adresse email expéditeur valide

### Utilisateur oublie son mot de passe
→ Sur la page de connexion `/login.html`, cliquez "Forgot password?"
→ Netlify envoie un email avec un lien pour réinitialiser

## 📊 Monitoring

Pour voir l'activité:
- **Authentication** → **Users** - Voir tous les comptes
- Les logs de connexion ne sont pas visibles dans l'interface gratuite

Pour un audit complet, utilisez les **Analytics** de Netlify.

## 🚀 Configuration Recommandée Initiale

Pour un site d'apprentissage médical:

1. **Activez**: "Invite only" (contrôle d'accès)
2. **Invitez** les utilisateurs autorisés un par un
3. **Ils créent** leurs propres mots de passe sécurisés
4. **Ils accèdent** au contenu protégé

Cette approche vous donne un contrôle total sur qui accède à votre contenu.

## 📚 Ressources

- [Documentation Netlify Identity](https://docs.netlify.com/visitor-access/identity/overview/)
- [Widget Configuration](https://docs.netlify.com/visitor-access/identity/overview/#interaction-with-the-widget)
- [API Reference](https://docs.netlify.com/visitor-access/identity/reference/)
