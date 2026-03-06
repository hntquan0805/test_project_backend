'use strict';

export default class IScoreRepository {
  async findByStudentId(studentId) {
    throw new Error('findByStudentId() not implemented');
  }

  async countAll() {
    throw new Error('countAll() not implemented');
  }

  async countAllSubjects(subjects) {
    throw new Error('countAllSubjects() not implemented');
  }

  async findTop10(subjects) {
    throw new Error('findTop10() not implemented');
  }

  async intervalStatistics(subject, min, max) {
    throw new Error('intervalStatistics() not implemented');
  }
}