;(function(){

  angular.module('planet-api')
    .component('planet', {
      template: `<div ng-init="$ctrl.loadStuff()">
        <input ng-model="$ctrl.planetName" placeholder="New Planet"/>
        <button ng-click="$ctrl.createPlanet($ctrl.planetName)">Create Planet</button>
        <div ng-repeat="planet in $ctrl.planets">
          {{planet.name}}
        </div>
      </div>`,
      controller: PlanetController,
      bindings: {
          galaxyId: '<'
      }
    })

    function PlanetController($http) {
      let $ctrl = this;
      
      this.loadStuff = function() {
        // if(!this.galaxyId){
        //   return
        // }
        console.log(this.galaxyId)
        $http.get('/api/planets/' + this.galaxyId)
          .then(function(res){
            $ctrl.planets = res.data
            console.log(res)
          })
      }

      this.createPlanet = function(name) {
        if(!name){
          return;
        }
        $http.post('/api/planets/'+this.galaxyId, {
          "name": name,
          "galaxyId": this.galaxyId
        }).then(function(res){
          $ctrl.loadStuff();
          $ctrl.planetName = '';
        })
      }

      // this.deleteGalaxy = function(id){
      //   $http.delete('api/galaxies/' + id).then(function(res){
      //     $ctrl.loadStuff();
      //   })
      // }

      // this.updateName = function(id, name){
      //   if(!name){
      //     return;
      //   }
      //   let thisGalaxy;
      //   $http.get('api/galaxies/' + id).then(function(res){
      //     thisGalaxy = res.data
      //     console.log(name)
      //   })
      //   $http.put('api/galaxies/' + id, {"name": name}).then(function(res){
      //     $ctrl.loadStuff();
      //     console.log(thisGalaxy.name + ' now named ' + res.data.name)
      //     $ctrl.newName = ''
      //   })
      // }



    }

}());