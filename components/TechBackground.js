import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styles from './TechBackground.module.css';

export default function TechBackground() {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xFFFFFF); // Fundo Branco
        scene.fog = new THREE.FogExp2(0xFFFFFF, 0.001); // Fog suave

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 100;

        const renderer = new THREE.WebGLRenderer({ alpha: false, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        containerRef.current.appendChild(renderer.domElement);

        // Particles
        const geometry = new THREE.BufferGeometry();
        const particlesCount = 400; // Um pouco mais de partículas para o efeito rainbow
        const posArray = new Float32Array(particlesCount * 3);
        const colorsArray = new Float32Array(particlesCount * 3);

        const color = new THREE.Color();

        for (let i = 0; i < particlesCount; i++) {
            // Posições
            posArray[i * 3] = (Math.random() - 0.5) * 600;
            posArray[i * 3 + 1] = (Math.random() - 0.5) * 600;
            posArray[i * 3 + 2] = (Math.random() - 0.5) * 600;

            // Cores Rainbow (HSL)
            // Distribui o Hue ao longo das partículas para criar um arco-íris
            const hue = i / particlesCount;
            color.setHSL(hue, 0.8, 0.6); // Saturação e Lightness ajustados para pastel/vibrante

            colorsArray[i * 3] = color.r;
            colorsArray[i * 3 + 1] = color.g;
            colorsArray[i * 3 + 2] = color.b;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

        const material = new THREE.PointsMaterial({
            size: 3,
            vertexColors: true, // Habilita cores por vértice (Rainbow)
            transparent: true,
            opacity: 0.8,
            map: new THREE.TextureLoader().load('/particle.png'), // Opcional, se não tiver textura usa quadrado
            blending: THREE.NormalBlending,
            depthWrite: false
        });

        // Fallback se não tiver textura: cria um círculo via canvas
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const context = canvas.getContext('2d');
        context.beginPath();
        context.arc(16, 16, 16, 0, 2 * Math.PI);
        context.fillStyle = 'white';
        context.fill();
        const texture = new THREE.CanvasTexture(canvas);
        material.map = texture;


        const particlesMesh = new THREE.Points(geometry, material);
        scene.add(particlesMesh);

        // Mouse interaction
        let mouseX = 0;
        let mouseY = 0;

        // Smooth trailing variables
        let targetRotationX = 0;
        let targetRotationY = 0;

        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;

        const onDocumentMouseMove = (event) => {
            mouseX = (event.clientX - windowHalfX);
            mouseY = (event.clientY - windowHalfY);
        };

        document.addEventListener('mousemove', onDocumentMouseMove);

        const animate = () => {
            requestAnimationFrame(animate);

            // Slow Follow Effect
            // O alvo de rotação é baseado na posição do mouse
            targetRotationY = mouseX * 0.0005;
            targetRotationX = mouseY * 0.0005;

            // Movimento constante suave
            particlesMesh.rotation.y += 0.0005;

            // Lerp para seguir o mouse lentamente (0.02 é o fator de "slowness")
            particlesMesh.rotation.y += 0.02 * (targetRotationY - particlesMesh.rotation.y);
            particlesMesh.rotation.x += 0.02 * (targetRotationX - particlesMesh.rotation.x);

            renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('mousemove', onDocumentMouseMove);
            if (containerRef.current) {
                containerRef.current.removeChild(renderer.domElement);
            }
            geometry.dispose();
            material.dispose();
        };
    }, []);

    return <div ref={containerRef} className={styles.background} />;
}
