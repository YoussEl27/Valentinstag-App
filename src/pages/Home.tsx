import { useState, useRef, useEffect } from 'react'; 
import confetti from "canvas-confetti";
import { Heart } from 'lucide-react';
import FloatingHearts from "../components/FloatingHearts";
import { motion } from 'framer-motion';
import '../App.css';



export default function Home() {
  const [accepted, setAccepted] = useState(false); 
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHoveringNo, setisHoveringNo] = useState(false);
  const [nobtnPosition, setNobtnPosition] = useState({x : 0, y : 0});

  const handleYesClick = () => {

    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#db2777", "#e11d48", "#fce7f3"],
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#db2777", "#e11d48", "#fce7f3"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }
    frame();

    setAccepted(true);
  }

  const noMoveBtn = () => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const btnWidth = 120; 
    const btnHeight = 60;

    const padding = 20;
    
    const maxX = containerRect.width - btnWidth - padding;
    const maxY = containerRect.height - btnHeight - padding;

    const newX = Math.max(padding, Math.random() * maxX);
    const newY = Math.max(padding, Math.random() * maxY);

    setNobtnPosition({ x: newX, y: newY });
    setisHoveringNo(true);
  }
  useEffect(() => {
    if (isHoveringNo) {
      const timer = setTimeout(() => {
        setisHoveringNo(false);
      }, 400);
      
      return () => clearTimeout(timer);
    }
  }, [isHoveringNo]);

  return (
    <>
      <div className='min-h-screen w-full relative overflow-hidden flex flex-col items-center justify-center p-4 transition-colors duration-1000 bg-gradient-to-br from-background via-pink-50 to-pink-100'>
        <FloatingHearts />
        <div className='relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[60vh]'
         ref={containerRef}>
          {!accepted ? (
            <motion.div
              key="QuetionCard"
              className='question-card'
              initial={{ scale: 0.9, opacity: 0 , y: 20}}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{opacity: 0, scale: 1.1, filter: "blur(10px"}}
              transition={{ duration: 0.5 }}
            >
            <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring", 
              stiffness: 260,  
              damping: 20, 
              delay: 0.2
            }}
            className="mb-8 inline-block"
            >
            <div className="heart-container">
                <Heart  
                        size={60}
                        color="#ff69b4" 
                        fill="#ff69b4"
                        style={{
                            filter: 'drop-shadow(0 0 5px rgba(255,105,180,0.5))'
                        }} />
            </div>
            </motion.div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-12 leading-tight drop-shadow-sm px-4">
                Willst du mein <br />
                <span className="text-primary relative inline-block">
                  Valentinstag-Date
                
                </span>
                <br /> sein?
              </h1>

               <div className="flex flex-col md:flex-row gap-6 items-center justify-center mt-8 relative min-h-[100px]">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleYesClick}
                  className="btn-yes"
                  >
                  <Heart color="#ff69b4" 
                        fill="#ff69b4"
                        style={{
                            filter: 'drop-shadow(0 0 5px rgba(255,105,180,0.5))'
                        }} />
                  Jaaaa!
                </motion.button>

                 <motion.button
                  animate={
                    isHoveringNo
                      ? {
                          position: "fixed",
                          left: nobtnPosition.x,
                          top: nobtnPosition.y,
                          transition: {
                            type: "spring",
                            stiffness: 500,
                            damping: 20,
                          },
                        }
                      : {}
                  }
                  onMouseEnter={noMoveBtn}
                  onTouchStart={noMoveBtn}
                  className="btn-no"
                >
                  <Heart color="#ff69b4" 
                        fill="#ff69b4"
                        style={{
                            filter: 'drop-shadow(0 0 5px rgba(255,105,180,0.5))'
                        }} />
                  Nein
                </motion.button>
              </div>
            </motion.div>
            ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="success-card"
            >
              <div className="..">

                <div className="image-container ">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    style={{
                            width: '100%',       
                            height: '100%',       
                            borderRadius: '1rem', 
                            objectFit: 'cover',        
                          }}
                  >
                    <source src="/Valentinstag-App/video_2026-02-12_17-19-10.mp4" type="video/mp4" /> {/* Path for GitHub Pages */}
                    {/*<source src="/video_2026-02-12_17-19-10.mp4" type="video/mp4" />/* Path for local development */}
                    Dein Browser unterstützt kein Video.
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6 leading-tight">
                  Yaaay! 💖
                </h2>
                <p className="text-xl md:text-2xl text-foreground/80 font-body leading-relaxed">
                  Du hast mich zum glücklichsten Menschen gemacht! Ich freue
                  mich so sehr auf uns.
                </p>

                <div className="mt-8 flex justify-center gap-2">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -10, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeInOut",
                      }}
                    >
                      <Heart
                        color="#ff69b4" 
                        fill="#ff69b4"
                        style={{
                            filter: 'drop-shadow(0 0 5px rgba(255,105,180,0.5))'
                        }} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
      </div>

      <div className="footer">
        Made with ❤️ for you
      </div>
    </div>
    </>
  );
}