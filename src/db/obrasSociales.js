import mysql from "mysql2/promise";
import { connection } from "./connection.js";

export class ObrasSociales {
  static async listarObrasSociales() {
    // lista todas las obras sociales activas
    try {
      const sql = "SELECT * FROM obras_sociales WHERE activo = 1";
      const [rows] = await connection.query(sql);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async listarObraSocialPorId(id) {
    try {
      const sql = "SELECT * FROM obras_sociales WHERE id_obra_social = ? AND activo = 1";
      const [rows] = await connection.query(sql, [id]);

      if (rows.length === 0) {
        const error = new Error(`No se encontró la obra social con id ${id}`);
        error.status = 404;
        throw error;
      }
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async crearObraSocial(nombre) {
    try {
      const sql = "INSERT INTO obras_sociales (nombre) VALUES (?)";
      const [result] = await connection.query(sql, [nombre]);

      return { id: result.insertId, nombre };
    } catch (error) {
      throw error;
    }
  }

  static async eliminarObraSocial(id) {
    try {
      const sql = "UPDATE obras_sociales SET activo = 0 WHERE id_obra_social = ?";
      const [result] = await connection.query(sql, [id]);
      if (result.affectedRows === 0) {
        const error = new Error(`No se encontró la obra social con id ${id}`);
        error.status = 404;
        throw error;
      } else {
        return { status: 200, message: `Obra social con id ${id} eliminada exitosamente` };
      }
    } catch (error) {
      throw error;
    }
  }

  static async actualizarObraSocial(id, nombre) {
    try {
      const sql = "UPDATE obras_sociales SET nombre = ? WHERE id_obra_social = ?";
      const [result] = await connection.query(sql, [nombre, id]);
      if (result.affectedRows === 0) {
        const error = new Error(`No se encontró la obra social con id ${id}`);
        error.status = 404;
        throw error;
      } else {
        return { status: 200, message: `Obra social con id ${id} actualizada exitosamente` };
      }
    } catch (error) {
      throw error;
    }
  }
}
