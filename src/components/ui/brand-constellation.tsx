'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

const COLOR = '#f05a28'
const MAX_NODES = 28
const EDGE_FADE_PX = 100
const SPAWN_INTERVAL_FRAMES = 55
const ORIGIN_WANDER_INTERVAL = 200
const ORIGIN_SPEED = 0.35
const FADE_IN_FRAMES = 50   // frames to scale + fade from 0 → 1

interface Node {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  depth: number
  connections: number[]
  rotation: number
  rotationSpeed: number
  born: number   // frame counter — drives spawn scale/fade
}

let uid = 0

function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 2)
}

function edgeFade(node: Node, W: number, H: number): number {
  const d = Math.min(node.x, node.y, W - node.x, H - node.y)
  return Math.max(0, Math.min(1, d / EDGE_FADE_PX))
}

function drawTriangle(
  cx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  rotation: number,
  scale: number,
) {
  const s = size * scale
  cx.save()
  cx.translate(x, y)
  cx.rotate(rotation)
  cx.beginPath()
  cx.moveTo(0, -s)
  cx.lineTo(s * 0.866, s * 0.5)
  cx.lineTo(-s * 0.866, s * 0.5)
  cx.closePath()
  cx.strokeStyle = COLOR
  cx.lineWidth = 0.8
  cx.stroke()
  cx.restore()
}

export function BrandConstellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (shouldReduceMotion) return
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const el = canvasRef.current!
    if (!el) return
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const cx = el.getContext('2d')!
    if (!cx) return

    const nodes: Node[] = []
    let animId: number
    let spawnTimer = 0
    let wanderTimer = 0
    let ox = 0
    let oy = 0
    let targetX = 0
    let targetY = 0

    function pickTarget() {
      const mx = el.width * 0.2
      const my = el.height * 0.2
      targetX = mx + Math.random() * (el.width - mx * 2)
      targetY = my + Math.random() * (el.height - my * 2)
    }

    function resize() {
      el.width = el.offsetWidth
      el.height = el.offsetHeight
      ox = el.width / 2
      oy = el.height / 2
      pickTarget()
    }

    function makeNode(x: number, y: number, slowSpawn = false): Node {
      const depth = Math.random()
      const angle = Math.random() * Math.PI * 2
      const speed = slowSpawn ? 0.05 + Math.random() * 0.08 : 0.08 + Math.random() * 0.14
      return {
        id: uid++,
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: depth < 0.4 ? 2 + Math.random() * 1.5 : 3.5 + Math.random() * 2.5,
        depth,
        connections: [],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.007,
        born: 0,
      }
    }

    function wireConnections(node: Node) {
      const sorted = [...nodes]
        .filter(n => n.id !== node.id)
        .map(n => ({ id: n.id, d: Math.hypot(n.x - node.x, n.y - node.y) }))
        .sort((a, b) => a.d - b.d)
      const count = Math.min(2 + Math.floor(Math.random() * 2), sorted.length)
      for (let i = 0; i < count; i++) node.connections.push(sorted[i].id)
    }

    function spawn() {
      if (nodes.length >= MAX_NODES) return
      const node = makeNode(
        ox + (Math.random() - 0.5) * 30,
        oy + (Math.random() - 0.5) * 30,
      )
      wireConnections(node)
      nodes.push(node)
    }

    // Seed: fill entire viewport with a jittered grid so screen looks full on load
    function seed() {
      const W = el.width
      const H = el.height
      const cols = 5
      const rows = 4
      const cellW = W / cols
      const cellH = H / rows

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * cellW + cellW * 0.15 + Math.random() * cellW * 0.7
          const y = row * cellH + cellH * 0.15 + Math.random() * cellH * 0.7
          const node = makeNode(x, y, true)
          // Stagger the seed fade-in slightly so they don't all pop at once
          node.born = -Math.floor(Math.random() * 30)
          nodes.push(node)
        }
      }

      // Wire connections after all seed nodes exist
      for (const node of nodes) {
        wireConnections(node)
      }
    }

    function frame() {
      const W = el.width
      const H = el.height
      cx.clearRect(0, 0, W, H)

      // Wander origin
      const dx = targetX - ox
      const dy = targetY - oy
      const dist = Math.hypot(dx, dy)
      if (dist > 1) {
        ox += (dx / dist) * Math.min(dist, ORIGIN_SPEED)
        oy += (dy / dist) * Math.min(dist, ORIGIN_SPEED)
      }
      if (++wanderTimer >= ORIGIN_WANDER_INTERVAL) { pickTarget(); wanderTimer = 0 }
      if (++spawnTimer >= SPAWN_INTERVAL_FRAMES) { spawn(); spawnTimer = 0 }

      nodes.sort((a, b) => a.depth - b.depth)

      // Lines
      for (const node of nodes) {
        const spawnP = easeOut(Math.max(0, Math.min(1, node.born / FADE_IN_FRAMES)))
        const fa = edgeFade(node, W, H) * spawnP
        for (const cid of node.connections) {
          const c = nodes.find(n => n.id === cid)
          if (!c) continue
          const cSpawnP = easeOut(Math.max(0, Math.min(1, c.born / FADE_IN_FRAMES)))
          const ca = edgeFade(c, W, H) * cSpawnP
          cx.globalAlpha = Math.min(fa, ca) * 0.5
          cx.strokeStyle = COLOR
          cx.lineWidth = 0.4
          cx.beginPath()
          cx.moveTo(node.x, node.y)
          cx.lineTo(c.x, c.y)
          cx.stroke()
        }
      }

      // Triangles
      for (const node of nodes) {
        node.born++
        node.rotation += node.rotationSpeed

        const spawnP = easeOut(Math.max(0, Math.min(1, node.born / FADE_IN_FRAMES)))
        const fa = edgeFade(node, W, H)

        if (node.depth < 0.4) cx.filter = 'blur(0.6px)'
        cx.globalAlpha = fa * spawnP
        drawTriangle(cx, node.x, node.y, node.size, node.rotation, spawnP)
        cx.filter = 'none'

        node.x += node.vx
        node.y += node.vy
      }

      cx.globalAlpha = 1

      // Cull fully faded nodes
      for (let i = nodes.length - 1; i >= 0; i--) {
        if (edgeFade(nodes[i], W, H) < 0.01) nodes.splice(i, 1)
      }

      animId = requestAnimationFrame(frame)
    }

    resize()
    seed()
    animId = requestAnimationFrame(frame)

    const ro = new ResizeObserver(resize)
    ro.observe(el)

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
    }
  }, [shouldReduceMotion])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 1 }}
      aria-hidden
    />
  )
}
