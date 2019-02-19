import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';
import myTemplate from './SearchBar.jst';

const searchResultUpdateChannel = Radio.channel('searchResultUpdateChannel');

export default Marionette.View.extend({
  template: myTemplate,
  events: {
    'click button#search-books': 'searchForBook',
    'keypress #book-search': 'searchForBook'
  },

  searchForBook(e) {
    if (e.type ===  'keypress' && e.which === 13 || e.type === 'click') {
      e.preventDefault();
      $.ajax({
        type: 'get',
        url: 'https://www.googleapis.com/books/v1/volumes?q=' + encodeURI($('input#book-search').val()),
        contentType: 'application/json',
        success: function(response) {
          let freshResults = [];
          $.each(response.items, function(index, item) {
            if (item.volumeInfo.industryIdentifiers) {
              freshResults.push({
                isbn: item.volumeInfo.industryIdentifiers[0].identifier,
                title: item.volumeInfo.title
              });
            }
          });
          searchResultUpdateChannel.trigger('fresh-results', freshResults);
        },
        error: function(error) {
          console.error('Error:', error);
        }
      });
    }
  }
});
