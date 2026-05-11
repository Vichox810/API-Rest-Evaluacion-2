const db = require('../db');

const getAll = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM cursos_online');
        res.json(rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const getById = async (req, res) => {
    try {
        const id = req.params.id;
        const query = 'SELECT * FROM cursos_online WHERE id = ?';
        const [rows] = await db.query(query, [id]);
        res.json(rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const create = async (req, res) => {
    const { titulo, resumen, duracion_horas, nivel, fecha_publicacion, publicado } = req.body;
    if (!titulo) {
        return res.status(400).json({ error: 'titulo es obligatorio' });
    }
    try {
        const query = 'INSERT INTO cursos_online (titulo, resumen, duracion_horas, nivel, fecha_publicacion, publicado) VALUES (?, ?, ?, ?, ?, ?)';
        const [result] = await db.query(query, [titulo, resumen || null, duracion_horas || null, nivel || null, fecha_publicacion || null, publicado ?? false]);
        res.status(201).json({
            mensaje: 'Curso guardado con éxito',
            id: result.insertId
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar en la base de datos' });
    }
}

const update = async (req, res) => {
    const id = req.params.id;
    const { titulo, resumen, duracion_horas, nivel, fecha_publicacion, publicado } = req.body;
    if (!titulo) {
        return res.status(400).json({ error: 'titulo es obligatorio' });
    }
    try {
        const query = 'UPDATE cursos_online SET titulo=?, resumen=?, duracion_horas=?, nivel=?, fecha_publicacion=?, publicado=? WHERE id = ?';
        const [result] = await db.query(query, [titulo, resumen || null, duracion_horas || null, nivel || null, fecha_publicacion || null, publicado ?? false, id]);
        res.status(200).json({
            mensaje: 'Curso actualizado con éxito',
            affectedRows: result.affectedRows
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar en la base de datos' });
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
        res.status(500).json({ error: 'Error al eliminar en la base de datos' });
    }
}

module.exports = { getAll, getById, create, update, remove };