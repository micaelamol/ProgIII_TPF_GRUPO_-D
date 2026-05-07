import { Router } from "express";
// Importa obeto controladores de especialidades
import { EspecialidadesController } from "../controllers/especialidades.controller.js";

const router = Router();

router.get('/', EspecialidadesController.obtenerEspecialidades) //Cuando alguien haga una petición GET a la ruta principal (/), pasa el pedido directamente a obtenerEspecialidades de controller
router.post('/', EspecialidadesController.crearEspecialidad);
router.put('/:id_especialidad', EspecialidadesController.actualizarEspecialidad);
router.delete('/:id_especialidad', EspecialidadesController.eliminarEspecialidad);

export default router;