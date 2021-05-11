const transformMap = new Map([
    ['name', 'nombre'],
    ['height', 'altura'],
    ['mass', 'masa'],
    ['hair_color', 'color_cabello'],
    ['skin_color', 'color_piel'],
    ['eye_color', 'color_ojos'],
    ['birth_year', 'fecha_nacimiento'],
    ['gender', 'genero'],
    ['homeworld', 'planeta'],
    ['films', 'peliculas'],
    ['species', 'especie'],
    ['vehicles', 'vehiculo'],
    ['starships', 'nave'],
    ['created', 'fecha_creacion'],
    ['edited', 'fecha_edicion'],
    ['url', 'url']
  ]);
  
module.exports.transformKeys = obj =>
Object.fromEntries(
    Object.entries(obj)
    .map(([k, v]) => [transformMap.get(k) || k, v])
);