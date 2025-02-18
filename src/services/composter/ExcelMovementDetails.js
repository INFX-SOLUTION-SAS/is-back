import ExcelJS from 'exceljs';
import xlsx from "xlsx";
import fs from "fs";
import { Op } from "sequelize";

import MovementDetail from '../../models/movementDetail.js'
import Movement from '../../models/movement.js'
import Lot from '../../models/lot.js'
import Activity from '../../models/activity.js'
import Product from '../../models/product.js'
import MovementType from '../../models/movementType.js'




// Función principal para realizar la consulta y generar el Excel

const getExcelMovementDetails = async (req, res) => {
    const {startDate, endDate} = req.query
    console.log("entro a generar el excel")
    try {


        Movement.hasMany(MovementDetail, { foreignKey: 'movementId' });
        MovementDetail.belongsTo(Movement, { foreignKey: 'movementId' });

        Lot.hasMany(Movement, { foreignKey: 'lotId' });
        Movement.belongsTo(Lot, { foreignKey: 'lotId' });

        MovementType.hasMany(Movement, { foreignKey: 'type' });
        Movement.belongsTo(MovementType, { foreignKey: 'type' });

        Activity.hasMany(Movement, { foreignKey: 'activityId' });
        Movement.belongsTo(Activity, { foreignKey: 'activityId' });

        Product.hasMany(Movement, { foreignKey: 'productId' });
        Movement.belongsTo(Product, { foreignKey: 'productId' });





        const report = await MovementDetail.findAll({            
            attributes: ['description', 'machineName', 'time'],
            include: [
                {
                  model: Movement,
                  attributes: ['date', 'quantity', 'description', 'days', 'ticket'],
                  where: {
                    date: {
                      [Op.between]: [startDate+" 00:00:00", endDate+" 23:59:59"] 
                    }
                  },
                  include: [
                    {
                      model: Lot,
                      attributes: ['name']
                    },
                    {
                      model: Product,
                      attributes: ['name']
                    } ,
                    {
                      model: MovementType,
                      attributes: ['name']
                    }  ,
                    {
                      model: Activity,
                      attributes: ['name']
                    }        
                  ]
                }   
              ],   
           
        });

        console.log(report)


        const formattedReport = report.map(row => ({
            date: row.movement.date,
            lot: row.movement.lot.name,
            movementType: row.movement.movement_type?.name || 'N/A',
            activity: row.movement.activity?.name || 'N/A',
            product: row.movement.product?.name || 'N/A',
            machineName: row.machineName,
            time: row.time,
            days: row.movement.days,
            ticket: row.movement.ticket || 'N/A',
            description_movement: row.movement.description || 'N/A',
            description_activity: row.description || 'N/A',
            quantity: row.movement.quantity || 'N/A',
        }));


        // Crear un nuevo workbook y una hoja
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Movements');

        worksheet.columns = [
            { header: 'Fecha', key: 'date', width: 12 },
            { header: 'Lote', key: 'lot', width: 18 },
            { header: 'Tipo', key: 'movementType', width: 10 },
            { header: 'Actividad', key: 'activity', width: 10 },
            { header: 'Producto', key: 'product', width: 15 },
            { header: 'Maquina', key: 'machineName', width: 15 },
            { header: 'Tiempo (min)', key: 'time', width: 13 },
            { header: 'Días', key: 'days', width: 8 },
            { header: 'Tiquete', key: 'ticket', width: 10 },
            { header: 'Cantidad', key: 'quantity', width: 10 },
            { header: 'Descripcion movimiento', key: 'description_movement', width: 25 },
            { header: 'Descripcion actividad', key: 'description_activity', width: 25 },
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


export default getExcelMovementDetails;
