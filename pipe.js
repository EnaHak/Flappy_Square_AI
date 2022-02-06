class Pipe 
{
  constructor() 
  {
    this.spacing = 70;
    this.top = random(height / 6, (3 / 4) * height);
    this.bottom = height - (this.top + this.spacing);
    this.x = width;
    this.w = 70;
    this.speed = 6;
    this.highlight=false;
  }
 
  hits(bird) 
  {
    if (bird.y < this.top || bird.y > height - this.bottom)
    {
      if(bird.x > this.x && bird.x < this.x + this.w)
      {
        this.highlight=true;
        return true;
      }
    }
    else
    {
      this.highlight=false;
      return false;
    }
  }

  show() 
  {
    fill(255);
    if(this.highlight == true)
    {
      fill("#fae");
      stroke("#fae");
    }
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height - this.bottom, this.w, this.bottom);
  }

  update() 
  {
    this.x -= this.speed;
  }

  offscreen() 
  {
    if (this.x < -70) 
    {
      return true;
    } 
    else 
    {
      return false;
    }
  }
}