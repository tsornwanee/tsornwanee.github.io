document.addEventListener("DOMContentLoaded", function () {

  /* Only run on the coauthor page */
 if (!window.location.pathname.includes("coauthor")) return;

  /* Create background container */
  const container = document.createElement("div");
  container.id = "coauthor-background";
  document.body.prepend(container);

  /* Inject CSS */
  const style = document.createElement("style");
  style.innerHTML = `
  #coauthor-background{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    overflow:hidden;
    z-index:0;
  }

  .coauthor-ball{
    position:absolute;
    border-radius:50%;
    background-size:cover;
    background-position:center;
    opacity:0.25;
    pointer-events:none;
  }

  main, .wrapper, .page__content{
    position:relative;
    z-index:2;
  }
  `;
  document.head.appendChild(style);

  const images = [
    "/images/johnwinnicki.jpg",
    "/images/annalyubarskaja.jpg",
    "/images/rajatdwaraknath.jpg"
  ];

  const balls = images.map(src => {

    const ball = document.createElement("div");
    ball.className = "coauthor-ball";

    const size = 60 + Math.random()*40;

    ball.style.width = size + "px";
    ball.style.height = size + "px";

    ball.style.backgroundImage = `url(${src})`;

    ball.x = Math.random()*window.innerWidth;
    ball.y = Math.random()*window.innerHeight;

    ball.vx = (Math.random()-0.5)*0.7;
    ball.vy = (Math.random()-0.5)*0.7;

    container.appendChild(ball);

    return ball;

  });

  function animate(){

    balls.forEach(ball => {

      ball.x += ball.vx;
      ball.y += ball.vy;

      const rect = ball.getBoundingClientRect();

      if(ball.x < 0 || ball.x > window.innerWidth - rect.width) ball.vx *= -1;
      if(ball.y < 0 || ball.y > window.innerHeight - rect.height) ball.vy *= -1;

      ball.style.transform = `translate(${ball.x}px, ${ball.y}px)`;

    });

    requestAnimationFrame(animate);

  }

  animate();

});