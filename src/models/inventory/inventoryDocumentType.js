import conectDb from '../../config/db.js';
import { DataTypes } from 'sequelize';

const sequelize = conectDb();

const InventoryDocumentType = sequelize.define('InventoryDocumentType', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  client_system_id: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  class: {
    type: DataTypes.ENUM(
      'entrada',
      'salida',
      'devolucion',
      'ajuste a cantidad',
      'ajuste a valor'
    ),
    allowNull: false,
  },
  static: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  sign: {
    type: DataTypes.ENUM('positivo', 'negativo'),  // Added sign field
    allowNull: false,
    defaultValue: 'positivo',  // Default value to 'positive'
  },
}, {
  sequelize,
  tableName: 'inventory_document_type',
  timestamps: true,
});

export default InventoryDocumentType;
