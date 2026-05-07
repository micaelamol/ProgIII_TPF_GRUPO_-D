
import * as servicio from "../servicios/especialidadesServicio.js";

// GET: todas las especialidades

export const buscarTodas = async (req, res) => {
  try {
    const especialidades = await servicio.buscarTodas();
    res.status(200).json({
       estado: true,
       especialidades 
      });
  } catch (error) {
    console.error(`Error en GET /especialidades: ${error}`);
    res.status(500).json({ estado: false, msg: "Error interno" });
  }
};

// GET: obtener especialidad por id

export const buscarPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const especialidad = await servicio.obtenerPorId(id);

    if (!especialidad) {
      return res.status(404).json({
        estado: false,
        msg: "Especialidad no encontrada"
      });
    }

    return res.status(200).json({
      estado: true,
      especialidad
    });

  } catch (error) {
    console.error(`Error en GET /especialidades/:id: ${error}`);

    return res.status(500).json({
      estado: false,
      msg: "Error interno"
    });
  }
};

//POST: crear nueva especialidad

export const crear = async (req, res) => {
  try {
    const { nombre } = req.body;

    // Validar que venga nombre
    if (!nombre || nombre.trim() === "") {
      return res.status(400).json({
        estado: false,
        msg: "El nombre es obligatorio"
      });
    }

    // Crear especialidad
    await servicio.crear(nombre.trim());

    return res.status(201).json({
      estado: true,
      msg: "Especialidad creada"
    });

  } catch (error) {
    console.error(`Error en POST /especialidades: ${error}`);

    return res.status(500).json({
      estado: false,
      msg: "Error interno"
    });
  }
};

// PUT: modificar especialidad por id

export const modificar = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;

    // Validar nombre
    if (!nombre || nombre.trim() === "") {
      return res.status(400).json({
        estado: false,
        msg: "El nombre es obligatorio"
      });
    }

    // Verificar si existe
    const especialidad = await servicio.obtenerPorId(id);

    if (!especialidad) {
      return res.status(404).json({
        estado: false,
        msg: "Especialidad no encontrada"
      });
    }

    // Modificar
    await servicio.modificar(id, nombre.trim());

    return res.status(200).json({
      estado: true,
      msg: "Especialidad actualizada"
    });

  } catch (error) {
    console.error(`Error en PUT /especialidades/:id: ${error}`);

    return res.status(500).json({
      estado: false,
      msg: "Error interno"
    });
  }
};


// DELETE (soft delete): desactivar especialidad por id

export const eliminar = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar si existe y está activa
    const especialidad = await servicio.obtenerPorId(id);

    if (!especialidad) {
      return res.status(404).json({
         estado: false,
         msg: "Especialidad no encontrada"
        });
    }

    // Soft delete => activo = 0
    await servicio.eliminar(id);

    return res.status(200).json({
       estado: true,
       msg: "Especialidad eliminada"
      });

  } catch (error) {
    console.error(`Error en DELETE /especialidades/:id: ${error}`);

    return res.status(500).json({
      estado: false,
      msg: "Error interno"
    });
  }
};