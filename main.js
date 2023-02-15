array['lapis','celular','caderno','copo','aviao'];
random = Math.floor((Math.random() * array.lenght)+1)

document.getElementById("desafio").innerHTML = '<p id="desafio">Esboço a Ser Desenhado: '+random+' </p>'
function setup()
{
    canvas = createCanvas(280, 280);
    canvas.center();
}

setTimeout(
    function()
    {
      takeSelfie1();
      save1();
    }, 10000);