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
  //drawConnectionsBetweenNearbyParticlesSIMPLER();
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

function drawConnectionsBetweenNearbyParticlesSIMPLER() {
  for(let p of particles){
    for (let q of particles) {
      if (p === q){
        continue; //don't try to draw a line between a particle and itself
      }
      if (areNearby(p.position, q.position)) {
        drawLineBetween(p.position, q.position, "white");
      }
    }
  }
}


function drawConnectionsBetweenNearbyParticles() {
  //Performance note: 
  //To avoid wastefully comparing and connecting particle pairs multiple times (e.g. a<->b, b<->a)
  //we'll not use for...of loops but two indices i and j
  //j will only index particles LATER in the array than i, 
  //so particles a, b will be selected for comparison (for example) but NEVER b, a.

  for (let i = 0; i < particles.length - 1; i++) {
    for (let j = i + 1; j < particles.length; j++) {

      const p = particles[i];
      const q = particles[j];

      if (areNearby(p.position, q.position)) {
        drawLineBetween(p.position, q.position, "white");
      }
    }
  }
}
function drawConnectionsToParticlesNearMouse() {
  //Draw lines from every nearby particle to the mouse pointer.
  //The mouse pointer is provided as the globals mouseX and mouseY
  const mousePosition = { x: mouseX, y: mouseY };
  for (let p of particles) {
    if (areNearby(p.position, mousePosition)) {
      drawLineBetween(p.position, mousePosition, "red");
    }
  }
}

function drawLineBetween(a: Position, b: Position, colourName: string): void {
  stroke(colourName)
  line(a.x, a.y, b.x, b.y);
}

function areNearby(a: Position, b: Position): boolean {
  const distance = dist(a.x, a.y, b.x, b.y);
  return distance < 100;
}