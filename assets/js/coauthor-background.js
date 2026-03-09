document.addEventListener("DOMContentLoaded", function () {
  console.log("coauthor background script running:", window.location.pathname);

  if (!window.location.pathname.includes("coauthor")) return;

  const container = document.createElement("div");
  container.id = "coauthor-background";
  document.body.appendChild(container);

  const style = document.createElement("style");
  style.innerHTML = `
    #coauthor-background{
      position: fixed;
      inset: 0;
      overflow: hidden;
      z-index: 1;
      pointer-events: none;
    }

    .coauthor-ball{
      position: absolute;
      border-radius: 50%;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      opacity: 0.35;
      pointer-events: none;
      box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    }

    .initial-content,
    #main,
    .page,
    .archive,
    .page__inner-wrap,
    .page__content,
    .sidebar,
    .masthead,
    .page__footer {
      position: relative;
      z-index: 2;
    }
  `;
  document.head.appendChild(style);

  const images = [
    "/images/johnwinnicki.jpg",
    "/images/annalyubarskaja.jpg",
    "/images/rajatdwaraknath.jpg"
  ];

  const balls = images.map((src, i) => {
    const ball = document.createElement("div");
    ball.className = "coauthor-ball";

    const size = 80 + Math.random() * 40;
    ball.style.width = size + "px";
    ball.style.height = size + "px";
    ball.style.backgroundImage = `url("${src}")`;

    ball.x = 50 + i * 120;
    ball.y = 100 + i * 80;
    ball.vx = (Math.random() - 0.5) * 0.8 || 0.4;
    ball.vy = (Math.random() - 0.5) * 0.8 || 0.4;

    container.appendChild(ball);
    return ball;
  });

  function animate() {
    balls.forEach(ball => {
      const w = ball.offsetWidth;
      const h = ball.offsetHeight;

      ball.x += ball.vx;
      ball.y += ball.vy;

      if (ball.x <= 0 || ball.x >= window.innerWidth - w) ball.vx *= -1;
      if (ball.y <= 0 || ball.y >= window.innerHeight - h) ball.vy *= -1;

      ball.style.transform = `translate(${ball.x}px, ${ball.y}px)`;
    });

    requestAnimationFrame(animate);
  }

  animate();
});