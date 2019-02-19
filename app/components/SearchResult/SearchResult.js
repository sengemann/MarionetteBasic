import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';
import myTemplate from './SearchResult.jst';

const booklistChannel = Radio.channel('booklistChannel');
const searchResultUpdateChannel = Radio.channel('searchResultUpdateChannel');

export default Marionette.View.extend({
  template: myTemplate,
  events: {
    'click a.search-result-item': 'onSearchResultItemClick'
  },
  onRender() {
    this.$el = this.$el.children();
    this.$el.unwrap();
    this.setElement(this.$el);
    searchResultUpdateChannel.on('fresh-results', function(freshResults) {
      let results = '';
      $.each(freshResults, function(index, item) {
        results = results + '<li><a class="search-result-item" href="" data-isbn="' + item.isbn + '">' + item.title + '</a></li>';
      });
      $('#search-results-list').empty().append(results);
    })
  },
  onSearchResultItemClick(e) {
    e.preventDefault();
    const bookToAdd = {
      isbn: e.currentTarget.attributes['data-isbn'].value,
      title: e.currentTarget.text
    };
    booklistChannel.trigger('add-book', bookToAdd);
  }
});
