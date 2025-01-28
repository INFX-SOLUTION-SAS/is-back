import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import swaggerConfig from './config/swaggerConfig.js';
import routes from './routes/indexRoutes.js'
import conectDb from './config/db.js';
import Seeder from './seeders/Seeder.js';

dotenv.config({ path: '../local.env' });

///ejecuto los jobs de sincronización ///
//import './services/jobs/synchronizeUsers.js'


// import './services/jobs/recivedDailyByProduct.js'
// import './services/jobs/productionDailyByProduct.js'

//ojo periodo y anual ya no lo uso, porque lo saco mendiente consultas del diario///
//import './services/jobs/recivedPeriodByProduct.js'
//import './services/jobs/productionPeriodByProduct.js'

const PORT = process.env.PORT || 7000;

const app = express();

await app.use(express.json({ limit: '50mb' }));

//hola

await app.use(cors())


await Seeder().catch((err) => {
    console.log(err)
});
await swaggerConfig(app);

await app.use(routes)

await app.get('/', (req, res) => {
    res.send("API is running 2024...");
})


const startApp = async () => {
    try {
        await conectDb()
        const sequelize = conectDb()
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida.');

        await sequelize.sync({ force: true }); // Sincronizar modelos
        console.log('Modelos sincronizados.');

        await Seeder()
        console.log('Seed ejecutado correctamente.');

        app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
    } catch (error) {
        console.error('Error al iniciar la aplicación:', error);
    }
};

startApp();