import Marionette from 'backbone.marionette';
import myTemplate from './Root.jst';
import Booklist from '../Booklist/Booklist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResult from '../SearchResult/SearchResult';

export default Marionette.View.extend({
  template: myTemplate,
  regions: {
    library: '#library',
    searchBar: '#search-bar',
    searchResults: '#search-results'
  },
  onRender() {
    this.showChildView('library', new Booklist());
    this.showChildView('searchBar', new SearchBar());
    this.showChildView('searchResults', new SearchResult());
  }
});

