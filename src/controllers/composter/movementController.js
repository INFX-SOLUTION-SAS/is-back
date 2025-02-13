import dotenv from 'dotenv'
import express from "express";
import asyncHandler from "express-async-handler";

import service from "../../services/composter/MovementService.js";




async function insertController(req,res){    
    if (!req.body.movement) {
        res.status(403).json("se necesita el movimiento"); 
      }
    const body = req.body
    let dataresult = await service.insert(body); 
    return res.status(dataresult.status).json(dataresult); 
}


async function listController(req,res){ 
    let dataresult = await service.getList();    
    return res.status(dataresult.status).json(dataresult.list);   
}



const getController = asyncHandler(async (req, res) => {
    if (!req.query.id) {
        throw "Se necesita el id";
      }
    const idFind = req.query.id;
    let dataresult = await service.get(idFind);    
    return res.status(200).json(dataresult);    
});




const deleteMovement = asyncHandler(async (req, res) => {
    if (!req.body.id) {
        throw "Se necesita el id";
      }
    const idFind = req.body.id;
    let dataresult = await service.deleteMovement(idFind);    
    return res.status(200).json(dataresult);    
});




export default {
    listController,
    insertController, 
    getController,
    deleteMovement
}