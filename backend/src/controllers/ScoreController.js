'use strict';

import ScoreService from '../services/ScoreService.js';

export default class ScoreController {
  #service;

  constructor() {
    this.#service = new ScoreService();
    this.getStudentIdScores  = this.getStudentIdScores.bind(this);
    this.intervalStatistics = this.intervalStatistics.bind(this);
    this.getTotalStudents = this.getTotalStudents.bind(this);
    this.getTop10Students = this.getTop10Students.bind(this);
  }

  async getStudentIdScores(req, res, next) {
    try {
      const data = await this.#service.getStudentIdScores(req.params.studentId);
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  }

  async getTotalStudents(req, res, next) {
    try {
      const data = await this.#service.getTotalStudents();
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  }

  async getTop10Students(req, res, next) {
    try {
      const subjects = req.query.subjects ? req.query.subjects.split(',') : undefined;
      const data = await this.#service.getTop10Students(subjects);
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  }

  async intervalStatistics(req, res, next) {
    try {
      const data = await this.#service.intervalStatistics();
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  }
}