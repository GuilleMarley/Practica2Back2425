
const developerJokes = [
  "¿Por qué los desarrolladores odian la naturaleza? Porque tiene demasiados bugs.",
  "Un SQL entra en un bar, se acerca a dos mesas y pregunta: '¿Puedo unirme?'",
  "¡He terminado mi código a tiempo! – Nadie, nunca.",
  "Si no funciona, añade más `console.log()`.",
  "¿Cuántos programadores se necesitan para cambiar una bombilla? Ninguno, es un problema de hardware.",
  "No me asusto fácilmente... excepto cuando veo código sin `;` al final.",
  "Los desarrolladores no envejecen, solo se depuran.",
  "El único lugar donde puedes escapar de una excepción es en Java.",
  "Frontend sin diseño es como un backend sin lógica.",
  "¿Por qué los programadores prefieren el té? Porque en Java no hay café.",
  "Hay 10 tipos de personas en el mundo: las que entienden binario y las que no.",
  "Siempre prueba tu código... excepto cuando funciona.",
  "Tu código no está roto, solo es 'funcionalidad no documentada'.",
  "En qué se parecen los programadores y los gatos? En que odian mojarse y no pueden dejar de jugar con cosas que no deberían.",
  "Mi código funciona... hasta que lo toco de nuevo.",
  "¿Por qué los desarrolladores odian la luz del sol? Porque depuran en la oscuridad.",
  "Cuando crees que has eliminado todos los bugs, aparece el 'bug final'.",
  "Git es como un horóscopo: nunca entiendes los conflictos.",
  "Un desarrollador sin bugs es como un unicornio, no existe.",
  "En mi máquina funciona... pero no en producción."
];

const handler = (req: Request): Response => {
  const url = new URL(req.url);
  //console.log(`La url es ${url.host}`);
  const path = url.pathname;
  if (path === "/jokes") {
    const jokeNumber = url.searchParams.get("index");
    if (jokeNumber) {
      const joke = developerJokes[parseInt(jokeNumber)];
      return new Response(joke);
    }
    return new Response(developerJokes[Math.floor(Math.random() * developerJokes.length)]);
  } else if (path === "/calcular") {

    const num1 = url.searchParams.get("num1");
    const num2 = url.searchParams.get("num2");
    const operacion = url.searchParams.get("operacion");

    if (num1 && num2 && operacion) {
      let auxResultado: number;
      if (operacion === "suma") {
        auxResultado = parseInt(num1) + parseInt(num2);
      } else if (operacion === "resta") {
        auxResultado = parseInt(num1) - parseInt(num2);
      } else if (operacion === "multiplicacion") {
        auxResultado = parseInt(num1) * parseInt(num2);
      } else if (operacion === "division") {
        if(num2 === "0") {
          return new Response("No se puede dividir por 0.", { status: 400 });
        }
        auxResultado = parseInt(num1) / parseInt(num2);
      } else {
          return new Response("Operación no válida.");
      }
      const resultado = auxResultado;
      return new Response(`El resultado de la ${operacion} es ${resultado}`);

    }
  } else if (path.startsWith("/reverso")) {
    const frase = path.replace("/reverso/", "").replaceAll("%20", " ");
    const detalles = url.searchParams.get("detalles") === "true";
    const reverso = frase.split("").reverse().join("");
    if (detalles) {
      return new Response(JSON.stringify({ reverso, longitud: frase.length }));
    } else {
      return new Response(reverso);
    }
  }
  return new Response(`La ruta ${path} no existe.`, { status: 404 });
};

Deno.serve({ port: 3000 }, handler);
