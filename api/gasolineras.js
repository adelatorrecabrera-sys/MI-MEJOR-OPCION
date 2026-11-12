
export default async function handler(req, res) {

    try {

        const respuesta = await fetch(
            "https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/"
        );

        const datos = await respuesta.json();

        res.status(200).json(datos);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

}
