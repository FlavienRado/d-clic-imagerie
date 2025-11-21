// Simple auth demo using sessionStorage
(function(window){
    // change these credentials as you wish (demo only)
    const DEMO_USER = 'flavien';
    const DEMO_PASS = 'FlavienCours001';

    function isInSubfolder(){
        // détecte si on est dans /examens/ (ajuster si autres sous-dossiers)
        return location.pathname.split('/').includes('examens');
    }

    function loginPath(){
        return isInSubfolder() ? '../login.html' : 'login.html';
    }

    function getQueryParam(name){
        const params = new URLSearchParams(location.search);
        return params.get(name);
    }

    window.attemptLogin = function(username, password){
        if(username === DEMO_USER && password === DEMO_PASS){
            sessionStorage.setItem('loggedIn', 'true');
            // redirect to original page if provided
            const ret = getQueryParam('returnUrl') || '/';
            // si returnUrl est relatif, utiliser tel quel
            location.href = ret;
            return true;
        }
        return false;
    };

    window.protect = function(){
        if(sessionStorage.getItem('loggedIn') !== 'true'){
            // rediriger vers login avec paramètre returnUrl
            const returnUrl = encodeURIComponent(location.pathname + location.search);
            location.href = loginPath() + '?returnUrl=' + returnUrl;
        }
    };

    window.logout = function(){
        sessionStorage.removeItem('loggedIn');
        // redirect to accueil (ajuster si besoin)
        const root = isInSubfolder() ? '../index.html' : 'index.html';
        location.href = root;
    };

})(window);