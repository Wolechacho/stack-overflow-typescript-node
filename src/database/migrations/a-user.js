module.exports = {
    up: async(queryInterface, Sequelize) =>{
        queryInterface.createTable('users', {
            userId: {
                allowNull: false,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            username: {
                allowNull: false,
                type: Sequelize.STRING
            },
            password: {
                allowNull: false,
                type: Sequelize.STRING,
                unique: true
            },
            email: {
                allowNull: false,
                type: Sequelize.STRING,
            }
        })
    },
    down: (queryInterface, Sequelize) => queryInterface.dropTable('users')
}