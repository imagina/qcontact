const moduleName = 'icontact';
const moduleVersion = 'v1';
const urlBase = `/${moduleName}/${moduleVersion}`;

export default {
  urlBase: urlBase,
  version: moduleVersion,
  notebooks: `${urlBase}/notebooks`,
  items: `${urlBase}/items`,
  itemTypes: `${urlBase}/item-types`,
};
