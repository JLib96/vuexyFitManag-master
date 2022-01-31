export default [
  {
    header: 'FIT Management',
  },
  {
    title: 'Anagrafiche',
    icon: 'CopyIcon',
    children: [
      {
        title: 'Persone',
        route: null,
        children: [
          {
            title: 'Elenco Persone',
            route: 'app-fit-anag-persone-list',
          },
          {
            title: 'Aggiungi Persona',
            route: 'app-fit-anag-persone-new',
          },
        ],
      },
      {
        title: 'Società',
        route: 'anag-societies',
      },
      {
        title: 'Elenco Società',
        route: 'app-fit-anag-societies-list',
      },
      {
        title: 'Tesserati',
        route: 'forms-element-input',
      },
    ],
  },
]
