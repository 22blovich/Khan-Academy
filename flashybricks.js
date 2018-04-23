// this is a brick-breaker style seizurious game
/*
    ___________                        --------------
    _______________                  ------------------
    ___         _____             --------         -------
    ___         ______            --------         ------- 
    ___         _____             --------         ------- 
    _______________              ---------         --------
    ___________                  ---------         --------
    ___________                  ---------         --------
    ___________                  ---------         -------- 
    _______________               --------         --------
    ___         ______            --------         -------
    ___         _______           --------         ------- 
    ___         ______            --------         -------
    _______________                  ------------------
    ___________                        --------------    
   
    {=====}  [=====]  (=====)   |=====|  /=\   \   <====>      
    {}       [     ]  (      )    |=|    / /=  \  <>   
    {}       [     ]  (      )    |=|    / /=\ \  <>  <==>
    {}       [     ]  (      )    |=|    /  =\ \  <>    <=>
    {=====}  [=====]  (=====)   |=====|  /   /=\   <=====>
*/

/*note: fix paddle warp*/
var score         = 0,
    screen        = 0,
    diff          = 0,
    High_score    = 0;
var paused        = false;
var paddle, ball, bricks;
var paddleLeft;
var paddleRight;
var thePaddles;
var ball;

var Teal = function() {
    fill(90, 240, 230);
};
var Random_color = function() {
    fill(random(0, 255), random(0, 255), random(0, 255));
    //fill(Teal);
};    
var flip = function() {
    rotate(180);
    translate(-height, -width);
};    

var dog = function(x,y,size) {
    pushMatrix();
        translate(x,y);
        scale(size);
        noStroke();
        //mouth
        fill(0, 0, 0);
        rect(124,477,200,200);
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
        vertex(28.2, -30.5);
        //vertex(75.2, -30.5);
        vertex(75.5, 86.8);
        vertex(75.7, 204);
        vertex(218.7, 204);
        vertex(361.7, 204);
        vertex(361.9, 86.8);
        //vertex(362.2, -30.5);
        vertex(409.2, -30.5);
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
        //ellipse(60,150,125,315);
        //ellipse(382,150,125,315);
        //ellipse(223,642,250,105);
        //rect(10, 150, 398,422);
        arc(82,485,200,250,90,270);
        arc(357,485,200,250, -90, 90);
        //stripes
        fill(100, 0, 255);
        triangle(-2,550,24,604,24,300);
        triangle(439,550,414,604,296,325);
        triangle(110,230,450,195,456,300);
        //inside ears
        fill(255, 0, 0);
        arc(360, 80, 100, 100, -59, 90);
        arc(75.1, 80, 100, 100, -272, -115);
        //big eye
        fill(100, 0, 255);
        ellipse(123,330,200,200);
        fill(0, 175, 255);
        ellipse(125,325,55,55);
        fill(0, 0, 0);
        ellipse(125,325,25,25);
        //small eye
        fill(100, 0, 255);
        ellipse(325,325,60,60);
        fill(0, 0, 0);
        ellipse(325,325,25,25);
        //nose
        fill(0, 0, 0);
        triangle(175,465,275,465,232,511);
        fill(79, 79, 79);
        ellipse(210,478,20,20);
        ellipse(245,478,20,20);
        //tounge
        fill(255, 0, 0);
        ellipse(234,646,75,200);
        //line to mouth
        stroke(0, 0, 0);
        line(232,511,232,675);
        noStroke();
        fill(0, 0, 0);
        ellipse(229,588,179,86);
    popMatrix();
};

var Ball = function(){
    this.x        = 300;
    this.y        = 300;
    this.falling  = true;
    this.right    = true;
    this.size     = 15;
    this.speed    = 3;
    this.x_speed  = random(1, this.speed);
    this.y_speed  = random(1, this.speed);
};
Ball.prototype.draw = function() {
    Teal();
    dog(this.x, this.y, 0.03);
    ellipse(this.x, this.y, this.size, this.size);
    Random_color();
    ellipse(this.x - this.x / 5, this.y - this.y / 5, this.size, this.size);
    ellipse(this.x - this.x / 5, this.y + this.y / 5, this.size, this.size);
    ellipse(this.x + this.x / 5, this.y + this.y / 5, this.size, this.size);
    ellipse(this.x + this.x / 5, this.y - this.x / 5, this.size, this.size);
    rect(this.x, this.y - this.y / 5, this.size / 2, this.size / 2);
    rect(this.x - this.x / 5, this.y, this.size / 2, this.size / 2);
    rect(this.x + this.x / 5, this.y, this.size / 2, this.size / 2);
    rect(this.x, this.y + this.x / 5, this.size / 2, this.size / 2);
};
Ball.prototype.move = function() {
    if (this.right){
        this.x += this.x_speed * 1.7;
    } else {
        this.x -= this.x_speed * 1.7;
    }
    if (this.falling){
        this.y += this.y_speed * 1.7;
    } else {
        this.y -= this.y_speed * 1.7;
    }
};

