import SupplierService from "../../services/inventory/supplierService.js";

class SupplierController {
  async create(req, res) {
    try {
      const {client_system_id} = req.query
      const suplier = req.body;
      suplier.client_system_id = client_system_id
      const supplier = await SupplierService.create(req.body);
      res.status(200).json(supplier);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const {client_system_id} = req.query
      const suppliers = await SupplierService.getAll(client_system_id);
      res.json(suppliers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const supplier = await SupplierService.getById(req.params.id);
      if (!supplier) return res.status(404).json({ error: 'Supplier not found' });

      res.json(supplier);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const supplier = await SupplierService.update(req.params.id, req.body);
      res.json(supplier);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      await SupplierService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new SupplierController();
