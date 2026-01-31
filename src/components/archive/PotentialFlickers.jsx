import React, { useEffect, useRef } from 'react';

export default function PotentialFlickers() {
    const canvasRef = useRef(null);
    const flickersRef = useRef([]);
    const mouseRef = useRef({ x: -1000, y: -1000 });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationId;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Initialize flickers
        const createFlicker = () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 1.5 + 0.5,
            opacity: Math.random() * 0.4 + 0.1,
            pulse: Math.random() * Math.PI * 2,
            speed: Math.random() * 0.02 + 0.01,
            drift: {
                x: (Math.random() - 0.5) * 0.3,
                y: (Math.random() - 0.5) * 0.3
            }
        });

        flickersRef.current = Array.from({ length: 45 }, createFlicker);

        const handleMouseMove = (e) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', handleMouseMove);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            flickersRef.current.forEach((flicker, i) => {
                flicker.pulse += flicker.speed;
                flicker.x += flicker.drift.x;
                flicker.y += flicker.drift.y;

                // Wrap around
                if (flicker.x < 0) flicker.x = canvas.width;
                if (flicker.x > canvas.width) flicker.x = 0;
                if (flicker.y < 0) flicker.y = canvas.height;
                if (flicker.y > canvas.height) flicker.y = 0;

                // Vanish when looked at directly (near mouse)
                const dx = flicker.x - mouseRef.current.x;
                const dy = flicker.y - mouseRef.current.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const proximityFade = Math.min(1, dist / 150);

                const pulseOpacity = (Math.sin(flicker.pulse) * 0.5 + 0.5) * flicker.opacity * proximityFade;

                if (pulseOpacity > 0.05) {
                    const gradient = ctx.createRadialGradient(
                        flicker.x, flicker.y, 0,
                        flicker.x, flicker.y, flicker.size * 3
                    );
                    gradient.addColorStop(0, `rgba(200, 220, 255, ${pulseOpacity})`);
                    gradient.addColorStop(0.5, `rgba(100, 180, 200, ${pulseOpacity * 0.3})`);
                    gradient.addColorStop(1, 'transparent');

                    ctx.beginPath();
                    ctx.arc(flicker.x, flicker.y, flicker.size * 3, 0, Math.PI * 2);
                    ctx.fillStyle = gradient;
                    ctx.fill();
                }
            });

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ opacity: 0.7 }}
        />
    );
}