module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('subscriptions', {
            subscriptionId: {
                allowNull: false,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            questionId: {
                type: Sequelize.UUID,
                allowNull: false,
                onDelete: 'NO ACTION',
                onUpdate: 'NO ACTION',
                references: {
                    model: 'questions',
                    key: 'questionId',
                    as: 'questionId',
                }
            },
            userId: {
                type: Sequelize.UUID,
                allowNull: false.Sequelize,
                onDelete: 'NO ACTION',
                onUpdate: 'NO ACTION',
                references: {
                    model: 'users',
                    key: 'userId',
                    as: 'userId',
                }
            }
        })
    ,
    down: (queryInterface, Sequelize) => queryInterface.dropTable('subscriptions')
}