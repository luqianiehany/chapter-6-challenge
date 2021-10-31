const { Model, DataTypes } = require('sequelize')
const sequelize = require('./sequalize')

class UserGameBiodata extends Model {}

UserGameBiodata.init({
    id:{ 
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    age:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
	user_id: {
		type: DataTypes.INTEGER,
		references: {
			model:'user_game', key:'id'
		},
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE'
	}
}, {
    sequelize,
    tableName: 'user_game_biodata',
    timestamps: false,
})

module.exports = UserGameBiodata