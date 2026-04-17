## Nouveau Système d'Authentification - Guide d'Utilisation

### Vue d'ensemble

Le nouveau système d'authentification remplace Netlify Identity par une solution locale basée sur localStorage. Les utilisateurs peuvent s'enregistrer et se connecter avec un email et un mot de passe robuste.

---

## 1. Caractéristiques Principales

✓ **Enregistrement utilisateur** - Les utilisateurs peuvent créer un nouveau compte  
✓ **Connexion sécurisée** - Email et mot de passe avec validation  
✓ **Protection de pages** - Redirection automatique vers login si non authentifié  
✓ **Persistance de session** - Les utilisateurs restent connectés (tant que le navigateur reste ouvert)  
✓ **Profil utilisateur** - Page /profile.html pour afficher les infos de l'utilisateur connecté  

---

## 2. Utiliser la Protection sur une Page

Pour protéger une page afin que seuls les utilisateurs connectés puissent y accéder:

### Option A: Protection Automatique au Chargement

Ajoutez simplement cet code JavaScript dans votre page HTML (avant la fermeture du `</body>`):

```html
<script src="js/auth.js"></script>
<script>
    // Protéger cette page - redirige automatiquement vers login si non connecté
    document.addEventListener('DOMContentLoaded', function(){
        window.protect();
    });
</script>
```

### Option B: Protection Conditionnelle

```javascript
<script src="js/auth.js"></script>
<script>
    document.addEventListener('DOMContentLoaded', function(){
        // Vérifier si l'utilisateur est connecté
        if(window.dbAuth.isAuthenticated()){
            // Utilisateur connecté - afficher le contenu
            console.log('Utilisateur connecté:', window.getCurrentUser());
        } else {
            // L'utilisateur n'est pas connecté
            // Rediriger vers login avec URL de retour
            window.protect();
        }
    });
</script>
```

---

## 3. Utiliser les Données de l'Utilisateur

Vous pouvez accéder aux informations de l'utilisateur connecté:

```javascript
// Obtenir les infos de l'utilisateur actuel
const user = window.getCurrentUser();

if(user){
    console.log('Nom:', user.name);
    console.log('Email:', user.email);
    console.log('ID:', user.id);
    console.log('Heure connexion:', user.loginTime);
}
```

---

## 4. Déconnexion

Pour déconnecter l'utilisateur:

```javascript
// Déconnecteur et rediriger vers la page d'accueil
window.logout();
```

Ou avec un bouton:

```html
<button onclick="window.logout()">Déconnecter</button>
```

---

## 5. Pages D'Authentification

### Login / Enregistrement: `/login.html`
- Interface avec deux onglets: **Connexion** et **S'enregistrer**
- Validation complète des formulaires
- Indicateur d'exigences de mot de passe

### Profil Utilisateur: `/profile.html`
- Affiche les informations de l'utilisateur connecté
- Lien de déconnexion
- Page protégée (requiert l'authentification)

---

## 6. Exigences de Mot de Passe

Lors de l'enregistrement, le mot de passe doit:
- Avoir au moins **8 caractères**
- Contenir au moins **1 lettre majuscule**
- Contenir au moins **1 lettre minuscule**
- Contenir au moins **1 chiffre**

Exemple: `Test1234` ✓, `password` ✗

---

## 7. Utilisateur par Défaut

Pour les tests, un utilisateur par défaut est créé au premier chargement:

| Champ | Valeur |
|-------|--------|
| **Email** | test@example.com |
| **Mot de passe** | Test1234 |

**Note:** Vous pouvez créer d'autres comptes via la page d'enregistrement.

---

## 8. Stockage des Données

- **Utilisateurs**: Sauvegardés dans `localStorage` (clé: `dclic_users`)
- **Session utilisateur**: Sauvegardée dans `sessionStorage` (clé: `dclic_current_user`)
- La session est effacée quand l'utilisateur se déconnecte ou ferme le navigateur

---

## 9. Pages à Protéger (Exemple)

Pour protéger toutes les pages d'examens, ajoutez à chaque fichier dans `/examens/`:

```html
<!-- À la fin du body -->
<script src="../js/auth.js"></script>
<script>
    document.addEventListener('DOMContentLoaded', function(){
        window.protect();
    });
</script>
```

---

## 10. Fonctions API Disponibles

```javascript
// Vérifier si authentifié
window.dbAuth.isAuthenticated()  // Retourne true/false

// Obtenir l'utilisateur actuel
window.getCurrentUser()  // Retourne l'objet utilisateur ou null

// Protéger la page
window.protect()  // Redirige vers login si non authentifié

// Déconnecter
window.logout()  // Déconnecte et redirige vers l'accueil
```

---

## 11. Redirection Après Connexion

Lors de la connexion, l'utilisateur est redirigé vers:
1. L'URL fournie en paramètre `returnUrl` 
2. Sinon, vers `index.html`

Exemple: `login.html?returnUrl=examens/radiographie.html`

---

## Notes de Sécurité

⚠️ **Important**: Ce système utilise localStorage et une simple fonction hash pour les mots de passe.  

**Pour une production réelle**, vous devriez:
- Utiliser HTTPS
- Implémenter l'authentification côté serveur
- Utiliser bcrypt ou similaire pour hasher les mots de passe
- Valider côté serveur
- Utiliser des tokens JWT

Pour maintenant, ce système est adapté aux environnements de test et d'apprentissage.

---

## Support

Pour plus d'informations, consultez:
- `login.html` - Interface d'authentification
- `js/auth.js` - Code d'authentification
- `profile.html` - Exemple de page protégée
