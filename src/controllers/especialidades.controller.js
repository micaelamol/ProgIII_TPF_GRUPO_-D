import { EspecialidadesModel as Especialidades } from "../db/especialidades.js";

// GET: todas las especialidades
// read-browse
export const buscarTodas = async (req, res) => {
  try {
    const especialidades = await Especialidades.listarEspecialidades();
    res.status(200).json({
       estado: true,
       msg: "Especialidades obtenidas con éxito!",
       especialidades 
      });
  } catch (error) {
    console.error(`Error en GET /especialidades: ${error}`);
    res.status(500).json({ estado: false, msg: "Error al obtener especialidades" });
  }
};

// GET: obtener especialidad por id
export const buscarPorId = async (req, res) => {
  try {
    // req.params es la etiqueta en la dirección web (URL) que nos avisa a qué elemento
    const { id } = req.params;

    const especialidad = await Especialidades.listarEspecialidades(id);

    return res.status(200).json({
      estado: true,
      msg: "Especialidad obtenida con éxito!",
      especialidad
    });

  } catch (error) {
    console.error(`Error en GET /especialidades/:id: ${error}`);
    // atrapa error 404 que tira desde la db
    if (error.status === 404) {
        return res.status(404).json({ estado: false, msg: error.message });
    }
    return res.status(500).json({ estado: false, msg: "Error interno" });
  }
};

// POST: crear nueva especialidad
// add-post
export const crear = async (req, res) => {
  try {
    // el cliente nos envía los datos nuevos al servidor
    const { nombre } = req.body;

    // Crear especialidad (Las validaciones de vacío ahora van en Rutas con el middleware)
    const unaEspecialidad = await Especialidades.crearEspecialidad(nombre.trim());

    return res.status(201).json({
      estado: true,
      msg: "Especialidad creada con éxito!",
      unaEspecialidad
    });

  } catch (error) {
    console.error(`Error en POST /especialidades: ${error}`);
    return res.status(500).json({ estado: false, msg: "Error al crear especialidad" });
  }
};

// PUT: modificar especialidad por id
// update
export const modificar = async (req, res) => {
  try {
    // en rutas iria algo asi app.put('/especialidades/:id', ...)
    const { id } = req.params;
    const { nombre } = req.body;

    // Modificacion:evitamos la doble consulta ya que en db valida si existe
    const unaEspecialidadActualizada = await Especialidades.actualizarEspecialidad(id, nombre.trim());

    return res.status(200).json({
      estado: true,
      msg: `Especialidad con id ${id} actualizada con éxito!`,
      unaEspecialidadActualizada
    });

  } catch (error) {
    console.error(`Error en PUT /especialidades/:id: ${error}`);
    // attrapa el error 404 de si el ID no existe
    if (error.status === 404) {
        return res.status(404).json({ estado: false, msg: error.message });
    }
    return res.status(500).json({ estado: false, msg: `Error al actualizar especialidad con id ${id}` });
  }
};

// DELETE (soft delete): desactivar especialidad por id
export const eliminar = async (req, res) => {
  try {
    const { id } = req.params;

    // Soft delete => activo = 0 directo a la base de datos
    const unaEspecialidadEliminada = await Especialidades.eliminarEspecialidad(id);

    return res.status(200).json({
       estado: true,
       msg: `Especialidad con id ${id} eliminada con éxito!`,
       unaEspecialidadEliminada
      });

  } catch (error) {
    console.error(`Error en DELETE /especialidades/:id: ${error}`);
    if (error.status === 404) {
        return res.status(404).json({ estado: false, msg: error.message });
    }
    return res.status(500).json({ estado: false, msg: `Error al eliminar especialidad con id ${id}` });
  }
};
//exportacion  anidada
export const EspecialidadesController = {
  buscarTodas,
  buscarPorId,
  crear,
  modificar,
  eliminar
};