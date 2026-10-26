"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function SteelFrameCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(13, 8, 16);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Group for the entire steel building model
    const steelModelGroup = new THREE.Group();
    scene.add(steelModelGroup);

    // Galvanized High-Tensile Steel Materials
    const steelMaterial = new THREE.MeshStandardMaterial({
      color: 0x8fa3b8,
      metalness: 0.9,
      roughness: 0.22,
      envMapIntensity: 1.2,
    });

    const steelAccentMaterial = new THREE.MeshStandardMaterial({
      color: 0x3b82f6, // Electric Blue Truecore steel accent
      metalness: 0.85,
      roughness: 0.3,
    });

    const plateMaterial = new THREE.MeshStandardMaterial({
      color: 0xa0b4c8,
      metalness: 0.92,
      roughness: 0.18,
    });

    // Helper: Add a steel beam/stud
    const addBeam = (
      w: number,
      h: number,
      d: number,
      x: number,
      y: number,
      z: number,
      rx = 0,
      ry = 0,
      rz = 0,
      mat = steelMaterial
    ) => {
      const geo = new THREE.BoxGeometry(w, h, d);
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, y, z);
      mesh.rotation.set(rx, ry, rz);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      steelModelGroup.add(mesh);
      return mesh;
    };

    // --- 1. Foundation Ground Tracks (Bottom Plates) ---
    const width = 8.5;
    const depth = 6.0;
    const wallH = 3.6;
    const beamT = 0.09; // thickness of steel studs
    const beamW = 0.16;

    // Perimeter bottom track
    addBeam(width, beamT, beamW, 0, 0, depth / 2);
    addBeam(width, beamT, beamW, 0, 0, -depth / 2);
    addBeam(beamW, beamT, depth, -width / 2, 0, 0);
    addBeam(beamW, beamT, depth, width / 2, 0, 0);
    // Interior dividing track
    addBeam(beamW, beamT, depth, 0.5, 0, 0);

    // --- 2. Ground Level Vertical Wall Studs (600mm / 450mm centers) ---
    const studSpacingX = 0.85;
    const numStudsX = Math.floor(width / studSpacingX);
    for (let i = 0; i <= numStudsX; i++) {
      const x = -width / 2 + i * studSpacingX;
      // Front wall studs (leave opening for front porch/door)
      if (Math.abs(x - 0.5) > 1.0) {
        addBeam(beamW, wallH, beamT, x, wallH / 2, depth / 2);
      }
      // Rear wall studs
      addBeam(beamW, wallH, beamT, x, wallH / 2, -depth / 2);
    }

    const studSpacingZ = 0.85;
    const numStudsZ = Math.floor(depth / studSpacingZ);
    for (let j = 1; j < numStudsZ; j++) {
      const z = -depth / 2 + j * studSpacingZ;
      // Left side wall studs
      addBeam(beamT, wallH, beamW, -width / 2, wallH / 2, z);
      // Right side wall studs (with large window framing opening)
      if (Math.abs(z) > 1.2) {
        addBeam(beamT, wallH, beamW, width / 2, wallH / 2, z);
      }
      // Interior wall studs
      addBeam(beamT, wallH, beamW, 0.5, wallH / 2, z);
    }

    // Door & Window Headers
    addBeam(2.2, 0.22, beamW, 0.5, 2.7, depth / 2, 0, 0, 0, steelAccentMaterial);
    addBeam(beamW, 0.22, 2.6, width / 2, 2.7, 0, 0, 0, 0, steelAccentMaterial);

    // Ground Diagonal Wind Bracing (K-brace / X-brace)
    const braceLen = Math.sqrt(Math.pow(1.8, 2) + Math.pow(wallH, 2));
    const braceAngle = Math.atan2(wallH, 1.8);
    addBeam(0.06, braceLen, 0.04, -width / 2 + 0.9, wallH / 2, depth / 2 + 0.02, 0, 0, braceAngle);
    addBeam(0.06, braceLen, 0.04, width / 2 - 0.9, wallH / 2, depth / 2 + 0.02, 0, 0, -braceAngle);

    // --- 3. Mid-Level Top Plate & Alpha Floor Joist System ---
    // Top plate of ground floor
    addBeam(width, beamT, beamW, 0, wallH, depth / 2);
    addBeam(width, beamT, beamW, 0, wallH, -depth / 2);
    addBeam(beamW, beamT, depth, -width / 2, wallH, 0);
    addBeam(beamW, beamT, depth, width / 2, wallH, 0);
    addBeam(beamW, beamT, depth, 0.5, wallH, 0);

    // Alpha Floor Engineered Joists across the floor
    const joistH = 0.32;
    const joistSpacing = 0.65;
    const joistsCount = Math.floor(width / joistSpacing);
    for (let k = 0; k <= joistsCount; k++) {
      const x = -width / 2 + k * joistSpacing;
      addBeam(0.06, joistH, depth, x, wallH + joistH / 2, 0, 0, 0, 0, plateMaterial);
      // Floor joist web stiffeners
      for (let s = -2; s <= 2; s++) {
        addBeam(0.06, joistH * 0.85, 0.06, x, wallH + joistH / 2, s * 1.0, 0, 0, 0, steelAccentMaterial);
      }
    }

    // --- 4. Upper Level Wall Frames ---
    const secondFloorY = wallH + joistH;
    const secondWallH = 2.8;

    // Second floor bottom plate
    addBeam(width, beamT, beamW, 0, secondFloorY, depth / 2);
    addBeam(width, beamT, beamW, 0, secondFloorY, -depth / 2);
    addBeam(beamW, beamT, depth, -width / 2, secondFloorY, 0);
    addBeam(beamW, beamT, depth, width / 2, secondFloorY, 0);

    // Second floor studs
    for (let i = 0; i <= numStudsX; i++) {
      const x = -width / 2 + i * studSpacingX;
      // Front window openings on level 2
      if (Math.abs(x + 2) > 0.8 && Math.abs(x - 2) > 0.8) {
        addBeam(beamW, secondWallH, beamT, x, secondFloorY + secondWallH / 2, depth / 2);
      }
      addBeam(beamW, secondWallH, beamT, x, secondFloorY + secondWallH / 2, -depth / 2);
    }

    for (let j = 1; j < numStudsZ; j++) {
      const z = -depth / 2 + j * studSpacingZ;
      addBeam(beamT, secondWallH, beamW, -width / 2, secondFloorY + secondWallH / 2, z);
      addBeam(beamT, secondWallH, beamW, width / 2, secondFloorY + secondWallH / 2, z);
    }

    // Second floor top plate (Ceiling tie)
    const roofBaseY = secondFloorY + secondWallH;
    addBeam(width, beamT, beamW, 0, roofBaseY, depth / 2);
    addBeam(width, beamT, beamW, 0, roofBaseY, -depth / 2);
    addBeam(beamW, beamT, depth, -width / 2, roofBaseY, 0);
    addBeam(beamW, beamT, depth, width / 2, roofBaseY, 0);

    // --- 5. Engineered Roof Trusses (Gable Profile) ---
    const roofApexH = 2.2;
    const trussSpacing = 1.0;
    const numTrusses = Math.floor(depth / trussSpacing);
    const halfW = width / 2;
    const rafterLen = Math.sqrt(Math.pow(halfW, 2) + Math.pow(roofApexH, 2));
    const pitchAngle = Math.atan2(roofApexH, halfW);

    for (let t = 0; t <= numTrusses; t++) {
      const z = -depth / 2 + t * trussSpacing;
      // Tie beam (Bottom chord)
      addBeam(width, 0.12, 0.08, 0, roofBaseY + 0.06, z);

      // Left Rafter (Top chord left)
      addBeam(
        rafterLen,
        0.14,
        0.08,
        -halfW / 2,
        roofBaseY + roofApexH / 2,
        z,
        0,
        0,
        pitchAngle
      );

      // Right Rafter (Top chord right)
      addBeam(
        rafterLen,
        0.14,
        0.08,
        halfW / 2,
        roofBaseY + roofApexH / 2,
        z,
        0,
        0,
        -pitchAngle
      );

      // King post (center vertical strut)
      addBeam(0.1, roofApexH, 0.08, 0, roofBaseY + roofApexH / 2, z, 0, 0, 0, steelAccentMaterial);

      // Web struts (diagonal internal bracing)
      const strutLen = Math.sqrt(Math.pow(halfW * 0.5, 2) + Math.pow(roofApexH * 0.5, 2));
      const strutAngle = Math.atan2(roofApexH * 0.5, halfW * 0.5);
      addBeam(strutLen, 0.08, 0.08, -halfW * 0.25, roofBaseY + roofApexH * 0.28, z, 0, 0, strutAngle);
      addBeam(strutLen, 0.08, 0.08, halfW * 0.25, roofBaseY + roofApexH * 0.28, z, 0, 0, -strutAngle);
    }

    // Ridge board at roof apex running horizontally
    addBeam(0.12, 0.16, depth + 0.4, 0, roofBaseY + roofApexH, 0, 0, 0, 0, plateMaterial);
    // Roof battens / purlins
    for (let p = 1; p <= 4; p++) {
      const frac = p / 5;
      const py = roofBaseY + roofApexH * frac;
      const pxLeft = -halfW * (1 - frac);
      const pxRight = halfW * (1 - frac);
      addBeam(0.06, 0.06, depth + 0.3, pxLeft, py, 0, 0, 0, pitchAngle);
      addBeam(0.06, 0.06, depth + 0.3, pxRight, py, 0, 0, 0, -pitchAngle);
    }

    // Center model at reasonable height
    steelModelGroup.position.set(0, -3.8, 0);

    // --- 6. Architectural Light Base & Shadows ---
    // Shadow receiving plane
    const planeGeo = new THREE.PlaneGeometry(35, 35);
    const planeMat = new THREE.ShadowMaterial({
      opacity: 0.14,
    });
    const shadowPlane = new THREE.Mesh(planeGeo, planeMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -3.85;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // Subtle architectural grid on the light ground
    const grid = new THREE.GridHelper(30, 30, 0x93c5fd, 0xe2e8f0);
    grid.position.y = -3.84;
    scene.add(grid);

    // --- 7. Lighting (Light theme architectural sunlight) ---
    // Soft skylight ambient
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    // Main Sunlight
    const sunLight = new THREE.DirectionalLight(0xffffff, 2.2);
    sunLight.position.set(15, 22, 18);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 60;
    sunLight.shadow.camera.left = -12;
    sunLight.shadow.camera.right = 12;
    sunLight.shadow.camera.top = 12;
    sunLight.shadow.camera.bottom = -12;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    // Cool fill light from opposite angle to bring out steel bevels
    const fillLight = new THREE.DirectionalLight(0x93c5fd, 1.1);
    fillLight.position.set(-14, 12, -10);
    scene.add(fillLight);

    // Sky / Ground bounce light
    const hemiLight = new THREE.HemisphereLight(0xf8fafc, 0xe2e8f0, 0.9);
    scene.add(hemiLight);

    // --- 8. Mouse Interaction & Animation Loop ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x * 0.5;
      mouseY = y * 0.3;
    };

    window.addEventListener("mousemove", onMouseMove);

    // Resize handler
    const onResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", onResize);

    // Animation loop
    let reqId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Gentle continuous architectural turntable sway
      steelModelGroup.rotation.y = 0.28 + Math.sin(elapsedTime * 0.35) * 0.18 + targetX * 0.6;
      steelModelGroup.rotation.x = 0.08 + targetY * 0.3;

      camera.lookAt(0, 0.4, 0);
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[480px] lg:min-h-[640px] relative pointer-events-auto cursor-grab active:cursor-grabbing"
    />
  );
}
