// Menu mobile
document.addEventListener('DOMContentLoaded', function () {
    const toggleBtn = document.querySelector('.mobile-menu-btn');
    const navContainer = document.querySelector('nav .container');
    const navList = document.querySelector('nav .container ul');
    const navLinks = document.querySelectorAll('nav .container ul a');
    const dropdownItems = document.querySelectorAll('.dropdown');

    function closeAllDropdowns() {
        dropdownItems.forEach(d => d.classList.remove('open'));
        dropdownItems.forEach(d => {
            const a = d.querySelector('a');
            if (a) a.setAttribute('aria-expanded', 'false');
        });
    }

    // mobile menu toggle
    if (toggleBtn) {
        toggleBtn.setAttribute('role', 'button');
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.addEventListener('click', function (e) {
            const opened = document.body.classList.toggle('nav-open');
            toggleBtn.setAttribute('aria-expanded', opened ? 'true' : 'false');
            if (!opened) closeAllDropdowns();
        });
    }

    // close menu after clicking a link (mobile)
    navLinks.forEach(a => a.addEventListener('click', () => {
        if (document.body.classList.contains('nav-open')) {
            document.body.classList.remove('nav-open');
            if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
            closeAllDropdowns();
        }
    }));

    // make dropdowns clickable on mobile (toggle open class)
    dropdownItems.forEach(item => {
        const trigger = item.querySelector('a');
        if (!trigger) return;
        trigger.addEventListener('click', function (ev) {
            // only intercept on small screens
            if (window.innerWidth <= 800) {
                ev.preventDefault();
                const isOpen = item.classList.toggle('open');
                trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
                // close others
                dropdownItems.forEach(d => { if (d !== item) d.classList.remove('open'); });
            }
        });
        // ensure accessibility attributes
        trigger.setAttribute('aria-haspopup', 'true');
        trigger.setAttribute('aria-expanded', 'false');
    });

    // close mobile menu / dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!navContainer) return;
        if (!navContainer.contains(e.target) && document.body.classList.contains('nav-open')) {
            document.body.classList.remove('nav-open');
            if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
            closeAllDropdowns();
        }
    });

    // on resize, reset mobile state
    window.addEventListener('resize', () => {
        if (window.innerWidth > 800) {
            document.body.classList.remove('nav-open');
            if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
            closeAllDropdowns();
        }
    });
    
    // Filtre du glossaire
    const filterButtons = document.querySelectorAll('.filter-btn');
    const glossaryItems = document.querySelectorAll('.glossary-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Retirer la classe active de tous les boutons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            glossaryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    

    document.querySelectorAll('.dropdown > a').forEach(item => {
        item.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                this.parentElement.classList.toggle('active');
            }
        });
    });

    // Recherche dans le glossaire
    const searchInput = document.getElementById('glossary-search');
    if (searchInput) {
        searchInput.addEventListener('keyup', function() {
            const searchTerm = this.value.toLowerCase();
            
            glossaryItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
    
    // Animation des éléments au défilement
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.card, .fiche, .team-card, .experience-card, .glossary-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Ajouter des styles initiaux pour l'animation
    const animatedElements = document.querySelectorAll('.card, .fiche, .team-card, .experience-card, .glossary-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Exécuter une fois au chargement
    
    // Smooth scrolling pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