var Paddle = function(x, y) {
    this.x            = x;
    this.y            = y;
    this.length       = 175;
    this.height       = (this.length/21.6) + 3;
    this.speed  = 10;
    
};
Paddle.prototype.draw = function() {
    Teal();
    if (keyIsPressed && (keyCode === LEFT || key.toString() === "a")) {
        this.x -= this.speed;
    }
    if (keyIsPressed && (keyCode === RIGHT || key.toString() === "d")) {
        this.x += this.speed;
    }
    if(this.x >= this.length / 2 && this.x <= width - this.length / 2){
        ellipse(this.x, this.y, this.length, this.height);
        this.x = this.x;
    }
};
var Paddle_array = function(a,b) {
    this.twoarrays = [a,b];
};
Paddle_array.prototype.draw = function() {
    for (var i = 0; i < 2; i ++) {
        this.twoarrays[i].x = 300 + (i * width);
        this.twoarrays[i].draw();
        //Paddle_array.push(new Paddle(300 + (i * width), 550));
    }
};
Paddle_array.prototype.bounce = function() {
    for (var j = 0; j < 2; j ++) {
        if ((ball.x >= this.twoarrays[j].x - this.twoarrays[j].length / 2 && ball.x <= (this.twoarrays[j].x + this.twoarrays[j].length / 2)) && (ball.y >= this.twoarrays[j].y - this.twoarrays[j].height / 2 && ball.y <= (this.twoarrays[j].y + this.twoarrays[j].height / 2))) {
            ball.falling = false;
            ball.x_speed = random(1, ball.speed);
            ball.y_speed = random(1, ball.speed);
        }
    }
};    

var Brick = function(x, y){
    this.x        = x;
    this.y        = y;
    this.width    = width/this.num;
    this.height   = this.width/2;
    this.xend     = x + this.width;
    this.yend     = y + this.height;
    this.num      = 1;
    this.num_rows = 1;
    this.away     = -1000;
};
Brick.percent = [11, 5];

Brick.prototype.draw = function() {
    Random_color();
    var shakeX = this.x + random(-4, 4);
    var shakeY = this.y + random(-4, 4);
    rect(shakeX, shakeY, this.width, this.height);

};

var shrink = function() {
    if (score % 1 === 0 && score !== 0) {
        ball.size *= 101/100;
        if (diff > 1) {
            ball.speed *= 102 / 100;
        }
        if (diff === 3) {
                Paddle_array.twoarrays[0].length -= 0.1;
                Paddle_array.twoarrays[1].length -= 0.1;
        }
        if (Paddle_array.twoarrays[0].length <= 100 || ball.size >= 30 || ball.speed >= 8){
            Paddle_array.twoarrays[0].length = 100;
            ball.size     = 30;
            ball.speed    = 8;
        }
    }
};

Ball.prototype.checkForBrickHit = function(brick) {
    if (this.x >= brick.x && this.x <= brick.xend && this.y >= brick.y && this.y <= brick.yend) {
        score ++;
        this.falling = true;
        // bottom
        if (this.y >= (brick.yend - this.y_speed) && this.x >= brick.x && this.x <= brick.xend) {
            this.falling = true;   
        }
        // right
        if (this.x >= (brick.xend - this.x_speed) && this.y >= brick.y && this.y <= brick.yend) {
            this.right = true;   
        }
        // top
        if (this.y <= (brick.y + this.y_speed) && this.x >= brick.x && this.x <= brick.xend) {
            this.falling = false;   
        }
        // left
        if (this.x <= (brick.x + this.x_speed) && this.y >= brick.y && this.y <= brick.yend) {
            this.right = false;   
        }
        brick.x      = Brick.away;
        brick.xend   = Brick.away;
        ball.x_speed = random(1,3);
        ball.y_speed = random(1,3);
        shrink();
    }
};

