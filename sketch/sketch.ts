interface Particle {
  position: Position;
  velocity: Velocity;
  colour: string;
  size: number;
}
interface Position {
  x: number;
  y: number;
}
interface Velocity {
  x: number;
  y: number;
}
// This stores our array of particle objects
let particles: Particle[] = [];


const palette = [
  "#aaff00",
  "#ffaa00",
  "#ff00aa",
  "#aa00ff",
  "#00aaff"
];

// Called once at the start
function setup() {
  createCanvas(windowWidth, windowHeight);
  createParticles(); //create them ONCE (storing in the global array)
}

// Called 60 times per second
function draw() {
  background("#303030");
  moveAllParticles();
  drawAllParticles();
  drawConnectionsBetweenNearbyParticles();
  drawConnectionsToParticlesNearMouse();
}

function createParticles() {
  const numOfParticlesToCreate = 100;
  for (let i = 0; i < numOfParticlesToCreate; i++) {
    const particle: Particle = {
      position: randomScreenPosition(),
      velocity: randomVelocity(),
      size: random(2, 10),
      colour: "white" //random(palette)
    }
    particles.push(particle);
  }
}

function drawAllParticles() {
  for (const particle of particles) {
    drawOneParticle(particle);
  }
}

function drawOneParticle(particle: Particle) {
  fill(particle.colour);
  noStroke();
  circle(particle.position.x, particle.position.y, particle.size);
}

function moveAllParticles() {
  for (const particle of particles) {
    moveOneParticle(particle);
  }
}

function moveOneParticle(particle: Particle) {
  particle.position.x += particle.velocity.x;
  particle.position.y += particle.velocity.y;
  wrapParticleIfNecessary(particle);
}


function wrapParticleIfNecessary(particle: Particle) {
  const { x, y } = particle.position;
  if (x < 0 && particle.velocity.x < 0) {
    particle.position.x = width + 50;
  }
  if (x > width && particle.velocity.x > 0) {
    particle.position.x = - 50;
  }
  if (y < 0 && particle.velocity.y < 0) {
    particle.position.y = height + 50;
  }
  if (y < 0 && particle.velocity.y < 0) {
    particle.position.y = height + 50;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function randomScreenPosition() {
  return {
    x: random(0, width),
    y: random(0, height)
  };
}

function randomVelocity() {
  return {
    x: random(-2, 2),
    y: random(-2, 2),
  }
}

function drawConnectionsBetweenNearbyParticles() {
  stroke('white');
  //TODO: YOU need to implement this function!
}

function drawConnectionsToParticlesNearMouse() {
  stroke('red');
  //Draw lines from every nearby particle to the mouse pointer.
  //The mouse pointer is provided as the globals mouseX and mouseY


  //TODO: YOU need to implement this function!
}
