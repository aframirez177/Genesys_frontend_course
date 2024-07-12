// Función para manejar la aparición de elementos
const handleIntersection = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
};

// Configuración del Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

// Crear el observer
const observer = new IntersectionObserver(handleIntersection, observerOptions);

// Función para inicializar las animaciones
const initAnimations = () => {
    const elements = document.querySelectorAll('.step-card, .client-card');
    elements.forEach(el => observer.observe(el));
};

// Función para cambiar las tarjetas FAQ
const initFAQRotation = () => {
    const faqItems = document.querySelectorAll('.faq-item');
    let currentItem = 0;
    const showNextItem = () => {
        faqItems[currentItem].classList.remove('active');
        currentItem = (currentItem + 1) % faqItems.length;
        faqItems[currentItem].classList.add('active');
    };
    faqItems[0].classList.add('active');
    setInterval(showNextItem, 6000);
};

// Función para inicializar el mapa
const initMap = () => {
    const mapContainer = document.getElementById('map-container');
    const mapButtons = document.querySelectorAll('.map-button');
    const lat = 4.674748067144769;
    const lng = -74.0621140733782;
    const map = new google.maps.Map(mapContainer, {
        center: { lat, lng },
        zoom: 14
    });
    const customMarker = {
        url: 'assets/logo_negro_maps.png',
        scaledSize: new google.maps.Size(50, 50),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(25, 25)
    };
    new google.maps.Marker({
        position: { lat, lng },
        map,
        icon: customMarker,
        title: 'Nuestra ubicación'
    });
    mapButtons.forEach(button => {
        button.addEventListener('click', () => openExternalMap(button.dataset.map));
    });
};

// Función para abrir mapas externos
const openExternalMap = (type) => {
    const lat = 4.674748067144769;
    const lng = -74.0621140733782;
    const urls = {
        waze: `https://www.waze.com/ul?ll=${lat},${lng}&navigate=yes`,
        moovit: `https://moovit.com/?to=Nuestra%20Ubicación&tll=${lat}_${lng}`,
        google: `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
    };
    window.open(urls[type], '_blank');
};

// Función para inicializar el popup de WhatsApp
const initWhatsAppPopup = () => {
    const whatsappButton = document.getElementById('whatsapp-button');
    const whatsappPopup = document.getElementById('whatsapp-popup');
    const closePopup = document.getElementById('close-popup');
    const startChat = document.getElementById('start-chat');

    whatsappButton.addEventListener('click', () => {
        whatsappPopup.style.display = 'block';
        setTimeout(() => whatsappPopup.classList.add('show'), 10);
    });

    closePopup.addEventListener('click', () => {
        whatsappPopup.classList.remove('show');
        setTimeout(() => whatsappPopup.style.display = 'none', 300);
    });

    startChat.addEventListener('click', () => {
        window.open('https://wa.me/573205803048', '_blank');
    });
};

// Función para inicializar el smooth scrolling
const initSmoothScrolling = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
};

// Event Listener principal
document.addEventListener('DOMContentLoaded', () => {
    initAnimations();
    initFAQRotation();
    initMap();
    initWhatsAppPopup();
    initSmoothScrolling();
});

// Lazy loading de imágenes
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const lazyImageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                lazyImageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => lazyImageObserver.observe(img));
});