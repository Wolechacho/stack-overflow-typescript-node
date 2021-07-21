module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('answers', {
            answerId: {
                allowNull: false,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            text: {
                allowNull: false,
                type: Sequelize.TEXT,
            },
            userId: {
                type: Sequelize.UUID,
                allowNull: false,
                onDelete: 'RESTRICT',
                onUpdate: 'RESTRICT',
                references: {
                    model: 'users',
                    key: 'userId',
                    as: 'userId',
                }
            },
            questionId: {
                type: Sequelize.UUID,
                allowNull: false,
                onDelete: 'RESTRICT',
                onUpdate: 'RESTRICT',
                references: {
                    model: 'questions',
                    key: 'questionId',
                    as: 'questionId',
                }
            }
        })
    ,
    down: (queryInterface, Sequelize) => queryInterface.dropTable('answers')
}