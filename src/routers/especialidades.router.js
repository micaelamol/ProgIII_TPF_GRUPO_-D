import { Router } from "express";
import { check, param } from "express-validator";
import { EspecialidadesController } from "../controllers/especialidades.controller.js";
import { validarCampos } from "../middlewares/errorHandler.js";

const router = Router();

// GET — todas las especialidades
router.get("/", EspecialidadesController.buscarTodas);

// GET — una especialidad por ID
router.get(
    "/:id",
    [
        param("id", "El ID debe ser un número entero").isInt(),
        validarCampos
    ],
    EspecialidadesController.buscarPorId
);

// POST — crear especialidad
router.post(
    "/",
    [
        check("nombre")
            .notEmpty().withMessage("El nombre es obligatorio.")
            .isLength({ max: 120 }).withMessage("Máximo 120 caracteres."),
        validarCampos
    ],
    EspecialidadesController.crear
);

// PUT — modificar especialidad
router.put(
    "/:id",
    [
        param("id", "El ID debe ser un número entero").isInt(),
        check("nombre")
            .notEmpty().withMessage("El nombre es obligatorio.")
            .isLength({ max: 120 }).withMessage("Máximo 120 caracteres."),
        validarCampos
    ],
    EspecialidadesController.modificar
);

// DELETE — eliminar especialidad
router.delete(
    "/:id",
    [
        param("id", "El ID debe ser un número entero").isInt(),
        validarCampos
    ],
    EspecialidadesController.eliminar
);

export default router;