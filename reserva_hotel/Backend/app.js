const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());
app.use('/reservas_hotel', require('./routes/reservasHotelRoutes'));
app.listen(port, () => {
    console.log(`SERVER INICIADO EN EL PUERTO ${port}`);
});