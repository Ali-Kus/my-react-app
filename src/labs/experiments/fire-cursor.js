/*
 * fire-cursor.js — a Demon Slayer katana-slash fire trail on the cursor
 * ---------------------------------------------------------------------
 * Drop-in, dependency-free WebGL2 effect. The cursor is the katana tip: as it
 * sweeps, it leaves a bright CURVED ARC of fire along the path it just travelled
 * — white-hot at the blade, tapering and breaking into licking flame tongues
 * along the trailing edge, with embers flying off. The curve comes from the
 * motion of the cursor itself. It is strictly localized to the trail, so the
 * background is empty (and empty until you first move the mouse).
 *
 *   <script src="fire-cursor.js"></script>
 *   <script>FireCursor.init();</script>
 *
 * or auto-init:  <script src="fire-cursor.js" data-fire-cursor></script>
 */
(function (global) {
  'use strict';

  var TRAIL = 32; // recent cursor positions that form the slash arc

  var DEFAULTS = {
    width: 0.03,            // thickness of the slash arc (fraction of height)
    taper: 3.0,             // how fast the tail thins to a point
    lick: 1.0,              // how far flame tongues lick off the edge
    flameDetail: 21.0,      // frequency of the tongues
    flameSpeed: 1.7,        // flicker speed
    flare: 0.0,             // white-hot glow at the blade tip (cursor)
    outline: 1.0,           // darkness of the dark outline (0 = none)
    sparks: 1.5,            // flying ember sparks (0 = off)
    smoothing: 0.4,         // blade spring toward the mouse (weighted lag)
    maxDpr: 2,
    zIndex: 2147483647,
    hideCursor: true
  };

  var VERT = [
    '#version 300 es',
    'in vec2 aPos;',
    'out vec2 vUv;',
    'void main(){ vUv = aPos*0.5+0.5; gl_Position = vec4(aPos,0.0,1.0); }'
  ].join('\n');

  var SNOISE = [
    'vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x,289.0);}',
    'vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}',
    'float snoise(vec3 v){',
    '  const vec2 C = vec2(1.0/6.0, 1.0/3.0);',
    '  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);',
    '  vec3 i = floor(v + dot(v, C.yyy));',
    '  vec3 x0 = v - i + dot(i, C.xxx);',
    '  vec3 g = step(x0.yzx, x0.xyz);',
    '  vec3 l = 1.0 - g;',
    '  vec3 i1 = min(g.xyz, l.zxy);',
    '  vec3 i2 = max(g.xyz, l.zxy);',
    '  vec3 x1 = x0 - i1 + 1.0 * C.xxx;',
    '  vec3 x2 = x0 - i2 + 2.0 * C.xxx;',
    '  vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;',
    '  i = mod(i, 289.0);',
    '  vec4 p = permute(permute(permute(',
    '             i.z + vec4(0.0, i1.z, i2.z, 1.0))',
    '           + i.y + vec4(0.0, i1.y, i2.y, 1.0))',
    '           + i.x + vec4(0.0, i1.x, i2.x, 1.0));',
    '  float n_ = 1.0/7.0;',
    '  vec3 ns = n_ * D.wyz - D.xzx;',
    '  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);',
    '  vec4 x_ = floor(j * ns.z);',
    '  vec4 y_ = floor(j - 7.0 * x_);',
    '  vec4 x = x_ *ns.x + ns.yyyy;',
    '  vec4 y = y_ *ns.x + ns.yyyy;',
    '  vec4 h = 1.0 - abs(x) - abs(y);',
    '  vec4 b0 = vec4(x.xy, y.xy);',
    '  vec4 b1 = vec4(x.zw, y.zw);',
    '  vec4 s0 = floor(b0)*2.0 + 1.0;',
    '  vec4 s1 = floor(b1)*2.0 + 1.0;',
    '  vec4 sh = -step(h, vec4(0.0));',
    '  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;',
    '  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;',
    '  vec3 p0 = vec3(a0.xy, h.x);',
    '  vec3 p1 = vec3(a0.zw, h.y);',
    '  vec3 p2 = vec3(a1.xy, h.z);',
    '  vec3 p3 = vec3(a1.zw, h.w);',
    '  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));',
    '  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;',
    '  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);',
    '  m = m * m;',
    '  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));',
    '}'
  ].join('\n');

  var FRAG = [
    '#version 300 es',
    'precision highp float;',
    'in vec2 vUv;',
    'out vec4 fragColor;',
    'uniform vec2 uAspect;',
    'uniform vec2 uTrail[' + TRAIL + '];',
    'uniform int uTrailN;',
    'uniform float uWidth;',
    'uniform float uTaper;',
    'uniform float uLick;',
    'uniform float uDetail;',
    'uniform float uFlameSpeed;',
    'uniform float uFlare;',
    'uniform float uOutline;',
    'uniform float uSparks;',
    'uniform float uTime;',
    SNOISE,
    'float ridged(vec3 p){ return 1.0 - abs(snoise(p)); }',
    'float flameField(vec2 uv){',
    '  vec3 q = vec3(uv * uDetail, uTime * uFlameSpeed * 0.5);',
    '  float n = ridged(q) * 0.6;',
    '  n += ridged(q * 2.1 + 3.3) * 0.28;',
    '  n += ridged(q * 4.2 + 7.1) * 0.12;',
    '  return n;',
    '}',
    'void main(){',
    '  vec2 p = vec2(vUv.x * uAspect.x, vUv.y);',
    '  float ribbon = -1.0;',
    '  for(int i=0;i<' + (TRAIL - 1) + ';i++){',
    '    if(i >= uTrailN - 1) break;',
    '    vec2 a = vec2(uTrail[i].x * uAspect.x, uTrail[i].y);',
    '    vec2 b = vec2(uTrail[i+1].x * uAspect.x, uTrail[i+1].y);',
    '    vec2 pa = p - a; vec2 ba = b - a;',
    '    float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-7), 0.0, 1.0);',
    '    float dist = length(pa - ba * h);',
    '    float u = (float(i) + h) / float(max(uTrailN - 1, 1));',
    '    float halfw = uWidth * pow(max(1.0 - u, 0.0), uTaper);',
    '    float fade = smoothstep(0.004, 0.018, halfw);',
    '    halfw = max(halfw, 0.003);',
    '    ribbon = max(ribbon, mix(-1.0, 1.0 - dist / halfw, fade));',
    '  }',
    '  float n = flameField(vUv);',
    '  float v = ribbon + (n - 0.55) * uLick;',
    '  vec3 cOutline = vec3(0.40, 0.02, 0.0);',
    '  vec3 cRed     = vec3(0.92, 0.13, 0.06);',
    '  vec3 cOrange  = vec3(1.00, 0.46, 0.07);',
    '  vec3 cYellow  = vec3(1.00, 0.83, 0.14);',
    '  vec3 cWhite   = vec3(1.00, 0.97, 0.86);',
    '  float aa = clamp(fwidth(v) * 1.1, 0.004, 0.05);',
    '  float e0 = 0.05, e1 = 0.14, e2 = 0.40, e3 = 0.62, e4 = 0.82;',
    '  vec3 col = cOutline;',
    '  col = mix(col, cRed,    smoothstep(e1 - aa, e1 + aa, v));',
    '  col = mix(col, cOrange, smoothstep(e2 - aa, e2 + aa, v));',
    '  col = mix(col, cYellow, smoothstep(e3 - aa, e3 + aa, v));',
    '  col = mix(col, cWhite,  smoothstep(e4 - aa, e4 + aa, v));',
    '  float alpha = smoothstep(e0 - aa, e0 + aa, v);',
    '  float rim = (1.0 - smoothstep(e1 - aa, e1 + aa, v)) * step(e0, v);',
    '  col *= (1.0 - rim * uOutline);',
    '  vec2 headP = vec2(uTrail[0].x * uAspect.x, uTrail[0].y);',
    '  float dHead = length(p - headP);',
    '  float flare = exp(-(dHead*dHead) / (uWidth*uWidth*0.6)) * uFlare;',
    '  col = mix(col, cWhite, clamp(flare, 0.0, 1.0));',
    '  alpha = max(alpha, clamp(flare, 0.0, 1.0));',
    '  if(uSparks > 0.0){',
    '    float edge = smoothstep(0.0, 0.12, ribbon) * (1.0 - smoothstep(0.30, 0.55, ribbon));',
    '    float sn = snoise(vec3(vUv * 70.0, floor(uTime * 16.0)));',
    '    float sp = step(0.965, sn) * edge;',
    '    if(sp > 0.0){ col = mix(col, cYellow, sp); alpha = max(alpha, sp * uSparks); }',
    '  }',
    '  col = clamp(col, 0.0, 1.0);',
    '  fragColor = vec4(col * alpha, alpha);',
    '}'
  ].join('\n');

  function compile(gl, type, src) {
    var s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      throw new Error('FireCursor shader error: ' + gl.getShaderInfoLog(s) + '\n' + src);
    }
    return s;
  }
  function program(gl, vs, fs) {
    var p = gl.createProgram();
    gl.attachShader(p, compile(gl, gl.VERTEX_SHADER, vs));
    gl.attachShader(p, compile(gl, gl.FRAGMENT_SHADER, fs));
    gl.bindAttribLocation(p, 0, 'aPos');
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
      throw new Error('FireCursor link error: ' + gl.getProgramInfoLog(p));
    }
    p._u = {};
    return p;
  }
  function uloc(gl, p, name) {
    if (!(name in p._u)) p._u[name] = gl.getUniformLocation(p, name);
    return p._u[name];
  }

  function FireCursorController(opts) {
    var o = {};
    for (var k in DEFAULTS) o[k] = DEFAULTS[k];
    if (opts) for (var j in opts) if (j in DEFAULTS) o[j] = opts[j];
    this.options = o;

    var canvas = document.createElement('canvas');
    canvas.setAttribute('aria-hidden', 'true');
    var cs = canvas.style;
    cs.position = 'fixed'; cs.top = cs.left = '0';
    cs.width = cs.height = '100%';
    cs.pointerEvents = 'none';
    cs.zIndex = String(o.zIndex);
    document.body.appendChild(canvas);
    this.canvas = canvas;

    var gl = canvas.getContext('webgl2', {
      alpha: true, premultipliedAlpha: true, antialias: true, depth: false
    });
    if (!gl) {
      console.warn('[FireCursor] WebGL2 unavailable — effect disabled.');
      canvas.remove(); this._dead = true; return;
    }
    this.gl = gl;
    this.prog = program(gl, VERT, FRAG);

    var vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    this.head = { x: -1, y: -1 };
    this.target = { x: -1, y: -1 };
    this.trail = new Float32Array(TRAIL * 2);
    for (var t = 0; t < TRAIL; t++) { this.trail[t * 2] = -1; this.trail[t * 2 + 1] = -1; }
    this.time = 0; this.lastT = 0; this.moved = false;

    if (o.hideCursor) {
      this._prevCursor = document.documentElement.style.cursor;
      document.documentElement.style.cursor = 'none';
    }

    this._bind();
    this._resize();
    this._loop = this._frame.bind(this);
    this._raf = requestAnimationFrame(this._loop);
  }

  FireCursorController.prototype.setOptions = function (patch) {
    if (!patch) return;
    for (var k in patch) if (k in this.options) this.options[k] = patch[k];
  };

  FireCursorController.prototype._bind = function () {
    var self = this;
    this._onMove = function (e) {
      self.target.x = e.clientX / window.innerWidth;
      self.target.y = 1.0 - e.clientY / window.innerHeight;
      if (!self.moved) {
        self.moved = true;
        self.head.x = self.target.x; self.head.y = self.target.y;
        for (var i = 0; i < TRAIL; i++) {
          self.trail[i * 2] = self.head.x; self.trail[i * 2 + 1] = self.head.y;
        }
      }
    };
    this._onResize = function () { self._resize(); };
    this._onVis = function () {
      if (document.hidden) { cancelAnimationFrame(self._raf); self._raf = 0; }
      else if (!self._raf) { self.lastT = 0; self._raf = requestAnimationFrame(self._loop); }
    };
    window.addEventListener('pointermove', this._onMove, { passive: true });
    window.addEventListener('resize', this._onResize);
    document.addEventListener('visibilitychange', this._onVis);
  };

  FireCursorController.prototype._resize = function () {
    var o = this.options;
    var dpr = Math.min(window.devicePixelRatio || 1, o.maxDpr);
    var w = Math.max(2, Math.floor(window.innerWidth * dpr));
    var h = Math.max(2, Math.floor(window.innerHeight * dpr));
    this.canvas.width = w; this.canvas.height = h;
    this.viewW = w; this.viewH = h;
    this.aspect = [w / h, 1];
  };

  FireCursorController.prototype._frame = function (now) {
    var gl = this.gl, o = this.options;
    if (!this.lastT) this.lastT = now;
    var dt = Math.min((now - this.lastT) / 1000, 0.033);
    this.lastT = now;
    this.time += dt;

    var s = 1 - Math.pow(1 - o.smoothing, dt * 60);
    this.head.x += (this.target.x - this.head.x) * s;
    this.head.y += (this.target.y - this.head.y) * s;

    var tr = this.trail;
    for (var i = TRAIL - 1; i > 0; i--) {
      tr[i * 2] = tr[(i - 1) * 2];
      tr[i * 2 + 1] = tr[(i - 1) * 2 + 1];
    }
    tr[0] = this.head.x; tr[1] = this.head.y;

    gl.viewport(0, 0, this.viewW, this.viewH);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    var p = this.prog;
    gl.useProgram(p);
    gl.uniform2f(uloc(gl, p, 'uAspect'), this.aspect[0], this.aspect[1]);
    gl.uniform2fv(uloc(gl, p, 'uTrail'), tr);
    gl.uniform1i(uloc(gl, p, 'uTrailN'), TRAIL);
    gl.uniform1f(uloc(gl, p, 'uWidth'), o.width);
    gl.uniform1f(uloc(gl, p, 'uTaper'), o.taper);
    gl.uniform1f(uloc(gl, p, 'uLick'), o.lick);
    gl.uniform1f(uloc(gl, p, 'uDetail'), o.flameDetail);
    gl.uniform1f(uloc(gl, p, 'uFlameSpeed'), o.flameSpeed);
    gl.uniform1f(uloc(gl, p, 'uFlare'), o.flare);
    gl.uniform1f(uloc(gl, p, 'uOutline'), o.outline);
    gl.uniform1f(uloc(gl, p, 'uSparks'), o.sparks);
    gl.uniform1f(uloc(gl, p, 'uTime'), this.time);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    this._raf = requestAnimationFrame(this._loop);
  };

  FireCursorController.prototype.destroy = function () {
    if (this._dead) return;
    cancelAnimationFrame(this._raf);
    window.removeEventListener('pointermove', this._onMove);
    window.removeEventListener('resize', this._onResize);
    document.removeEventListener('visibilitychange', this._onVis);
    if (this.options.hideCursor) document.documentElement.style.cursor = this._prevCursor || '';
    if (this.canvas) this.canvas.remove();
    this._dead = true;
  };

  var active = null;
  var FireCursor = {
    init: function (options) {
      if (active) active.destroy();
      active = new FireCursorController(options);
      return active;
    },
    destroy: function () { if (active) { active.destroy(); active = null; } },
    get current() { return active; }
  };
  global.FireCursor = FireCursor;

  if (typeof document !== 'undefined') {
    var cur = document.currentScript;
    if (cur && cur.hasAttribute('data-fire-cursor')) {
      var boot = function () { FireCursor.init(); };
      if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
      else boot();
    }
  }
})(typeof window !== 'undefined' ? window : this);
