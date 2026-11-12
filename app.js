document.addEventListener("DOMContentLoaded", () => {

    const boton = document.getElementById("buscarBtn");

    boton.addEventListener("click", async () => {

        const origen = document.getElementById("origen").value;
        const municipio = document.getElementById("municipio").value;
        const carburante = document.getElementById("carburante").value;
        const consumo = document.getElementById("consumo").value;
        const litros = document.getElementById("litros").value;

        const resultado = document.getElementById("resultado");

        resultado.style.display = "block";

        resultado.innerHTML = `
            <h2>Datos introducidos</h2>

            <p><strong>Dirección:</strong> ${origen}</p>

            <p><strong>Municipio:</strong> ${municipio}</p>

            <p><strong>Carburante:</strong> ${carburante}</p>

            <p><strong>Consumo:</strong> ${consumo} l/100 km</p>

            <p><strong>Litros a repostar:</strong> ${litros} litros</p>

            <hr>

            <p>
                Aplicación preparada correctamente.
                El siguiente paso será conectar los datos reales
                de las gasolineras y calcular la opción más rentable.
            </p>
        `;

    });

});
