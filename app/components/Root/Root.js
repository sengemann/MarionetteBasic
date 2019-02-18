import Marionette from 'backbone.marionette';
import myTemplate from './Root.jst';
import Booklist from '../Booklist/Booklist';
import SearchWithResults from '../SearchWithResults/SearchWithResults';

export default Marionette.View.extend({
  template: myTemplate,
  regions: {
    library: '#library',
    search: '#search'
  },
  onRender() {
    this.showChildView('library', new Booklist());
    this.showChildView('search', new SearchWithResults());
  }
});

