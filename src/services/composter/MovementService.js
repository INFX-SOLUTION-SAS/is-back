

import Lot from '../../models/lot.js'
import Movement from '../../models/movement.js'
import MovementDetail from '../../models/movementDetail.js'
import { v4 as uuidv4 } from 'uuid';
import mysql from 'mysql2'
import { Sequelize } from 'sequelize';



const deleteMovement = async (movementId) => {
  const transaction = await Movement.sequelize.transaction(); // Iniciar transacción

  try {
    // Buscar el movimiento
    const model = await Movement.findOne({ where: { id: movementId }, transaction });
    if (!model) {
      await transaction.rollback();
      return { message: "Movimiento no encontrado", status: 404 };
    }

    const { lotId, quantity, type, days } = model;
    console.log(`${lotId} - ${quantity} - ${type} -`);

    // Buscar el lote relacionado
    const lot = await Lot.findOne({ where: { id: lotId }, transaction });
    if (!lot) {
      await transaction.rollback();
      return { message: "Lote no existe: " + lotId, status: 400 };
    }

    if (type === 1 || type === 4) { // Salida o despacho >>> Incrementar saldo
      lot.balance += quantity;
    } else if (type === 2) { // Entrada >>> Disminuir saldo
      lot.balance -= quantity;
    }
    else if(type===3){//cuando es un movimiento interno debo disminuir los dias de la actividad
      lot.days -= days;
    }

    await lot.save({ transaction });
    await MovementDetail.destroy({ where: { movementId }, transaction });
    await Movement.destroy({ where: { id: movementId }, transaction });
    await transaction.commit();

    return { message: "Éxito", success: true, status: 200, error: null };

  } catch (error) {
    await transaction.rollback();
    return { message: "Error", success: false, status: 500, error };
  }
};



const get = async (idFind) => {
  const model = await Movement.findOne(
    { where: { id: idFind } },
    { attributes: { exclude: ['createdAt', 'updatedAt'] } }
  );
  return model
}

const getList = async () => {
  try {
    const list = await Movement.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } });
    return { list: list, status: 200 };
  } catch (err) {
    return { list: null, status: 500, error: err };
  }
}


const insert = async (body) => {
  try {
    const lotDays = body.movement.lotDays
    const movement = body.movement
    const movementDetails = body.movementDetails

    console.log(movement)

    await Movement.create(movement)

    if (movementDetails.length > 0)
      await MovementDetail.bulkCreate(movementDetails);
    //actualizo el lote productivo
    await Lot.update(
      { days: lotDays, balance: movement.balance },
      { where: { id: movement.lotId } }
    )

    return { message: 'movimiento y detalles ingresados', status: 200 };
  } catch (err) {
    return { message: 'Error en el servidor', status: 500, error: err };
  }
}









export default {
  get,
  getList,
  insert,
  deleteMovement
};