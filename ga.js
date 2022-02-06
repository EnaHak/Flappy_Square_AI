function nextGeneration() 
{
    calculateFitness();
    for (var i = 0; i < 400; i++) 
    {
      birds[i] = pickOneParent();
    }
    savedBirds = [];
  }
  
  function pickOneParent() 
  {
    var index = 0
    var r = random(1)
    while (r - savedBirds[index].fitness > 0)
    {
      r = r - savedBirds[index].fitness
      index++;
    }
    var bird_parent = savedBirds[index];
    var child = new Bird(bird_parent.brain);
    child.mutate();
    return child;   
  }
  
  function calculateFitness()
  {
    var sum=0;
    for(var i=0; i < savedBirds.length; i++)
    {
      sum+=savedBirds[i].score;
    }
    for(var i=0; i < savedBirds.length; i++)
    {
      savedBirds[i].fitness=savedBirds[i].score/sum;
    }
  } 


 

  
