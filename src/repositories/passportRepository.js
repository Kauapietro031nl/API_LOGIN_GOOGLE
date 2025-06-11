const pool = require('../config/db');

async function findByGoogleId(googleId) {
  const [rows] = await pool.query('SELECT * FROM clientes WHERE google_id = ?', [googleId]);
  return rows[0] || null;
}

async function findById(id) {
  const [rows] = await pool.query('SELECT * FROM clientes WHERE id = ?', [id]);
  return rows[0] || null;
}

async function create(user) {
  const { id, nome, email, senha, google_id, criado_em } = user;
  await pool.query(
    'INSERT INTO clientes (id, nome, email, senha, google_id, criado_em) VALUES (?, ?, ?, ?, ?, ?)',
    [id, nome, email, senha, google_id, criado_em]
  );
}

module.exports = {
  findByGoogleId,
  findById,
  create
};
