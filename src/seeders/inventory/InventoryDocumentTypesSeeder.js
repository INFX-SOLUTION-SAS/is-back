import InventoryDocumentType from "../../models/inventory/inventoryDocumentType.js";

const InventoryDocumentTypesSeeder = async () => {
  try {
    // Verifica si ya existen tipos de documentos para evitar duplicados
    const existingDocumentTypes = await InventoryDocumentType.findAll();

    if (existingDocumentTypes.length === 0) {
      // Inserta los datos iniciales
      const documentTypes = [
        {
          name: 'Entrada',
          description: 'Ingreso de productos al inventario',
          client_system_id: null,
          class: 'entrada',
          static: true,
          sign: 'positivo'
        },
        {
          name: 'Salida',
          description: 'Egreso de productos del inventario',
          client_system_id: null,
          class: 'salida',
          static: true,
          sign: 'negativo'
        },
        {
          name: 'Devolución al inventario',
          description: 'Devolución de productos al inventario',
          client_system_id: null,
          class: 'devolucion',
          static: true,
          sign: 'positivo'
        },
        {
            name: 'Devolución al proveedor',
            description: 'Devolución de productos al proveedor',
            client_system_id: null,
            class: 'devolucion',
            static: true,
            sign: 'negativo'
          },
        // {
        //   name: 'Ajuste a Cantidad',
        //   description: 'Ajuste de la cantidad en inventario',
        //   client_system_id: null,
        //   class: 'ajuste a cantidad',
        //   static: true,
        //   sign: 'negative'
        // },
        // {
        //   name: 'Ajuste positivo a Valor',
        //   description: 'Ajuste de valor de productos en inventario',
        //   client_system_id: null,
        //   class: 'ajuste a valor',
        //   static: true,
        //   sign: 'positive'
        // }
      ];

      // Insertar los tipos de documento
      await InventoryDocumentType.bulkCreate(documentTypes);

      console.log('Datos de tipos de documentos de inventario insertados correctamente.');
    } else {
      console.log('Los tipos de documentos de inventario ya existen en la base de datos.');
    }
  } catch (error) {
    console.error('Error al insertar los tipos de documentos de inventario:', error);
  }
};

export default InventoryDocumentTypesSeeder