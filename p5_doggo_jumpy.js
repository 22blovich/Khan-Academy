/*
    
   __/\\\\\\\\\\\\\___       _______/\\\\\______        
    _\/\\\/////////\\\_       _____/\\\///\\\____       
     _\/\\\_______\/\\\_       ___/\\\/__\///\\\__      
      _\/\\\\\\\\\\\\\\__       __/\\\______\//\\\_     
       _\/\\\/////////\\\_       _\/\\\_______\/\\\_    
        _\/\\\_______\/\\\_       _\//\\\______/\\\__   
         _\/\\\_______\/\\\_       __\///\\\__/\\\____  
          _\/\\\\\\\\\\\\\/__       ____\///\\\\\/_____ 
           _\/////////////____       ______\/////_______
    
    {=====}  [=====]   (=====)   |=====|  /=\\   \\   <====>     
    {=}     []     []  ()    (=)   |=|    // /=  \\  <=>   
    {=}     []     []  ()    (=)   |=|    // /=\ \\  <=>  <==>
    {=}     []     []  ()    (=)   |=|    //  =\ \\  <=>    <=>
    {=====}	 [=====]   (=====)   |=====|  //   //=\   <=====>
*/
var theGround;
var theBrick; // the player
var Bads;
var SunTimer; // tracks sun, position, and score
var creator = "Bo Lovich";
var artist = "";
var Gravity;
var grassTile;

var maxBoardLength = 6000;
var numEnemies = '';
var SHOW_BOUNDING_BOXES = false;
// --- HELPER FUNCTIONS ---
var rColor = function() {
  fill(random(0, 255), random(0, 255), random(0, 255));
};

var setup = function() {
  createCanvas(600, 600);
  Gravity = createVector(0, 9.8 / 60);
};

var preload = function() {
  grassTile = loadImage("https://www.greatmats.com/images/turf-athletic-padded-roll/turf-tile-closeup.jpg");
};

var puts = function() {
  for (var i = 0; i < arguments.length; i++) {
    print(arguments[i] + " ");
  }
  println("");
};

// takes 2 objects, each with {x,y,width,height}
// returns true if they overlap
var collides = function(r1, r2) {
  return !(r2.x > (r1.x + r1.width) ||
    (r2.x + r2.width) < r1.x ||
    r2.y > (r1.y + r1.height) ||
    (r2.y + r2.height) < r1.y);
};
//-----------------------------
var Brick = function() {
  this.x = 100;
  this.y = 0;
  this.height = 103;
  this.width = 72;
  this.speed = 10;
  this.fall = true;
  this.ySpeed = 5;
  this.onground = false;
  this.dead = false;
  this.score = 0;

  this.isJumping = false;
  this.jumpOffset = 0;
  this.jumpNum = 0;
  this.maxHeightOverEnemy = -1;

  this.accel = createVector(0, 0);
  this.velocity = createVector(0, 0);

  this.worldx = this.x;
  this.worldy = this.y;
};

