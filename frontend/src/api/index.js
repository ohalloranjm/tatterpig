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
import * as utils from './utils';

const api = {
  utils,
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
