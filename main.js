document.addEventListener("DOMContentLoaded", () => {
    // ------------------------------
    // SALUDO DINÁMICO EN INICIO
    // ------------------------------
    const saludo = document.getElementById("saludo");
    if (saludo) {
        const hora = new Date().getHours();
        let mensaje;
        if (hora >= 5 && hora < 12) {
            mensaje = "¡Buenos días!\nBienvenido a Harina Express.";
        } else if (hora >= 12 && hora < 18) {
            mensaje = "¡Buenas tardes!\nEncuentra la mejor harina para tus recetas.";
        } else if (hora >= 18 && hora <= 23) {
            mensaje = "¡Buenas noches!\nDescubre nuestra variedad de harinas.";
        } else {
            mensaje = "¡Hola!\nHarina Express disponible 24/7 para ti.";
        }
        saludo.textContent = mensaje;
    }

    // ------------------------------
    // REDIRECCIÓN DE BOTONES "COMPRAR"
    // ------------------------------
    function redireccionarAContacto() {
        window.location.href = "contacto.html";
    }

    ["comprarTrigo", "comprarEspeciales", "comprarOrganicas"].forEach(id => {
        const boton = document.getElementById(id);
        if (boton) {
            boton.addEventListener("click", redireccionarAContacto);
        }
    });

    // ------------------------------
    // FUNCIONALIDAD MODAL EN GALERÍA
    // ------------------------------
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");
    const modalDesc = document.getElementById("modal-desc");
    const closeBtn = document.querySelector(".close");

    function abrirModal(src, alt) {
        if (modal && modalImg && modalDesc) {
            modal.style.display = "block";
            modalImg.src = src;
            modalDesc.textContent = alt;
        }
    }

    function cerrarModal() {
        if (modal) modal.style.display = "none";
    }

    if (closeBtn) {
        closeBtn.onclick = cerrarModal;
    }

    window.onclick = function (e) {
        if (e.target === modal) cerrarModal();
    };

    // ------------------------------
    // GALERÍA - ELIMINAR IMAGEN
    // ------------------------------
    document.querySelectorAll("#galeria .imagen-container").forEach(div => {
        const img = div.querySelector("img");
        const btn = div.querySelector(".btn-eliminar");

        if (img) {
            img.onclick = () => abrirModal(img.src, img.alt);
        }

        if (btn) {
            btn.onclick = () => div.remove();
        }
    });

    // ------------------------------
    // FORMULARIO DE CONTACTO
    // ------------------------------
    const form = document.getElementById("formulario-contacto");
    const nombre = document.getElementById("nombre");
    const apellido = document.getElementById("apellido");
    const correo = document.getElementById("email");
    const comentario = document.getElementById("comentario");
    const tipo = document.getElementById("solicitud");
    const mensajeDiv = document.getElementById("mensaje-confirmacion");

    function mostrarMensaje(texto, tipo) {
        if (mensajeDiv) {
            mensajeDiv.textContent = texto;
            mensajeDiv.style.color = tipo === "error" ? "red" : "green";
            setTimeout(() => {
                mensajeDiv.textContent = "";
            }, 4000);
        }
    }

    // Forzar opción por defecto en "Tipo de Solicitud" al cargar la página
    if (tipo) {
        tipo.selectedIndex = 0;
    }

    if (comentario && tipo) {
        comentario.addEventListener("input", () => {
            const texto = comentario.value.toLowerCase();
            if (texto.includes("pedido") || texto.includes("harina")) {
                tipo.value = "Pedido";
            } else if (texto.includes("precio") || texto.includes("consulta")) {
                tipo.value = "Consulta";
            } else if (texto.includes("mayor") || texto.includes("venta")) {
                tipo.value = "Venta";
            } else {
                tipo.selectedIndex = 0; // Vuelve a la opción "Seleccione una opción"
            }
        });
    }


    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            enviarWhatsApp(); // Llama directamente a la función de WhatsApp
        });
    }

    // ------------------------------
    // FUNCIÓN ENVIAR WHATSAPP CON VALIDACIONES
    // ------------------------------
    function enviarWhatsApp() {
        const nombreVal = nombre.value.trim();
        const apellidoVal = apellido.value.trim();
        const correoVal = correo.value.trim();
        const tipoVal = tipo.value;
        const comentarioVal = comentario.value.trim();

        if (!nombreVal || !apellidoVal || !correoVal || !tipoVal || !comentarioVal) {
            mostrarMensaje("Por favor, complete todos los campos.", "error");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correoVal)) {
            mostrarMensaje("El correo electrónico no es válido.", "error");
            return;
        }

        const mensaje =
            `*Pedido Harina Express*\n\n` +
            `*Nombre:* ${nombreVal} ${apellidoVal}\n` +
            `*Correo:* ${correoVal}\n` +
            `*Tipo de Solicitud:* ${tipoVal}\n` +
            `*Detalles del Pedido:*\n${comentarioVal}`;

        const numeroWhatsApp = "56971307840"; // Reemplaza por tu número real
        const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

        window.open(url, "_blank");

        mostrarMensaje("Redirigiendo a WhatsApp...", "success");
        form.reset();
    }
});
