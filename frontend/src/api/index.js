import getPublicSheets from './getPublicSheets';

const collect = (...routes) =>
  async function (...params) {
    const result = [];
    for (const route of routes) {
      result.push(await route(...params));
    }
    return result;
  };

const api = { collect, getPublicSheets };

export default api;
