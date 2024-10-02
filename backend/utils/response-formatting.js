const formatSheetAttributesMutate = function (SheetAttributes) {
  SheetAttributes.forEach(satt => {
    const attribute = satt.dataValues.Attribute.dataValues;
    satt.dataValues.name = attribute.name;
    satt.dataValues.attributeOwnerId = attribute.ownerId;
    satt.dataValues.dataType = attribute.dataType;
    delete satt.dataValues.Attribute;
  });
};

module.exports = { formatSheetAttributesMutate };
