const db = "../../data/db-config.js";

async function getAll() {
  // DO YOUR MAGIC
  return db('accounts');
}

async function getById(id)  {
  // DO YOUR MAGIC
  return db('accounts').where("id", id).first();
}

async function create({name, budget}) {
  // DO YOUR MAGIC
  const [id] = await db('accounts').insert({name, budget});
  return getById(id);
}

async function updateById(id, {name, budget}) {
  // DO YOUR MAGIC
  await db('accounts').where("id", id).update({name, budget});
  return getById(id);
}

async function deleteById(id) {
  // DO YOUR MAGIC
  const deletedAccount = await getById(id);
  await db('accounts').where("id", id).delete();
  return deletedAccount;
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
