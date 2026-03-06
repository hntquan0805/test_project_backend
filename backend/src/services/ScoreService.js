'use strict';

import SQLScoreRepository from '../repositories/SQLScoreRepository.js';

const SUBJECTS = [
    'math', 'vietnamese', 'foreign_language',
    'physics', 'chemistry', 'biology',
    'history', 'geography', 'civic_education',
];

const INTERVALS = [
    { label: 'excellent', min: 8, max: null }, // >= 8
    { label: 'good', min: 6, max: 8 }, // >= 6 và < 8
    { label: 'average', min: 4, max: 6 }, // >= 4 và < 6
    { label: 'poor', min: 0, max: 4 }, // < 4
];

export default class ScoreService {
  #repo;

  constructor(repo = new SQLScoreRepository()) {
    this.#repo = repo;
  }

  async getStudentIdScores(studentId) {
    const result = await this.#repo.findByStudentId(studentId);

    if (!result) {
      const err = new Error(`Cannot find Student ID: ${studentId}`);
      err.statusCode = 404;
      throw err;
    }

    return result;
  }

  async getTotalStudents() {
    return this.#repo.countAll();
  }

  async getTop10Students(subjects) {
    return this.#repo.findTop10(subjects);
  }

  async intervalStatistics() {
      const [allCounts, ...intervalResults] = await Promise.all([
          this.#repo.countAllSubjects(SUBJECTS),
          ...SUBJECTS.flatMap((subject) =>
              INTERVALS.map(({ min, max }) =>
                  this.#repo.intervalStatistics(subject, min, max)
              )
          ),
      ]);

      const results = {};
      SUBJECTS.forEach((subject, sIndex) => {
          results[subject] = {
              total: allCounts[subject],
              ...INTERVALS.reduce((acc, { label }, iIndex) => {
                  acc[label] = intervalResults[sIndex * INTERVALS.length + iIndex];
                  return acc;
              }, {}),
          };
      });

      return results;
  }
}