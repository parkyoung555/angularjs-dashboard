(function(){
  'use strict';

  angular.module('coreComponent')
    .service('navigationService', navigationService);

  function navigationService($state) {
    this.menuItems = getNavigationItems();

    /////////////////////

    function getNavigationItems() {
      var states = $state.get(),
        navItems = [];

      states = states.filter(function(state){
        return !state.abstract && !!state.url;
      });

      states.sort(function(a, b) {
        var p1 = a.data.priority || 0,
          p2 = b.data.priority || 0;
        return p2 - p1;
      });

      for(var i = 0, len = states.length; i < len; i++) {
        if(!states[i].abstract && !!states[i].url) {
          navItems.push({
            label: states[i].data.pageTitle,
            icon: states[i].data.menuIcon,
            state: states[i].name
          });
        }
      }
      return navItems;
    }
  }
  navigationService.$inject = ['$state'];
})();