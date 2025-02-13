import dotenv from 'dotenv'
import express from "express";
import asyncHandler from "express-async-handler";


///movements
import getReportMovements from '../../services/composter/ReportMovements.js';
import getExcelMovements from '../../services/composter/ExcelMovements.js';

///movementdetails
import getReportMovementDetails from '../../services/composter/ReportMovementDetails.js';
import getExcelMovementDetails from '../../services/composter/ExcelMovementDetails.js';



const excelMovementDetails = async (req, res) => {
    try {
        await getExcelMovementDetails(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Error generando el reporte', error: error.message });
    }
};


const excelMovements = async (req, res) => {
    try {
        await getExcelMovements(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Error generando el reporte', error: error.message });
    }
};




const reportMovements = asyncHandler(async (req, res) => {   
    let dataresult = await getReportMovements(req.query);    
    return res.status(200).json(dataresult);    
});



const reportMovementDetails = asyncHandler(async (req, res) => {   
    let dataresult = await getReportMovementDetails(req.query);    
    return res.status(200).json(dataresult);    
});








export default {
    reportMovements,
    reportMovementDetails,
    excelMovements,
    excelMovementDetails
}