const mocapAPI = require('../utils/mocapAPI');

exports.recordMocap = async (req, res, next) => {
  try {
    const response = await mocapAPI.post('/record', req.body);
    res.json(response.data);
  } catch (error) {
    next(error);
  }
};

exports.getMocapData = async (req, res, next) => {
  try {
    const response = await mocapAPI.get(`/data/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    next(error);
  }
};
