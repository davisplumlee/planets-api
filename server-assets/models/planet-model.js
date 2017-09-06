; (function () {

  let dataAdapter = require('./data-adapter'),
    uuid = dataAdapter.uuid,
    schemator = dataAdapter.schemator,
    DS = dataAdapter.DS;

  let galaxyModel = require('./galaxy-model'),
    Galaxy = galaxyModel.Galaxy

  let Planet = DS.defineResource({
    name: 'planet',
		endpoint: 'planets',
    filepath: __dirname + '/../data/planets.db',
    relations: {
      belongsTo: {
        galaxy: {
          localField: 'galaxy',
          foreignKey: 'galaxyId'
        }
      },
      hasMany: {
        moon:{
          localField: 'moons',
          foreignKey: 'planetId'
        },
        species: {
          localField: 'species',
          foreignKeys: 'planetIds'
        }
      }
    }
  })

  schemator.defineSchema('Planet', {
    id: { type: 'string', nullable: false },
    name: { type: 'string', nullable: false },
    galaxyId: { type: 'string', nullable: false }
  })

  function createPlanet(name, galaxyId, cb) {
    let planet = {
      id: uuid.v1(),
      name: name,
      galaxyId: galaxyId
    }
    let error = schemator.validateSync('Planet', planet);
    if (error) { return cb(error) }

    Planet.create(planet).then(cb)
  }

  function getAll(cb) {
    Planet.findAll().then(cb)
  }

  function deleteById(id, cb){
    Planet.destroy(id).then(cb)
  }

  function getById(id, cb){
    let options = {
      //with: ['moon']
    }

    let params = {
      where: {
        galaxyId: {
          '==': id
        }
      }
    }

    Planet.findAll(params, options).then(cb)
  }


  module.exports = {
    getAll,
    createPlanet,
    getById,
    deleteById,
    Planet
  }


} ());