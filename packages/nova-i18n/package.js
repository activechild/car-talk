Package.describe({
  name: "nova:i18n",
  summary: "Telescope i18n package",
  version: "0.25.7",
  git: "https://github.com/TelescopeJS/Telescope.git"
});

Package.onUse(function (api) {

  api.versionsFrom(['METEOR@1.0']);

  api.use([
    'nova:lib@0.25.7',
    'tap:i18n@1.8.0'
  ]);

  api.use(["session"], "client");

  api.addFiles(['i18n.js'], ['client', 'server']);

  api.export([
    'i18n',
    '__'
  ]);
});
