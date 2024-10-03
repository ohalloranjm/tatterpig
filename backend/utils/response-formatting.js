const formatSheetAttributesMutate = function (SheetAttributes) {
  SheetAttributes.forEach(satt => {
    const attribute = satt.dataValues.Attribute.dataValues;
    satt.dataValues.name = attribute.name;
    satt.dataValues.attributeOwnerId = attribute.ownerId;
    satt.dataValues.dataType = attribute.dataType;
    delete satt.dataValues.Attribute;
  });
};

const formatAttributeSheetsMutate = function (SheetAttributes) {
  SheetAttributes.forEach(satt => {
    const sheet = satt.dataValues.Sheet.dataValues;
    satt.dataValues.name = sheet.name;
    satt.dataValues.sheetOwnerId = sheet.ownerId;
    satt.dataValues.public = sheet.public;
    satt.dataValues.description = sheet.description;
    delete satt.dataValues.Sheet;
  });
};

module.exports = { formatSheetAttributesMutate, formatAttributeSheetsMutate };
