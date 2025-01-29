import InventoryDocumentType from "../../models/inventory/inventoryDocumentType.js";

class InventoryDocumentTypeService {
  // Crear un nuevo tipo de documento
  async create(data) {
    try {
      const documentType = await InventoryDocumentType.create(data);
      return documentType;
    } catch (error) {
      throw new Error(`Error al crear el tipo de documento: ${error.message}`);
    }
  }

  // Obtener todos los tipos de documento
   async getAll() {
    try {
      const documentTypes = await InventoryDocumentType.findAll();
      return documentTypes;
    } catch (error) {
      throw new Error(`Error al obtener los tipos de documentos: ${error.message}`);
    }
  }

  // Obtener un tipo de documento por su ID
   async getById(id) {
    try {
      const documentType = await InventoryDocumentType.findByPk(id);
      if (!documentType) {
        throw new Error('Tipo de documento no encontrado');
      }
      return documentType;
    } catch (error) {
      throw new Error(`Error al obtener el tipo de documento: ${error.message}`);
    }
  }

  // Actualizar un tipo de documento
  async update(id, data) {
    try {
      const documentType = await InventoryDocumentType.findByPk(id);
      if (!documentType) {
        throw new Error('Tipo de documento no encontrado');
      }

      await documentType.update(data);
      return documentType;
    } catch (error) {
      throw new Error(`Error al actualizar el tipo de documento: ${error.message}`);
    }
  }

  // Eliminar un tipo de documento
  async delete(id) {
    try {
      const documentType = await InventoryDocumentType.findByPk(id);
      if (!documentType) {
        throw new Error('Tipo de documento no encontrado');
      }

      await documentType.destroy();
      return { message: 'Tipo de documento eliminado exitosamente' };
    } catch (error) {
      throw new Error(`Error al eliminar el tipo de documento: ${error.message}`);
    }
  }
}

export default new InventoryDocumentTypeService();
