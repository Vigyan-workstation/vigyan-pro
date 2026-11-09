<script lang="ts">
  // StlViewer.svelte — Native Three.js 3D CAD Mesh Viewport
  // Features: OrbitControls, directional studio lighting, bounding box normalization,
  // wireframe toggle, auto-rotation, and .stl file download.
  import { onMount, onDestroy } from "svelte";
  import * as THREE from "three";
  import { OrbitControls } from "three/addons/controls/OrbitControls.js";
  import { STLLoader } from "three/addons/loaders/STLLoader.js";

  interface Props {
    stlData?: string; // Base64 data or raw ASCII/binary STL
    fileName?: string;
    metrics?: { volume_mm3?: number; bounding_box?: Record<string, number> };
  }
  let { stlData, fileName = "model.stl", metrics }: Props = $props();

  let container = $state<HTMLDivElement | null>(null);
  let isWireframe = $state(false);
  let isAutoRotate = $state(false);
  let volume = $derived(metrics?.volume_mm3 ? `${metrics.volume_mm3.toLocaleString()} mm³` : "Calculated");

  let scene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;
  let renderer: THREE.WebGLRenderer;
  let controls: OrbitControls;
  let mesh: THREE.Mesh | null = null;
  let material: THREE.MeshStandardMaterial;
  let animationFrameId: number;
  let resizeObserver: ResizeObserver;

  function initScene() {
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x02050a);

    // Subtle grid helper for engineering orientation
    const grid = new THREE.GridHelper(100, 20, 0x1e293b, 0x0f172a);
    grid.position.y = -20;
    scene.add(grid);

    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(60, 50, 80);

    renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 1.8);
    dirLight1.position.set(50, 80, 50);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 1.0);
    dirLight2.position.set(-50, -30, -50);
    scene.add(dirLight2);

    material = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.3,
      roughness: 0.35,
      wireframe: isWireframe
    });

    loadStl();

    // Resize observer
    resizeObserver = new ResizeObserver(() => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    resizeObserver.observe(container);

    animate();
  }

  function loadStl() {
    if (!stlData) return;

    try {
      const loader = new STLLoader();
      let geometry: THREE.BufferGeometry;

      if (stlData.startsWith("data:") || stlData.startsWith("blob:") || stlData.startsWith("http")) {
        loader.load(stlData, (geo) => applyGeometry(geo));
        return;
      }

      // Check if base64 encoded
      let buffer: ArrayBuffer;
      try {
        const binStr = atob(stlData);
        const len = binStr.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binStr.charCodeAt(i);
        }
        buffer = bytes.buffer;
      } catch {
        // Fallback: raw string encoding
        buffer = new TextEncoder().encode(stlData).buffer;
      }

      geometry = loader.parse(buffer);
      applyGeometry(geometry);
    } catch (e) {
      console.error("Failed to parse STL geometry", e);
    }
  }

  function applyGeometry(geometry: THREE.BufferGeometry) {
    if (mesh) {
      scene.remove(mesh);
      mesh.geometry.dispose();
    }

    geometry.computeVertexNormals();
    geometry.center();

    mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);

    // Adjust camera to fit geometry
    geometry.computeBoundingSphere();
    const radius = geometry.boundingSphere ? geometry.boundingSphere.radius : 30;
    camera.position.set(radius * 2.2, radius * 1.8, radius * 2.5);
    camera.lookAt(0, 0, 0);
    controls.target.set(0, 0, 0);
  }

  function animate() {
    animationFrameId = requestAnimationFrame(animate);
    if (controls) {
      controls.autoRotate = isAutoRotate;
      controls.autoRotateSpeed = 2.0;
      controls.update();
    }
    if (renderer && scene && camera) {
      renderer.render(scene, camera);
    }
  }

  function toggleWireframe() {
    isWireframe = !isWireframe;
    if (material) material.wireframe = isWireframe;
  }

  function resetCamera() {
    if (controls && mesh && mesh.geometry.boundingSphere) {
      const r = mesh.geometry.boundingSphere.radius;
      camera.position.set(r * 2.2, r * 1.8, r * 2.5);
      controls.target.set(0, 0, 0);
    }
  }

  function downloadStlFile() {
    if (!stlData) return;
    try {
      let blob: Blob;
      if (stlData.startsWith("data:")) {
        const parts = stlData.split(",");
        const binStr = atob(parts[1]);
        const bytes = new Uint8Array(binStr.length);
        for (let i = 0; i < binStr.length; i++) bytes[i] = binStr.charCodeAt(i);
        blob = new Blob([bytes], { type: "application/sla" });
      } else {
        blob = new Blob([stlData], { type: "application/sla" });
      }
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName.endsWith(".stl") ? fileName : `${fileName}.stl`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Failed to download STL", e);
    }
  }

  onMount(() => {
    initScene();
  });

  onDestroy(() => {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    if (resizeObserver) resizeObserver.disconnect();
    if (mesh) {
      mesh.geometry.dispose();
    }
    if (material) material.dispose();
    if (controls) controls.dispose();
    if (renderer) renderer.dispose();
  });
