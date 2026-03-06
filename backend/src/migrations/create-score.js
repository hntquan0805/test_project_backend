'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Score', {
      id: {
        type:          Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey:    true,
        allowNull:     false,
      },
      student_id: {
        type:      Sequelize.STRING(15),
        allowNull: false,
        unique:    true,
      },
      math: { 
        type: Sequelize.DECIMAL(4, 2), 
        allowNull: true, 
        defaultValue: null 
      },
      vietnamese: { 
        type: Sequelize.DECIMAL(4, 2), 
        allowNull: true, 
        defaultValue: null 
      },
      foreign_language: { 
        type: Sequelize.DECIMAL(4, 2), 
        allowNull: true, 
        defaultValue: null 
      },
      physics: { 
        type: Sequelize.DECIMAL(4, 2), 
        allowNull: true, 
        defaultValue: null 
      },
      chemistry: { 
        type: Sequelize.DECIMAL(4, 2), 
        allowNull: true, 
        defaultValue: null 
      },
      biology: { 
        type: Sequelize.DECIMAL(4, 2), 
        allowNull: true, 
        defaultValue: null 
      },
      history: { 
        type: Sequelize.DECIMAL(4, 2), 
        allowNull: true, 
        defaultValue: null 
      },
      geography: { 
        type: Sequelize.DECIMAL(4, 2), 
        allowNull: true, 
        defaultValue: null 
      },
      civic_education: { 
        type: Sequelize.DECIMAL(4, 2), 
        allowNull: true, 
        defaultValue: null 
      },
      language_code: { 
        type: Sequelize.STRING(10),    
        allowNull: true, 
        defaultValue: null 
      },
    });

    // ── CHECK CONSTRAINTS ──
    const subjects = ['math', 'vietnamese', 'foreign_language', 'physics', 'chemistry', 'biology', 'history', 'geography', 'civic_education'];
    const constraints = {
      math: 'CHK_Math',
      vietnamese: 'CHK_Vietnamese',
      foreign_language: 'CHK_ForeignLanguage',
      physics: 'CHK_Physics',
      chemistry: 'CHK_Chemistry',
      biology: 'CHK_Biology',
      history: 'CHK_History',
      geography: 'CHK_Geography',
      civic_education: 'CHK_CivicEducation',
    };

    for (const subject of subjects) {
      await queryInterface.sequelize.query(`
        ALTER TABLE Score
        ADD CONSTRAINT ${constraints[subject]}
        CHECK (${subject} IS NULL OR (${subject} >= 0 AND ${subject} <= 10))
      `);
    }

    await queryInterface.sequelize.query(`
      ALTER TABLE Score
      ADD CONSTRAINT CHK_Logic_ForeignLanguage
      CHECK (
        (foreign_language IS NULL AND language_code IS NULL)
        OR
        (foreign_language IS NOT NULL AND language_code IS NOT NULL)
      )
    `);

    // ── student_id INDEX ──
    await queryInterface.addIndex('Score', ['student_id'], {
      name: 'IX_StudentId_Score',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Score');
  },
};