var dog = function(x, y, size) {
  push();
  translate(x + 3, y + 1);
  scale(size);
  noStroke();
  //mouth
  fill(0, 0, 0);
  rect(124, 477, 200, 200);
  //face
  fill(150, 122, 28);
  beginShape();
  vertex(23.4, 678.3);
  bezierVertex(23.0, 678.0, 22.7, 632.8, 22.7, 577.9);
  vertex(22.7, 478);
  vertex(2, 477.8);
  vertex(-18.8, 477.5);
  vertex(-18.8, 223.5);
  //vertex(-18.8, -30.5);
  //vertex(28.2, -30.5);
  //vertex(75.2, -30.5);
  vertex(75.5, 86.8);
  vertex(75.7, 204);
  vertex(218.7, 204);
  vertex(361.7, 204);
  vertex(361.9, 86.8);
  //vertex(362.2, -30.5);
  //vertex(409.2, -30.5);
  //vertex(456.2, -30.5);
  vertex(456.2, 223.5);
  vertex(456.2, 477.5);
  vertex(435, 477.8);
  //vertex(413.7, 478);
  vertex(413.5, 578.3);
  vertex(413.2, 678.5);
  vertex(365.7, 678.5);
  vertex(318.2, 678.5);
  vertex(317.9, 632.3);
  vertex(317.7, 586);
  vertex(228.7, 586);
  vertex(139.7, 586);
  vertex(139.5, 632.3);
  vertex(139.2, 678.5);
  vertex(81.6, 678.8);
  bezierVertex(50, 678.9, 23.7, 678.7, 23.4, 678.3);
  endShape();
  ellipse(60, 150, 125, 315);
  ellipse(382, 150, 125, 315);
  //rect(10, 150, 398,422);
  arc(82, 485, 200, 250, 90, 270);
  arc(357, 485, 200, 250, -90, 90);
  //stripes
  fill(100, 0, 255);
  triangle(-2, 550, 24, 604, 24, 300);
  triangle(439, 550, 414, 604, 296, 325);
  triangle(110, 230, 450, 195, 456, 300);
  //inside ears
  fill(255, 0, 0);
  arc(360, 80, 100, 100, -59, 90);
  arc(75.1, 80, 100, 100, -272, -115);
  //big eye
  fill(100, 0, 255);
  ellipse(123, 330, 200, 200);
  fill(0, 175, 255);
  ellipse(125, 325, 55, 55);
  fill(0, 0, 0);
  ellipse(125, 325, 25, 25);
  //small eye
  fill(100, 0, 255);
  ellipse(325, 325, 60, 60);
  fill(0, 0, 0);
  ellipse(325, 325, 25, 25);
  //nose
  fill(0, 0, 0);
  triangle(175, 465, 275, 465, 232, 511);
  fill(79, 79, 79);
  ellipse(210, 478, 20, 20);
  ellipse(245, 478, 20, 20);
  //tounge
  fill(255, 0, 0);
  ellipse(234, 646, 75, 200);
  //line to mouth
  stroke(0, 0, 0);
  line(232, 511, 232, 675);
  noStroke();
  fill(0, 0, 0);
  ellipse(229, 588, 179, 86);
  pop();
};

