export function obtenerPeriodoDelDia() {
    const horaActual = new Date().getHours();
    
    if (horaActual >= 6 && horaActual < 12) {
        return "mañana";
      } else if (horaActual >= 12 && horaActual < 18) {
        return "intermedio";
      } else if (horaActual >= 18 && horaActual < 24) {
        return "tarde";
      } else{
        return "noche";
      }
  }

export function obtenerPeriodoDelDiaConHora(fechaString) {
    const hora = fechaString.split(", ")[1].split(":")[0];

    const horaActual = parseInt(hora, 10);
   
    if (horaActual >= 6 && horaActual < 12) {
      return "mañana";
    } else if (horaActual >= 12 && horaActual < 18) {
      return "intermedio";
    } else if (horaActual >= 18 && horaActual < 24) {
      return "tarde";
    } else{
      return "noche";
    }
  }

export function obtenerFechaActualEnFormatoISO() {
    const fechaActual = new Date();

    const year = fechaActual.getFullYear();
    const month = String(fechaActual.getMonth() + 1).padStart(2, "0");
    const day = String(fechaActual.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

export function convertirFechaASinHora(fecha) {
    const meses = {
      Ene: "01",
      Feb: "02",
      Mar: "03",
      Abr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Ago: "08",
      Sept: "09",
      Oct: "10",
      Nov: "11",
      Dic: "12",
    };

    const [, dia, mes, anio] = fecha.match(/(\d+) De (\w+) De (\d+)/);
    const mesNumerico = meses[mes];
    const diaConCeros = String(dia).padStart(2, "0");
    if (
      `${anio}-${mesNumerico}-${diaConCeros}` ==
      obtenerFechaActualEnFormatoISO()
    ) {
      return true;
    } else return false;
  }

export function convertirFecha2ASinHora(fecha) {
    const meses = {
      Ene: "01",
      Feb: "02",
      Mar: "03",
      Abr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Ago: "08",
      Sept: "09",
      Oct: "10",
      Nov: "11",
      Dic: "12",
    };

    const [, dia, mes, anio] = fecha.match(/(\d+) De (\w+) De (\d+)/);
    const mesNumerico = meses[mes];
    const diaConCeros = String(dia).padStart(2, "0");
    return `${diaConCeros}/${mesNumerico}/${anio}`;
  }

export function convertirFechaConHora(fecha) {
    const diasSemana = {
      Domingo: "Sun",
      Lunes: "Mon",
      Martes: "Tue",
      Miércoles: "Wed",
      Jueves: "Thu",
      Viernes: "Fri",
      Sábado: "Sat",
    };

    const meses = {
      Ene: "01",
      Feb: "02",
      Mar: "03",
      Abr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Ago: "08",
      Sept: "09",
      Oct: "10",
      Nov: "11",
      Dic: "12",
    };

    const [, diaSemana, dia, mes, anio, hora, minutos, segundos] = fecha.match(
      /(\w+) (\d+) De (\w+) De (\d+), (\d+):(\d+):(\d+)/
    );

    // const diaSemanaAbreviado = diasSemana[diaSemana];
    const mesNumerico = meses[mes];
    const diaConCeros = String(dia).padStart(2, "0");
    const horaConCeros = String(hora).padStart(2, "0");
    const minutosConCeros = String(minutos).padStart(2, "0");
    const segundosConCeros = String(segundos).padStart(2, "0");

    return `${diaConCeros}-${mesNumerico}-${anio} ${horaConCeros}:${minutosConCeros}:${segundosConCeros}`;
  }