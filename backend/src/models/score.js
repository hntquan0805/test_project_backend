'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Score extends Model {}

  Score.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      student_id: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: { msg: 'Student ID cannot be empty!' },
        },
      },
      math: { 
        type: DataTypes.DECIMAL(4, 2), 
        allowNull: true, 
        validate: { min: 0, max: 10 } 
      },
      vietnamese: { 
        type: DataTypes.DECIMAL(4, 2), 
        allowNull: true, 
        validate: { min: 0, max: 10 } 
      },
      foreign_language: { 
        type: DataTypes.DECIMAL(4, 2), 
        allowNull: true, 
        validate: { min: 0, max: 10 } 
      },
      physics:    { 
        type: DataTypes.DECIMAL(4, 2), 
        allowNull: true, 
        validate: { min: 0, max: 10 } 
      },
      chemistry:   { 
        type: DataTypes.DECIMAL(4, 2), 
        allowNull: true, 
        validate: { min: 0, max: 10 } 
      },
      biology:  { 
        type: DataTypes.DECIMAL(4, 2), 
        allowNull: true, 
        validate: { min: 0, max: 10 } 
      },
      history:   { 
        type: DataTypes.DECIMAL(4, 2), 
        allowNull: true, 
        validate: { min: 0, max: 10 } 
      },
      geography:    { 
        type: DataTypes.DECIMAL(4, 2), 
        allowNull: true, 
        validate: { min: 0, max: 10 } 
      },
      civic_education:      { 
        type: DataTypes.DECIMAL(4, 2), 
        allowNull: true, 
        validate: { min: 0, max: 10 } 
      },
      language_code: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName:  'Score',
      tableName:  'Score',
      timestamps: false,

      validate: {
        checkLanguage() {
          const haveLanguage   = this.foreign_language   !== null && this.foreign_language   !== undefined;
          const haveLanguageCode = this.language_code !== null && this.language_code !== undefined;

          if (haveLanguage && !haveLanguageCode) {
            throw new Error('If there is a foreign language score, then a foreign language code is required');
          }
          if (!haveLanguage && haveLanguageCode) {
            throw new Error('If there is a foreign language code, then a foreign language score is required');
          }
        },
      },
    }
  );

  return Score;
};