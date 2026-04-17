// Authentication System
(function(window){

    // ==================== UTILITY FUNCTIONS ====================
    
    function isInSubfolder(){
        return location.pathname.split('/').includes('examens');
    }

    function loginPath(){
        return isInSubfolder() ? '../login.html' : 'login.html';
    }

    function getQueryParam(name){
        const params = new URLSearchParams(location.search);
        return params.get(name);
    }

    function hashPassword(password){
        // Simple hash function (in production, use bcrypt on backend)
        let hash = 0;
        for(let i = 0; i < password.length; i++){
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return 'hash_' + Math.abs(hash).toString(36);
    }

    // ==================== USER DATABASE ====================
    
    class UserDatabase {
        constructor(){
            this.storageKey = 'dclic_users';
            this.sessionKey = 'dclic_current_user';
            this.initializeDefaultUsers();
        }

        initializeDefaultUsers(){
            const users = this.getAllUsers();
            // Initialize with default user if database is empty
            if(users.length === 0){
                const defaultUser = {
                    id: 'user_' + Date.now(),
                    name: 'Utilisateur Test',
                    email: 'test@example.com',
                    password: hashPassword('Test1234'),
                    createdAt: new Date().toISOString(),
                    active: true
                };
                this.addUser(defaultUser);
            }
        }

        getAllUsers(){
            try {
                const data = localStorage.getItem(this.storageKey);
                return data ? JSON.parse(data) : [];
            } catch(e) {
                console.error('Error reading users:', e);
                return [];
            }
        }

        addUser(user){
            try {
                const users = this.getAllUsers();
                users.push(user);
                localStorage.setItem(this.storageKey, JSON.stringify(users));
                return true;
            } catch(e) {
                console.error('Error adding user:', e);
                return false;
            }
        }

        findByEmail(email){
            const users = this.getAllUsers();
            return users.find(u => u.email.toLowerCase() === email.toLowerCase());
        }

        findById(id){
            const users = this.getAllUsers();
            return users.find(u => u.id === id);
        }

        emailExists(email){
            return this.findByEmail(email) !== undefined;
        }

        setCurrentUser(user){
            try {
                sessionStorage.setItem(this.sessionKey, JSON.stringify(user));
                return true;
            } catch(e) {
                console.error('Error setting current user:', e);
                return false;
            }
        }

        getCurrentUser(){
            try {
                const data = sessionStorage.getItem(this.sessionKey);
                return data ? JSON.parse(data) : null;
            } catch(e) {
                console.error('Error getting current user:', e);
                return null;
            }
        }

        clearCurrentUser(){
            sessionStorage.removeItem(this.sessionKey);
        }
    }

    // ==================== VALIDATION ====================
    
    class Validator {
        static validateEmail(email){
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        static validatePassword(password){
            return {
                length: password.length >= 8,
                uppercase: /[A-Z]/.test(password),
                lowercase: /[a-z]/.test(password),
                number: /\d/.test(password),
                isValid: password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password)
            };
        }

        static validateName(name){
            return name.trim().length >= 2;
        }
    }

    // ==================== LOGIN PAGE FUNCTIONALITY ====================
    
    function initializeAuthPage(){
        const db = new UserDatabase();
        const tabs = document.querySelectorAll('.auth-tab');
        const forms = document.querySelectorAll('.auth-form');
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');
        const registerPasswordInput = document.getElementById('register-password');

        // Tab switching
        tabs.forEach(tab => {
            tab.addEventListener('click', function(){
                const tabName = this.getAttribute('data-tab');
                
                // Update tabs
                tabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');

                // Update forms
                forms.forEach(f => f.classList.remove('active'));
                document.querySelector(`.auth-form[data-form="${tabName}"]`).classList.add('active');

                // Clear errors and messages
                document.querySelectorAll('.form-error').forEach(el => el.classList.remove('show'));
                document.querySelectorAll('.success-message').forEach(el => el.classList.remove('show'));
            });
        });

        // Password strength indicator for registration
        if(registerPasswordInput){
            registerPasswordInput.addEventListener('input', function(){
                updatePasswordRequirements(this.value);
            });
        }

        // Login form submission
        if(loginForm){
            loginForm.addEventListener('submit', function(e){
                e.preventDefault();
                handleLogin(db);
            });
        }

        // Register form submission
        if(registerForm){
            registerForm.addEventListener('submit', function(e){
                e.preventDefault();
                handleRegister(db);
            });
        }
    }

    function updatePasswordRequirements(password){
        const reqs = Validator.validatePassword(password);
        
        document.getElementById('req-length').classList.toggle('met', reqs.length);
        document.getElementById('req-upper').classList.toggle('met', reqs.uppercase);
        document.getElementById('req-lower').classList.toggle('met', reqs.lowercase);
        document.getElementById('req-number').classList.toggle('met', reqs.number);
    }

    function clearFormErrors(formId){
        const form = document.getElementById(formId);
        form.querySelectorAll('.form-error').forEach(el => {
            el.classList.remove('show');
            el.textContent = '';
        });
        form.querySelectorAll('input').forEach(el => {
            el.classList.remove('error');
        });
    }

    function showFormError(formId, fieldId, message){
        const errorEl = document.getElementById(fieldId + '-error');
        const inputEl = document.getElementById(fieldId);
        if(errorEl && inputEl){
            errorEl.textContent = message;
            errorEl.classList.add('show');
            inputEl.classList.add('error');
        }
    }

    function handleLogin(db){
        clearFormErrors('login-form');
        
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;
        const loginBtn = document.getElementById('login-btn');

        let hasErrors = false;

        // Validate email
        if(!email){
            showFormError('login-form', 'login-email', 'Email requis');
            hasErrors = true;
        } else if(!Validator.validateEmail(email)){
            showFormError('login-form', 'login-email', 'Email invalide');
            hasErrors = true;
        }

        // Validate password
        if(!password){
            showFormError('login-form', 'login-password', 'Mot de passe requis');
            hasErrors = true;
        }

        if(hasErrors) return;

        // Disable button during submission
        loginBtn.disabled = true;
        loginBtn.textContent = 'Connexion en cours...';

        // Simulate delay
        setTimeout(function(){
            const user = db.findByEmail(email);

            if(!user){
                showFormError('login-form', 'login-email', 'Email ou mot de passe incorrect');
                loginBtn.disabled = false;
                loginBtn.textContent = 'Se connecter';
                return;
            }

            if(user.password !== hashPassword(password)){
                showFormError('login-form', 'login-password', 'Email ou mot de passe incorrect');
                loginBtn.disabled = false;
                loginBtn.textContent = 'Se connecter';
                return;
            }

            if(!user.active){
                showFormError('login-form', 'login-email', 'Ce compte a été désactivé');
                loginBtn.disabled = false;
                loginBtn.textContent = 'Se connecter';
                return;
            }

            // Login successful
            db.setCurrentUser({
                id: user.id,
                name: user.name,
                email: user.email,
                loginTime: new Date().toISOString()
            });

            // Show success message
            document.getElementById('login-success').classList.add('show');

            // Redirect after 1.5 seconds
            setTimeout(function(){
                const returnUrl = getQueryParam('returnUrl');
                if(returnUrl){
                    location.href = decodeURIComponent(returnUrl);
                } else {
                    location.href = 'index.html';
                }
            }, 1500);
        }, 500);
    }

    function handleRegister(db){
        clearFormErrors('register-form');
        
        const name = document.getElementById('register-name').value.trim();
        const email = document.getElementById('register-email').value.trim();
        const password = document.getElementById('register-password').value;
        const passwordConfirm = document.getElementById('register-password-confirm').value;
        const registerBtn = document.getElementById('register-btn');

        let hasErrors = false;

        // Validate name
        if(!name){
            showFormError('register-form', 'register-name', 'Nom requis');
            hasErrors = true;
        } else if(!Validator.validateName(name)){
            showFormError('register-form', 'register-name', 'Nom doit contenir au moins 2 caractères');
            hasErrors = true;
        }

        // Validate email
        if(!email){
            showFormError('register-form', 'register-email', 'Email requis');
            hasErrors = true;
        } else if(!Validator.validateEmail(email)){
            showFormError('register-form', 'register-email', 'Email invalide');
            hasErrors = true;
        } else if(db.emailExists(email)){
            showFormError('register-form', 'register-email', 'Cet email est déjà utilisé');
            hasErrors = true;
        }

        // Validate password
        const pwdValidation = Validator.validatePassword(password);
        if(!password){
            showFormError('register-form', 'register-password', 'Mot de passe requis');
            hasErrors = true;
        } else if(!pwdValidation.isValid){
            const messages = [];
            if(!pwdValidation.length) messages.push('au moins 8 caractères');
            if(!pwdValidation.uppercase) messages.push('une lettre majuscule');
            if(!pwdValidation.lowercase) messages.push('une lettre minuscule');
            if(!pwdValidation.number) messages.push('un chiffre');
            showFormError('register-form', 'register-password', 'Mot de passe doit contenir: ' + messages.join(', '));
            hasErrors = true;
        }

        // Validate password confirmation
        if(!passwordConfirm){
            showFormError('register-form', 'register-password-confirm', 'Confirmation requise');
            hasErrors = true;
        } else if(password !== passwordConfirm){
            showFormError('register-form', 'register-password-confirm', 'Les mots de passe ne correspondent pas');
            hasErrors = true;
        }

        if(hasErrors) return;

        // Disable button during submission
        registerBtn.disabled = true;
        registerBtn.textContent = 'Enregistrement en cours...';

        // Simulate delay
        setTimeout(function(){
            // Create new user
            const newUser = {
                id: 'user_' + Date.now(),
                name: name,
                email: email,
                password: hashPassword(password),
                createdAt: new Date().toISOString(),
                active: true
            };

            if(!db.addUser(newUser)){
                showFormError('register-form', 'register-email', 'Erreur lors de l\'enregistrement');
                registerBtn.disabled = false;
                registerBtn.textContent = 'S\'enregistrer';
                return;
            }

            // Show success message
            document.getElementById('register-success').classList.add('show');

            // Auto-login and redirect
            setTimeout(function(){
                db.setCurrentUser({
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                    loginTime: new Date().toISOString()
                });

                const returnUrl = getQueryParam('returnUrl');
                if(returnUrl){
                    location.href = decodeURIComponent(returnUrl);
                } else {
                    location.href = 'index.html';
                }
            }, 1500);
        }, 500);
    }

    // ==================== GLOBAL API ====================
    
    window.dbAuth = {
        db: new UserDatabase(),
        
        isAuthenticated: function(){
            return this.db.getCurrentUser() !== null;
        },

        getCurrentUser: function(){
            return this.db.getCurrentUser();
        },

        logout: function(){
            this.db.clearCurrentUser();
            const root = isInSubfolder() ? '../index.html' : 'index.html';
            location.href = root;
        },

        protect: function(){
            // Check if user is authenticated
            if(!this.isAuthenticated()){
                // Not authenticated - redirect to login with returnUrl
                const returnUrl = encodeURIComponent(location.pathname + location.search);
                location.href = loginPath() + '?returnUrl=' + returnUrl;
            }
        }
    };

    // Backward compatibility
    window.protect = function(){
        window.dbAuth.protect();
    };

    window.logout = function(){
        window.dbAuth.logout();
    };

    window.getCurrentUser = function(){
        return window.dbAuth.getCurrentUser();
    };

    // Initialize auth page if we're on login.html
    if(document.getElementById('login-form')){
        document.addEventListener('DOMContentLoaded', initializeAuthPage);
    }

})(window);