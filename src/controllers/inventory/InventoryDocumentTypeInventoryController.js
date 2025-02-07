import InventoryDocumentTypeService from '../../services/inventory/InventoryDocumentTypeService.js'

class InventoryDocumentTypeController {
  // Crear un nuevo tipo de documento
   async create(req, res) {
    try {
      const documentType = await InventoryDocumentTypeService.create(req.body);
      res.status(200).json(documentType);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Obtener todos los tipos de documento
  async getAll(req, res) {
    try {
      const documentTypes = await InventoryDocumentTypeService.getAll();
      res.status(200).json(documentTypes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Obtener un tipo de documento por su ID
  async getById(req, res) {
    try {
      const documentType = await InventoryDocumentTypeService.getById(req.params.id);
      res.status(200).json(documentType);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
  // Obtener un tipo de documento por su ID
  async getById(req, res) {
    try {
      const documentType = await InventoryDocumentTypeService.getById(req.params.id);
      res.status(200).json(documentType);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  // Actualizar un tipo de documento
   async update(req, res) {
    try {
      const documentType = await InventoryDocumentTypeService.update(req.params.id, req.body);
      res.status(200).json(documentType);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  // Eliminar un tipo de documento
  async delete(req, res) {
    try {
      const result = await InventoryDocumentTypeService.delete(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
}

export default new InventoryDocumentTypeController();
