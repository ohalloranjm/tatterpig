export function collect(...routes) {
  return async function (...params) {
    const result = [];
    for (const route of routes) {
      result.push(await route(...params));
    }
    return result;
  };
}

export function handleError(route, returnError = true) {
  return async function (...params) {
    try {
      return await route(...params);
    } catch (err) {
      return returnError ? err : false;
    }
  };
}

export function map(methodLookup) {
  return async function (...params) {
    const { method } = params[0].request;
    return await methodLookup[method](...params);
  };
}

export function parseQuery(url, key) {
  return url
    .split('?')[1]
    .split('&')
    .find(q => q.startsWith(`${key}=`))
    .split('=')[1];
}
