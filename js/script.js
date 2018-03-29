$(function(){
  function randomString() {
    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
    var str = '';
    for (var i = 0; i < 10; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
  }
  function Column(name) {
    var self = this;
    this.id = randomString();
    this.name = name;
    this.$element = createColumn();
    function createColumn() {
      var $column = $('<div>').addClass('column');
      var $columnHeader = $('<header>').addClass('column-header');
      var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
      var $columnCardList = $('<ul>').addClass('column-card-list');
      var $columnDelete = $('<button>').addClass('btn-delete').text('x');
      var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');
      $columnDelete.on('click', function() {
          self.removeColumn();
      });
      $columnAddCard.on('click', function() {
          self.addCard(new Card(prompt("Enter the name of the card")));
      });
      $columnHeader.append($columnTitle)
                   .append($columnDelete);
      $column.append($columnHeader)
              .append($columnAddCard)
              .append($columnCardList);
      return $column;
    }
  }
  Column.prototype = {
    addCard: function(card){
      if(card === null) {
        return;
      };
      this.$element.children('ul').append(card.$element);
    },
    removeColumn: function(){
      this.$element.remove();
    }
  }
  function Card(description) {
	  var self = this;
    this.id = randomString();
    this.description = description;
    this.$element = createCard();
    function createCard() {
      var $card = $('<li>').addClass('card');
      var $cardDescription = $('<p>').addClass('card-description').text(self.description);
      var $cardDelete = $('<button>').addClass('btn-delete-card').text('x');
      $cardDelete.click(function(){
          self.removeCard();
      });
      $card.append($cardDelete)
      	   .append($cardDescription);
      return $card;
      }
  }
  Card.prototype = {
  	removeCard: function() {
  		this.$element.remove();
    }
  }
  var board = {
    name: 'Kanban Board',
    addColumn: function(column) {
      this.$element.append(column.$element);
      initSortable();
    },
    $element: $('#board .column-container')
  };
  function initSortable() {
   $('.column-card-list').sortable({
     connectWith: '.column-card-list',
     placeholder: 'card-placeholder'
   }).disableSelection();
  }
  $('.create-column')
    .click(function(){
    	var name = prompt('Enter a column name');
      if(name === null) {
        return;
      }
    	var column = new Column(name);
    	board.addColumn(column);
  });
  var todoColumn = new Column('To do');
  var doingColumn = new Column('Doing');
  var doneColumn = new Column('Done');
  board.addColumn(todoColumn);
  board.addColumn(doingColumn);
  board.addColumn(doneColumn);
  var card1 = new Card('New task');
  var card2 = new Card('Create kanban boards');
  todoColumn.addCard(card1);
  doingColumn.addCard(card2);
});

$('.column').on('click', function(event){
  console.log('cos');
  var color = $('#colorPicker').val();
  $(event.target).css('background-color', color);
});
// document.getElementById("#colorPicker").addEventListener("change", function(){
//     var color = this.val();
//      $('.column').css('background-color', color);
// });
