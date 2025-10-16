import { useEffect, useRef } from "react";
import "./ThreeDCarousel.css"; // Tailwind handles utility classes, this holds custom keyframes

export default function ThreeDCarousel() {
  const dragRef = useRef(null);
  const spinRef = useRef(null);

  useEffect(() => {
    const odrag = dragRef.current;
    const ospin = spinRef.current;
    const aImg = ospin.getElementsByTagName("img");
    const aVid = ospin.getElementsByTagName("video");
    const aEle = [...aImg, ...aVid];

    // Configs
    let radius = 240;
    const autoRotate = true;
    const rotateSpeed = -60;
    const imgWidth = 120;
    const imgHeight = 170;

    ospin.style.width = `${imgWidth}px`;
    ospin.style.height = `${imgHeight}px`;

    const ground = document.getElementById("ground");
    ground.style.width = `${radius * 3}px`;
    ground.style.height = `${radius * 3}px`;

    function init(delayTime) {
      for (let i = 0; i < aEle.length; i++) {
        aEle[i].style.transform = `rotateY(${i * (360 / aEle.length)}deg) translateZ(${radius}px)`;
        aEle[i].style.transition = "transform 1s";
        aEle[i].style.transitionDelay = delayTime || `${(aEle.length - i) / 4}s`;
      }
    }

    let sX, sY, desX = 0, desY = 0, tX = 0, tY = 10;

    function applyTransform(obj) {
      if (tY > 180) tY = 180;
      if (tY < 0) tY = 0;
      obj.style.transform = `rotateX(${-tY}deg) rotateY(${tX}deg)`;
    }

    function playSpin(yes) {
      ospin.style.animationPlayState = yes ? "running" : "paused";
    }

    if (autoRotate) {
      const animationName = rotateSpeed > 0 ? "spin" : "spinRevert";
      ospin.style.animation = `${animationName} ${Math.abs(rotateSpeed)}s infinite linear`;
    }

    function handlePointerDown(e) {
      clearInterval(odrag.timer);
      sX = e.clientX;
      sY = e.clientY;

      const handlePointerMove = (e) => {
        const nX = e.clientX;
        const nY = e.clientY;
        desX = nX - sX;
        desY = nY - sY;
        tX += desX * 0.1;
        tY += desY * 0.1;
        applyTransform(odrag);
        sX = nX;
        sY = nY;
      };

      const handlePointerUp = () => {
        odrag.timer = setInterval(() => {
          desX *= 0.95;
          desY *= 0.95;
          tX += desX * 0.1;
          tY += desY * 0.1;
          applyTransform(odrag);
          playSpin(false);
          if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
            clearInterval(odrag.timer);
            playSpin(true);
          }
        }, 17);
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", handlePointerUp);
      };

      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
    }

    odrag.addEventListener("pointerdown", handlePointerDown);

    function handleWheel(e) {
      const d = e.wheelDelta / 20 || -e.detail;
      radius += d;
      init(1);
    }
    window.addEventListener("mousewheel", handleWheel);
    window.addEventListener("DOMMouseScroll", handleWheel);

    init(1000);

    return () => {
      odrag.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("mousewheel", handleWheel);
      window.removeEventListener("DOMMouseScroll", handleWheel);
    };
  }, []);

  return (
    <div
      id="drag-container"
      ref={dragRef}
      className="relative flex mx-auto my-auto transform-style-3d perspective-[1000px] rotate-x-[-10deg]"
    >
      <div
        id="spin-container"
        ref={spinRef}
        className="relative flex mx-auto transform-style-3d"
      >
        {/* Replace these with your logo */}
        {[...Array(7)].map((_, i) => (
          <img
            key={i}
            src="/white_lion_logo_transparent.png"
            alt="lion"
            className="absolute left-0 top-0 w-full h-full shadow-[0_0_8px_#fff] hover:shadow-[0_0_15px_#fffd]"
          />
        ))}
        <p className="absolute text-white top-full left-1/2 transform -translate-x-1/2 rotate-x-90 font-serif">
          3D Lion Carousel
        </p>
      </div>
      <div
        id="ground"
        className="absolute top-full left-1/2 -translate-x-1/2 rotate-x-90 bg-[radial-gradient(circle,#9993,transparent)]"
      ></div>
    </div>
  );
}