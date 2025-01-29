import Product from '../../models/inventory/product.js';
import UnitOfMeasure from '../../models/inventory/unitOfmesuare.js';

class ProductService {
  async createProduct(data) {
    return await Product.create(data);
  }

  async getAllProducts(client_system_id, page = 1, pageSize = 10) {
    const offset = (page - 1) * pageSize; // Calcula el desplazamiento según la página solicitada
  
    const { rows, count } = await Product.findAndCountAll({
      where: { client_system_id },
      include: {
        model: UnitOfMeasure,
        as: 'unitOfMeasure',
        attributes: ['name'],
      },
      limit: pageSize,  // Limita la cantidad de registros por página
      offset: offset,   // Desplazamiento para la paginación
    });
    return {
      data: rows,
      total: count,
      totalPages: Math.ceil(count / pageSize),  // Calcula el número total de páginas
      currentPage: page,
    };
  }

  async getProductById(id, client_system_id) {
    return await Product.findOne({
      where: { id, client_system_id },
      include: {
        model: UnitOfMeasure,
        as: 'unitOfMeasure',
        attributes: ['name'],
      },
    });
  }

  async updateProduct(id, client_system_id, data) {
    const product = await Product.findOne({ where: { id, client_system_id } });
    if (!product) throw new Error('Product not found');
    return await product.update(data);
  }

  async deleteProduct(id, client_system_id) {
    const product = await Product.findOne({ where: { id, client_system_id } });
    if (!product) throw new Error('Product not found');
    await product.destroy();
    return { message: 'Product deleted successfully' };
  }
}

export default new ProductService();