var Bad = function(size, x, y) {
  push();
  translate(x, y);
  scale(0.03);
  rotate(180);
  noStroke();
  fill(0,0,0,0.7);
  //head
  ellipse(746, 2634, 900, 900);
  fill(255, 0, 0);
  ellipse(575, 2750, 100, 100);
  ellipse(850, 2750, 100, 100);
  fill(0, 0, 0);
  //sword
  beginShape();
  vertex(745, 2277);
  bezierVertex(693, 2229, 627, 2138, 446, 1868);
  vertex(213, 1521);
  vertex(165, 1546);
  vertex(116, 1570);
  vertex(80, 1535);
  bezierVertex(61, 1516, 48, 1496, 51, 1491);
  bezierVertex(54, 1486, 76, 1474, 101, 1464);
  bezierVertex(126, 1455, 146, 1443, 146, 1437);
  bezierVertex(146, 1431, 121, 1394, 91, 1353);
  bezierVertex(60, 1313, 33, 1274, 30, 1267);
  bezierVertex(26, 1256, 90, 1210, 109, 1210);
  bezierVertex(112, 1210, 138, 1252, 167, 1303);
  bezierVertex(195, 1353, 220, 1397, 222, 1399);
  bezierVertex(224, 1401, 246, 1386, 271, 1365);
  bezierVertex(296, 1345, 319, 1329, 320, 1331);
  bezierVertex(322, 1333, 331, 1351, 341, 1370);
  vertex(359, 1404);
  vertex(315, 1442);
  vertex(272, 1479);
  vertex(375, 1632);
  bezierVertex(433, 1716, 541, 1875, 616, 1985);
  bezierVertex(735, 2159, 839, 2341, 818, 2340);
  bezierVertex(814, 2339, 781, 2311, 745, 2277);
  endShape();
  //right arm
  beginShape();
  vertex(198, 2084);
  bezierVertex(168, 2069, 139, 2045, 127, 2027);
  bezierVertex(97, 1978, -71, 1599, -78, 1563);
  bezierVertex(-87, 1523, -70, 1458, -41, 1425);
  bezierVertex(-29, 1411, 0, 1391, 23, 1380);
  bezierVertex(64, 1362, 64, 1362, 84, 1383);
  bezierVertex(121, 1426, 120, 1429, 56, 1458);
  vertex(-5, 1485);
  vertex(54, 1543);
  vertex(112, 1601);
  vertex(159, 1575);
  vertex(205, 1549);
  vertex(336, 1745);
  bezierVertex(452, 1919, 467, 1945, 461, 1971);
  bezierVertex(446, 2036, 352, 2109, 280, 2110);
  bezierVertex(264, 2110, 227, 2098, 198, 2084);
  endShape();
  //left arm
  beginShape();
  vertex(1201, 2103);
  bezierVertex(1168, 2094, 1115, 2053, 1095, 2020);
  bezierVertex(1070, 1980, 1061, 1913, 1075, 1876);
  bezierVertex(1086, 1850, 1088, 1849, 1104, 1863);
  bezierVertex(1119, 1876, 1142, 1876, 1320, 1864);
  bezierVertex(1429, 1856, 1521, 1851, 1523, 1854);
  bezierVertex(1526, 1857, 1493, 1905, 1450, 1962);
  bezierVertex(1350, 2093, 1292, 2126, 1201, 2103);
  endShape();
  //body
  beginShape();
  vertex(549, 1846);
  vertex(377, 1592);
  vertex(376, 779);
  bezierVertex(376, -133, 370, -65, 451, -95);
  bezierVertex(509, -117, 574, -109, 606, -75);
  bezierVertex(629, -50, 629, -47, 637, 314);
  bezierVertex(642, 514, 650, 690, 656, 704);
  bezierVertex(673, 749, 759, 774, 820, 750);
  bezierVertex(834, 745, 853, 729, 863, 713);
  bezierVertex(879, 689, 881, 650, 886, 307);
  vertex(891, -72);
  vertex(919, -95);
  bezierVertex(977, -146, 1074, -139, 1113, -81);
  bezierVertex(1136, -47, 1136, -43, 1136, 262);
  bezierVertex(1136, 558, 1135, 573, 1115, 613);
  bezierVertex(1103, 636, 997, 831, 880, 1047);
  bezierVertex(762, 1263, 669, 1445, 672, 1452);
  bezierVertex(676, 1459, 715, 1499, 760, 1540);
  bezierVertex(804, 1581, 892, 1663, 954, 1722);
  vertex(1068, 1829);
  vertex(1056, 1866);
  bezierVertex(1044, 1900, 1047, 1970, 1061, 2015);
  bezierVertex(1066, 2030, 1059, 2040, 1034, 2055);
  bezierVertex(974, 2092, 942, 2098, 831, 2099);
  vertex(721, 2099);
  vertex(549, 1846);
  endShape();
  //shield
  beginShape();
  vertex(1016, 1747);
  bezierVertex(958, 1691, 862, 1598, 802, 1542);
  vertex(694, 1441);
  vertex(942, 985);
  vertex(1191, 530);
  vertex(1433, 395);
  bezierVertex(1566, 321, 1678, 260, 1683, 260);
  bezierVertex(1688, 260, 1749, 388, 1820, 544);
  vertex(1948, 828);
  vertex(1826, 1312);
  bezierVertex(1759, 1578, 1700, 1799, 1695, 1805);
  bezierVertex(1687, 1813, 1270, 1847, 1156, 1849);
  bezierVertex(1125, 1850, 1110, 1839, 1016, 1747);
  endShape();
  fill(255, 0, 0);
  ellipse(1400, 1101, 770, 770);
  fill(255, 0, 0);
  rect(1063, 761, 700, 700);
  pop();

};

