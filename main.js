pontua = 0;
tempo = 0;
modo = "espera";
confidencia = 0;

document.getElementById("pontos").innerHTML = 'Pontuação: ' + pontua;

array = ['lapis','celular','caderno','copo','aviao'];
random = Math.floor((Math.random() * array.lenght)+1);

document.getElementById("desafio").innerHTML = 'Esboço a Ser Desenhado: ' + random;

document.getElementById("tempo").innerHTML = tempo;

function preload()
{
    classifier = ml5.imageClassifier('DoodleNet');
}
  
function setup()
{
    canvas = createCanvas(280, 280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
}

function jogar()
{
    if (modo == "espera")
    {
        modo = "jogo";
        console.log(modo);
    }
}

function classifyCanvas()
{
    classifier.classify(canvas, gotResults);
}
  
function gotResults(error, results)
{
    if (error)
    {
        console.error(error);
    }
    console.log(results);

    result = results[0].label;
    confidencia = Math.round(results[0].confidence * 100);

    if (modo == "jogo")
    {
        document.getElementById("label").innerHTML = 'Nome: ' + result.replace('_', ' ');
        document.getElementById("confidence").innerHTML = 'Precisão: ' + confidencia + '%';
        console.log(confidencia);
    }
    else
    {
        document.getElementById("label").innerHTML = "Comece o jogo";
        document.getElementById("confidence").innerHTML = "Comece o jogo";
    }
      
}
 
function draw()
{
    strokeWeight(13);
    stroke(0);
  
    if (mouseIsPressed)
    {
        line(pmouseX, pmouseY, mouseX, mouseY); 
    }

    if (modo == "jogo")
    {
        if (tempo > 800)
        {
            tempo = 0;
            modo = "espera";
            console.log(modo);

            document.getElementById("tempo").innerHTML = "Tempo Esgotou, não consegui descobrir o seu desenho...";
        
            background('white')
        }
        else
        {
            tempo = tempo + 1;

            if (confidencia > 60 )
            {
                pontua = pontua + 1;
                modo = "espera";
                confidencia = 0; 

                document.getElementById("desafio").innerHTML = "Parabéns, eu consegui descobrir o seu desenho!"
            }

            document.getElementById("tempo").innerHTML = "Tempo: " + tempo;
        }
    }
    else
    {
        clearCanvas();
    }
}
  
function clearCanvas()
{
    background("white");
}