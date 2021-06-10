const Sequelize = require("sequelize");

module.exports = class Survey extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        title: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        state: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize, // 요거안넣으면 오류남
        timestamps: true, // createdAt, updatedAt, deleteAt 자동으로 넣어줄지
        paranoid: false, // 삭제해도 데이터남겨둘지말지 deleteAt에 시간만 적어짐
        underscored: false, // 대문자 _  뭘로구분할지지정
        modelName: "Survey", // sequelize에서 사용할 모델명
        tableName: "surveys", // 실제 DB에서 사용할 테이블명
        charset: "utf8", // 한글가능..           밑에꺼랑 둘다 mb4붙이면 특수문자도 입력가능
        collate: "utf8_general_ci", // charset과 같은의미인것같은데
      },
    );
  }

  static associate(db) {
    // 질문지와 질문 ( 1 : N )
    db.Survey.hasMany(db.Question, {
      forginKey: "surveyId",
      targetKey: "id",
    });
  }
};
