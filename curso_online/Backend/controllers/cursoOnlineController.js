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
        const [rows] = await db.query('SELECT * FROM cursos_online');
        const formattedRows = rows.map((row) => ({
            ...row,
            fecha_publicacion: formatDateValue(row.fecha_publicacion)
        }));
        res.json(formattedRows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los cursos', details: error.message });
    }
}

const getById = async (req, res) => {
    try {
        const id = req.params.id;
        const query = 'SELECT * FROM cursos_online WHERE id = ?';
        const [rows] = await db.query(query, [id]);
        if (!rows[0]) {
            return res.status(404).json({ error: 'Curso no encontrado' });
        }
        const curso = {
            ...rows[0],
            fecha_publicacion: formatDateValue(rows[0].fecha_publicacion)
        };
        res.json(curso);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el curso', details: error.message });
    }
}

const create = async (req, res) => {
    const { titulo, resumen, duracion_horas, nivel, fecha_publicacion, publicado } = req.body;
    if (!titulo) {
        return res.status(400).json({ error: 'titulo es obligatorio' });
    }

    if (duracion_horas != null) {
        const duracion = Number(duracion_horas);
        if (!Number.isInteger(duracion) || duracion < 1 || duracion > 500) {
            return res.status(400).json({ error: 'duracion_horas debe ser un entero entre 1 y 500' });
        }
    }

    try {
        const query = 'INSERT INTO cursos_online (titulo, resumen, duracion_horas, nivel, fecha_publicacion, publicado) VALUES (?, ?, ?, ?, ?, ?)';
        const [result] = await db.query(query, [titulo, resumen || null, duracion_horas || null, nivel || null, fecha_publicacion || null, publicado ?? false]);
        res.status(201).json({
            mensaje: 'Curso guardado con éxito',
            id: result.insertId
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar en la base de datos', details: error.message });
    }
}

const update = async (req, res) => {
    const id = req.params.id;
    const { titulo, resumen, duracion_horas, nivel, fecha_publicacion, publicado } = req.body;
    if (!titulo) {
        return res.status(400).json({ error: 'titulo es obligatorio' });
    }

    if (duracion_horas != null) {
        const duracion = Number(duracion_horas);
        if (!Number.isInteger(duracion) || duracion < 1 || duracion > 500) {
            return res.status(400).json({ error: 'duracion_horas debe ser un entero entre 1 y 500' });
        }
    }

    try {
        const query = 'UPDATE cursos_online SET titulo=?, resumen=?, duracion_horas=?, nivel=?, fecha_publicacion=?, publicado=? WHERE id = ?';
        const [result] = await db.query(query, [titulo, resumen || null, duracion_horas || null, nivel || null, fecha_publicacion || null, publicado ?? false, id]);
        res.status(200).json({
            mensaje: 'Curso actualizado con éxito',
            affectedRows: result.affectedRows
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar en la base de datos', details: error.message });
    }
}

const remove = async (req, res) => {
    const id = req.params.id;
    try {
        const query = 'DELETE FROM cursos_online WHERE id = ?';
        await db.query(query, [id]);
        res.status(200).json({
            mensaje: 'Curso eliminado con éxito'
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar en la base de datos', details: error.message });
    }
}

module.exports = { getAll, getById, create, update, remove };