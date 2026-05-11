const db = require('../db');

const getAll = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM reservas_hotel');
        res.json(rows);
    } catch (error) {
        // Error al obtener todas las reservas
        res.status(500).json({ error: 'Error al obtener las reservas', details: error.message });
    }
}

const getById = async (req, res) => {
    try {
        const id = req.params.id;
        const query = 'SELECT * FROM reservas_hotel WHERE id = ?';
        const [rows] = await db.query(query, [id]);
        if (!rows[0]) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }
        res.json(rows[0]);
    } catch (error) {
        // Error al obtener una reserva por ID
        res.status(500).json({ error: 'Error al obtener la reserva', details: error.message });
    }
}

const create = async (req, res) => {
    const { huesped_nombre, habitacion_numero, fecha_entrada, fecha_salida, total_pago, estado } = req.body;
    if (!huesped_nombre || !habitacion_numero || !fecha_entrada || !fecha_salida) {
        return res.status(400).json({ error: 'huesped_nombre, habitacion_numero, fecha_entrada y fecha_salida son obligatorios' });
    }
    try {
        const query = 'INSERT INTO reservas_hotel (huesped_nombre, habitacion_numero, fecha_entrada, fecha_salida, total_pago, estado) VALUES (?, ?, ?, ?, ?, ?)';
        const [result] = await db.query(query, [huesped_nombre, habitacion_numero, fecha_entrada, fecha_salida, total_pago || null, estado || 'Pendiente']);
        res.status(201).json({
            mensaje: 'Reserva guardada con éxito',
            id: result.insertId
        });
    } catch (error) {
        // Error al crear una nueva reserva
        res.status(500).json({ error: 'Error al guardar en la base de datos', details: error.message });
    }
}

const update = async (req, res) => {
    const id = req.params.id;
    const { huesped_nombre, habitacion_numero, fecha_entrada, fecha_salida, total_pago, estado } = req.body;
    if (!huesped_nombre || !habitacion_numero || !fecha_entrada || !fecha_salida) {
        return res.status(400).json({ error: 'huesped_nombre, habitacion_numero, fecha_entrada y fecha_salida son obligatorios' });
    }
    try {
        const query = 'UPDATE reservas_hotel SET huesped_nombre=?, habitacion_numero=?, fecha_entrada=?, fecha_salida=?, total_pago=?, estado=? WHERE id = ?';
        const [result] = await db.query(query, [huesped_nombre, habitacion_numero, fecha_entrada, fecha_salida, total_pago || null, estado || 'Pendiente', id]);
        res.status(200).json({
            mensaje: 'Reserva actualizada con éxito',
            affectedRows: result.affectedRows
        });
    } catch (error) {
        // Error al actualizar una reserva existente
        res.status(500).json({ error: 'Error al actualizar en la base de datos', details: error.message });
    }
}

const remove = async (req, res) => {
    const id = req.params.id;
    try {
        const query = 'DELETE FROM reservas_hotel WHERE id = ?';
        await db.query(query, [id]);
        res.status(200).json({
            mensaje: 'Reserva eliminada con éxito'
        });
    } catch (error) {
        // Error al eliminar una reserva
        res.status(500).json({ error: 'Error al eliminar en la base de datos', details: error.message });
    }
}

module.exports = { getAll, getById, create, update, remove };
