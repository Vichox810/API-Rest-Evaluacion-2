const db = require('../db');

const formatDateValue = (value) => {
    if (value == null) return null;
    const d = new Date(value);
    const pad = (n) => String(n).padStart(2, '0');
    const date = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const seconds = d.getSeconds();
    if (hours || minutes || seconds) {
        return `${date} ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }
    return date;
};

const getAll = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM reservas_hotel');
        const formattedRows = rows.map((row) => ({
            ...row,
            fecha_entrada: formatDateValue(row.fecha_entrada),
            fecha_salida: formatDateValue(row.fecha_salida)
        }));
        res.json(formattedRows);
    } catch (error) {
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
        const reserva = {
            ...rows[0],
            fecha_entrada: formatDateValue(rows[0].fecha_entrada),
            fecha_salida: formatDateValue(rows[0].fecha_salida)
        };
        res.json(reserva);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la reserva', details: error.message });
    }
}

const create = async (req, res) => {
    const { huesped_nombre, habitacion_numero, fecha_entrada, fecha_salida, total_pago, estado } = req.body;
    if (!huesped_nombre || !habitacion_numero || !fecha_entrada || !fecha_salida) {
        return res.status(400).json({ error: 'huesped_nombre, habitacion_numero, fecha_entrada y fecha_salida son obligatorios' });
    }

    // Convertir total_pago a número si viene como string (para manejar valores grandes)
    let totalPagoParsed = null;
    if (total_pago != null) {
        totalPagoParsed = parseFloat(total_pago);
        if (isNaN(totalPagoParsed)) {
            return res.status(400).json({ error: 'total_pago debe ser un número válido' });
        }
    }

    try {
        const query = 'INSERT INTO reservas_hotel (huesped_nombre, habitacion_numero, fecha_entrada, fecha_salida, total_pago, estado) VALUES (?, ?, ?, ?, ?, ?)';
        const [result] = await db.query(query, [huesped_nombre, habitacion_numero, fecha_entrada, fecha_salida, totalPagoParsed, estado || 'Pendiente']);
        res.status(201).json({
            mensaje: 'Reserva guardada con éxito',
            id: result.insertId
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar en la base de datos', details: error.message });
    }
}

const update = async (req, res) => {
    const id = req.params.id;
    const { huesped_nombre, habitacion_numero, fecha_entrada, fecha_salida, total_pago, estado } = req.body;
    if (!huesped_nombre || !habitacion_numero || !fecha_entrada || !fecha_salida) {
        return res.status(400).json({ error: 'huesped_nombre, habitacion_numero, fecha_entrada y fecha_salida son obligatorios' });
    }

    // Convertir total_pago a número si viene como string (para manejar valores grandes)
    let totalPagoParsed = null;
    if (total_pago != null) {
        totalPagoParsed = parseFloat(total_pago);
        if (isNaN(totalPagoParsed)) {
            return res.status(400).json({ error: 'total_pago debe ser un número válido' });
        }
    }

    try {
        const query = 'UPDATE reservas_hotel SET huesped_nombre=?, habitacion_numero=?, fecha_entrada=?, fecha_salida=?, total_pago=?, estado=? WHERE id = ?';
        const [result] = await db.query(query, [huesped_nombre, habitacion_numero, fecha_entrada, fecha_salida, totalPagoParsed, estado || 'Pendiente', id]);
        res.status(200).json({
            mensaje: 'Reserva actualizada con éxito',
            affectedRows: result.affectedRows
        });
    } catch (error) {
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
        res.status(500).json({ error: 'Error al eliminar en la base de datos', details: error.message });
    }
}

module.exports = { getAll, getById, create, update, remove };
