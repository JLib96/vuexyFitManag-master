export default [
  {
    path: '/app-fit/anag/societies/list',
    name: 'app-fit-anag-societies-list',
    component: () => import('@/views/app-fit/anag/society/societies-list/SocietiesList.vue'),
    meta: {
      pageTitle: 'Elenco Società',
      breadcrumb: [
        {
          text: 'Fit',
        },
        {
          text: 'Anagrafiche',
        },
        {
          text: 'Società',
          active: true,
        },
      ],
    },
  },

  {
    path: '/app-fit/anag/societies/view/:id',
    name: 'app-fit-anag-societies-view',
    component: () => import('@/views/app-fit/anag/society/societies-view/SocietiesView.vue'),
  },

  {
    path: '/app-fit/anag/persone/list',
    name: 'app-fit-anag-persone-list',
    component: () => import('@/views/app-fit/anag/persone/persone-list/PersoneList.vue'),
    meta: {
      pageTitle: 'Elenco Persone',
      breadcrumb: [
        {
          text: 'Fit',
        },
        {
          text: 'Anagrafiche',
        },
        {
          text: 'Persone',
        },
        {
          text: 'Elenco Persone',
          active: true,
        },
      ],
    },
  },

  {
    path: '/app-fit/anag/persone/view/:id',
    name: 'app-fit-anag-persone-view',
    component: () => import('@/views/app-fit/anag/persone/persone-view/PersoneView.vue'),
    meta: {
      pageTitle: 'Dettagli Persona',
      breadcrumb: [
        {
          text: 'Fit',
        },
        {
          text: 'Anagrafiche',
        },
        {
          text: 'Persone',
        },
        {
          text: 'Dettagli Persona',
          active: true,
        },
      ],
    },
  },

  {
    path: '/app-fit/anag/persone/edit/:id',
    name: 'app-fit-anag-persone-edit',
    component: () => import('@/views/app-fit/anag/persone/persone-edit/PersoneEdit.vue'),
    meta: {
      pageTitle: 'Modifica Persona',
      breadcrumb: [
        {
          text: 'Fit',
        },
        {
          text: 'Anagrafiche',
        },
        {
          text: 'Persone',
        },
        {
          text: 'Modifica Persona',
          active: true,
        },
      ],
    },
  },

  {
    path: '/app-fit/anag/persone/new',
    name: 'app-fit-anag-persone-new',
    component: () => import('@/views/app-fit/anag/persone/persone-edit/PersoneEdit.vue'),
    meta: {
      pageTitle: 'Aggiungi Persona',
      breadcrumb: [
        {
          text: 'Fit',
        },
        {
          text: 'Anagrafiche',
        },
        {
          text: 'Persone',
        },
        {
          text: 'Aggiungi Persona',
          active: true,
        },
      ],
    },
  },


]
