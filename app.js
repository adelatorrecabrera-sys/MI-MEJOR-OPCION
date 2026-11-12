document.addEventListener("DOMContentLoaded", () => {

    const boton = document.getElementById("buscarBtn");

    boton.addEventListener("click", async () => {

        const municipio = document.getElementById("municipio").value.trim().toUpperCase();

        const carburante = document.getElementById("carburante").value;

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

            let campoPrecio = "";

            if (carburante === "Gasolina 95 E5") {
                campoPrecio = "Precio Gasolina 95 E5";
            } else {
                campoPrecio = "Precio Gasoleo A";
            }

            let gasolineras = datos.ListaEESSPrecio.filter(estacion => {

                const municipioOK =
                    (estacion.Municipio || "").toUpperCase() === municipio;

                const tienePrecio =
                    estacion[campoPrecio] &&
                    estacion[campoPrecio] !== "";

                return municipioOK && tienePrecio;

            });

            gasolineras = gasolineras.map(estacion => {

                const precioTexto = estacion[campoPrecio]
                    .replace(",", ".");

                return {
                    ...estacion,
                    precio: parseFloat(precioTexto)
                };

            });

            gasolineras.sort((a, b) => a.precio - b.precio);

            if (gasolineras.length === 0) {

                resultado.innerHTML = `
                    <h2>Resultado</h2>
                    <p>No se han encontrado gasolineras con precios válidos.</p>
                `;

                return;
            }

            const top10 = gasolineras.slice(0, 10);

            let html = `
                <h2>🏆 Top 10 gasolineras más baratas</h2>
                <p>
                    Municipio: <strong>${municipio}</strong><br>
                    Carburante: <strong>${carburante}</strong>
                </p>
            `;

            top10.forEach((estacion, index) => {

                html += `
                    <div style="
                        border:1px solid #ddd;
                        padding:12px;
                        margin-bottom:10px;
                        border-radius:8px;
                        background:white;
                    ">
                        <strong>
                            #${index + 1}
                            - ${estacion.Rótulo || "Sin rótulo"}
                        </strong>
                        <br><br>

                        ${estacion.Dirección || ""}
                        <br>

                        ${estacion.Municipio || ""}
                        <br><br>

                        <span style="
                            color:green;
                            font-size:20px;
                            font-weight:bold;
                        ">
                            ${estacion.precio.toFixed(3)} €/l
                        </span>
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
