;(function(){

  angular.module('planet-api')
    .component('planet', {
      template: `<div ng-init="$ctrl.loadStuff()">
        Planets coming soon
      </div>`,
      controller: PlanetController,
      bindings: {
          galaxyId: '='
      }
    })

    function PlanetController($http) {
      let $ctrl = this;
      
      this.loadStuff = function() {
        $http.get('/api/galaxies')
          .then(function(res){
            $ctrl.galaxies = res.data
            console.log(res)
          })
      }

      this.createGalaxy = function(name) {
        if(!name){
          return;
        }
        $http.post('/api/galaxies', {"name": name}).then(function(res){
          $ctrl.loadStuff();
          $ctrl.galaxyName = '';
        })
      }

      this.deleteGalaxy = function(id){
        $http.delete('api/galaxies/' + id).then(function(res){
          $ctrl.loadStuff();
        })
      }

      this.updateName = function(id, name){
        if(!name){
          return;
        }
        let thisGalaxy;
        $http.get('api/galaxies/' + id).then(function(res){
          thisGalaxy = res.data
          console.log(name)
        })
        $http.put('api/galaxies/' + id, {"name": name}).then(function(res){
          $ctrl.loadStuff();
          console.log(thisGalaxy.name + ' now named ' + res.data.name)
          $ctrl.newName = ''
        })
      }



    }

}());