import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import swaggerConfig  from './config/swaggerConfig.js';
import routes from './routes/indexRoutes.js'
import conectDb from './config/db.js';
import Seeder from './seeders/Seeder.js';

dotenv.config();

///ejecuto los jobs de sincronización ///
//import './services/jobs/synchronizeUsers.js'


// import './services/jobs/recivedDailyByProduct.js'
// import './services/jobs/productionDailyByProduct.js'

//ojo periodo y anual ya no lo uso, porque lo saco mendiente consultas del diario///
//import './services/jobs/recivedPeriodByProduct.js'
//import './services/jobs/productionPeriodByProduct.js'

const port = process.env.PORT || 7000; 

const app = express();

await app.use(express.json({limit: '50mb'}));

//hola

await app.use(cors())
await app.listen(port, () => {
    //cambio el message running
    console.log(`Server is running on port::: ${port}`)
})
await conectDb()
await Seeder().catch((err)=>{
    console.log(err)
});
await swaggerConfig(app);

await app.use(routes)

await app.get('/', (req, res) => {
    res.send("API is running 2024...");
})