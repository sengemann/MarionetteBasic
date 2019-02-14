import Marionette from 'backbone.marionette';
import LibraryRootView from './libraryRootView';

export default Marionette.Application.extend({
  region: '#app',
  onStart() {
    this.showView(new LibraryRootView());
  },
  attachElContents(html) {
    console.log('html:', html);
  }
});