</script>

<div class="relative w-full h-full flex flex-col bg-[#02050a] select-none">
  <!-- Viewport Top Toolbar -->
  <div class="h-10 px-4 flex items-center justify-between border-b border-white/[0.08] bg-[#040812]/80 backdrop-blur-sm text-xs">
    <div class="flex items-center gap-2">
      <span class="font-mono text-[#38bdf8] font-semibold">{fileName}</span>
      <span class="text-[#64748b]">·</span>
      <span class="text-[#94a3b8] font-mono text-[11px]">{volume}</span>
    </div>

    <!-- Controls Toolbar -->
    <div class="flex items-center gap-1.5">
      <button
        type="button"
        onclick={() => (isAutoRotate = !isAutoRotate)}
        class="px-2 py-1 rounded text-[11px] font-medium transition-all {isAutoRotate ? 'bg-[#38bdf8]/20 text-[#38bdf8] border border-[#38bdf8]/40' : 'text-[#9ca3af] hover:text-white hover:bg-white/[0.06]'}"
        title="Toggle Auto-Rotation"
      >
        Auto Rotate
      </button>

      <button
        type="button"
        onclick={toggleWireframe}
        class="px-2 py-1 rounded text-[11px] font-medium transition-all {isWireframe ? 'bg-[#38bdf8]/20 text-[#38bdf8] border border-[#38bdf8]/40' : 'text-[#9ca3af] hover:text-white hover:bg-white/[0.06]'}"
        title="Toggle Wireframe Mesh"
      >
        Wireframe
      </button>

      <button
        type="button"
        onclick={resetCamera}
        class="px-2 py-1 rounded text-[11px] font-medium text-[#9ca3af] hover:text-white hover:bg-white/[0.06] transition-all"
        title="Reset Camera View"
      >
        Reset View
      </button>

      <button
        type="button"
        onclick={downloadStlFile}
        class="px-2.5 py-1 rounded bg-[#38bdf8]/15 hover:bg-[#38bdf8]/25 text-[#38bdf8] border border-[#38bdf8]/30 font-medium text-[11px] flex items-center gap-1 transition-all"
        title="Download binary STL file"
      >
        <svg class="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z" clip-rule="evenodd" />
        </svg>
        Download STL
      </button>
    </div>
  </div>

  <!-- Three.js Canvas Container -->
  <div bind:this={container} class="flex-1 w-full h-full relative cursor-grab active:cursor-grabbing overflow-hidden">
    {#if !stlData}
      <div class="absolute inset-0 flex items-center justify-center text-xs text-[#64748b]">
        No 3D STL geometry loaded
      </div>
    {/if}
  </div>

  <!-- Help bar footer -->
  <div class="h-6 px-3 bg-[#030712] border-t border-white/[0.05] flex items-center justify-between text-[10px] text-[#64748b] font-mono">
    <span>Left Click + Drag: Orbit • Right Click: Pan • Scroll: Zoom</span>
    <span>Parametric Solid Geometry • build123d</span>
  </div>
</div>
