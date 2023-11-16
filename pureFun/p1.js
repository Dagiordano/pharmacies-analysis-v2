function countLocalesByCadena(data) {
    return data.reduce((localesContados, { local_nombre }) => {
        const cadena = local_nombre.trim().toLowerCase();
        localesContados[cadena] = (localesContados[cadena] || 0) + 1;
        return localesContados;
    }, {});
}
function countLocalesByComuna(data) {
    const localesPorComuna = data.reduce((acc, local) => {
      const comuna = local.comuna_nombre.trim().toLowerCase();
      acc[comuna] = (acc[comuna] || 0) + 1;
      return acc;
    }, {});
  
    return localesPorComuna;
  }  
  function countLocalesDespuesDeHora(data, horaLimite) {
    return data.reduce((count, { funcionamiento_hora_apertura }) => {
      const horaApertura = new Date(`2020-08-03 ${funcionamiento_hora_apertura}`);
      const horaLimiteObj = new Date(`2020-08-03 ${horaLimite}`);
      return count + (horaApertura > horaLimiteObj ? 1 : 0);
    }, 0);
  }
  

function countCadenasByComuna(data) {
  return data.reduce((acc,farmacia) => {
    const comuna = farmacia.comuna_nombre.trim().toLowerCase();
    const cadena = farmacia.local_nombre.trim().toLowerCase();
    const id = farmacia.local_id.trim().toLowerCase();
  

    if(!acc[comuna]) {
      acc[comuna] = {};
    }
    if (!acc[comuna][cadena]) {
      acc[comuna][cadena] = [];
    }
    acc[comuna][cadena].push(id);
    return acc;
  }, {});
}


function masCadenasPorComuna(data) {
  const cadenaPorComuna = countCadenasByComuna(data);
  const objeto = {};
  for (const comuna in cadenaPorComuna){
    const comunas = cadenaPorComuna[comuna]
    let maxCadena = '';
    let maxNum = 0;
    for (const cadena in comunas) {
      if (comunas[cadena].length > maxNum) {
        maxCadena = cadena;
        maxNum = comunas[cadena].length;
      
      }
      objeto[comuna] = maxCadena; 
    }


  }
  return objeto;
}


function promedioHorarios(data){ 
  const promedio = data.reduce((acc, {local_nombre, funcionamiento_hora_apertura, funcionamiento_hora_cierre}) => {
    const cadena = local_nombre.trim().toLowerCase();
    const apertura = new Date(`2020-08-03 ${funcionamiento_hora_apertura}`);
    const cierre = new Date(`2020-08-03 ${funcionamiento_hora_cierre}`);
    const hours = Math.abs(cierre - apertura) / 36e5; // obtener la diferencia en horas

    if (!acc[cadena]) {
      acc[cadena] = [];
    }
    acc[cadena].push(hours);
    return acc;
  }, {})

    for (const local in promedio) {
      const suma = promedio[local].reduce((a,b) => a+b,0);
      const avg = suma/promedio[local].length;
      promedio[local] = avg;

    }
  
  return promedio;
}









module.exports = {
    countLocalesByCadena,
    countLocalesByComuna,
    countLocalesDespuesDeHora,
    countCadenasByComuna,
    masCadenasPorComuna,
    promedioHorarios
  };