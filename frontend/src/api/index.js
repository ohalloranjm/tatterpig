import deleteAttribute from './deleteAttribute';
import deleteSheet from './deleteSheet';
import deleteValue from './deleteValue';
import getAttributeDetails from './getAttributeDetails';
import getCurrentAttributes from './getCurrentAttributes';
import getCurrentSheets from './getCurrentSheets';
import getPublicSheets from './getPublicSheets';
import getSheetDetails from './getSheetDetails';
import postAttribute from './postAttribute';
import postSheet from './postSheet';
import postValue from './postValue';
import putAttribute from './putAttribute';
import putSheet from './putSheet';
import putValue from './putValue';

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

const sendRoute = methodLookup =>
  async function (...params) {
    const { method } = params[0].request;
    return await methodLookup[method](...params);
  };

const api = {
  collect,
  handleError,
  sendRoute,
  getCurrentAttributes,
  getAttributeDetails,
  postAttribute,
  putAttribute,
  deleteAttribute,
  getCurrentSheets,
  getPublicSheets,
  getSheetDetails,
  postSheet,
  putSheet,
  deleteSheet,
  postValue,
  putValue,
  deleteValue,
};

export default api;
