module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user', { // jika ada 2 kata, gunakan underscore (cth: nilai_ujian)

    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },

    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    }

  },
  {
    freezeTableName: true,
    tableName: 'user' // jika ada 2 kata, gunakan underscore (cth: nilai_ujian)
  })
}
