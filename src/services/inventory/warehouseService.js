import Warehouse from "../../models/inventory/warehouse.js";

class WarehouseService {
    // Crear una nueva bodega
    createWarehouse = async (data) => {
        try {
            const { name, description, status, client_system_id } = data;

            const [warehouse, created] = await Warehouse.findOrCreate({
                where: { name, client_system_id },
                defaults: { name, description, status, client_system_id },
            });

            if (!created) {
                return { success: false, message: 'La bodega con ese nombre ya existe.' };
            }
            return { success: true, warehouse };
        } catch (error) {
            console.error('Error al crear la bodega:', error);
            throw new Error('Error al crear la bodega.');
        }
    };

    // Obtener todas las bodegas
    getAllWarehouses = async (client_system_id, page = 1, pageSize = 10) => {
        const offset = (page - 1) * pageSize; // Calcula el desplazamiento según la página solicitada
  
        const { rows, count } = await Warehouse.findAndCountAll({
          where: { client_system_id },
          limit: pageSize,  // Limita la cantidad de registros por página
          offset: offset,   // Desplazamiento para la paginación
        });
        return {
          data: rows,
          total: count,
          totalPages: Math.ceil(count / pageSize),  // Calcula el número total de páginas
          currentPage: page,
        };
    };

    // Obtener una bodega por su ID
    getWarehouseById = async (id, client_system_id) => {
        try {
            const warehouse = await Warehouse.findOne({ where: { id, client_system_id } });

            if (!warehouse) {
                return { success: false, message: 'Bodega no encontrada.' };
            }

            return  warehouse ;
        } catch (error) {
            console.error('Error al obtener la bodega:', error);
            throw new Error('Error al obtener la bodega.');
        }
    };

    // Actualizar una bodega
    updateWarehouse = async (id, data) => {
        try {
            const { name, description, status, client_system_id } = data;

            const warehouse = await Warehouse.findOne({ where: { id, client_system_id } });

            if (!warehouse) {
                return { success: false, message: 'Bodega no encontrada.' };
            }

            await warehouse.update({ name, description, status });

            return  warehouse ;
        } catch (error) {
            console.error('Error al actualizar la bodega:', error);
            throw new Error('Error al actualizar la bodega.');
        }
    };

    // Eliminar una bodega
    deleteWarehouse = async (id, client_system_id) => {
        try {
            const warehouse = await Warehouse.findOne({ where: { id, client_system_id } });

            if (!warehouse) {
                return { success: false, message: 'Bodega no encontrada.' };
            }

            await warehouse.destroy();
            return { success: true, message: 'Bodega eliminada correctamente.' };
        } catch (error) {
            console.error('Error al eliminar la bodega:', error);
            throw new Error('Error al eliminar la bodega.');
        }
    };
}

export default new WarehouseService();
