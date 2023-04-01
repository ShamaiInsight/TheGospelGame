

var FabricList = [
  new Fabric(10,10,2,1.5,0,"Disciple "+String.fromCharCode(8252),
  function(){return this.value*1.05},function(){return true}),
  new Fabric(10,100,150,10,50,"Church "+String.fromCharCode(8258),
  function(){return this.value*1.1},function(){return Ressources>this.buyprice})

]

function preload() {
  //inconsolata = loadFont('myfont.otf');
}

function setup() {
  frameRate(fps);
  createCanvas(800, 600);
  //textFont(inconsolata);
  textSize(14);
}


// Main Game Loop
function draw() 
{
  background(220);

  // Push allow graphics operation to be done
  // without change the grahics context before the push
  // Example Color, line width text size will stay the same
  // after the pop
  push()

  // Estimation of the work
  var computeestimation=0;
  for(i=0;i<FabricList.length;i++)
  {
    // We call all the Process first
    FabricList[i].Update()

    if (FabricList[i].running)
      computeestimation += (1/FabricList[i].LoadTime)*FabricList[i].value;
  }

  for(i=0;i<FabricList.length;i++)
  {
    // We call all the Drawing Last
    FabricList[i].Draw()

  }


  estimation += (computeestimation - estimation)/8.0;
  pop()

  fill('#495');
  strokeWeight(2);
  stroke(0);
  textSize(20);
  text("Christians : * "+formatNumber(Ressources.toFixed(0)),400,20)
  text("Souls/s : * "+formatNumber(estimation.toFixed(0)),400,100)
}

function mouseClicked() 
{
  for(i=0;i<FabricList.length;i++)
  {
    FabricList[i].Event(mouseX,mouseY)
 
  }
}

