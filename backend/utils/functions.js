const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { secret, expiresIn } = jwtConfig;
const { BadRequestError } = require('./errors');

// Sends a JWT Cookie
const setTokenCookie = (res, user) => {
  // Create the token.
  console.log('this is the user', user);
  const safeUser = {
    id: user.id,
    email: user.email,
    username: user.username,
  };
  const token = jwt.sign({ data: safeUser }, secret, {
    expiresIn: parseInt(expiresIn),
  });

  const isProduction = process.env.NODE_ENV === 'production';

  // Set the token cookie
  res.cookie('token', token, {
    maxAge: expiresIn * 1000, // maxAge in milliseconds
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && 'Lax',
  });

  return token;
};

// response formatting
// move data from each SheetLabel.Label into SheetLabel
const formatSheetLabelsMutate = function (SheetLabels) {
  SheetLabels.forEach(sl => {
    const label = sl.dataValues.Label.dataValues;
    sl.dataValues.name = label.name;
    sl.dataValues.labelOwnerId = label.ownerId;
    sl.dataValues.dataType = label.dataType;
    delete sl.dataValues.Label;
  });
};

// response formatting
// move data from each SheetLabel.Sheet into SheetLabel
const formatLabelSheetsMutate = function (SheetLabels) {
  SheetLabels.forEach(sl => {
    const sheet = sl.dataValues.Sheet.dataValues;
    sl.dataValues.name = sheet.name;
    sl.dataValues.sheetOwnerId = sheet.ownerId;
    sl.dataValues.public = sheet.public;
    sl.dataValues.description = sheet.description;
    delete sl.dataValues.Sheet;
  });
};

// confirm that a SheetLabel.value matches the Label's dataType
const validateLabelValue = (value, { dataType }) => {
  if (value !== null) value = String(value);
  switch (dataType) {
    case 'number':
      if (isNaN(value))
        throw new BadRequestError(
          { value: 'Value must be a number' },
          'Wrong data type.'
        );
      break;
    case 'boolean':
      if (!['true', 'false'].includes(value?.toLowerCase())) {
        throw new BadRequestError(
          { value: 'Value must be true or false' },
          'Wrong data type.'
        );
      }
      value = value.toLowerCase();
  }
  return value;
};

module.exports = {
  setTokenCookie,
  formatSheetLabelsMutate,
  validateLabelValue,
  formatLabelSheetsMutate,
};
