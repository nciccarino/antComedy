module.exports = function(sequelize, DataTypes){
	var Event = sequelize.define("Event", {
		title: {
			type: DataTypes.STRING,
		},

		location: {
			type: DataTypes.STRING,
		},

		date: {
			type: DataTypes.DATE, 
		},

		notes: {
			type: DataTypes.STRING,
		},

		url: {
			type: DataTypes.STRING,
		}

	})

	return Event;
	
}