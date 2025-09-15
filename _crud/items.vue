<template></template>
<script>
export default {
  data() {
    return {
      crudId: this.$uid(),
    };
  },
  computed: {
    crudData() {
      return {
        crudId: this.crudId,
        apiRoute: 'apiRoutes.qcontact.items',
        permission: 'icontact.items',
        create: {
          title: this.$tr('icontact.cms.newItem'),
        },
        read: {
          columns: [
            {
              name: 'id',
              label: this.$tr('isite.cms.form.id'),
              field: 'id',
              style: 'width: 50px',
              align: 'left',
            },
            {
              name: 'title',
              label: this.$tr('isite.cms.form.title'),
              field: 'title',
              align: 'left',
            },
            {
              name: 'systemName',
              label: this.$tr('isite.cms.form.systemName'),
              field: 'systemName',
              align: 'left',
            },
            {
              name: 'isEnable',
              asStatus: true,
              label: this.$tr('isite.cms.form.status'),
              field: 'isEnable',
              align: 'left',
            },
            {
              name: 'type',
              label: this.$tr('isite.cms.form.type'),
              field: 'type',
              align: 'left',
              format: (val) => val.title,
            },
            {
              name: 'value',
              label: this.$tr('isite.cms.label.value'),
              field: 'value',
              align: 'left',
            },
            {
              name: 'countryCode',
              label: this.$trp('ilocation.cms.form.countryCode'),
              field: 'countryCode',
              align: 'left',
              format: (val) => (val ? `(+${val})` : '-'),
            },
            {
              name: 'message',
              label: this.$trp('isite.cms.label.message'),
              field: 'message',
              align: 'left',
              format: val => val ?? '-'
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
          requestParams: { include: 'translations' },
        },
        update: {
          title: this.$tr('icontact.cms.updateItem'),
          requestParams: { include: 'translations' },
        },
        delete: false,
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
          typeId: {
            value: null,
            type: 'select',
            required: true,
            props: {
              label: this.$tr('isite.cms.form.type'),
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qcontact.itemTypes',
              select: { label: 'title', id: 'id' },
            },
          },
          value: {
            value: '',
            type: 'input',
            required: true,
            isTranslatable: true,
            props: {
              label: `${this.$tr('isite.cms.label.value')}*`,
            },
          },
          countryCode: {
            value: null,
            type: 'select',
            props: {
              label: this.$tr('ilocation.cms.form.countryCode'),
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qlocations.countries',
              requestParams: { include: 'translations' },
              select: {
                label: item => `${item.name} (+${item.callingCode})`,
                id: 'callingCode'
              },
              filterByQuery: true,
            },
          },
          message: {
            value: '',
            type: 'input',
            isTranslatable: true,
            props: {
              label: this.$tr('isite.cms.label.message'),
            },
          },
        },
      };
    },
    //Crud info
    crudInfo() {
      return this.$store.state.qcrudComponent.component[this.crudId] || {};
    },
  },
};
</script>
