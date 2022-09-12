const Sequelize = require('sequelize');

module.exports = class Hashtag extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                title: {
                    type: Sequelize.STRING(15),
                    allowNull: false,
                    unique: true
                }
            },
            {
                sequelize,
                timestamps: true, //데이터 추가시 시간 자동으로 입력 여부(created_at, updated_at)
                underscored: false, //테이블 명, 컬럼 명 스네이크케이스 사용 여부 (false : 카멜 케이스)
                modelName: 'Hashtag', //모델 이름 (보통 단수형으로 명명)
                tableName: 'hashtags', //테이블 이름 (보통 복수형으로 명명)
                paranoid: false, //데이터 삭제시 시간 기록 컬럼이 추가되는지 여부 (deleteAt 생성)
                charset: 'utf8mb4', //인코딩 방식
                collate: 'utf8mb4_general_ci'
            }
        );
    }
    static associate(db) {
        db.Hashtag.belongsToMany(db.Post, {
            through: 'PostHashtag'
        });
    }
};
