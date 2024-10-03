import deleteSheet from './deleteSheet';
import getAttributeDetails from './getAttributeDetails';
import getCurrentAttributes from './getCurrentAttributes';
import getCurrentSheets from './getCurrentSheets';
import getPublicSheets from './getPublicSheets';
import getSheetDetails from './getSheetDetails';
import postAttribute from './postAttribute';
import postSheet from './postSheet';
import postValue from './postValue';
import putSheet from './putSheet';

const collect = (...routes) =>
  async function (...params) {
    const result = [];
    for (const route of routes) {
      result.push(await route(...params));
    }
    return result;
  };

const handleError = (route, returnError = true) =>
  async function (...params) {
    try {
      return await route(...params);
    } catch (err) {
      return returnError ? err : false;
    }
  };

const api = {
  collect,
  handleError,
  getCurrentAttributes,
  getAttributeDetails,
  postAttribute,
  getCurrentSheets,
  getPublicSheets,
  getSheetDetails,
  postSheet,
  putSheet,
  deleteSheet,
  postValue,
};

export default api;
