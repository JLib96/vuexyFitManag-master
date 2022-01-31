export default [
  {
    path: '/anag-fit/societies',
    name: 'anag-societies',
    component: () => import('@/views/anag-fit/societies/Societies.vue'),
    meta: {
      pageTitle: 'Anagrafica Società',
      breadcrumb: [
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
]
