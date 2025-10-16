document.addEventListener('DOMContentLoaded', function() {
    const heroImage = document.getElementById('heroImage');
    
    // Función para añadir una clase que haga "saltar" la imagen
    function animateImage() {
        // Al cargar la página, aplicamos una transformación que desaparece después de un tiempo
        heroImage.style.transform = 'scale(1.05)';
        
        // Removemos la clase después de un breve momento para el efecto visual
        setTimeout(() => {
            heroImage.style.transform = 'scale(1)';
        }, 500); 
    }

    // Ejecutar la animación al cargar
    animateImage();

    // Opcional: añadir un efecto al pasar el mouse
    heroImage.addEventListener('mouseover', function() {
        heroImage.style.transform = 'rotate(5deg) scale(1.02)';
    });

    heroImage.addEventListener('mouseout', function() {
        heroImage.style.transform = 'scale(1)';
    });
});