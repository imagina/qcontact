<template>
  <masterModal
    v-model="openModal"
    :title="modalTitle"
    custom-position
  >
    <crud v-bind="crudItems" />
  </masterModal>
</template>
<script>
import masterModal from 'modules/qsite/_components/master/masterModal';
export default {
  components: {
    masterModal,
  },
  data() {
    return {
      crudId: this.$uid(),
      openModal: false,
      modalTitle: this.$tr('icontact.cms.sidebar.adminItems'),
      selectedNotebook: null,
    };
  },
  computed: {
    crudData() {
      return {
        crudId: this.crudId,
        apiRoute: 'apiRoutes.qcontact.notebooks',
        permission: 'icontact.notebooks',
        create: {
          title: this.$tr('icontact.cms.newNotebook'),
        },
        read: {
          columns: [
            {
              name: 'id',
              label: this.$tr('isite.cms.form.id'),
              field: 'id',
              style: 'width: 50px',
            },
            {
              name: 'title',
              label: this.$tr('isite.cms.form.title'),
              field: 'title',
              align: 'rigth',
            },
            {
              name: 'systemName',
              label: this.$tr('isite.cms.form.systemName'),
              field: 'systemName',
              align: 'rigth',
            },
            {
              name: 'isEnable',
              asStatus: true,
              label: this.$tr('isite.cms.form.status'),
              field: 'isEnable',
              align: 'left',
            },
            {
              name: 'isPublic',
              asStatus: true,
              label: this.$tr('icontact.cms.isPublic'),
              field: 'isPublic',
              align: 'left',
            },
            {
              name: 'created_at',
              label: this.$tr('isite.cms.form.createdAt'),
              field: 'createdAt',
              align: 'left',
              format: (val) => (val ? this.$trd(val) : '-'),
            },
            {
              name: 'actions',
              label: this.$tr('isite.cms.form.actions'),
              align: 'left',
            },
          ],
          requestParams: {
            include: 'translations',
            filter: { entityType: '__global__' },
          },
          actions: [
            {
              icon: 'fa-light fa-list-timeline',
              color: 'info',
              label: this.$tr('icontact.cms.sidebar.adminItems'),
              action: (item) => {
                this.selectedNotebook = item.id;
                this.modalTitle = `${this.$tr('icontact.cms.sidebar.adminItems')} | ${item.title}`;
                this.openModal = true;
              },
            },
          ],
        },
        update: {
          title: this.$tr('icontact.cms.updateNotebook'),
          requestParams: { include: 'translations' },
        },
        delete: true,
        formLeft: {
          id: { value: '' },
          userId: { value: this.$store.state.quserAuth.userId },
          title: {
            value: '',
            type: 'input',
            isTranslatable: true,
            props: {
              label: `${this.$tr('isite.cms.form.title')}*`,
              rules: [
                (val) => !!val || this.$tr('isite.cms.message.fieldRequired'),
              ],
            },
          },
          systemName: {
            value: '',
            type: 'input',
            props: {
              label: `${this.$tr('isite.cms.form.systemName')}*`,
              rules: [
                (val) => !!val || this.$tr('isite.cms.message.fieldRequired'),
              ],
            },
          },
          isEnable: {
            value: '1',
            type: 'select',
            props: {
              label: this.$tr('isite.cms.form.status'),
              options: [
                { label: this.$tr('isite.cms.label.enabled'), value: '1' },
                { label: this.$tr('isite.cms.label.disabled'), value: '0' },
              ],
            },
          },
          isPublic: {
            value: '0',
            type: 'select',
            props: {
              label: this.$tr('icontact.cms.isPublic'),
              options: [
                { label: this.$tr('isite.cms.label.yes'), value: '1' },
                { label: this.$tr('isite.cms.label.no'), value: '0' },
              ],
            },
          },
        },
      };
    },
    //Crud info
    crudInfo() {
      return this.$store.state.qcrudComponent.component[this.crudId] || {};
    },
    crudItems() {
      return {
        crudData: import('modules/qcontact/_crud/items'),
        customData: {
          read: {
            requestParams: {
              include: 'translations',
              filter: { notebookId: this.selectedNotebook },
            }
          },
          formLeft: {
            notebookId: { value: this.selectedNotebook },
          },
        },
      };
    },
  },
};
</script>
