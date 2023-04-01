class Fabric 
{ 
    constructor(x,y,value,loadtime,buyprice,text="TEST",sequence=function(){},active=function(){return false})
    {
      this.x=x;
      this.y=y;
      this.text = text;
      this.color = '#D29';
      this.loading = 0;
      this.LoadTime=loadtime;
      this.value=value;
      this.w = text.length*14+20
      this.price = this.value*5.5;
      this.level = 1;
      this.auto = 0;
      this.running = 0;
      this.buyprice=buyprice

      // Special function
      this.sequence=sequence;
      this.active = active;
    }
  
    MouseIsHover(x,y,w,h)
    {
      let ret=0;
      if ( (mouseX>x) && ((x+w)>mouseX) )
      if ( (mouseY>y) && ((y+h>mouseY)))
      ret = 1;
        
      return ret;
    }

    Draw()
    {
      if (this.active() == false)
      {
        strokeWeight(0);
        fill('#888');
        rect(this.x,this.y,this.w ,40,10,3)
        fill(255);
        textSize(15);
        // Grayscale integer value
        strokeWeight(2);
        stroke(51);
        text(this.text,this.x+5,this.y+16)
        text("  ["+this.level+"]",this.x+this.w-50,this.y+16)
        fill('#555');
//        strokeWeight(2);
        rect(this.x+5,this.y+21,this.w -10,15)
  
        return
      }



      if ( (this.MouseIsHover(this.x,this.y,this.w,40)) &&
           (this.auto == 0) &&
           (this.running == 0) )
      {
        stroke(0);
        strokeWeight(1);
        fill('#FB2');
        rect(this.x-5,this.y-5,this.w+8,48,30,2)
      }

      // If 
      if (this.price<Ressources)
      {
        if (this.MouseIsHover(this.x+this.w,this.y,55,40))
        {
          stroke(0);
          strokeWeight(1);
          fill('#FB2');
          rect(this.x+this.w,this.y-4,55,48)
        }

        stroke(0);
        strokeWeight(1);
        fill('#DD2');
        rect(this.x+this.w,this.y,55,40,2)
        fill('#493');
        textSize(14);
        stroke(0);
        strokeWeight(1);
        text(formatNumber(this.price.toFixed(0))+"$",this.x+this.w+4,this.y+15)
        textSize(12);
        fill('#731');
        text("Upgrade",this.x+this.w+4,this.y+33)
      }

      strokeWeight(2);
      if (this.running == 1)
      fill(this.color);
      else
      fill('#67d');
        
      rect(this.x,this.y,this.w ,40,10,3)
      fill(255);
      textSize(15);
      // Grayscale integer value
      strokeWeight(4);
      stroke(51);
      text(this.text,this.x+5,this.y+16)
      text("  ["+this.level+"]",this.x+this.w-50,this.y+16)
      fill('#449');
      strokeWeight(2);
      rect(this.x+5,this.y+21,this.w -10,15)
      strokeWeight(0);
      fill('#5A5');

      rect(this.x+6,this.y+22,(this.w -13)*this.loading,13)
      fill('#DDD');
      textSize(10);
      strokeWeight(2);
      text((this.LoadTime*this.loading).toFixed(2)+"/"+this.LoadTime.toFixed(2) +" s",this.x+8,this.y+32)
      text(formatNumber(this.value.toFixed(0))+" -> "+formatNumber(this.sequence().toFixed(0)),this.x,this.y+55)
      
    }

    Update()
    {
      
      if (this.auto)
      {
        this.loading += (1/fps)/this.LoadTime;
        if (this.loading>=1)
        {
          this.loading = 0;
          Ressources += this.value;
          this.price = this.value*5.5;
          this.running = 0

        }
        else
        {
          this.loading += (1/fps)/this.LoadTime;
          this.running = 1
        }
      }
      else if (this.running == 1)
      {
        if (this.loading>=1)
        {
          this.loading = 0;
          Ressources += this.value;
          this.price = this.value*5.5;
          this.running = 0;

        }
        else
        {
          this.loading += (1/fps)/this.LoadTime;
        }
      }
      
      if (mouseIsPressed )
        {
          HoldCounter++;
          if (HoldCounter>120)
            {
              this.Event(mouseX,mouseY);
            }
          
        }
      else
        HoldCounter = 0;

    }

    Event(x,y)
    {
      if ( (x>this.x+this.w) && ((this.x+this.w+55)>x) )
      if ( (y>this.y) && ((this.y+40>y)))
      {

        if (this.price<Ressources)
          {
            Ressources -= this.price;
            this.level++;
            if (this.level >= 50)
              this.auto = 1;
            if ( (this.level%10) == 0)
              if (this.LoadTime>0.1)
                this.LoadTime=this.LoadTime-0.1;
            this.value = this.sequence();
          }
      }
      
      if (this.running == 0)
        {
          if ( (x>this.x) && ((this.x+this.w)>x) )
          if ( (y>this.y) && ((this.y+40>y)))
          {
            this.running=1;
          }
        }
    }


    
  
}