const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use('/cursos_online', require('./routes/cursosOnlineRoutes'));
app.listen(port, () => {
    console.log(`SERVER INICIADO EN EL PUERTO ${port}`);
});