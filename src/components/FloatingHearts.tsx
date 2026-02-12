import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';

interface FloatingHeart { 
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
    rotation: number;
}

function FloatingHearts() {
    const [hearts, setHearts] = useState<FloatingHeart[]>([]); 

    useEffect(() => {
        const newHearts = Array.from({ length: 20 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 30 + 10,
            duration: Math.random() * 10 + 10,
            delay: Math.random() * 5,
            rotation: Math.random() * 360,
        }));
        setHearts(newHearts);
    }, []);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            pointerEvents: 'none',
            zIndex: 0,
            overflow: 'hidden'
        }}>
            {hearts.map((heart) => (
                <motion.div
                    key={heart.id}
                    style={{
                        position: 'absolute',
                        left: `${heart.x}%`,
                        top: 0,
                    }}
                    initial={{
                        y: '100vh',
                        rotate: heart.rotation,
                        opacity: 0,
                        scale: 0.8
                    }}
                    animate={{
                        y: '-10vh',
                        rotate: heart.rotation + 360,
                        opacity: [0, 0.6, 0],
                        scale: [0.8, 1.2, 0.8]
                    }}
                    transition={{
                        duration: heart.duration,
                        ease: "linear",
                        repeat: Infinity,
                        delay: heart.delay,
                    }}
                >
                    <Heart 
                        size={heart.size} 
                        color="#ff69b4" 
                        fill="#ff69b4"
                        style={{
                            filter: 'drop-shadow(0 0 5px rgba(255,105,180,0.5))'
                        }}
                    />
                </motion.div>
            ))}
        </div>
    );
}

export default FloatingHearts;