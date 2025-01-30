import Supplier from '../../models/inventory/supplier.js';
import ThirdParty from '../../models/admin/thirdparty.js';

class SupplierService {
  async create(data) {
    return await Supplier.create(data);
  }

  async getAll(id) {
    const supplier  = await Supplier.findAll({ where: {
        client_system_id : id

    } , include: { model: ThirdParty, as: 'thirdparty' } });

    const supplierData = supplier.map(s => {
        const { thirdparty, ...rest } = s.get(); // Excluir thirdparty
        const thirdPartyInfo = thirdparty ? {
            thirdPartyName: thirdparty.name,
            thirdPartyIdentification: thirdparty.identification,
            thirdPartyId: thirdparty.id
        } : {};  // En caso de que no haya thirdparty, evitamos error
        return { ...rest, ...thirdPartyInfo }; // Unir la info del thirdParty con el resto
    });

    return  {data : supplierData}
    
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
