document.getElementById("zodiacForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const fecha = new Date(document.getElementById("fecha").value);
  const dia = fecha.getDate();
  const mes = fecha.getMonth() + 1;

  let signo = "";

  if ((mes == 3 && dia >= 21) || (mes == 4 && dia <= 19)) signo = "1aries";
  else if ((mes == 4 && dia >= 20) || (mes == 5 && dia <= 20)) signo = "2tauro";
  else if ((mes == 5 && dia >= 21) || (mes == 6 && dia <= 20)) signo = "3geminis";
  else if ((mes == 6 && dia >= 21) || (mes == 7 && dia <= 22)) signo = "4cancer";
  else if ((mes == 7 && dia >= 23) || (mes == 8 && dia <= 22)) signo = "5leo";
  else if ((mes == 8 && dia >= 23) || (mes == 9 && dia <= 22)) signo = "6virgo";
  else if ((mes == 9 && dia >= 23) || (mes == 10 && dia <= 22)) signo = "7libra";
  else if ((mes == 10 && dia >= 23) || (mes == 11 && dia <= 21)) signo = "8escorpio";
  else if ((mes == 11 && dia >= 22) || (mes == 12 && dia <= 21)) signo = "9sagitario";
  else if ((mes == 12 && dia >= 22) || (mes == 1 && dia <= 19)) signo = "10capricornio";
  else if ((mes == 1 && dia >= 20) || (mes == 2 && dia <= 18)) signo = "11acuario";
  else if ((mes == 2 && dia >= 19) || (mes == 3 && dia <= 20)) signo = "12piscis";

  window.location.href = `${signo}.html`;
});
