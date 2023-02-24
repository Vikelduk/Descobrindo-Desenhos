pontua = 0;

document.getElementById("pontos").innerHTML = 'Pontuação: ' + pontua;

array['lapis','celular','caderno','copo','aviao'];
random = Math.floor((Math.random() * array.lenght)+1)

document.getElementById("desafio").innerHTML = 'Esboço a Ser Desenhado: ' + random;

setTimeout(
  function()
  {
    pontos();
  }, 10000);

document.getElementById("tempo").innerHTML = setTimeout(function(){pontos();},10000);

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
  
  function draw()
  {
      strokeWeight(13);
      stroke(0);
  
      if (mouseIsPressed)
      {
          line(pmouseX, pmouseY, mouseX, mouseY); 
      }
  }
  
  function clearCanvas()
  {
      background("white");
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
      var result = results[0].label;
      document.getElementById("label").innerHTML = 'Nome: ' + result.replace('_', ' ');
      
      confidencia = Math.round(results[0].confidence * 100)

      document.getElementById("confidence").innerHTML = 'Precisão: ' + confidencia + '%';
      pontos();
      
  }

  function pontos()
  {
    if (confidencia > 60 )
    {
      pontua = pontua + 1; 
    }
  }