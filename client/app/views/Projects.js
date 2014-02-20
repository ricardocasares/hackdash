/**
 * VIEW: Projects of an Instance
 * 
 */

var Project = require('./Project');

module.exports = Backbone.Marionette.CollectionView.extend({

  //--------------------------------------
  //+ PUBLIC PROPERTIES / CONSTANTS
  //--------------------------------------

  id: "projects",
  className: "row projects",
  itemView: Project,
  
  collectionEvents: {
    "reset remove": "render",
    "sort:date": "sortByDate",
    "sort:name": "sortByName"
  },

  //--------------------------------------
  //+ INHERITED / OVERRIDES
  //--------------------------------------
  
  onRender: function(){
    var self = this;
    _.defer(function(){
      self.updateIsotope();
    });
  },

  //--------------------------------------
  //+ PUBLIC METHODS / GETTERS / SETTERS
  //--------------------------------------

  //--------------------------------------
  //+ EVENT HANDLERS
  //--------------------------------------

  //--------------------------------------
  //+ PRIVATE AND PROTECTED METHODS
  //--------------------------------------

  sortByName: function(){
    this.$el.isotope({"sortBy": "name"});
  },

  sortByDate: function(){
    this.$el.isotope({"sortBy": "date"});
  },

  isotopeInitialized: false,
  updateIsotope: function(){
    var $projects = this.$el;
    var self = this;

    $projects.imagesLoaded(function() {

      if (this.isotopeInitialized){
        $projects.isotope("destroy");
      }

      $projects.isotope({
          itemSelector: ".project"
        , animationEngine: "jquery"
        , resizable: true
        , masonry: { columnWidth: self.projectColumnWidth() }
        , sortAscending: true
        , getSortData : {
            "name" : function ( $elem ) {
              return $elem.data("name").toLowerCase();
            },
            "date" : function ( $elem ) {
              return $elem.data("date");
            }
          }
        , sortBy: "name"
      });
      
      this.isotopeInitialized = true;
    });
  },

  projectColumnWidth: function () {
    var $projects = this.$el;
    
    return ($projects.width() >= 1200) ? 
            300
          :
          ($projects.width() === 960) ?
            $projects.width() / 3
          :
          ($projects.width() === 744) ?
            $projects.width() / 2
          :
            $projects.width();
  }

});