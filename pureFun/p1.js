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
  


module.exports = {
    countLocalesByCadena,
    countLocalesByComuna,
    countLocalesDespuesDeHora,
  };