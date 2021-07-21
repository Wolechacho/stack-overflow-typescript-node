module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('questions', {
            questionId: {
                allowNull: false,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            title: {
                allowNull: false,
                type: Sequelize.STRING(200)
            },
            text: {
                allowNull: false,
                type: Sequelize.TEXT
            },
            tags: {
                allowNull: false,
                type: Sequelize.TEXT
            },
            upvote: {
                allowNull: false,
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            downvote: {
                allowNull: false,
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            userId: {
                type: Sequelize.UUID,
                allowNull: false,
                onDelete: 'CASCADE',
                references: {
                    model: 'users',
                    key: 'userId',
                    as: 'userId',
                },
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.DATE
            }
        }),
    down: (queryInterface, Sequelize) => queryInterface.dropTable('questions')
}