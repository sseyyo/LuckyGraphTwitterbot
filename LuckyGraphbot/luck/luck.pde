// Constants
int Y_AXIS = 1;
int X_AXIS = 2;
color c1, c2, c3, c4;

void setup() {
  size(400, 400);

  // Define colors
  c1 = color(random(0,255),random(0,255),random(0,255));
  c2 = color(random(0,255),random(0,255),random(0,255));
  c3 = color(random(0,255),random(0,255),random(0,255));
  c4 = color(random(0,255),random(0,255),random(0,255));

  noLoop();
}

void draw() {
  // Background
  // Foreground
   gradientBack(0, 0, 400, 400, c1, c2, Y_AXIS);
   //gradientCircle(400,c3,c4);
   gradientLine(c3,c4);
   tipCircle();
   save("output.png");
   exit();
}

void gradientBack(int x, int y, float w, float h, color c1, color c2, int axis ) {

  noFill();

  if (axis == Y_AXIS) {  // Top to bottom gradient
    for (int i = y; i <= y+h; i++) {
      float inter = map(i, y, y+h, 0, 1);
      color c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x+w, i);
    }
  }
  textSize(12);
  text("bad", 65, 375); 
  text("good", 350, 375); 
  text("easy", 15, 25); 
  text("hard", 15, 335); 
  fill(0, 102, 153);
  
}


void gradientCircle(int s,color c3, color c4) {
   for (int r = 400; r >= 0; r--) {
      float interC = map(r, 0, 400, 0, 1);
      color c = lerpColor(c3, c4, interC);
      noStroke();
      fill(c);
      ellipse(200,200, r, r);
    }
}
  
  

void gradientLine(color c3, color c4) {
   for (int r = 20; r <= 370; r+=40) {
      float interC = map(r, 0, 360, 0, 1);
      color c = lerpColor(c3, c4, interC);
      stroke(c);
      line(60,r,width-20,r);
      for (int e =60; e<=420; e+=40){
      line(e,20,e,height-60);
      }
    }
  //for (int r = 150; r <= 1000; r+=80){
  //    float interC = map(r, 0, 1000, 0, 1);
  //    color c = lerpColor(c3, c4, interC);
  //    stroke(c);
  //    noFill();
  //    ellipse(0,0,r,r);
}
//}


void tipCircle(){
  fill(random(0,255),random(0,255),random(0,255));
  noStroke();
  ellipse(random(60,width-20),random(20,height-60),10,10);
}
  