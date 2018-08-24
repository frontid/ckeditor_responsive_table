/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function (config) {

  // Es totalmente obligatorio que la carpeta se llame como el plugin internamente:
  // CKEDITOR.plugins.add('ckeditor_responsive_table')
  // Y tener en cuenta que en "extraPlugins" lo que estamos poniendo es el nombre del directorio que asume que tienes en "/plugins". Si añadis un nombre de plugin inexistente o uno externo muy posiblemente te lance este error "Uncaught TypeError: Cannot read property 'icons' of null"
  // En el caso de querer añadir un plugin que esté fuera del directorio de plugins estandar, vas a tener que usar  CKEDITOR.plugins.addExternal() --> ver ejemplo comentado mas abajo


  // Cargamos los plugin que hay fuera del directorio de plugins.
  // El primer param tiene que ser exactamente el nombre del plugin si no quieres revibir un "Uncaught TypeError: Cannot read property 'icons' of null"
  CKEDITOR.plugins.addExternal('ckeditor_responsive_table', '/ckeditor_responsive_table/dist/plugin.js');

  // Hora de añadir tanto los plugin de ckeditor como los externos
  config.extraPlugins = ['ckeditor_responsive_table'];


  // No importa si el boton tiene establecido algo como "toolbar: 'tools'"
  // config.toolbar = [
  //   {name: 'basicstyles', items: ['Timestampo', 'ResponsiveTable', 'Italic']}
  // ];

  config.toolbar = [
    {name: 'basicstyles', items: ['ResponsiveTable']}
  ];


};
