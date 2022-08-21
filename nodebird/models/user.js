const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                email: {
                    type: Sequelize.STRING(40),
                    allowNull: true,
                    unique: true
                },
                nick: {
                    type: Sequelize.STRING(15),
                    allowNull: false
                },
                password: {
                    type: Sequelize.STRING(100),
                    allowNull: true
                },
                provider: {
                    type: Sequelize.STRING(10),
                    allowNull: false,
                    defaultValue: 'local'
                },
                snsId: {
                    type: Sequelize.STRING(30),
                    allowNull: true
                }
            },
            {
                sequelize: sequelize,
                timestamps: true, //데이터 추가시 시간 자동으로 입력 여부(created_at, updated_at)
                underscored: false, //테이블 명, 컬럼 명 스네이크케이스 사용 여부 (false : 카멜 케이스)
                modelName: 'User', //모델 이름 (보통 단수형으로 명명)
                tableName: 'users', //테이블 이름 (보통 복수형으로 명명)
                paranoid: true, //데이터 삭제시 시간 기록 컬럼이 추가되는지 여부 (deleteAt 생성)
                charset: 'utf8', //인코딩 방식
                collate: 'utf8_general_ci'
            }
        );
    }

    static associate(db) {
        db.User.hasMany(db.Post);
        //동일 테이블 간 N:M 관계 구별을 위해 as 속성 사용
        db.User.belongsToMany(db.User, {
            foreignkey: 'followingId',
            as: 'Followers',
            through: 'Follow'
        });
        db.User.belongsToMany(db.User, {
            foreignkey: 'followerId',
            as: 'Followings',
            through: 'Follow'
        });
    }
};
