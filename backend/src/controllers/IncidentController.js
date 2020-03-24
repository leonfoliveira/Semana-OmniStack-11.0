const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const incidents = await connection('incidents').select('*');

    return response.json(incidents);
  },
  
  async create(request, response) {
    const { title, description, value } = request.body;
    const ngo_id = request.headers.authorization;

    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ngo_id
    });

    return response.json({ id });
  }
}