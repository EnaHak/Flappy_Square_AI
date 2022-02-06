class Bird 
{
    constructor(brain) 
    {
      this.x=64;
      this.y = height / 2;
      this.gravity = 0.8;
      this.lift = -10;
      this.speed = 0;
      this.score = 0;
      this.fitness = 0;
      this.brain;
      if (brain instanceof NeuralNetwork) 
      {
        this.brain = brain.copy();
      }
      else 
      {
        this.brain = new NeuralNetwork(5, 5, 1);
      }
    }
    mutate() 
    {
      this.brain.mutate(0.1);
    }

    think(pipes)
    {
      var inputs = [];
      inputs[0] = this.y/height;
      inputs[1] = pipes[0].top/height;
      inputs[2] = pipes[0].bottom/height;
      inputs[3] = pipes[0].x/width;
      inputs[4] = this.speed/10;
      var output = this.brain.predict(inputs);
      if (output[0] > 0.5) 
      {
        this.up();
      }
    }

    show() 
    {
      fill(255,0); 
      stroke(255);
      rect(this.x, this.y, 12, 12);
    }
  
    up()
    {
      this.speed += this.lift;
      this.speed *= 0.9;
    }

    update() 
    {
      this.score++;
      this.speed += this.gravity;
      this.speed *= 0.9;
      this.y += this.speed;
    }
  
    offScreen() 
    {
      return this.y > height || this.y < 0;
    }
  }