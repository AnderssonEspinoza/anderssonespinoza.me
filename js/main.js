// Alternar visibilidad del menú en móviles
const menuIcon = document.querySelector('.icon-navbar');
const navLinks = document.querySelector('.nav-links');

menuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('active'); // Mostrar/Ocultar enlaces
});

// Cerrar el menú al hacer clic en un enlace (opcional)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active'); // Ocultar el menú
    });
});


// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add scroll event listener for navbar
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        nav.style.boxShadow = 'none';
    }
});

// Add animation to service cards on scroll
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .portfolio-card, .testimonial-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'transform 0.5s ease-out, opacity 0.5s linear, background-color 150ms linear';
    observer.observe(card);
});



  

const form = document.getElementById("contacto-form");
const btn = form.querySelector(".btn-enviar");
  // Función para ejecutar la animación del botón
function ejecutarAnimacion(button, callback) {
    if (!button.classList.contains("active")) {
      button.classList.add("active");
  
      // Animación usando GSAP
      gsap.to(button, {
        keyframes: [
          {
            "--left-wing-first-x": 50,
            "--left-wing-first-y": 100,
            "--right-wing-second-x": 50,
            "--right-wing-second-y": 100,
            duration: 0.6,
            onComplete() {
              gsap.set(button, {
                "--left-wing-first-y": 0,
                "--left-wing-second-x": 40,
                "--left-wing-second-y": 100,
                "--left-wing-third-x": 0,
                "--left-wing-third-y": 100,
                "--left-body-third-x": 40,
                "--right-wing-first-x": 50,
                "--right-wing-first-y": 0,
                "--right-wing-second-x": 60,
                "--right-wing-second-y": 100,
                "--right-wing-third-x": 100,
                "--right-wing-third-y": 100,
                "--right-body-third-x": 60,
              });
            },
          },
          {
            "--left-wing-third-x": 20,
            "--left-wing-third-y": 90,
            "--left-wing-second-y": 90,
            "--left-body-third-y": 90,
            "--right-wing-third-x": 80,
            "--right-wing-third-y": 90,
            "--right-body-third-y": 90,
            "--right-wing-second-y": 90,
            duration: 0.2,
          },
          {
            "--rotate": 50,
            "--left-wing-third-y": 95,
            "--left-wing-third-x": 27,
            "--right-body-third-x": 45,
            "--right-wing-second-x": 45,
            "--right-wing-third-x": 60,
            "--right-wing-third-y": 83,
            duration: 0.25,
          },
          {
            "--rotate": 60,
            "--plane-x": -8,
            "--plane-y": 40,
            duration: 0.2,
          },
          {
            "--rotate": 40,
            "--plane-x": 45,
            "--plane-y": -300,
            "--plane-opacity": 0,
            duration: 0.375,
            onComplete() {
              // Esperar un momento y restaurar el botón
              setTimeout(() => {
                button.removeAttribute("style");
                gsap.fromTo(
                  button,
                  { opacity: 0, y: -8 },
                  {
                    opacity: 1,
                    y: 0,
                    clearProps: true,
                    duration: 0.3,
                    onComplete() {
                      button.classList.remove("active");
                      // Llamar al callback para mostrar el mensaje
                      if (callback) callback();
                    },
                  }
                );
              }, 1800);
            },
          },
        ],
      });
  
      // Animación adicional del botón
      gsap.to(button, {
        keyframes: [
          {
            "--text-opacity": 0,
            "--border-radius": 0,
            "--left-wing-background": getComputedStyle(button).getPropertyValue("--primary-dark"),
            "--right-wing-background": getComputedStyle(button).getPropertyValue("--primary-dark"),
            duration: 0.11,
          },
          {
            "--left-wing-background": getComputedStyle(button).getPropertyValue("--primary"),
            "--right-wing-background": getComputedStyle(button).getPropertyValue("--primary"),
            duration: 0.14,
          },
          {
            "--left-body-background": getComputedStyle(button).getPropertyValue("--primary-dark"),
            "--right-body-background": getComputedStyle(button).getPropertyValue("--primary-darkest"),
            duration: 0.25,
            delay: 0.1,
          },
          {
            "--trails-stroke": 171,
            duration: 0.22,
            delay: 0.22,
          },
          {
            "--success-opacity": 1,
            "--success-x": 0,
            duration: 0.2,
            delay: 1,
          },
          {
            "--success-stroke": 0,
            duration: 0.15,
          },
        ],
      });
    }
}
// Enviar formulario
form.addEventListener("submit", function (e) {
    e.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

    // Ejecutar animación del botón
    ejecutarAnimacion(btn, () => {
        // Envía el formulario usando Formspree (fetch)
        const formData = new FormData(form);

        fetch(form.action, {
            method: form.method,
            body: formData,
            headers: {
                "Accept": "application/json",
            },
        })
            .then((response) => {
                if (response.ok) {
                    // Cambiar a "Enviado"
                    btn.querySelector(".default").style.display = "none";
                    btn.querySelector(".success").style.display = "inline-block";
                    // Limpiar el formulario
                    form.reset();
                } else {
                    alert("Hubo un error al enviar el formulario.");
                }
            })
            .catch(() => {
                alert("Hubo un error al enviar el formulario.");
            });
    });
});


