import Marionette from 'backbone.marionette';
import Root from './Root/Root';

export default Marionette.Application.extend({
  region: '#app',
  onStart() {
    this.showView(new Root());
  },
  attachElContents(html) {
    console.log('html:', html);
  }
});
