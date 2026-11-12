export default async function handler(req, res) {

    try {

        const direccion = req.query.q;

        if (!direccion) {
            return res.status(400).json({
                error: "Falta la dirección"
            });
        }

        const url =
            "https://api.openrouteservice.org/geocode/search?" +
            new URLSearchParams({
                api_key: process.env.ORS_API_KEY,
                text: direccion,
                size: 1
            });

        const respuesta = await fetch(url);

        const datos = await respuesta.json();

        res.status(200).json(datos);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

}
