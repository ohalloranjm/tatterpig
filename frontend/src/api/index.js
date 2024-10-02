import getCurrentSheets from './getCurrentSheets';
import getPublicSheets from './getPublicSheets';
import getSheetDetails from './getSheetDetails';

const collect = (...routes) =>
  async function (...params) {
    const result = [];
    for (const route of routes) {
      result.push(await route(...params));
    }
    return result;
  };

const ignoreError = route =>
  async function (...params) {
    try {
      return await route(...params);
    } catch (err) {
      return false;
    }
  };

const api = {
  collect,
  ignoreError,
  getCurrentSheets,
  getPublicSheets,
  getSheetDetails,
};

export default api;
