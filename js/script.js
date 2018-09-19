// this entire script controls that awesome background
// MAYBE TURN OFF TEXT WRAP OR THINGS WILL LOOK QUITE MESSY

var WIDTH = window.innerWidth, HEIGHT = window.innerHeight; // WIDTH and HEIGHT are constants that hold the viewport dimensions
var canvas, c; // these two variables are used to store the reference to our canvas element in the HTML and the 2D plane we'll be drawing to
var ball, balls, maxRadius = 100; /* variables for our ball objects and their global maximum radius which is 100 pixels */

function main() { // this main function is called once when the site first loads
    canvas = document.getElementById("canvas"); // ID reference to our canvas element is stored
    c = canvas.getContext("2d"); // this line sets up our 2D drawing space
    canvas.width = WIDTH;
    canvas.height = HEIGHT; // setting our canvas element to the viewport width and height again - I think we've already technically done this in the CSS too
    
    init(); // when this function is called our first objects are created
    
    var loop = function() { // this function will be called up to 60 times each second, allowing for our updating and rendering to keep reoccuring
        update();
        render();
        window.requestAnimationFrame(loop, canvas);
    }
    window.requestAnimationFrame(loop, canvas); // this function by this developer guy repeats the loop function
}

balls = { // this literal object will contain all of our balls
    list: [], // actually this array will which is inside the 'balls' object
    create: function(num) {
        for (var i = 0; i < num; i++) // this function will repeat for the parameter given - in this case how many balls that need to be made
            new ball(Math.random() * WIDTH, Math.random() * HEIGHT, Math.random() * maxRadius);
    },
    update: function() {for (var i = 0; i < this.list.length; i++) this.list[i].update();},
    render: function() {for (var i = 0; i < this.list.length; i++) this.list[i].render();} // these two functions will call the update and render function in every object in the 'list' array
}

ball = function(x, y, radius) { // this is the constructor for a single ball object - in JS they're written like regular functions
    balls.list.push(this); // before doing anything this new ball is added or 'pushed' to the 'balls' object's array called 'list'
    this.index = balls.list.length - 1; // our current index would be the length of the array minus one, because the first item in the array would have index zero
    this.x = x;
    this.y = y;
    this.radius = radius; // storing parameter values into this specific instance
    this.velY = Math.random() * 2 + 1; // generating a random constant fall speed for the ball
    this.alpha = Math.random(); // also a random level of transparency to create a cool depth effect
    this.update = function() { // everything in this function happens 60 times a second, so this is where all of our checks are to see if the ball has reached the bottom of the screen or not
        this.y += this.velY; // adding our velocity value for the y direction each frame
        if (this.y > HEIGHT + this.radius) { // if the ball leaves the screen, it will teleport to the top of the screen with new characteristics
            this.radius = Math.random() * maxRadius;
            this.x = Math.random() * WIDTH;
            this.y = -this.radius;
            this.alpha = Math.random() - 0.2;
        }
    };
    this.render = function() { // this is where all the drawing occurs based on our variables, such as the x, y and radius
        c.beginPath(); // all lines that refer to rendering must access functions inside our 2D plane object, hence why we type 'c.' before everything
        c.globalAlpha = this.alpha; // drawing will occur at the balls alpha value
        c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI); // this function draws a circle at a specificied, x, y, radius, and angle - we give it an angle of 2 * Pi to make a full circle
        c.fillStyle = "crimson"; // setting a color, crimson is a nice preset color
        c.fill(); // this function fills our circle
        c.globalAlpha = 1; // it is good edicate to reset the drawing alpha to one incase there are other objects that need to be drawn completely opaque
        c.closePath();
    };
}

function init() { // this function only occurs once
    balls.create(20); // let's create some balls...
}

function update() {
    balls.update(); // let's upate dose balls...
}

function render() {
    c.clearRect(0, 0, WIDTH, HEIGHT); // the screen needs to be refreshed each frame, we don't wanna see what we saw in the previous frame, so we clear it and then draw
    balls.render(); // let's see dose balls...
}