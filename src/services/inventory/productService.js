import Product from '../../models/inventory/product.js';
import UnitOfMeasure from '../../models/inventory/unitOfmesuare.js';

class ProductService {
  async createProduct(data) {
    return await Product.create(data);
  }

  async getAllProducts(clientId, page = 1, pageSize = 10) {
    const offset = (page - 1) * pageSize; // Calcula el desplazamiento según la página solicitada
  
    const { rows, count } = await Product.findAndCountAll({
      where: { clientId },
      include: {
        model: UnitOfMeasure,
        as: 'unitOfMeasure',
        attributes: ['name'],
      },
      limit: pageSize,  // Limita la cantidad de registros por página
      offset: offset,   // Desplazamiento para la paginación
    });
    console.log('data..-->', rows, count)
    return {
      data: rows,
      total: count,
      totalPages: Math.ceil(count / pageSize),  // Calcula el número total de páginas
      currentPage: page,
    };
  }

  async getProductById(id, clientId) {
    return await Product.findOne({
      where: { id, clientId },
      include: {
        model: UnitOfMeasure,
        as: 'unitOfMeasure',
        attributes: ['name'],
      },
    });
  }

  async updateProduct(id, clientId, data) {
    const product = await Product.findOne({ where: { id, clientId } });
    if (!product) throw new Error('Product not found');
    return await product.update(data);
  }

  async deleteProduct(id, clientId) {
    const product = await Product.findOne({ where: { id, clientId } });
    if (!product) throw new Error('Product not found');
    await product.destroy();
    return { message: 'Product deleted successfully' };
  }
}

export default new ProductService();
