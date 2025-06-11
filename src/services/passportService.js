const passportRepository = require('../repositories/passportRepository');
const { v4: uuidv4 } = require('uuid');

async function findOrCreateGoogleUser(profile) {
  const user = await passportRepository.findByGoogleId(profile.id);

  if (user) return user;

  const novoCliente = {
    id: uuidv4(),
    nome: profile.displayName,
    email: profile.emails?.[0]?.value || null,
    senha: null,
    google_id: profile.id,
    criado_em: new Date()
  };

  await passportRepository.create(novoCliente);
  return novoCliente;
}

async function findUserById(id) {
  return await passportRepository.findById(id);
}

module.exports = {
  findOrCreateGoogleUser,
  findUserById
};
