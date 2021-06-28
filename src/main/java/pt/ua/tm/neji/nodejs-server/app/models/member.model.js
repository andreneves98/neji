// This Sequelize Model represents a Member table in PostgreSQL database. 
// These columns will be generated automatically: member_id, first_name, last_name, createdAt, updatedAt.

module.exports = (sequelize, Sequelize) => {
    const Member = sequelize.define("members", {
        member_id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        first_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        last_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        /*password_hash: Sequelize.STRING,
        password: {
            type: Sequelize.DataTypes.VIRTUAL,
            set: function (val) {
                this.setDataValue('password', val); // Remember to set the data value, otherwise it won't be validated
                this.setDataValue('password_hash', this.salt + val);
            },
            validate: {
                isLongEnough: function (val) {
                    if (val.length < 7) {
                        throw new Error("Please choose a longer password")
                    }
                }
            }
        },*/
    });

    return Member;
};

