import { useEffect, useRef, useState } from "react";
import "./ThreeDCarousel.css"; // Tailwind handles utility classes, this holds custom keyframes

export default function ThreeDCarousel() {
  const dragRef = useRef(null);
  const spinRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!revealed) return;

    const odrag = dragRef.current;
    const ospin = spinRef.current;
    const aImg = ospin.getElementsByTagName("img");
    const aVid = ospin.getElementsByTagName("video");
    const aEle = [...aImg, ...aVid];

    // Configs
    let radius = 350; // balanced radius for full ring visibility
    const autoRotate = true;
    const rotateSpeed = -60;
    const imgWidth = 400; // bigger card width
    const imgHeight = 550; // bigger card height

    ospin.style.width = `${imgWidth}px`;
    ospin.style.height = `${imgHeight}px`;

    const ground = document.getElementById("ground");
    ground.style.width = `${radius * 3}px`;
    ground.style.height = `${radius * 3}px`;

    function init(delayTime) {
      for (let i = 0; i < aEle.length; i++) {
        aEle[i].style.transform = `rotateY(${i * (360 / aEle.length)}deg) translateZ(0)`;
        setTimeout(() => {
          aEle[i].style.transform = `rotateY(${i * (360 / aEle.length)}deg) translateZ(${radius}px)`;
        }, delayTime || 100);
        aEle[i].style.transition = "transform 1s";
        aEle[i].style.transitionDelay = delayTime || `${(aEle.length - i) / 4}s`;
      }
    }

    let sX, sY, desX = 0, desY = 0, tX = 0, tY = 10;

    function applyTransform() {
      if (tY > 80) tY = 80; // tighter tilt range looks more 3D
      if (tY < -10) tY = -10;
      // Tilt the camera (outer container) on X only
      odrag.style.transform = `rotateX(${-tY}deg)`;
      // Spin the ring itself on Y
      ospin.style.transform = `rotateY(${tX}deg)`;
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
        applyTransform();
        sX = nX;
        sY = nY;
      };

      const handlePointerUp = () => {
        odrag.timer = setInterval(() => {
          desX *= 0.95;
          desY *= 0.95;
          tX += desX * 0.1;
          tY += desY * 0.1;
          applyTransform();
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


    init(1000);

    return () => {
      odrag.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [revealed]);

  return (
    <>
      {!revealed && (
        <button
          onClick={() => {
            setRevealed(true);
            setTimeout(() => {
              if (spinRef.current) {
                const aImg = spinRef.current.getElementsByTagName("img");
                const aVid = spinRef.current.getElementsByTagName("video");
                const aEle = [...aImg, ...aVid];
                const radius = 650;
                for (let i = 0; i < aEle.length; i++) {
                  aEle[i].style.transform = `rotateY(${i * (360 / aEle.length)}deg) translateZ(0)`;
                  setTimeout(() => {
                    aEle[i].style.transform = `rotateY(${i * (360 / aEle.length)}deg) translateZ(${radius}px)`;
                  }, 100);
                  aEle[i].style.transition = "transform 1s";
                  aEle[i].style.transitionDelay = `${(aEle.length - i) / 4}s`;
                }
              }
            }, 100);
          }}
          className="mx-auto mt-10 block bg-white text-black font-semibold py-2 px-4 rounded hover:bg-gray-200 transition-all"
        >
          Reveal
        </button>
      )}
      {revealed && (
        <div
          id="drag-container"
          ref={dragRef}
          className="relative flex justify-center items-center mx-auto my-auto w-full max-w-[2200px] transform-style-3d perspective-[2500px] rotate-x-[-10deg] mb-20"
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
                className="absolute left-0 top-0 w-full h-full object-contain"
              />
            ))}
            {/* <p className="absolute text-white top-full left-1/2 transform -translate-x-1/2 rotate-x-90 font-serif">
              3D Lion Carousel
            </p> */}
          </div>
          <div
            id="ground"
            className="absolute top-full left-1/2 -translate-x-1/2 rotate-x-90 bg-[radial-gradient(circle,#9993,transparent)]"
          ></div>
        </div>
      )}
    </>
  );
}