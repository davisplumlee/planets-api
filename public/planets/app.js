;(function(){

  angular.module('da-planets', [])
    .component('universe', {
      template: `
      <input ng-model="$ctrl.galaxyName"/>
      <button ng-click="$ctrl.createGalaxy($ctrl.galaxyName)">Create Galaxy</button>
      <button ng-click="$ctrl.loadStuff()">Load Galaxies</button>
        <div ng-repeat="g in $ctrl.galaxies">
          <p>{{g.name}}</p>
        </div>
      `,
      controller: UniverseController
    })

    function UniverseController($http) {
      let $ctrl = this;
      this.loadStuff = function() {
        $http.get('/api/galaxies').then(function(res){
          $ctrl.galaxies = res.data
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
    }

}());