const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

function runScript(db, script) {
  const sql = fs.readFileSync(script, 'utf8');
  return new Promise((resolve, reject) => {
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

describe('the SQL in the `exercise.sql` file', () => {
  let db;
  let scriptPath;

  beforeAll(() => {
    const dbPath = path.resolve(__dirname, '..', 'lesson6.db');
    db = new sqlite3.Database(dbPath);

    scriptPath = path.resolve(__dirname, '..', 'exercise.sql');
  });

  afterAll(() => {
    db.close();
  });

  it('should write a query that returns the contents of the `Employee` table with the `Name` column renamed to `Sales Associate`', async () => {
      const results = await runScript(db, scriptPath);

      expect(results[0].hasOwnProperty("Sales Associate")).toBe(true);
      expect(results[0].hasOwnProperty("NAME")).toBe(false);
  });
});
