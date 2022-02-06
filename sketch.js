var birds = [];
var savedBirds = [];
var pipes = [];
var frameCounter = 0;
var generacija=1;
var ukupno_pajpova=-1;
var table;
var generation=1;
var brojac2;

function setup()
{
  var cenvas=createCanvas(600, 400); 
  cenvas.center();
  brojac2=select("#generation");
  brojac2.html(generation);
  tf.setBackend('cpu');
  for (var i = 0; i < 400; i++) 
  {
    birds[i] = new Bird();
  }
  table = new p5.Table();
  table.addColumn('Generacija');
  table.addColumn('Cijev');

}

function draw() 
{
  if (frameCounter % 45 == 0) 
  {
    pipes.push(new Pipe());
    ukupno_pajpova++;
  }
  frameCounter++;
   
  for (var i=0; i < pipes.length; i ++ ) 
  {
    pipes[i].update(); 
    for (var j=0; j < birds.length; j++) 
    {
      if (pipes[i].hits(birds[j]))
      {
        var newRow = table.addRow();
        newRow.setNum('Generacija', generacija);
        newRow.setString('Cijev', ukupno_pajpova);
        savedBirds.push(birds.splice(j, 1)[0]); 
      }
    }
    if (pipes[i].offscreen()) 
    {
      pipes.splice(i, 1);
    }
  }

  for (var i=0; i < birds.length; i++) 
  {
    if (birds[i].offScreen()) 
    {
      var newRow = table.addRow();
      newRow.setNum('Generacija', generacija);
      newRow.setString('Cijev', ukupno_pajpova);
      savedBirds.push(birds.splice(i, 1)[0]); 
    }
  }

  for (let i = 0; i <birds.length; i++) 
  {
    birds[i].think(pipes);
    birds[i].update();
  }
  
  if (birds.length == 0) 
  {
    frameCounter = 0;
    nextGeneration();
    generation++;
    brojac2.html(generation);
    generacija++;
    ukupno_pajpova=-1;
    if(generacija==21) 
    {
      saveTable(table, 'TEST.csv');
    }
    pipes = [];
  }

  background("deeppink");
  for (let i = 0; i <birds.length; i++) 
  {
    birds[i].show();
  }
  for (let i = 0; i < pipes.length; i++)
  {
    pipes[i].show();
  }
}