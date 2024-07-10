document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM Content Loaded");
    const cards = document.querySelectorAll('.step-card, .client-card, .faq-container');
    console.log("Number of cards:", cards.length);
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            console.log("Card intersecting:", entry.isIntersecting);
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: '0px 0px -100px 0px'
    });

    cards.forEach(card => {
        observer.observe(card);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    let currentItem = 0;

    function showNextItem() {
        faqItems[currentItem].classList.remove('active');
        currentItem = (currentItem + 1) % faqItems.length;
        faqItems[currentItem].classList.add('active');
    }

    // Mostrar el primer elemento inmediatamente
    faqItems[0].classList.add('active');

    // Cambiar cada 6 segundos
    setInterval(showNextItem, 6000);
});

document.addEventListener('DOMContentLoaded', function() {
    const mapContainer = document.getElementById('map-container');
    // ... (código existente)

    // Inicializar el mapa de Google
    let map = new google.maps.Map(mapContainer, {
        center: { lat: 4.674748067144769,  lng: -74.0621140733782 },
        zoom: 12
    });

    // Definir el icono personalizado
    const customMarker = {
        url: 'assets/logo_negro_maps.png', // Reemplaza con la URL real de tu logo
        scaledSize: new google.maps.Size(50, 50), // Ajusta el tamaño según necesites
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(25, 25) // Ajusta el punto de anclaje si es necesario
    };

    // Añadir marcador personalizado
    new google.maps.Marker({
        position: { lat: 4.674748067144769,  lng: -74.0621140733782 },
        map: map,
        icon: customMarker,
        title: 'Nuestra ubicación'
    });

    // Función para abrir enlaces externos
    function openExternalMap(type) {
        let url;
        switch(type) {
            case 'waze':
                url = `https://www.waze.com/ul?ll=${lat},${lng}&navigate=yes`;
                break;
            case 'moovit':
                url = `https://moovit.com/?to=Nuestra%20Ubicación&tll=${lat}_${lng}`;
                break;
            case 'google':
                url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
                break;
        }
        window.open(url, '_blank');
    }

    // Añadir event listeners a los botones
    mapButtons.forEach(button => {
        button.addEventListener('click', function() {
            openExternalMap(this.dataset.map);
        });
    });
});