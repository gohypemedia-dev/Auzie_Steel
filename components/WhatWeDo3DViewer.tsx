"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface WhatWeDo3DViewerProps {
  type: "custom-designs" | "fabrications" | "installations" | "our-promise";
  badgeLabel: string;
  step: string;
}

export default function WhatWeDo3DViewer({
  type,
  badgeLabel,
  step,
}: WhatWeDo3DViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let isVisible = true;

    // 1. Scene & Camera Setup tailored per model type
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      36,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );

    // Optimized camera viewpoint per house design
    if (type === "custom-designs") {
      camera.position.set(7.6, 4.8, 8.4);
    } else if (type === "fabrications") {
      camera.position.set(7.6, 4.8, 8.4);
    } else if (type === "installations") {
      camera.position.set(8.2, 5.4, 9.2);
    } else {
      camera.position.set(7.8, 4.8, 8.6);
    }

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 2. Realistic Studio Lighting (Balanced Contrast & Depth)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xe4edf5, 0x3e4a56, 0.8);
    scene.add(hemiLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
    sunLight.position.set(12, 18, 12);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    // Cool Silver Specular Edge Light
    const silverRimLight = new THREE.DirectionalLight(0xffffff, 1.2);
    silverRimLight.position.set(-10, 10, -8);
    scene.add(silverRimLight);

    const softFillLight = new THREE.DirectionalLight(0xb0c4d8, 0.6);
    softFillLight.position.set(2, -6, 10);
    scene.add(softFillLight);

    // 3. Texture Maps & Authentic Galvanized Silver Steel Materials
    const textureLoader = new THREE.TextureLoader();
    const steelTexture = textureLoader.load("/galvanized-steel-texture.jpg");
    steelTexture.wrapS = THREE.RepeatWrapping;
    steelTexture.wrapT = THREE.RepeatWrapping;
    steelTexture.repeat.set(2, 2);

    const concreteTexture = textureLoader.load("/concrete-slab-texture.jpg");
    concreteTexture.wrapS = THREE.RepeatWrapping;
    concreteTexture.wrapT = THREE.RepeatWrapping;
    concreteTexture.repeat.set(3, 3);

    const steelMaterial = new THREE.MeshStandardMaterial({
      map: steelTexture,
      color: 0x8da0b2, // Realistic galvanized zinc silver (matches reference image)
      metalness: 0.38,
      roughness: 0.28,
      envMapIntensity: 1.2,
    });

    const steelAccentMaterial = new THREE.MeshStandardMaterial({
      map: steelTexture,
      color: 0x7a8d9e, // Structural steel lintels and bracings
      metalness: 0.4,
      roughness: 0.3,
    });

    const plateMaterial = new THREE.MeshStandardMaterial({
      color: 0x647685, // Deeper plate steel
      metalness: 0.32,
      roughness: 0.36,
    });

    // Crisp Architectural Contour Lines so overlapping studs stand out distinctly
    const edgeMaterial = new THREE.LineBasicMaterial({
      color: 0x22303c,
      transparent: true,
      opacity: 0.35,
    });

    // 4. Main Steel Frame Model Group
    const steelModelGroup = new THREE.Group();
    scene.add(steelModelGroup);

    // Concrete foundation materials (Matching reference image #717b86)
    const concreteMaterial = new THREE.MeshStandardMaterial({
      map: concreteTexture,
      color: 0x828e98,
      roughness: 0.88,
      metalness: 0.02,
    });

    const concreteBaseMaterial = new THREE.MeshStandardMaterial({
      color: 0x58636d,
      roughness: 0.92,
      metalness: 0.02,
    });

    // Helper: Add an authentic steel stud / beam member with edge outlines
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
      mat: THREE.Material = steelMaterial
    ) => {
      const geo = new THREE.BoxGeometry(w, h, d);
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, y, z);
      mesh.rotation.set(rx, ry, rz);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      steelModelGroup.add(mesh);

      // Add architectural contour line
      if (mat === steelMaterial || mat === steelAccentMaterial) {
        const edges = new THREE.EdgesGeometry(geo);
        const line = new THREE.LineSegments(edges, edgeMaterial);
        mesh.add(line);
      }
      return mesh;
    };

    // Helper: Add angled strut between two 3D points
    const addStrut = (
      p1: THREE.Vector3,
      p2: THREE.Vector3,
      w = 0.06,
      d = 0.06,
      mat: THREE.Material = steelMaterial
    ) => {
      const distance = p1.distanceTo(p2);
      const geo = new THREE.BoxGeometry(w, distance, d);
      const mesh = new THREE.Mesh(geo, mat);
      const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
      mesh.position.copy(mid);

      const dir = new THREE.Vector3().subVectors(p2, p1).normalize();
      const up = new THREE.Vector3(0, 1, 0);
      mesh.quaternion.setFromUnitVectors(up, dir);

      mesh.castShadow = true;
      mesh.receiveShadow = true;
      steelModelGroup.add(mesh);

      const edges = new THREE.EdgesGeometry(geo);
      const line = new THREE.LineSegments(edges, edgeMaterial);
      mesh.add(line);

      return mesh;
    };

    // Helper: Add pre-punched service holes (disabled to avoid protruding black discs)
    const addServiceHole = () => null;

    // =========================================================================
    // DESIGN 1: "custom-designs" -> Modern Scandinavian / Barn Steep-Pitch A-Frame House
    // =========================================================================
    if (type === "custom-designs") {
      const bW = 4.8; // House Width
      const bD = 4.4; // House Depth
      const bH = 2.0; // Lower Wall Height
      const yBot = -1.5;
      const yWallTop = yBot + bH; // 0.5
      const apexH = 2.2; // Steep pitched cathedral roof
      const yRidge = yWallTop + apexH; // 2.7

      // 1. Concrete Foundation Slab
      addBeam(bW + 0.6, 0.28, bD + 0.6, 0, yBot - 0.14, 0, 0, 0, 0, concreteMaterial);
      addBeam(bW + 0.8, 0.14, bD + 0.8, 0, yBot - 0.35, 0, 0, 0, 0, concreteBaseMaterial);

      // Contact shadow plane
      const shadowGeo = new THREE.PlaneGeometry(8.5, 7.5);
      const shadowMat = new THREE.ShadowMaterial({ opacity: 0.22 });
      const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
      shadowPlane.rotation.x = -Math.PI / 2;
      shadowPlane.position.y = yBot - 0.43;
      shadowPlane.receiveShadow = true;
      scene.add(shadowPlane);

      // 2. Wall Bottom & Top Tracks (Double Top Plate)
      addBeam(bW, 0.06, 0.1, 0, yBot + 0.03, bD / 2, 0, 0, 0, steelMaterial);
      addBeam(bW, 0.06, 0.1, 0, yBot + 0.03, -bD / 2, 0, 0, 0, steelMaterial);
      addBeam(bW, 0.06, 0.1, 0, yWallTop - 0.03, bD / 2, 0, 0, 0, steelMaterial);
      addBeam(bW, 0.06, 0.1, 0, yWallTop + 0.03, bD / 2, 0, 0, 0, steelMaterial);
      addBeam(bW, 0.06, 0.1, 0, yWallTop - 0.03, -bD / 2, 0, 0, 0, steelMaterial);
      addBeam(bW, 0.06, 0.1, 0, yWallTop + 0.03, -bD / 2, 0, 0, 0, steelMaterial);

      // Side Wall Tracks
      addBeam(0.1, 0.06, bD, -bW / 2, yBot + 0.03, 0, 0, 0, 0, steelMaterial);
      addBeam(0.1, 0.06, bD, bW / 2, yBot + 0.03, 0, 0, 0, 0, steelMaterial);
      addBeam(0.1, 0.06, bD, -bW / 2, yWallTop - 0.03, 0, 0, 0, 0, steelMaterial);
      addBeam(0.1, 0.06, bD, -bW / 2, yWallTop + 0.03, 0, 0, 0, 0, steelMaterial);
      addBeam(0.1, 0.06, bD, bW / 2, yWallTop - 0.03, 0, 0, 0, 0, steelMaterial);
      addBeam(0.1, 0.06, bD, bW / 2, yWallTop + 0.03, 0, 0, 0, 0, steelMaterial);

      const studH = bH - 0.12;
      const studMidY = (yBot + yWallTop) / 2;

      // 3. FRONT WALL: Large Cathedral Arch / Double-Height Center Glass Framing
      [-2.2, -1.8, -1.4].forEach((x) => {
        addBeam(0.08, studH, 0.1, x, studMidY, bD / 2, 0, 0, 0, steelMaterial);
      });
      [1.4, 1.8, 2.2].forEach((x) => {
        addBeam(0.08, studH, 0.1, x, studMidY, bD / 2, 0, 0, 0, steelMaterial);
      });

      // Diagonal Wind Bracing
      addStrut(new THREE.Vector3(-2.2, yBot + 0.1, bD / 2 + 0.05), new THREE.Vector3(-1.0, yWallTop - 0.1, bD / 2 + 0.05), 0.06, 0.015, steelMaterial);
      addStrut(new THREE.Vector3(2.2, yBot + 0.1, bD / 2 + 0.05), new THREE.Vector3(1.0, yWallTop - 0.1, bD / 2 + 0.05), 0.06, 0.015, steelMaterial);

      // Center High Cathedral Entrance / Glass Frame (-1.0 to 1.0)
      addBeam(0.08, studH, 0.1, -1.0, studMidY, bD / 2, 0, 0, 0, steelMaterial);
      addBeam(0.08, studH, 0.1, 1.0, studMidY, bD / 2, 0, 0, 0, steelMaterial);
      // Entrance lintel
      addBeam(2.0, 0.16, 0.1, 0, yBot + 1.7, bD / 2, 0, 0, 0, steelAccentMaterial);
      // Center door post
      addBeam(0.08, 1.7, 0.1, 0, yBot + 0.85, bD / 2, 0, 0, 0, steelMaterial);

      // 4. SIDE WALLS (Left & Right)
      const sideStudZ = [-1.8, -1.2, -0.6, 0, 0.6, 1.2, 1.8];
      sideStudZ.forEach((z) => {
        addBeam(0.1, studH, 0.08, -bW / 2, studMidY, z, 0, 0, 0, steelMaterial);
        addBeam(0.1, studH, 0.08, bW / 2, studMidY, z, 0, 0, 0, steelMaterial);
      });
      addBeam(0.08, 0.06, bD - 0.2, -bW / 2, studMidY, 0, 0, 0, 0, plateMaterial);
      addBeam(0.08, 0.06, bD - 0.2, bW / 2, studMidY, 0, 0, 0, 0, plateMaterial);
      addStrut(new THREE.Vector3(-bW / 2 - 0.05, yBot + 0.1, -1.8), new THREE.Vector3(-bW / 2 - 0.05, yWallTop - 0.1, 0.6), 0.06, 0.015, steelMaterial);

      // 5. BACK WALL (Z = -bD/2)
      [-2.2, -1.5, -0.8, 0, 0.8, 1.5, 2.2].forEach((x) => {
        addBeam(0.08, studH, 0.1, x, studMidY, -bD / 2, 0, 0, 0, steelMaterial);
      });

      // 6. STEEP A-FRAME CATHEDRAL ROOF TRUSSES (Scandinavian Barn Silhouette)
      const trussZ = [-bD / 2, -bD / 4, 0, bD / 4, bD / 2];
      trussZ.forEach((tz, idx) => {
        const isEnd = idx === 0 || idx === trussZ.length - 1;

        // Bottom Tie Chord
        addBeam(bW, 0.08, 0.08, 0, yWallTop + 0.04, tz, 0, 0, 0, steelMaterial);

        // High Steep Rafters
        addStrut(new THREE.Vector3(-bW / 2, yWallTop + 0.08, tz), new THREE.Vector3(0, yRidge, tz), 0.09, 0.08, steelMaterial);
        addStrut(new THREE.Vector3(bW / 2, yWallTop + 0.08, tz), new THREE.Vector3(0, yRidge, tz), 0.09, 0.08, steelMaterial);

        // Center High King Post
        addBeam(0.08, apexH - 0.08, 0.08, 0, yWallTop + 0.08 + (apexH - 0.08) / 2, tz, 0, 0, 0, steelMaterial);

        // High Collar Tie (Cathedral ceiling cross beam)
        const collarY = yWallTop + apexH * 0.55;
        const collarW = bW * 0.48;
        addBeam(collarW, 0.08, 0.06, 0, collarY, tz, 0, 0, 0, steelAccentMaterial);

        // End Gable Infill Mullions on front & back
        if (isEnd) {
          [-1.5, -0.8, 0.8, 1.5].forEach((gx) => {
            const propH = apexH * (1 - Math.abs(gx) / (bW / 2));
            if (propH > 0.3) {
              addBeam(0.06, propH, 0.06, gx, yWallTop + 0.08 + propH / 2, tz, 0, 0, 0, steelMaterial);
            }
          });
        }
      });

      // Roof Ridge Beam & Purlins
      addBeam(0.09, 0.12, bD + 0.3, 0, yRidge + 0.05, 0, 0, 0, 0, steelMaterial);
      [-bW * 0.28, bW * 0.28].forEach((px) => {
        addBeam(0.06, 0.06, bD + 0.2, px, yWallTop + apexH * 0.45, 0, 0, 0, 0, plateMaterial);
      });
      [-bW * 0.14, bW * 0.14].forEach((px) => {
        addBeam(0.06, 0.06, bD + 0.2, px, yWallTop + apexH * 0.75, 0, 0, 0, 0, plateMaterial);
      });

      steelModelGroup.position.set(0, 0.05, 0);
    }

    // =========================================================================
    // DESIGN 2: "fabrications" -> Pitched-Roof Residential House Framing (Pure Silver Steel)
    // =========================================================================
    else if (type === "fabrications") {
      const hW = 5.2; // House Width
      const hD = 4.4; // House Depth
      const hWall = 2.4; // Wall Height
      const yBot = -1.5;
      const yWallTop = yBot + hWall; // 0.9
      const apexH = 1.6; // Roof pitch height above walls
      const yRidge = yWallTop + apexH; // 2.5

      // 1. Concrete Foundation Slab
      addBeam(hW + 0.6, 0.28, hD + 0.6, 0, yBot - 0.14, 0, 0, 0, 0, concreteMaterial);
      addBeam(hW + 0.8, 0.14, hD + 0.8, 0, yBot - 0.35, 0, 0, 0, 0, concreteBaseMaterial);

      // Contact shadow plane
      const shadowGeo = new THREE.PlaneGeometry(8.5, 7.5);
      const shadowMat = new THREE.ShadowMaterial({ opacity: 0.22 });
      const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
      shadowPlane.rotation.x = -Math.PI / 2;
      shadowPlane.position.y = yBot - 0.43;
      shadowPlane.receiveShadow = true;
      scene.add(shadowPlane);

      // 2. Wall Bottom & Top Tracks (Double Top Plate) - Pure Silver Steel
      addBeam(hW, 0.06, 0.1, 0, yBot + 0.03, hD / 2, 0, 0, 0, steelMaterial);
      addBeam(hW, 0.06, 0.1, 0, yBot + 0.03, -hD / 2, 0, 0, 0, steelMaterial);
      addBeam(hW, 0.06, 0.1, 0, yWallTop - 0.03, hD / 2, 0, 0, 0, steelMaterial);
      addBeam(hW, 0.06, 0.1, 0, yWallTop + 0.03, hD / 2, 0, 0, 0, steelMaterial);
      addBeam(hW, 0.06, 0.1, 0, yWallTop - 0.03, -hD / 2, 0, 0, 0, steelMaterial);
      addBeam(hW, 0.06, 0.1, 0, yWallTop + 0.03, -hD / 2, 0, 0, 0, steelMaterial);

      // Left & Right Wall Tracks
      addBeam(0.1, 0.06, hD, -hW / 2, yBot + 0.03, 0, 0, 0, 0, steelMaterial);
      addBeam(0.1, 0.06, hD, hW / 2, yBot + 0.03, 0, 0, 0, 0, steelMaterial);
      addBeam(0.1, 0.06, hD, -hW / 2, yWallTop - 0.03, 0, 0, 0, 0, steelMaterial);
      addBeam(0.1, 0.06, hD, -hW / 2, yWallTop + 0.03, 0, 0, 0, 0, steelMaterial);
      addBeam(0.1, 0.06, hD, hW / 2, yWallTop - 0.03, 0, 0, 0, 0, steelMaterial);
      addBeam(0.1, 0.06, hD, hW / 2, yWallTop + 0.03, 0, 0, 0, 0, steelMaterial);

      const studH = hWall - 0.12;
      const studMidY = (yBot + yWallTop) / 2;

      // 3. FRONT WALL: Entrance Doorway + Front Window + Studs
      [-2.4, -2.0, -1.6, -1.2, -0.8].forEach((x) => {
        addBeam(0.08, studH, 0.1, x, studMidY, hD / 2, 0, 0, 0, steelMaterial);
      });
      // Left Front Bracing Strap in pure silver
      addStrut(
        new THREE.Vector3(-2.4, yBot + 0.1, hD / 2 + 0.05),
        new THREE.Vector3(-0.8, yWallTop - 0.1, hD / 2 + 0.05),
        0.06,
        0.015,
        steelMaterial
      );

      // Center Door Opening (-0.6 to 0.7)
      addBeam(0.08, studH, 0.1, -0.6, studMidY, hD / 2, 0, 0, 0, steelMaterial);
      addBeam(0.08, studH, 0.1, 0.7, studMidY, hD / 2, 0, 0, 0, steelMaterial);
      const doorLintelY = yBot + 1.85;
      addBeam(1.3, 0.16, 0.1, 0.05, doorLintelY, hD / 2, 0, 0, 0, steelAccentMaterial);
      [-0.2, 0.3].forEach((cx) => {
        addBeam(0.08, yWallTop - doorLintelY - 0.1, 0.1, cx, (doorLintelY + yWallTop) / 2, hD / 2, 0, 0, 0, steelMaterial);
      });

      // Right Front Window (1.2 to 2.2)
      addBeam(0.08, studH, 0.1, 1.2, studMidY, hD / 2, 0, 0, 0, steelMaterial);
      addBeam(0.08, studH, 0.1, 2.2, studMidY, hD / 2, 0, 0, 0, steelMaterial);
      addBeam(0.08, studH, 0.1, 2.5, studMidY, hD / 2, 0, 0, 0, steelMaterial);
      addBeam(1.0, 0.08, 0.1, 1.7, yBot + 0.75, hD / 2, 0, 0, 0, steelMaterial);
      addBeam(1.0, 0.16, 0.1, 1.7, doorLintelY, hD / 2, 0, 0, 0, steelAccentMaterial);
      addBeam(0.08, 0.65, 0.1, 1.7, yBot + 0.35, hD / 2, 0, 0, 0, steelMaterial);
      addBeam(0.08, yWallTop - doorLintelY - 0.1, 0.1, 1.7, (doorLintelY + yWallTop) / 2, hD / 2, 0, 0, 0, steelMaterial);

      // 4. LEFT WALL (X = -hW/2)
      const sideStudZ = [-2.0, -1.4, -0.8, -0.2, 0.4, 1.0, 1.6, 2.0];
      sideStudZ.forEach((z) => {
        addBeam(0.1, studH, 0.08, -hW / 2, studMidY, z, 0, 0, 0, steelMaterial);
      });
      addBeam(0.08, 0.06, hD - 0.2, -hW / 2, studMidY, 0, 0, 0, 0, plateMaterial);
      addStrut(
        new THREE.Vector3(-hW / 2 - 0.05, yBot + 0.1, -1.8),
        new THREE.Vector3(-hW / 2 - 0.05, yWallTop - 0.1, -0.2),
        0.06,
        0.015,
        steelMaterial
      );
      addStrut(
        new THREE.Vector3(-hW / 2 - 0.05, yBot + 0.1, 0.4),
        new THREE.Vector3(-hW / 2 - 0.05, yWallTop - 0.1, 1.8),
        0.06,
        0.015,
        steelMaterial
      );

      // 5. RIGHT WALL (X = hW/2)
      sideStudZ.forEach((z) => {
        addBeam(0.1, studH, 0.08, hW / 2, studMidY, z, 0, 0, 0, steelMaterial);
      });
      addBeam(0.08, 0.06, hD - 0.2, hW / 2, studMidY, 0, 0, 0, 0, plateMaterial);
      addStrut(
        new THREE.Vector3(hW / 2 + 0.05, yBot + 0.1, -1.2),
        new THREE.Vector3(hW / 2 + 0.05, yWallTop - 0.1, 0.6),
        0.06,
        0.015,
        steelMaterial
      );

      // 6. BACK WALL (Z = -hD/2)
      [-2.4, -1.8, -1.2, -0.6, 0.0, 0.6, 1.2, 1.8, 2.4].forEach((x) => {
        addBeam(0.08, studH, 0.1, x, studMidY, -hD / 2, 0, 0, 0, steelMaterial);
      });
      addBeam(1.4, 0.16, 0.1, 0.0, yBot + 1.8, -hD / 2, 0, 0, 0, steelAccentMaterial);

      // 7. INTERIOR PARTITION WALL (Room layout depth)
      [-1.8, -1.2, -0.6, 0.0, 0.6].forEach((z) => {
        addBeam(0.08, studH, 0.08, 0.2, studMidY, z, 0, 0, 0, steelMaterial);
      });
      addBeam(0.08, 0.06, 2.6, 0.2, yBot + 0.03, -0.6, 0, 0, 0, steelMaterial);
      addBeam(0.08, 0.06, 2.6, 0.2, yWallTop - 0.03, -0.6, 0, 0, 0, steelMaterial);

      // 8. PITCHED GABLE ROOF TRUSSES (House Shape Gable Roof Silhouette)
      const trussZPositions = [-hD / 2, -hD / 6, hD / 6, hD / 2];
      trussZPositions.forEach((tz, idx) => {
        const isEndGable = idx === 0 || idx === trussZPositions.length - 1;

        // Bottom Tie Chord (Ceiling Joist)
        addBeam(hW, 0.08, 0.08, 0, yWallTop + 0.04, tz, 0, 0, 0, steelMaterial);

        // Angled Pitched Rafters (/ and \)
        addStrut(
          new THREE.Vector3(-hW / 2, yWallTop + 0.08, tz),
          new THREE.Vector3(0, yRidge, tz),
          0.08,
          0.08,
          steelMaterial
        );
        addStrut(
          new THREE.Vector3(hW / 2, yWallTop + 0.08, tz),
          new THREE.Vector3(0, yRidge, tz),
          0.08,
          0.08,
          steelMaterial
        );

        // Center King Post Strut
        addBeam(0.08, apexH - 0.08, 0.08, 0, yWallTop + 0.08 + (apexH - 0.08) / 2, tz, 0, 0, 0, steelMaterial);

        // Triangulated Internal Howe/Fink Web Struts
        addStrut(
          new THREE.Vector3(-hW * 0.25, yWallTop + 0.08 + apexH * 0.45, tz),
          new THREE.Vector3(0, yWallTop + 0.08, tz),
          0.06,
          0.06,
          steelMaterial
        );
        addStrut(
          new THREE.Vector3(hW * 0.25, yWallTop + 0.08 + apexH * 0.45, tz),
          new THREE.Vector3(0, yWallTop + 0.08, tz),
          0.06,
          0.06,
          steelMaterial
        );

        // End Gable Infill Vertical Studs
        if (isEndGable) {
          [-1.7, -0.9, 0.9, 1.7].forEach((gx) => {
            const propH = apexH * (1 - Math.abs(gx) / (hW / 2));
            if (propH > 0.25) {
              addBeam(0.06, propH, 0.06, gx, yWallTop + 0.08 + propH / 2, tz, 0, 0, 0, steelMaterial);
            }
          });
        }
      });

      // 9. Roof Ridge Beam & Longitudinal Purlins (Battens)
      addBeam(0.08, 0.1, hD + 0.2, 0, yRidge + 0.05, 0, 0, 0, 0, steelMaterial);
      addBeam(0.06, 0.06, hD + 0.2, -hW * 0.25, yWallTop + 0.08 + apexH * 0.52, 0, 0, 0, 0, plateMaterial);
      addBeam(0.06, 0.06, hD + 0.2, hW * 0.25, yWallTop + 0.08 + apexH * 0.52, 0, 0, 0, 0, plateMaterial);
      addBeam(0.06, 0.08, hD + 0.2, -hW / 2 - 0.02, yWallTop + 0.08, 0, 0, 0, 0, plateMaterial);
      addBeam(0.06, 0.08, hD + 0.2, hW / 2 + 0.02, yWallTop + 0.08, 0, 0, 0, 0, plateMaterial);

      steelModelGroup.position.set(0, 0.05, 0);
    }

    // =========================================================================
    // DESIGN 3: "installations" -> Contemporary Two-Storey House with Balcony
    // =========================================================================
    else if (type === "installations") {
      const hW = 4.8; // Width
      const hD = 4.2; // Depth
      const yBot = -1.6;
      const hLevel1 = 1.6; // Level 1 wall height
      const yLevel1Top = yBot + hLevel1; // 0.0
      const joistH = 0.22; // Mid floor cassette
      const yFloor2 = yLevel1Top + joistH; // 0.22
      const hLevel2 = 1.6; // Level 2 wall height
      const yLevel2Top = yFloor2 + hLevel2; // 1.82
      const roofApex = 0.9;
      const yRoofTop = yLevel2Top + roofApex; // 2.72

      // 1. Concrete Foundation Slab
      addBeam(hW + 0.6, 0.28, hD + 0.6, 0, yBot - 0.14, 0, 0, 0, 0, concreteMaterial);
      addBeam(hW + 0.8, 0.14, hD + 0.8, 0, yBot - 0.35, 0, 0, 0, 0, concreteBaseMaterial);

      const shadowGeo = new THREE.PlaneGeometry(8.5, 7.5);
      const shadowMat = new THREE.ShadowMaterial({ opacity: 0.22 });
      const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
      shadowPlane.rotation.x = -Math.PI / 2;
      shadowPlane.position.y = yBot - 0.43;
      shadowPlane.receiveShadow = true;
      scene.add(shadowPlane);

      // 2. LEVEL 1 WALL FRAMING
      const studH1 = hLevel1 - 0.12;
      const studMidY1 = (yBot + yLevel1Top) / 2;
      // Tracks Level 1
      addBeam(hW, 0.06, 0.1, 0, yBot + 0.03, hD / 2);
      addBeam(hW, 0.06, 0.1, 0, yBot + 0.03, -hD / 2);
      addBeam(hW, 0.06, 0.1, 0, yLevel1Top - 0.03, hD / 2);
      addBeam(hW, 0.06, 0.1, 0, yLevel1Top - 0.03, -hD / 2);
      addBeam(0.1, 0.06, hD, -hW / 2, yBot + 0.03, 0);
      addBeam(0.1, 0.06, hD, hW / 2, yBot + 0.03, 0);
      addBeam(0.1, 0.06, hD, -hW / 2, yLevel1Top - 0.03, 0);
      addBeam(0.1, 0.06, hD, hW / 2, yLevel1Top - 0.03, 0);

      // Level 1 Front Studs + Entry Doorway
      [-2.1, -1.7, -1.3, -0.9].forEach((x) => {
        addBeam(0.08, studH1, 0.1, x, studMidY1, hD / 2);
      });
      // Center Entrance Doorway
      addBeam(0.08, studH1, 0.1, -0.5, studMidY1, hD / 2);
      addBeam(0.08, studH1, 0.1, 0.5, studMidY1, hD / 2);
      addBeam(1.0, 0.14, 0.1, 0, yBot + 1.35, hD / 2, 0, 0, 0, steelAccentMaterial);
      // Right Corner Living Room Window
      addBeam(0.08, studH1, 0.1, 1.0, studMidY1, hD / 2);
      addBeam(0.08, studH1, 0.1, 2.1, studMidY1, hD / 2);
      addBeam(1.1, 0.08, 0.1, 1.55, yBot + 0.5, hD / 2);
      addBeam(1.1, 0.14, 0.1, 1.55, yBot + 1.35, hD / 2, 0, 0, 0, steelAccentMaterial);

      // Level 1 Side & Back Studs
      [-1.4, -0.7, 0, 0.7, 1.4].forEach((z) => {
        addBeam(0.1, studH1, 0.08, -hW / 2, studMidY1, z);
        addBeam(0.1, studH1, 0.08, hW / 2, studMidY1, z);
      });
      [-1.8, -0.9, 0, 0.9, 1.8].forEach((x) => {
        addBeam(0.08, studH1, 0.1, x, studMidY1, -hD / 2);
      });

      // 3. MID-FLOOR CASSETTE (JOISTS) + CANTILEVERED FRONT BALCONY
      // Main floor rim joists
      addBeam(hW, joistH, 0.08, 0, yLevel1Top + joistH / 2, -hD / 2, 0, 0, 0, steelAccentMaterial);
      addBeam(0.08, joistH, hD, -hW / 2, yLevel1Top + joistH / 2, 0, 0, 0, 0, steelAccentMaterial);
      addBeam(0.08, joistH, hD, hW / 2, yLevel1Top + joistH / 2, 0, 0, 0, 0, steelAccentMaterial);

      // Floor joists running Z-axis
      [-1.8, -1.2, -0.6, 0, 0.6, 1.2, 1.8].forEach((jx) => {
        addBeam(0.06, joistH - 0.04, hD, jx, yLevel1Top + joistH / 2, 0, 0, 0, 0, plateMaterial);
      });

      // Cantilevered Front Balcony (projects 0.9m forward at front center)
      const balcW = 2.8;
      const balcDepth = 0.9;
      const balcZ = hD / 2 + balcDepth / 2;
      addBeam(balcW, joistH, 0.08, 0, yLevel1Top + joistH / 2, hD / 2 + balcDepth, 0, 0, 0, steelAccentMaterial);
      addBeam(0.08, joistH, balcDepth, -balcW / 2, yLevel1Top + joistH / 2, balcZ, 0, 0, 0, steelAccentMaterial);
      addBeam(0.08, joistH, balcDepth, balcW / 2, yLevel1Top + joistH / 2, balcZ, 0, 0, 0, steelAccentMaterial);
      // Balcony floor joists
      [-0.8, 0, 0.8].forEach((bx) => {
        addBeam(0.06, joistH - 0.04, balcDepth, bx, yLevel1Top + joistH / 2, balcZ, 0, 0, 0, plateMaterial);
      });
      // Balcony Safety Handrail Frame
      const railH = 0.55;
      const railY = yFloor2 + railH / 2;
      addBeam(balcW, 0.05, 0.05, 0, yFloor2 + railH, hD / 2 + balcDepth, 0, 0, 0, steelMaterial);
      addBeam(0.05, 0.05, balcDepth, -balcW / 2, yFloor2 + railH, balcZ, 0, 0, 0, steelMaterial);
      addBeam(0.05, 0.05, balcDepth, balcW / 2, yFloor2 + railH, balcZ, 0, 0, 0, steelMaterial);
      // Balcony baluster vertical posts
      [-balcW / 2, -balcW / 4, 0, balcW / 4, balcW / 2].forEach((rx) => {
        addBeam(0.05, railH, 0.05, rx, railY, hD / 2 + balcDepth, 0, 0, 0, steelMaterial);
      });
      addBeam(0.05, railH, 0.05, -balcW / 2, railY, hD / 2 + balcDepth / 2, 0, 0, 0, steelMaterial);
      addBeam(0.05, railH, 0.05, balcW / 2, railY, hD / 2 + balcDepth / 2, 0, 0, 0, steelMaterial);

      // 4. LEVEL 2 WALL FRAMING
      const studH2 = hLevel2 - 0.12;
      const studMidY2 = (yFloor2 + yLevel2Top) / 2;
      // Tracks Level 2
      addBeam(hW, 0.06, 0.1, 0, yFloor2 + 0.03, hD / 2);
      addBeam(hW, 0.06, 0.1, 0, yFloor2 + 0.03, -hD / 2);
      addBeam(hW, 0.06, 0.1, 0, yLevel2Top - 0.03, hD / 2);
      addBeam(hW, 0.06, 0.1, 0, yLevel2Top - 0.03, -hD / 2);
      addBeam(0.1, 0.06, hD, -hW / 2, yFloor2 + 0.03, 0);
      addBeam(0.1, 0.06, hD, hW / 2, yFloor2 + 0.03, 0);
      addBeam(0.1, 0.06, hD, -hW / 2, yLevel2Top - 0.03, 0);
      addBeam(0.1, 0.06, hD, hW / 2, yLevel2Top - 0.03, 0);

      // Level 2 Front: Balcony Sliding Glass Doorway (-1.0 to 1.0)
      addBeam(0.08, studH2, 0.1, -1.0, studMidY2, hD / 2);
      addBeam(0.08, studH2, 0.1, 1.0, studMidY2, hD / 2);
      addBeam(2.0, 0.14, 0.1, 0, yFloor2 + 1.35, hD / 2, 0, 0, 0, steelAccentMaterial);
      [-2.1, -1.6].forEach((x) => addBeam(0.08, studH2, 0.1, x, studMidY2, hD / 2));
      [1.6, 2.1].forEach((x) => addBeam(0.08, studH2, 0.1, x, studMidY2, hD / 2));

      // Level 2 Side & Back Studs
      [-1.4, -0.7, 0, 0.7, 1.4].forEach((z) => {
        addBeam(0.1, studH2, 0.08, -hW / 2, studMidY2, z);
        addBeam(0.1, studH2, 0.08, hW / 2, studMidY2, z);
      });
      [-1.8, -0.9, 0, 0.9, 1.8].forEach((x) => {
        addBeam(0.08, studH2, 0.1, x, studMidY2, -hD / 2);
      });

      // 5. UPPER ROOF STRUCTURE (Low-Pitch Contemporary Gable / Skillion Roof)
      const trussZ = [-hD / 2, -hD / 6, hD / 6, hD / 2];
      trussZ.forEach((tz) => {
        addBeam(hW, 0.07, 0.07, 0, yLevel2Top + 0.03, tz);
        addStrut(new THREE.Vector3(-hW / 2, yLevel2Top + 0.06, tz), new THREE.Vector3(0, yRoofTop, tz), 0.08, 0.07, steelMaterial);
        addStrut(new THREE.Vector3(hW / 2, yLevel2Top + 0.06, tz), new THREE.Vector3(0, yRoofTop, tz), 0.08, 0.07, steelMaterial);
        addBeam(0.07, roofApex - 0.06, 0.07, 0, yLevel2Top + 0.06 + (roofApex - 0.06) / 2, tz);
      });
      // Ridge beam & purlins
      addBeam(0.08, 0.1, hD + 0.3, 0, yRoofTop + 0.04, 0);
      [-hW * 0.25, hW * 0.25].forEach((px) => {
        addBeam(0.06, 0.06, hD + 0.2, px, yLevel2Top + roofApex * 0.5, 0, 0, 0, 0, plateMaterial);
      });

      steelModelGroup.position.set(0, -0.1, 0);
    }

    // =========================================================================
    // DESIGN 4: "our-promise" -> Modern Multi-Pitch Split-Skillion Pavilion House
    // =========================================================================
    else {
      const bW = 5.6; // Total Width
      const bD = 4.4; // Depth
      const yBot = -1.5;

      // 1. Concrete Foundation Slab
      addBeam(bW + 0.6, 0.28, bD + 0.6, 0, yBot - 0.14, 0, 0, 0, 0, concreteMaterial);
      addBeam(bW + 0.8, 0.14, bD + 0.8, 0, yBot - 0.35, 0, 0, 0, 0, concreteBaseMaterial);

      const shadowGeo = new THREE.PlaneGeometry(8.5, 7.5);
      const shadowMat = new THREE.ShadowMaterial({ opacity: 0.22 });
      const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
      shadowPlane.rotation.x = -Math.PI / 2;
      shadowPlane.position.y = yBot - 0.43;
      shadowPlane.receiveShadow = true;
      scene.add(shadowPlane);

      // Bottom wall tracks
      addBeam(bW, 0.06, 0.1, 0, yBot + 0.03, bD / 2);
      addBeam(bW, 0.06, 0.1, 0, yBot + 0.03, -bD / 2);
      addBeam(0.1, 0.06, bD, -bW / 2, yBot + 0.03, 0);
      addBeam(0.1, 0.06, bD, bW / 2, yBot + 0.03, 0);
      addBeam(0.1, 0.06, bD, 0, yBot + 0.03, 0); // Center dividing wall track

      // LEFT PAVILION (x = -bW/2 to 0) -> High Cathedral Skillion Roof
      const leftW = bW / 2; // 2.8m
      const yLeftLow = yBot + 2.1; // 0.6
      const yCenterHigh = yBot + 3.8; // 2.3 (High apex peak)

      // Left exterior wall (x = -bW/2)
      const leftWallH = yLeftLow - yBot;
      const leftMidY = (yBot + yLeftLow) / 2;
      addBeam(0.1, 0.06, bD, -bW / 2, yLeftLow - 0.03, 0);
      [-1.8, -1.2, -0.6, 0, 0.6, 1.2, 1.8].forEach((z) => {
        addBeam(0.1, leftWallH - 0.06, 0.08, -bW / 2, leftMidY, z);
      });
      // Left wall bracing
      addStrut(new THREE.Vector3(-bW / 2 - 0.05, yBot + 0.1, -1.8), new THREE.Vector3(-bW / 2 - 0.05, yLeftLow - 0.1, 0.6), 0.06, 0.015, steelMaterial);

      // Left front wall (x = -2.8 to 0) - Floor-to-ceiling glass sliding door framing
      addBeam(0.08, leftWallH - 0.06, 0.1, -2.2, leftMidY, bD / 2);
      addBeam(0.08, leftWallH - 0.06, 0.1, -0.3, leftMidY, bD / 2);
      addBeam(1.9, 0.16, 0.1, -1.25, yBot + 1.85, bD / 2, 0, 0, 0, steelAccentMaterial);

      // Left high skillion roof rafters (sloping up from -bW/2 to 0)
      const roofZ = [-bD / 2, -bD / 4, 0, bD / 4, bD / 2];
      roofZ.forEach((rz) => {
        addStrut(
          new THREE.Vector3(-bW / 2 - 0.2, yLeftLow - 0.05, rz),
          new THREE.Vector3(0.2, yCenterHigh + 0.1, rz),
          0.09,
          0.08,
          steelMaterial
        );
      });
      // Left roof purlins running along Z
      [-2.2, -1.4, -0.6].forEach((px) => {
        const frac = (px - (-bW / 2)) / leftW;
        const py = yLeftLow + (yCenterHigh - yLeftLow) * frac;
        addBeam(0.06, 0.06, bD + 0.3, px, py + 0.08, 0, 0, 0, 0, plateMaterial);
      });

      // CENTER CLERESTORY WALL (x = 0) - Towering vertical window wall between roof heights
      const yRightLowRoof = yBot + 2.7; // 1.2
      [-1.8, -1.2, -0.6, 0, 0.6, 1.2, 1.8].forEach((z) => {
        addBeam(0.1, yCenterHigh - yBot, 0.08, 0, (yBot + yCenterHigh) / 2, z);
      });
      // Clerestory horizontal window sill
      addBeam(0.08, 0.08, bD, 0, yRightLowRoof, 0, 0, 0, 0, steelAccentMaterial);

      // RIGHT PAVILION (x = 0 to bW/2) -> Lower Complementary Skillion Roof
      const yRightOuterLow = yBot + 1.9; // 0.4
      const rightWallH = yRightOuterLow - yBot;
      const rightMidY = (yBot + yRightOuterLow) / 2;

      // Right exterior wall (x = bW/2)
      addBeam(0.1, 0.06, bD, bW / 2, yRightOuterLow - 0.03, 0);
      [-1.8, -1.2, -0.6, 0, 0.6, 1.2, 1.8].forEach((z) => {
        addBeam(0.1, rightWallH - 0.06, 0.08, bW / 2, rightMidY, z);
      });

      // Right front wall (Entry door & window)
      addBeam(0.08, rightWallH - 0.06, 0.1, 0.5, rightMidY, bD / 2);
      addBeam(0.08, rightWallH - 0.06, 0.1, 1.4, rightMidY, bD / 2);
      addBeam(0.08, rightWallH - 0.06, 0.1, 2.3, rightMidY, bD / 2);
      addBeam(0.9, 0.14, 0.1, 0.95, yBot + 1.4, bD / 2, 0, 0, 0, steelAccentMaterial);

      // Right skillion roof rafters (sloping from center y=2.0 down to right outer y=1.2)
      roofZ.forEach((rz) => {
        addStrut(
          new THREE.Vector3(0, yRightLowRoof + 0.05, rz),
          new THREE.Vector3(bW / 2 + 0.2, yRightOuterLow - 0.05, rz),
          0.09,
          0.08,
          steelMaterial
        );
      });
      // Right roof purlins
      [0.8, 1.6, 2.4].forEach((px) => {
        const frac = px / (bW / 2);
        const py = yRightLowRoof - (yRightLowRoof - yRightOuterLow) * frac;
        addBeam(0.06, 0.06, bD + 0.3, px, py + 0.08, 0, 0, 0, 0, plateMaterial);
      });

      // Front Covered Alfresco / Entry Porch Steel Column at (x=2.4, z=bD/2)
      addBeam(0.1, yRightOuterLow - yBot, 0.1, bW / 2, rightMidY, bD / 2, 0, 0, 0, steelAccentMaterial);

      steelModelGroup.position.set(0, 0.05, 0);
    }

    // Look at center
    camera.lookAt(0, 0, 0);

    // 5. Interactive 3D Hover & Rotation Controls (ZERO auto-rotation, rotates on mouse over)
    const defaultRotationY = type === "custom-designs" ? 0.38 : type === "fabrications" ? 0.36 : 0.25;
    const defaultRotationX = type === "custom-designs" ? 0.08 : type === "fabrications" ? 0.08 : 0.05;

    let targetRotationY = defaultRotationY;
    let targetRotationX = defaultRotationX;
    let isUserInteracting = false;
    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let dragStartRotY = defaultRotationY;
    let dragStartRotX = defaultRotationX;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = (e.clientX - rect.left) / rect.width - 0.5;
      const normY = (e.clientY - rect.top) / rect.height - 0.5;

      if (isDragging) {
        const deltaX = e.clientX - dragStartX;
        const deltaY = e.clientY - dragStartY;
        targetRotationY = dragStartRotY + (deltaX / rect.width) * Math.PI * 2.2;
        targetRotationX = dragStartRotX + (deltaY / rect.height) * Math.PI * 0.9;
      } else {
        // Rotate dynamically on mouse over!
        targetRotationY = defaultRotationY + normX * Math.PI * 1.8;
        targetRotationX = defaultRotationX + normY * Math.PI * 0.6;
      }
    };

    const handleMouseEnter = () => {
      isUserInteracting = true;
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      isUserInteracting = false;
      isDragging = false;
      setIsHovered(false);
      // Smoothly returns to default stationary resting angle without spinning
      targetRotationY = defaultRotationY;
      targetRotationX = defaultRotationX;
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      dragStartRotY = steelModelGroup.rotation.y;
      dragStartRotX = steelModelGroup.rotation.x;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    // Mobile touch controls
    let touchStartX = 0;
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        dragStartRotY = steelModelGroup.rotation.y;
        dragStartRotX = steelModelGroup.rotation.x;
        isUserInteracting = true;
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const deltaX = e.touches[0].clientX - touchStartX;
        const deltaY = e.touches[0].clientY - touchStartY;
        targetRotationY = dragStartRotY + (deltaX / container.clientWidth) * Math.PI * 1.8;
        targetRotationX = dragStartRotX + (deltaY / container.clientHeight) * Math.PI * 0.8;
      }
    };
    const handleTouchEnd = () => {
      isUserInteracting = false;
      targetRotationY = defaultRotationY;
      targetRotationX = defaultRotationX;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchmove", handleTouchMove, { passive: true });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });

    // 6. Viewport Visibility Tracking
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // 7. Resize Observer
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // 8. Animation Render Loop (NO auto-rotation, only follows mouse over)
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      if (isUserInteracting) {
        // Smooth responsive follow on mouse over
        steelModelGroup.rotation.y += (targetRotationY - steelModelGroup.rotation.y) * 0.09;
        steelModelGroup.rotation.x += (targetRotationX - steelModelGroup.rotation.x) * 0.09;
      } else {
        // ZERO auto-rotation - hold stationary at default isometric view
        steelModelGroup.rotation.y += (defaultRotationY - steelModelGroup.rotation.y) * 0.05;
        steelModelGroup.rotation.x += (defaultRotationX - steelModelGroup.rotation.x) * 0.05;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 9. Memory Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      resizeObserver.disconnect();

      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach((mat) => mat.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, [type]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[360px] sm:h-[480px] lg:h-[520px] xl:h-[540px] overflow-hidden bg-transparent cursor-grab active:cursor-grabbing group"
    />
  );
}
