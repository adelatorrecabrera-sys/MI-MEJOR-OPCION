document.addEventListener("DOMContentLoaded", () => {

    const boton = document.querySelector("button");

    boton.addEventListener("click", async () => {

        const resultado = document.getElementById("resultado");

        resultado.style.display = "block";

        resultado.innerHTML = `
            <h2>Aplicación en construcción</h2>
            <p>
            Conexión con OpenRouteService preparada correctamente.
            </p>
            <p>
            En el siguiente paso conectaremos las gasolineras reales.
            </p>
        `;

    });

});
