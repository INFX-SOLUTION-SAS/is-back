import Module
 from "../models/module.js";
const ModuleSeeder = async () => {

    let modules = await Module.findOne();
    
    if (modules == null) {
        await Module.create({ id: 1, name: 'produccion', description: 'Producción', state: true })
        await Module.create({ id: 2, name: 'laboratorio', description: 'Laboratorio', state: true })
        await Module.create({ id: 3, name: 'logistic', description: 'Comercial', state: true })
        await Module.create({ id: 4, name: 'casino', description: 'Casino', state: true })
        await Module.create({ id: 5, name: 'administracion', description: 'Administracion', state: true })
        await Module.create({ id: 6, name: 'contabilidad', description: 'Contabilidad', state: true })
        await Module.create({ id: 7, name: 'bascula', description: 'Bascula', state: true })
        await Module.create({ id: 8, name: 'nomina', description: 'Nomina', state: true })
        await Module.create({ id: 9, name: 'mantenimiento', description: 'Mantenimiento', state: true })
        await Module.create({ id: 10, name: 'automatizacion', description: 'Automatización', state: true })
        await Module.create({ id: 11, name: 'agronomico', description: 'Agronomico', state: true })
        await Module.create({ id: 12, name: 'tarima', description: 'Tarima', state: true })
        await Module.create({ id: 13, name: 'reception', description: 'Reception', state: true })
    }


}


export default ModuleSeeder;