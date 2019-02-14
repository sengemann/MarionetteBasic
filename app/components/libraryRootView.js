import Marionette from 'backbone.marionette';
import template from '../templates/libraryRoot.jst';
import MyLibrary from '../components/myLibrary';
import LibrarySearch from '../components/librarySearch';

export default Marionette.View.extend({
  template: template,
  regions: {
    library: '#library',
    search: '#search'
  },
  onRender() {
    this.showChildView('library', new MyLibrary());
    this.showChildView('search', new LibrarySearch());
  }
});

