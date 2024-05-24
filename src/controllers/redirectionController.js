import dotenv from 'dotenv'
import express from "express";
import service from "../services/general/RedirectionService.js";




async function redirectToModuleController(req,res){     

    
    console.log("va por aca 1") 
   // console.log(req) 
    
    if (!req.params.module) {
        return res.status(400).json({ message: "se necesita el modulo" });
    } 
    
    let module = req.params.module
    let clientId = req.user.clientId
    let name = req.user.name
    let token = req.token

    let dataresult = await service.redirectToModule(module,name,token); 
    return res.status(dataresult.status).json(dataresult); 
}


async function redirectToDashboardController(req,res){   
    let dataresult = await service.redirectToDashboard(); 
    return res.status(dataresult.status).json(dataresult);
}



export default {
    redirectToModuleController,
    redirectToDashboardController
}