Brick.prototype.draw = function() {
  var accel = createVector(this.accel.x, this.accel.y);
  accel.add(Gravity);
  // update velocity with acceleration
  this.velocity.add(accel);

  // update position with velocity
  this.x += this.velocity.x;
  this.y += this.velocity.y;

  dog(this.x, this.y, 0.15);

  if (SHOW_BOUNDING_BOXES) {
    fill(255, 0, 0);
    rect(this.x, this.y, this.width, this.height);
  }
};

Brick.prototype.slide = function() {
  if (keyIsPressed && keyCode === LEFT) {
    this.worldx -= this.speed;
  } else if (keyIsPressed && keyCode === RIGHT) {
    this.worldx += this.speed;
  }
  this.worldx = max(200, this.worldx);
};


Brick.prototype.jump = function() {
  if (this.jumpNum < 2) {
    this.velocity = createVector(0, -5);
    this.onground = false;
    this.jumpNum++;
  }
};

Brick.prototype.land = function() {
  if (this.y + this.height >= theGround.y) {
    this.y = theGround.y - this.height;
    this.velocity = createVector(0, 0);
    this.onground = true;
    this.jumpNum = 0;
  }
};

Brick.prototype.kill = function(enemy) {
  if (enemy.hitMyHead(this)) {
    enemy.die();
    this.score++;

    this.jumpNum = 1;
    this.jump();
  } else if (enemy.hitMyBody(this)) {
    this.dead = true;
  }

};

//////////////////////////////////////////
var Ground = function(x, y) {
  this.x = x;
  this.y = y;
};

Ground.prototype.draw = function() {
  this.x = -1 * theBrick.worldx - 200;
  for (var j = this.x; j <= width; j += 90) {
    image(grassTile, j, this.y - 50);
    // image(getImage("cute/DirtBlock"),j,this.y + 25);
    // image(getImage("cute/DirtBlock"),j,this.y + 75);
  }
};

Ground.prototype.moveLeft = function() {
  this.x -= 3;

};
///////////////////////////////////

var Enemy = function(x, y) {
  this.worldx = x;
  this.worldy = y;
  this.x = x;
  this.y = y;
  this.dead = false;
  this.direction = -1; // LEFT
  this.range = random(50, 200);

  this.originalX = this.worldx;
};

Enemy.prototype.draw = function() {
  if (!(this.x <= width + 50 && this.x >= -50)) {
    return;
  }

  if (this.dead) {
    this.y += 30;
    this.x += 30;

    if (this.y >= height) {
      this.shouldRemove = true;
    }
  }

  Bad(0.05, this.x, this.y);

  if (abs(this.worldx - this.originalX) >= this.range) {
    this.direction *= -1;
  }

  this.worldx += this.direction;
};

Enemy.prototype.hitMyHead = function(player) {
  var head = {
    x: this.x - 35,
    y: this.y - 93,
    width: 26,
    height: 25
  };
  return collides(player, head);
};

Enemy.prototype.hitMyBody = function(player) {
  var body = {
    x: this.x - 58,
    y: this.y - 65,
    width: 62,
    height: 70
  };
  return collides(player, body);
};

Enemy.prototype.ObjPos = function(theplayer) {
  this.x = theplayer.x + (this.worldx - theplayer.worldx);
};

Enemy.prototype.die = function() {
  this.dead = true;
};
Enemy.prototype.win = function() {
  if (!this.dead && this.worldx <= 200) {
    theBrick.dead = true;
  }
};

// var enemyCoords = [
//     [650,350],
//     [700,350],
//     [9650,350],
//     [1250,350],
//     [1650,350],
//     [2150,350],
//     [2750,350],
//     [3450,350],
//     [4450,350],
//     [5350,350],
// ];


var mouseClicked = function() {
  if (mouseX < 200 && mouseY < 100) {
    var msg = [theGround.x, theBrick.worldx].join(',');
    println(msg);
  }
};

