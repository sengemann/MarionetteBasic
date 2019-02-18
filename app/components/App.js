import Marionette from 'backbone.marionette';
import Root from './Root/Root';
import 'jquery';
import 'bootstrap';

import '../styles/applications.less';

export default Marionette.Application.extend({
  region: '#app',
  onStart() {
    this.showView(new Root());
  },
  attachElContents(html) {
    console.log('html:', html);
  }
});
