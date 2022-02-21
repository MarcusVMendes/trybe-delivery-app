const { DataTypes } = require('sequelize');

const Attributes = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  urlImage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

module.exports = (sequelize) => {
  const Product = sequelize.define(
    'Product',
    Attributes,
    {
      tableName: 'products',
      timestamps: false,    
    },
  );

  return Product;
};