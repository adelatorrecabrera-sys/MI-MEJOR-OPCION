document.addEventListener("DOMContentLoaded", () => {

    const boton = document.getElementById("buscarBtn");

    boton.addEventListener("click", async () => {

        const municipio = document.getElementById("municipio").value.trim().toUpperCase();

        const resultado = document.getElementById("resultado");

        resultado.style.display = "block";
        resultado.innerHTML = "<p>Buscando gasolineras...</p>";

        try {

            const respuesta = await fetch("/api/gasolineras");

            const datos = await respuesta.json();

            if (!datos.ListaEESSPrecio) {
                resultado.innerHTML = "<p>No se han podido obtener datos.</p>";
                return;
            }

            const gasolineras = datos.ListaEESSPrecio.filter(estacion =>
                (estacion.Municipio || "").toUpperCase() === municipio
            );

            if (gasolineras.length === 0) {

                resultado.innerHTML = `
                    <h2>Resultado</h2>
                    <p>No se han encontrado gasolineras para el municipio indicado.</p>
                `;

                return;
            }

            const primeras = gasolineras.slice(0, 10);

            let html = `
                <h2>Gasolineras encontradas (${gasolineras.length})</h2>
            `;

            primeras.forEach(estacion => {

                html += `
                    <div style="border:1px solid #ddd;padding:10px;margin-bottom:10px;">
                        <strong>${estacion.Rótulo || "Sin rótulo"}</strong><br>
                        ${estacion.Dirección || ""}<br>
                        ${estacion.Municipio || ""}<br>
                    </div>
                `;

            });

            resultado.innerHTML = html;

        } catch (error) {

            resultado.innerHTML = `
                <h2>Error</h2>
                <p>${error.message}</p>
            `;

        }

    });

});
