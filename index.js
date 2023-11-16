const pureFun = require('./pureFun/p1');
const API = require('./impureFun/DFAPI');
const Writter = require('./impureFun/WRF');

const { countLocalesByCadena, countLocalesByComuna, countLocalesDespuesDeHora, countCadenasByComuna, masCadenasPorComuna, promedioHorarios } = pureFun;
async function main() {
  try {
    const data = await API('https://andreshoward.com/pharmacies');
    const localesByCadena = countLocalesByCadena(data);
    const localesByComuna = countLocalesByComuna(data);
    const localesDespuesDeHora = countLocalesDespuesDeHora(data, '10:00:00');
    const cadenasByComuna = countCadenasByComuna(data);
    const presenteByComuna = masCadenasPorComuna(data);
    const promedioHoras = promedioHorarios(data);
    await Writter('1-locales-por-cadena.json', localesByCadena);
    await Writter('2-locales-por-comuna.json', localesByComuna);
    console.log(`3-locales-abren-despues-de-hora.json: ${localesDespuesDeHora} locales abren después de las 10:00:00`);
    await Writter('4-cadenas-por-comuna.json', cadenasByComuna);
    await Writter('5-cadenas-mas-presentes-por-comuna.json', presenteByComuna)
    await Writter('6-promedio-horarios-por-cadena.json', promedioHoras)

    console.log('Fin');
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
