document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM Content Loaded");
    const stepCards = document.querySelectorAll('.step-card');
    console.log("Number of step cards:", stepCards.length);
    
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

    stepCards.forEach(card => {
        observer.observe(card);
    });
});
