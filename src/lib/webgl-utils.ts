/**
 * WebGL 工具函数 - 用于伪渲染效果
 */

export interface ShaderUniforms {
  [key: string]: {
    type: 'float' | 'vec2' | 'vec3' | 'vec4' | 'sampler2D' | 'int';
    value: number | number[] | WebGLTexture | null;
  };
}

export interface WebGLContext {
  gl: WebGLRenderingContext;
  program: WebGLProgram;
  uniforms: { [key: string]: WebGLUniformLocation };
  attributes: { [key: string]: number };
  textures: Map<string, WebGLTexture>;
}

/**
 * 编译 Shader
 */
export function compileShader(
  gl: WebGLRenderingContext,
  source: string,
  type: number
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compile error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

/**
 * 创建 WebGL 程序
 */
export function createProgram(
  gl: WebGLRenderingContext,
  vertexSource: string,
  fragmentSource: string
): WebGLProgram | null {
  const vertexShader = compileShader(gl, vertexSource, gl.VERTEX_SHADER);
  const fragmentShader = compileShader(gl, fragmentSource, gl.FRAGMENT_SHADER);

  if (!vertexShader || !fragmentShader) return null;

  const program = gl.createProgram();
  if (!program) return null;

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program link error:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }

  return program;
}

/**
 * 初始化 WebGL 上下文
 */
export function initWebGL(
  canvas: HTMLCanvasElement,
  vertexSource: string,
  fragmentSource: string,
  uniformNames: string[]
): WebGLContext | null {
  const gl = canvas.getContext('webgl', {
    premultipliedAlpha: false,
    preserveDrawingBuffer: true,
  });

  if (!gl) {
    console.error('WebGL not supported');
    return null;
  }

  const program = createProgram(gl, vertexSource, fragmentSource);
  if (!program) return null;

  // 获取 uniform 位置
  const uniforms: { [key: string]: WebGLUniformLocation } = {};
  uniformNames.forEach(name => {
    const location = gl.getUniformLocation(program, name);
    if (location) uniforms[name] = location;
  });

  // 获取 attribute 位置
  const attributes: { [key: string]: number } = {
    position: gl.getAttribLocation(program, 'a_position'),
    texCoord: gl.getAttribLocation(program, 'a_texCoord'),
  };

  return {
    gl,
    program,
    uniforms,
    attributes,
    textures: new Map(),
  };
}

/**
 * 设置全屏四边形顶点
 */
export function setupQuad(ctx: WebGLContext): void {
  const { gl, attributes } = ctx;

  // 位置缓冲
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]),
    gl.STATIC_DRAW
  );

  if (attributes.position >= 0) {
    gl.enableVertexAttribArray(attributes.position);
    gl.vertexAttribPointer(attributes.position, 2, gl.FLOAT, false, 0, 0);
  }

  // 纹理坐标缓冲
  const texCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
      0, 1,
      1, 1,
      0, 0,
      0, 0,
      1, 1,
      1, 0,
    ]),
    gl.STATIC_DRAW
  );

  if (attributes.texCoord >= 0) {
    gl.enableVertexAttribArray(attributes.texCoord);
    gl.vertexAttribPointer(attributes.texCoord, 2, gl.FLOAT, false, 0, 0);
  }
}

/**
 * 从图片创建纹理
 */
export function createTextureFromImage(
  gl: WebGLRenderingContext,
  image: HTMLImageElement | HTMLCanvasElement
): WebGLTexture | null {
  const texture = gl.createTexture();
  if (!texture) return null;

  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

  return texture;
}

/**
 * 从 URL 加载图片并创建纹理
 */
export function loadTextureFromURL(
  gl: WebGLRenderingContext,
  url: string
): Promise<WebGLTexture | null> {
  return new Promise((resolve) => {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => {
      resolve(createTextureFromImage(gl, image));
    };
    image.onerror = () => {
      console.error('Failed to load texture:', url);
      resolve(null);
    };
    image.src = url;
  });
}

/**
 * 设置 uniform 值
 */
export function setUniform(
  gl: WebGLRenderingContext,
  location: WebGLUniformLocation,
  type: string,
  value: number | number[]
): void {
  switch (type) {
    case 'float':
      gl.uniform1f(location, value as number);
      break;
    case 'int':
      gl.uniform1i(location, value as number);
      break;
    case 'vec2':
      gl.uniform2fv(location, value as number[]);
      break;
    case 'vec3':
      gl.uniform3fv(location, value as number[]);
      break;
    case 'vec4':
      gl.uniform4fv(location, value as number[]);
      break;
  }
}

/**
 * 绑定纹理到指定单元
 */
export function bindTexture(
  gl: WebGLRenderingContext,
  texture: WebGLTexture,
  unit: number,
  uniformLocation: WebGLUniformLocation
): void {
  gl.activeTexture(gl.TEXTURE0 + unit);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.uniform1i(uniformLocation, unit);
}

/**
 * 渲染一帧
 */
export function render(ctx: WebGLContext): void {
  const { gl, program } = ctx;
  gl.useProgram(program);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
}

/**
 * 清理 WebGL 资源
 */
export function cleanup(ctx: WebGLContext): void {
  const { gl, program, textures } = ctx;

  textures.forEach(texture => {
    gl.deleteTexture(texture);
  });

  gl.deleteProgram(program);
}
