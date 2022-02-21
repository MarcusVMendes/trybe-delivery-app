const { DataTypes } = require('sequelize');

const Attributes = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  seller_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  total_price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  delivery_address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  delivery_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sale_date: {
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
      underscored: true,
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