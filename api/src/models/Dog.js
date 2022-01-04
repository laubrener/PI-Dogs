const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    height: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    life_span: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'https://www.google.com/url?sa=i&url=http%3A%2F%2Fclipart-library.com%2Fhuellas-de-perros.html&psig=AOvVaw3eINvadWU1mY13pV5Vtf92&ust=1641307911769000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCOiKqMvqlfUCFQAAAAAdAAAAABAI'
    },
    createdInDb: {
      type:DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue:true,
    }
  });
};