var Button = function(text, bgcolor, textcolor, x, y, w, h) {
    this.text    = text;
    this.bgcolor = bgcolor;
    this.color   = textcolor;
    this.x       = x;
    this.y       = y || 325;
    this.w       = w || 200;
    this.h       = h || 200;
    
};
Button.prototype.draw = function() {
    strokeWeight(10);
    fill(this.bgcolor);
    rect(this.x, this.y, this.w, this.h);
    fill(this.textcolor);
    text(this.text, this.x + this.w / 20, this.y + this.h / 2);
    fill(this.bgcolor);
};
Button.prototype.isClicked = function(diff) {
    //return mouseX >= this.x && mouseX <= this.x + this.w && 
    //     mouseY >= this.y && mouseY <= this.y + this.h;
    return keyIsPressed && key.code === diff;  
};

var intro = function() {
    background(255, 255, 0);
    strokeWeight(10);
    fill(0, 0, 255);
//not going into the if statement
    textSize(70);
    text("SEIZURE BRICKS", 1, 150);
    textSize(40);
    text("By Boaz Lovich", 150, 200);
    textSize(20);
    text("hit enter to restart, and space to go back to here", 14, 3107);
    text("Use arrow keys or WASD", 75, 575);
    textSize(28);
    text("HIGHSCORE = " + High_score, 366, 572);
    var test = new Button("START TEST", color(0, 255, 255), color(0, 255, 0), 42, 223, 200, 75) ,
    easy     = new Button("START EASY", color(0, 0, 255), color(255, 0, 0), 0),
    medium   = new Button("START MED", color(255, 0, 0), color(0, 255, 0), 200),
    hard     = new Button("START HARD", color(0, 255, 0), color(0, 0, 255), 400);
              

    if (keyIsPressed) {
        setup();
        switch(key.code) {
        case 49: //easy, 1
            ball.speed       = 2;
            diff             = 1;
            Brick.num        = 6;
            Brick.num_rows   = 3; 
            Brick.x          += random(-3, 3);
            Brick.y          += random(-3, 3);
            Brick.percent[0] = 4;
            Brick.percent[1] = 3;
            break;
        case 50: // medium, 2
            ball.speed       = 3;      
            Brick.num        = 8;
            Brick.num_rows   = 5;
            diff             = 2;
            Brick.x          += random(-4, 4);
            Brick.y          += random(-4, 4);
            Brick.percent[0] = 4;
            Brick.percent[1] = 2;
            break;
        case 51: // hard, 3
            ball.speed       = 4;   
            Brick.num        = 10;
            Brick.num_rows   = 6;
            diff             = 3;
            Brick.x          += random(-5, 5);
            Brick.y          += random(-5, 5);
            Brick.percent[0] = 4;
            Brick.percent[1] = 1;
            break;
        case 48: // test, 0
            println(48);
            ball.speed       = 3;
            println(48);
            Brick.num        = 2;
            Brick.num_rows   = 1;
            diff             = 0;
            Brick.percent[0] = 4;
            Brick.percent[1] = 0;
            break;
        default:
            break;
        }

        // switch(key.code) {
        // case 48:
        // case 49:
        //case 50:
        //case 51:
            println('Line 378');
            Brick.num    = width / Brick.num;
            Brick.height = Brick.width / 2;
            setup();
            ball.x_speed = random(1, ball.speed);
            ball.y_speed = random(1, ball.speed);
            screen       = 1;
        //   break;
        //}
    }
    

    easy.draw();
    medium.draw();
    hard.draw();
    test.draw();
    fill(255, 0, 0);
    textSize(25);
    text("WARNING: this game has flashing colors & lights.", 7 ,30);
    text(" DO NOT PLAY if you are prone to seizures", 28, 71);
    textSize(30);
    text("hit key 1", 50, 475);
    fill(0, 255, 0);
    text("hit key 2", 235, 475);
    fill(0, 0, 255);
    text("hit key 3", 450, 475);
    fill(127, 52, 148);
    text("hit key 0", 50,287);
    dog(441,125,0.3);
};

var sideButton = function(messesge,x, y, w, h, funct, key) {
    rect(x, y, w, h);
    Random_color();
    textSize(25);
    text(messesge, x + w / 10, y + h / 2);
    if (keyPressed && key.code === key) {
        funct();
    }
};

