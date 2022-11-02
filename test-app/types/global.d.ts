// Types for compiled templates
declare module 'tracked-built-ins/templates/*' {
  import { TemplateFactory } from 'ember-cli-htmlbars';
  const tmpl: TemplateFactory;
  export default tmpl;
}
