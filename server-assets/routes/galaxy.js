;(function(){

  const router = require('express').Router();
  const Galaxy = require('../models/galaxy-model');

  module.exports.mountPath = '/galaxies'
  module.exports.router = router;

  router.route('/:id?')
    .get(function(req, res){
      if(req.params.id){
        Galaxy.getById(req.params.id, req.query.include, function(galaxy){
          return res.send(galaxy)
        })
      }else{
        Galaxy.getAll(req.query.include, function(galaxies){
          return res.send(galaxies);
        });
      }
    })
    .post(function(req, res){
      Galaxy.createGalaxy(req.body.name, function(galaxy){
        return res.send(galaxy)
      })
    })
    .put(function(req, res){
      Galaxy.updateName(req.params.id, req.body.name, function(galaxy){
        return res.send(galaxy);
      })
    })
    .delete(function(req, res){
      if(req.params.id){
        Galaxy.deleteById(req.params.id, req.query.include, function(galaxy){
          return res.send(galaxy)
        })
      } else {
        Galaxy.deleteAll(req.query.include, function(galaxy){
          return res.send(galaxy)
        })
      }
    })


}());