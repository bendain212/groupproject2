module.exports = function(sequelize, DataTypes) {
  var Media = sequelize.define("Media", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    categorization: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  });

  Media.associate = function(models) {
    Media.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Media;
};
