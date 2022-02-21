const { DataTypes } = require('sequelize');

const Attributes = {
  sale_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'sales',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  product_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'products',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
};

module.exports = (sequelize) => {
  const SaleProduct = sequelize.define(
    'SaleProduct',
    Attributes,
    {
      underscored: true,
      tableName: 'sales',
      timestamps: false,
    },
  );

  SaleProduct.associate = (models) => {
    models.Sale.belongsToMany(models.Product, {
      as: 'products',
      through: SaleProduct,
      foreignKey: 'saleId',
      otherKey: 'productId',
    });

    models.Product.belongsToMany(models.Sale, {
      as: 'sales',
      through: SaleProduct,
      foreignKey: 'productId',
      otherKey: 'saleId',
    });
  };

  return SaleProduct;
};