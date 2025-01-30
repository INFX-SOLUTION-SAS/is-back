import Supplier from '../models/Supplier.js';
import ThirdParty from '../models/ThirdParty.js';

class SupplierService {
  async create(data) {
    return await Supplier.create(data);
  }

  async getAll() {
    return await Supplier.findAll({ include: { model: ThirdParty, as: 'thirdParty' } });
  }

  async getById(id) {
    return await Supplier.findByPk(id, { include: { model: ThirdParty, as: 'thirdParty' } });
  }

  async update(id, data) {
    const supplier = await Supplier.findByPk(id);
    if (!supplier) throw new Error('Supplier not found');

    return await supplier.update(data);
  }

  async delete(id) {
    const supplier = await Supplier.findByPk(id);
    if (!supplier) throw new Error('Supplier not found');

    await supplier.destroy();
  }
}

export default new SupplierService();