var restart = function() {
    setup();
    screen = 1;
};

var is_beat = function() {
    for (var i = 0; i < bricks.length; i ++) {
        if (bricks[i].x !== Brick.away) {
            return false;
        }
    }
    return true;
};

var setup = function() {
    paused                           = false;
    paddleLeft                       = new Paddle(300,550);
    paddleRight                      = new Paddle(900,550);
    thePaddles                       = new Paddle_array(paddleLeft, paddleRight);
    //Paddle_array.twoarrays[0] = new Paddle();
    //Paddle_array.twoarrays[1] = new Paddle();
    //DECLARE MULTIPLE PADDLES HERE
    ball                             = new Ball();
    bricks                           = [];
    score                            = 0;
    ball.size                        = 15;
    Paddle_array.twoarrays[0].length = 175;
    for (var row = 0; row < Brick.num_rows; row ++) {
        for (var b = 0; b < width / Brick.width; b ++) {
            if (random(0, Brick.percent[0]) > Brick.percent[1]) {
                bricks.push(new Brick(b * Brick.width, row * Brick.height));}
        }
    }
    if(diff === 1) {
        ball.speed = 2;
    }
    if(diff > 1) {
        ball.speed = 3;
    }
    if(diff > 2) {
        ball.speed = 4;
    }
};

var goHome = function() {
    screen = 0;  
};

var lose = function() {
    Random_color();
    filter(GRAY);
    ellipse(300, 300, 300, 300);
    textSize(41);
    Random_color();
    text("YOU LOST", 200, 225);
    text("TRY AGAIN", 200, 325);
    textSize(25);
    text("your score = " + score, 224, 253);
    sideButton("Try Again", 230, 335, 150, 100, restart, 32);
};

var win_stuff = function() {
    Random_color();
    ellipse(300, 300, 300, 300);
    filter(INVERT);
    Random_color();
    textSize(100);
    text("YOU WIN", 94, 327);
    textSize(25);
    text("your score = " + score, 217, 210);
    textSize(45);
    sideButton("Try Again", 200, 350, 200, 100, restart, 10);
    Random_color();
};

var game = function() {
    background(0, 0, 0);
    thePaddles.draw();
    thePaddles.bounce();
    noStroke();
    ball.draw();
    textSize(20);
    text("score = " + score, 0, 575);
    text("speed = " + ball.speed, 0, 595);
    fill(0, 0, 0);
    rect(118, 575, 200, 25);
    fill(Random_color);
    if(diff === 1) {
        text("Difficulty is Easy", 410, 585); 
    }
    if(diff === 2) {
        text("Difficulty is Medium", 400, 585);
    }
    if(diff === 3) {
        text("Difficulty is Hard", 410, 585);
    }
    for(var i = 0; i < bricks.length; i ++) {
        bricks[i].draw();
        ball.checkForBrickHit(bricks[i]);
    }
    if(ball.x < 5){           // hits left wall
        //ball.right = true;
        ball.x = 595;
    }
    if(ball.x > 595) {        // hits right wall
        //ball.right = false;
        ball.x = 5;
    }
    if(ball.y < 5){           // hits top
        ball.falling = true;
    }
    ball.move();
    if (is_beat()) {
        win_stuff();
        if (keyIsPressed && key.code === 10) {
            setup();
        }
        if (keyIsPressed && key.code === 32) {
            goHome();
        }
        if (score > High_score){
            High_score = score;
        }    
    } else if (ball.y >= 577) {
        lose();
        if (keyIsPressed && key.code === 10) {
            setup();
        }
        if (keyIsPressed && key.code === 32) {
            goHome();
        } 
        if (score > High_score){
            High_score = score;
        }    
    }
    if (keyIsPressed && key.code === 10) {
        setup();
    }
    if (keyIsPressed && key.code === 32) {
        goHome();
    }
    text("HIGHSCORE = " + High_score, 162, 587);
};

keyTyped = function() {
    if (screen !== 1) { return; }
    
    if (key.toString() === "p") {
        paused = !paused;
    }
    
    switch(key.code) {
    case 10:
        setup();
        break;
    case 32:
        screen = 0;
        break;
    }
};

draw = function() {
    textFont(createFont("comic sans ms"));
    if (screen === 0) {
        intro();
    } else if (screen === 1 && !paused){
        println(screen);
        game();
    }
    //flip();
}; 
