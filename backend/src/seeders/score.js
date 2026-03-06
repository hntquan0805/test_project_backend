'use strict';

const { existsSync } = require('fs');
const { readFileSync } = require('fs');
const { join } = require('path');
const { parse } = require('csv-parse/sync');

// ── Helper: convert string to decimal or null ──
const toDecimal = (value) => {
  if (value === undefined || value === null) return null;
  const trimmed = String(value).trim();
  if (trimmed === '') return null;
  const num = parseFloat(trimmed);
  return isNaN(num) ? null : num;
};

// ── Helper: validate language logic ──
const validateRow = (row, index) => {
  const haveLanguage   = row.ngoai_ngu   !== null;
  const haveLanguageCode = row.ma_ngoai_ngu !== null;

  if (haveLanguage && !haveLanguageCode) {
    throw new Error(`Line ${index + 2}: Have a foreign language score but lack the foreign language code (Student ID: ${row.sbd})`);
  }
  if (!haveLanguage && haveLanguageCode) {
    throw new Error(`Line ${index + 2}: Have a foreign language code but lack the foreign language score (Student ID: ${row.sbd})`);
  }
};

module.exports = {
  async up(queryInterface) {
    const filePath = join(__dirname, '../data/diem_thi_thpt_2024.csv');

    if (!existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    const fileContent = readFileSync(filePath, 'utf8');

    // ── Read CSV ──
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });

    console.log(`Read ${records.length} rows from CSV`);

    const data = [];
    const errors = [];

    records.forEach((record, index) => {
      if (!record.sbd || record.sbd.trim() === '') {
        errors.push(`Line ${index + 2}: Missing Student ID (Student ID: ${record.sbd})`);
        return;
      }

      const row = {
        student_id: record.sbd.trim(),
        math: toDecimal(record.toan),
        vietnamese: toDecimal(record.ngu_van),
        foreign_language: toDecimal(record.ngoai_ngu),
        physics: toDecimal(record.vat_li),
        chemistry: toDecimal(record.hoa_hoc),
        biology: toDecimal(record.sinh_hoc),
        history: toDecimal(record.lich_su),
        geography: toDecimal(record.dia_li),
        civic_education: toDecimal(record.gdcd),
        language_code: record.ma_ngoai_ngu?.trim() || null,
      };

      try {
        validateRow(row, index);
        data.push(row);
      } catch (err) {
        errors.push(err.message);
      }
    });

    if (errors.length > 0) {
      console.warn('Rows with errors:');
      errors.forEach(e => console.warn('   -', e));
    }

    if (data.length === 0) {
      throw new Error('No valid rows to insert');
    }

    const BATCH_SIZE = 5000;
    let inserted = 0;

    // ── Insert to database ──
    for (let i = 0; i < data.length; i += BATCH_SIZE) {
      const batch = data.slice(i, i + BATCH_SIZE);
      await queryInterface.bulkInsert('Score', batch);
      inserted += batch.length;
      console.log(`Inserted ${inserted} / ${data.length}`);
    }

    console.log(`Completed! Total: ${inserted} rows, Skipped: ${errors.length} rows`);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('Score', null, {});
  }
};