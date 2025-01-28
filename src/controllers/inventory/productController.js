import productService from "../../services/inventory/productService.js";

class ProductController {
  async createProduct(req, res) {
    const {clientId } = req.query
    const { name, unitOfMeasureId, max_stock, min_stock, status, description, barcode  } = req.body;

    try {
      const product = await productService.createProduct({ name, unitOfMeasureId, max_stock, min_stock, status,
      clientId, description,barcode });
      res.status(201).json( {data: {product, success:true}}
      );
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al crear el producto', error: error.message });
    }
  }

  async getAllProducts(req, res) {
    const { clientId } = req.query;

    try {
      const products = await productService.getAllProducts(clientId);
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener los productos', error: error.message });
    }
  }

  async getProductById(req, res) {
    const { id } = req.params;
    const { clientId } = req.query;

    try {
      const product = await productService.getProductById(id, clientId);
      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
      res.status(200).json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener el producto', error: error.message });
    }
  }

  async updateProduct(req, res) {
    const { id } = req.params;
    const { clientId } = req.query;
    const { name, unitOfMeasureId } = req.body;

    try {
      const updatedProduct = await productService.updateProduct(id, clientId, { name, unitOfMeasureId });
      res.status(200).json(updatedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
    }
  }

  async deleteProduct(req, res) {
    const { id } = req.params;
    const { clientId } = req.query;

    try {
      await productService.deleteProduct(id, clientId);
      res.status(200).json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
    }
  }
}

export default new ProductController();
