import ExcelJS from 'exceljs';
import xlsx from "xlsx";
import fs from "fs";
import { Op } from 'sequelize';

import Movement from '../../models/movement.js'
import Lot from '../../models/lot.js'
import Activity from '../../models/activity.js'
import Product from '../../models/product.js'
import MovementType from '../../models/movementType.js'



import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dirPath = path.resolve(__dirname, '../../files');


// Función principal para realizar la consulta y generar el Excel

const getExcelMovements = async (req, res) => {
    const { startDate, endDate } = req.query

    console.log("entro a generar el excel")

    try {


        Activity.hasMany(Movement, { foreignKey: 'activityId' });
        Movement.belongsTo(Activity, { foreignKey: 'activityId' });

        Product.hasMany(Movement, { foreignKey: 'productId' });
        Movement.belongsTo(Product, { foreignKey: 'productId' });

        Lot.hasMany(Movement, { foreignKey: 'lotId' });
        Movement.belongsTo(Lot, { foreignKey: 'lotId' });

        MovementType.hasMany(Movement, { foreignKey: 'type' });
        Movement.belongsTo(MovementType, { foreignKey: 'type' });


        // Obtener datos desde la BD
        const report = await Movement.findAll({
            where: { date: {  [Op.between]: [startDate + " 00:00:00", endDate + " 23:59:59"] } },
            include: [
                { model: Product, attributes: ['name'] },
                { model: Activity, attributes: ['name'] },
                { model: Lot, attributes: ['name'] },
                { model: MovementType, attributes: ['name'] }
            ],
            attributes: ['id', 'quantity', 'days', 'date', 'ticket', 'description'],
            order: [['createdAt', 'DESC']]
        });



        console.log(report)


        const formattedReport = report.map(row => ({
            id: row.id,
            quantity: row.quantity,
            days: row.days,
            date: row.date,
            ticket: row.ticket || 'N/A',
            description: row.description || 'N/A',
            product: row.product?.name || 'N/A', // Acceder a product.name
            activity: row.activity?.name || 'N/A',
            lot: row.lot?.name || 'N/A',
            movementType: row.movement_type?.name || 'N/A'
        }));


        // Crear un nuevo workbook y una hoja
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Movements');

        worksheet.columns = [
            { header: 'Fecha', key: 'date', width: 12 },
            { header: 'Lote', key: 'lot', width: 20 },
            { header: 'Tipo de Movimiento', key: 'movementType', width: 20 },
            { header: 'Actividad', key: 'activity', width: 20 },
            { header: 'Cantidad', key: 'quantity', width: 15 },
            { header: 'Días', key: 'days', width: 10 },
            { header: 'Producto', key: 'product', width: 15 },
            { header: 'Tiquete', key: 'ticket', width: 15 },
            { header: 'Descripcion', key: 'description', width: 15 },
        ];

        // Agregar datos a la hoja
        worksheet.addRows(formattedReport);

        // Aplicar estilos a los encabezados
        worksheet.getRow(1).eachCell(cell => {
            cell.font = { bold: true };
            cell.alignment = { horizontal: 'center' };
        });

        // Configurar la respuesta HTTP para la descarga con `stream`
        res.setHeader('Content-Disposition', 'attachment; filename="report.xlsx"');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

        // Enviar el archivo al cliente usando stream
        await workbook.xlsx.write(res);
        res.end();

    } catch (error) {
        console.error("Error al generar el Excel:", error);
        res.status(500).send("Error al generar el archivo Excel");
    }
}


export default getExcelMovements;
