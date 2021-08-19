const { getById } = require("./accounts-model");

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  if (!req.body.name || !req.body.budget) {
    return res.status(400).json({
      message: 'name and budget are required'
    });
  } else if (typeof req.body.name !== 'string') { 
    return res.status(400).json({message: 'name of account must be a string'});
  } else if (req.body.name.trim().length < 3 || req.body.name.trim().length > 100) {
    return res.status(400).json({message: 'name of account must be between 3 and 100'});
  } else if (typeof req.body.budget !== 'number') {
    return res.status(400).json({message: 'budget of account must be a number'});
  } else if (req.body.budget < 0 || req.body.budget > 1000000) {
    return res.status(400).json({message: 'budget of account is too large or too small'});
  } else {
    next();
  }
}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
  if (req.body.name.trim() === req.params.name) {
    return res.status(400).json({message: 'that name is taken'});
  } else {
    next();
  }
}

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const account = await getById(req.params.id);
    if (account) {
      req.account = account;
      next();
    } else {
      return res.status(404).json({message: 'account not found'});
    }
  } catch (err) {
    next(err);
  }
}
