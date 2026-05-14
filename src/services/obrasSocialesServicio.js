import { ObrasSociales } from "../db/obrasSociales.js";

export default class ObrasSocialesServicio {

    static async obtenerObrasSociales() {
        const obrasSociales = await ObrasSociales.listarObrasSociales();
        return obrasSociales;
    }

    static async obtenerObraSocialPorId(id) {
        const obraSocial = await ObrasSociales.listarObraSocialPorId(id);
        return obraSocial;
    }

    static async crearObraSocial(obraSocial) {
        const nuevaObraSocial = await ObrasSociales.crearObraSocial(obraSocial);
        return nuevaObraSocial;
    }

    static async actualizarObraSocial(id, obraSocial) {
        const obraSocialActualizada = await ObrasSociales.actualizarObraSocial(id, obraSocial);
        return obraSocialActualizada;
    }

    static async eliminarObraSocial(id) {
        const resultado = await ObrasSociales.eliminarObraSocial(id);
        return resultado;
    }
}
