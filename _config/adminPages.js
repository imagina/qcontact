export default {
  items: {
    permission: 'icontact.items.manage',
    activated: true,
    authenticated: true,
    path: '/contact/items/index',
    name: 'qcontact.admin.items',
    crud: import('modules/qcontact/_crud/items'),
    page: () => import('modules/qcrud/_pages/admin/crudPage'),
    layout: () => import('layouts/master.vue'),
    title: 'icontact.cms.sidebar.adminItems',
    icon: 'fa-light fa-address-book',
    subHeader: {
      refresh: true,
    },
  },
};
