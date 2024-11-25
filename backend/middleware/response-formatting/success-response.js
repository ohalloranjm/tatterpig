// format successful responses

module.exports = {
  name: 'successResponse',

  middle(req, res) {
    const { message } = res;

    const body = { title: 'Success', message };
    if ('data' in res) body.data = res.data;

    if (req.method === 'POST') res.status(201);

    return res.json(body);
  },
};
