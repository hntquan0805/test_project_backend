'use strict';

import { Op } from 'sequelize';
import IScoreRepository from './IScoreRepository.js';
import db from '../models/index.js';

export default class SQLScoreRepository extends IScoreRepository {
    async findByStudentId(student_id) {
        return db.Score.findOne({ where: { student_id } });
    }

    async countAllSubjects(subjects) {
        const result = await db.Score.findOne({
            attributes: subjects.map(subject => [
                db.sequelize.fn('COUNT', db.sequelize.literal(`CASE WHEN ${subject} IS NOT NULL THEN 1 END`)),
                subject
            ]),
            raw: true
        });
        
        return result;
    }

    async countAll() {
        return db.Score.count();
    }

    async findTop10(subjects = ['math', 'physics', 'chemistry']) {
        const sumExpression = subjects.join(' + ');

        return db.Score.findAll({
            attributes: [
                'id',
                'student_id',
                ...subjects,
                [db.sequelize.literal(sumExpression), 'total']
            ],
            where: {
                [db.Sequelize.Op.and]: subjects.map(s => ({
                    [s]: { [db.Sequelize.Op.ne]: null }
                }))
            },
            order: [[db.sequelize.literal(sumExpression), 'DESC']],
            limit: 10,
        });
    }

    async intervalStatistics(subject, min, max) {
        const condition = { [Op.gte]: min };

        if (max !== null) {
            condition[Op.lt] = max;
        }

        return db.Score.count({
            where: { [subject]: condition },
        });
    }
}