var createBads = function() {
  Bads = [];
  // for (var i = 0; i < enemyCoords.length; i++) {
  //   Bads.push(new Enemy(enemyCoords[i][0], enemyCoords[i][1]));
  // }
  for (var i = 0; i < numEnemies; i++) {
    Bads.push(new Enemy(random(300, maxBoardLength), 350));
  }
};

var Setup = function() {
  theGround = new Ground(0, 350);
  theBrick = new Brick();

  createBads();

  SunTimer = 0;
};

var screen = 0;

var keyPressed = function() {
  if (keyCode === UP_ARROW) {
    theBrick.jump();
  }
  if (keyCode === 82) { // 'r'
    Setup();
  }
  if (keyCode === 77) { // 'm'
    screen = 0;
  }

  if (screen === 0) {
    if (keyCode >= 48 && keyCode <= 57) {
      numEnemies += String.fromCharCode(keyCode);
    }
  }
};

var youWin = function() {
  if (theBrick.score >= Bads.length && theBrick.dead === false) {
    background(0, 0, 0);
    fill(255, 0, 0);
    textSize(100);
    text("YOU WIN", 123, 158);
  }
};
var game = function() {
  background(37, 60, 161);
  fill(251, 255, 36);
  textSize(20);
  text("hit r to restart", 137, 84);
  ellipse(SunTimer, 100, 100, 100);
  SunTimer += 0.15;
  if (SunTimer >= 650) {
    theBrick.dead = true;
  }
  fill(0, 0, 0);
  text("Pos: " + theBrick.worldx, SunTimer - 39, 84);
  text("Score: " + theBrick.score, SunTimer - 38, 108);
  text("Time left: " + ceil((650 - SunTimer)), SunTimer - 38, 118);
  theGround.draw();
  theBrick.draw();
  theBrick.slide();
  theBrick.land();

  for (var i = 0; i < Bads.length; i++) {
    Bads[i].draw();
    Bads[i].ObjPos(theBrick);
    theBrick.kill(Bads[i]);
    Bads[i].win();
  }

  // TODO: remove shouldRemove enemies from Bads list
  var i = 0;

  // Bad(0.01, 1000,0);
  if (theBrick.dead) {
    background(0, 0, 0);
    fill(255, 0, 0);
    ellipse(200, 200, 200, 200);
    fill(3, 4, 8);
    textSize(37);
    text("you DIED", 118, 200);
    fill(255, 255, 255);
    text("hit r to restart", 300, 200);
    text("hit m to go back to menu", 154, 300);
    textSize(15);
    text("get used to it. try again", 122, 231);
    theBrick.y = 99999;
    theBrick.x = 99099;
  }

  youWin();
};


var menu = function() {
  background(0, 0, 0);
  fill(255, 0, 0);
  textSize(100);
  text("Doggo Jump", 25, 92);
  textSize(50);
  text("By: " + creator, 150, 152);
  text("Graphic Design by: " + artist, 59, 200);
  text("hit SHIFT to begin", 130, 331);
  text("use arrow keys to move", 50, 380);
  text("jump on the demons heads", 0, 530);
  text("hit r to restart game", 10, 430);
  text("hit m to go to menu", 10, 480);
  textSize(24);
  text("type the number of enemies you want, then hit enter", 10, 287);

  if (keyIsPressed && (keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105)) {
    println("Key: " + keyCode + " " + String.fromCharCo(keyCode));
    numEnemies += String.fromCharCode(keyCode);
  }

  if (keyCode === 8) {
    numEnemies = numEnemies.substring(0, numEnemies.length - 1);
  }
  if (keyCode === 10) {
    // println('DONE: ' + parseInt(numEnemies, 10));
  }
  textSize(50);
  text("num of enemys: " + numEnemies, 32, 260);

  dog(482, 352, 0.2);

  if (keyIsPressed && keyCode === SHIFT) {
    screen = 1;
  }
};

draw = function() {
  if (screen === 0) {
    menu();
    Setup();
  } else if (screen === 1) {
    game();
  }
};
