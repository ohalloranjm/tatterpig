const formatSheetLabelsMutate = function (SheetLabels) {
  SheetLabels.forEach(satt => {
    const label = satt.dataValues.Label.dataValues;
    satt.dataValues.name = label.name;
    satt.dataValues.labelOwnerId = label.ownerId;
    satt.dataValues.dataType = label.dataType;
    delete satt.dataValues.Label;
  });
};

const formatLabelSheetsMutate = function (SheetLabels) {
  SheetLabels.forEach(satt => {
    const sheet = satt.dataValues.Sheet.dataValues;
    satt.dataValues.name = sheet.name;
    satt.dataValues.sheetOwnerId = sheet.ownerId;
    satt.dataValues.public = sheet.public;
    satt.dataValues.description = sheet.description;
    delete satt.dataValues.Sheet;
  });
};

module.exports = { formatSheetLabelsMutate, formatLabelSheetsMutate };
