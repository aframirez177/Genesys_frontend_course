document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM Content Loaded");
    const cards = document.querySelectorAll('.step-card, .client-card');
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
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    cards.forEach(card => {
        observer.observe(card);
    });
});