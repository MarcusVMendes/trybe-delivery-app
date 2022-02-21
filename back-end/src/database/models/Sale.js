const { DataTypes } = require('sequelize');

const Attributes = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  sellerId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  totalPrice: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  deliveryAddress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deliveryNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  saleDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

module.exports = (sequelize) => {
  const Sale = sequelize.define(
    'Sale',
    Attributes,
    {
      tableName: 'sales',
      timestamps: false,    
    },
  );

  Sale.associate = (models) => {

    Sale.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });

    Sale.belongsTo(models.User, {
      foreignKey: 'sellerId',
      as: 'seller',
    });
  };

  return Sale;
};