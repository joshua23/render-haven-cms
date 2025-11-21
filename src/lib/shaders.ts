/**
 * GLSL Shader 代码 - 伪渲染效果
 */

// 通用顶点着色器
export const vertexShader = `
attribute vec2 a_position;
attribute vec2 a_texCoord;
varying vec2 v_texCoord;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
  v_texCoord = a_texCoord;
}
`;

// ============================================
// 阶段一：水墨呼吸 (Ink Breathing) - 等待期
// ============================================
export const inkBreathingShader = `
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;
uniform sampler2D u_image;
uniform sampler2D u_noise;
uniform float u_blurAmount;
uniform float u_inkIntensity;

varying vec2 v_texCoord;

// 简化的模糊效果
vec4 blur(sampler2D tex, vec2 uv, vec2 resolution, float radius) {
  vec4 color = vec4(0.0);
  vec2 texelSize = 1.0 / resolution;

  // 9-tap 模糊
  for (float x = -1.0; x <= 1.0; x += 1.0) {
    for (float y = -1.0; y <= 1.0; y += 1.0) {
      vec2 offset = vec2(x, y) * texelSize * radius;
      color += texture2D(tex, uv + offset);
    }
  }

  return color / 9.0;
}

void main() {
  vec2 uv = v_texCoord;

  // 1. 获取模糊后的底图
  vec4 imageColor = blur(u_image, uv, u_resolution, u_blurAmount);

  // 2. 呼吸节奏 - 正弦波
  float breath = sin(u_time * 1.5) * 0.5 + 0.5;
  float breathSlow = sin(u_time * 0.8) * 0.5 + 0.5;

  // 3. 流动的水墨效果
  vec2 noiseUV = uv * 2.0 + vec2(u_time * 0.08, u_time * 0.05);
  float noise1 = texture2D(u_noise, noiseUV).r;

  vec2 noiseUV2 = uv * 3.0 - vec2(u_time * 0.06, u_time * 0.04);
  float noise2 = texture2D(u_noise, noiseUV2).r;

  // 组合噪声
  float combinedNoise = (noise1 * 0.6 + noise2 * 0.4);

  // 4. 水墨密度 - 随呼吸变化
  float inkDensity = combinedNoise * (0.3 + breath * 0.4);
  inkDensity = smoothstep(0.2, 0.8, inkDensity);

  // 5. 墨色
  vec3 inkColor = vec3(0.0, 0.0, 0.0);

  // 添加微妙的蓝色调（水墨感）
  float edgeTint = smoothstep(0.3, 0.7, combinedNoise);
  inkColor += vec3(0.0, 0.02, 0.05) * edgeTint * breathSlow;

  // 6. 混合水墨和图片
  float finalInk = inkDensity * u_inkIntensity;
  vec4 finalColor = mix(imageColor, vec4(inkColor, 1.0), finalInk);

  // 7. 添加边缘发光效果
  float edgeGlow = smoothstep(0.4, 0.6, combinedNoise) * breath * 0.1;
  finalColor.rgb += vec3(0.0, 0.3, 0.5) * edgeGlow;

  gl_FragColor = finalColor;
}
`;

// ============================================
// 阶段二：液态凝固 (Liquid Crystallization) - 接收期
// ============================================
export const liquidCrystallizationShader = `
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_progress; // 0.0 - 1.0 过渡进度
uniform sampler2D u_imageOld; // 模糊/原图
uniform sampler2D u_imageNew; // 高清图
uniform sampler2D u_noise;

varying vec2 v_texCoord;

void main() {
  vec2 uv = v_texCoord;

  // 1. 获取噪声值用于不规则过渡
  vec2 noiseUV = uv * 3.0 + vec2(u_time * 0.02);
  float noise = texture2D(u_noise, noiseUV).r;

  // 2. 计算径向扩散
  vec2 center = vec2(0.5, 0.5);
  float dist = length(uv - center);

  // 3. 扩散遮罩 - 从中心向外扩散
  float spread = u_progress * 1.5; // 扩大范围确保完全覆盖
  float edgeWidth = 0.15;

  // 噪声扰动边缘
  float noisyDist = dist + (noise - 0.5) * 0.15;

  // 平滑过渡
  float mask = smoothstep(spread, spread - edgeWidth, noisyDist);

  // 4. 获取两张图片
  vec4 oldColor = texture2D(u_imageOld, uv);
  vec4 newColor = texture2D(u_imageNew, uv);

  // 5. 混合图片
  vec4 mixedColor = mix(oldColor, newColor, mask);

  // 6. 边缘高光（液态玻璃效果）
  float edgeDist = abs(noisyDist - spread);
  float highlight = smoothstep(edgeWidth, 0.0, edgeDist);
  highlight *= (1.0 - step(1.0, u_progress)); // 完成后隐藏高光

  // 高光颜色 - 冷色调玻璃感
  vec3 highlightColor = vec3(0.7, 0.85, 1.0);
  mixedColor.rgb += highlightColor * highlight * 0.4;

  // 7. 添加涟漪效果
  float ripple = sin(noisyDist * 30.0 - u_time * 5.0) * 0.5 + 0.5;
  ripple *= highlight * 0.1;
  mixedColor.rgb += vec3(ripple);

  // 8. 完成时的边框闪光
  if (u_progress > 0.95) {
    float borderDist = min(min(uv.x, 1.0 - uv.x), min(uv.y, 1.0 - uv.y));
    float borderGlow = smoothstep(0.05, 0.0, borderDist);
    float flash = sin(u_time * 10.0) * 0.5 + 0.5;
    flash *= smoothstep(0.95, 1.0, u_progress);
    mixedColor.rgb += vec3(0.8, 0.9, 1.0) * borderGlow * flash * 0.5;
  }

  gl_FragColor = mixedColor;
}
`;

// ============================================
// 阶段三：水墨刀光 (Ink Slash) - 交互期
// ============================================
export const inkSlashShader = `
precision mediump float;

uniform vec2 u_resolution;
uniform float u_sliderPos; // 滑块位置 0.0 - 1.0
uniform float u_time;
uniform sampler2D u_imageOld; // 原图 (Before)
uniform sampler2D u_imageNew; // 高清图 (After)
uniform sampler2D u_noise;
uniform float u_inkWidth; // 水墨边缘宽度
uniform float u_glassHighlight; // 玻璃高光强度

varying vec2 v_texCoord;

void main() {
  vec2 uv = v_texCoord;

  // 1. 读取噪声，制造水墨边缘的随机感
  vec2 noiseUV = uv * 2.5 + vec2(0.0, u_time * 0.03);
  float noiseVal = texture2D(u_noise, noiseUV).r;

  // 第二层噪声增加复杂度
  vec2 noiseUV2 = uv * 4.0 + vec2(u_time * 0.02, 0.0);
  float noiseVal2 = texture2D(u_noise, noiseUV2).r;

  // 组合噪声
  float combinedNoise = noiseVal * 0.7 + noiseVal2 * 0.3;

  // 2. 计算不规则的分割线
  float disturbance = (combinedNoise - 0.5) * u_inkWidth;
  float divideLine = uv.x + disturbance;

  // 3. 软边缘遮罩（不是硬切割）
  float edgeSoftness = 0.008;
  float mask = smoothstep(u_sliderPos - edgeSoftness, u_sliderPos + edgeSoftness, divideLine);

  // 4. 获取两张图片的颜色
  vec4 oldColor = texture2D(u_imageOld, uv);
  vec4 newColor = texture2D(u_imageNew, uv);

  // 5. 混合图片 - 左边是新图，右边是旧图
  vec4 finalColor = mix(newColor, oldColor, mask);

  // 6. 液态玻璃高光 - 在分割线附近
  float dist = abs(divideLine - u_sliderPos);

  // 主高光
  float highlight = smoothstep(0.025, 0.0, dist) * u_glassHighlight;

  // 二次高光（更细的线）
  float highlight2 = smoothstep(0.008, 0.0, dist) * 0.3;

  // 高光颜色 - 冷白色
  vec3 highlightColor = vec3(0.9, 0.95, 1.0);

  // 7. 水墨晕染效果 - 在边缘添加墨韵
  float inkBleed = smoothstep(0.05, 0.0, dist) * (combinedNoise * 0.3);
  vec3 inkColor = vec3(0.0, 0.0, 0.0);

  // 8. 折射效果 - 轻微的 UV 偏移
  float refraction = highlight * 0.003;
  vec2 refractedUV = uv + vec2(refraction * (noiseVal - 0.5), 0.0);

  // 在高光区域应用折射
  vec4 refractedOld = texture2D(u_imageOld, refractedUV);
  vec4 refractedNew = texture2D(u_imageNew, refractedUV);
  vec4 refractedColor = mix(refractedNew, refractedOld, mask);

  finalColor = mix(finalColor, refractedColor, highlight * 0.5);

  // 9. 叠加效果
  finalColor.rgb = mix(finalColor.rgb, inkColor, inkBleed);
  finalColor.rgb += highlightColor * (highlight + highlight2);

  // 10. 边缘氛围光（微妙的环境反射）
  float ambientGlow = smoothstep(0.1, 0.0, dist) * 0.05;
  finalColor.rgb += vec3(0.0, 0.2, 0.4) * ambientGlow * (1.0 - combinedNoise);

  gl_FragColor = finalColor;
}
`;

// ============================================
// 液态玻璃覆盖层 Shader (用于静态装饰)
// ============================================
export const glassOverlayShader = `
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

varying vec2 v_texCoord;

void main() {
  vec2 uv = v_texCoord;

  // 1. 基础渐变 - 左上到右下
  float gradient = uv.x * 0.3 + uv.y * 0.3;

  // 2. 高光反射
  float highlight = smoothstep(0.0, 0.3, 1.0 - uv.x - uv.y);
  highlight *= 0.15;

  // 3. 边缘深色
  float edge = min(min(uv.x, 1.0 - uv.x), min(uv.y, 1.0 - uv.y));
  float shadow = smoothstep(0.0, 0.15, edge);

  // 4. 动态光斑
  float shimmer = sin(u_time * 2.0 + uv.x * 10.0) * 0.5 + 0.5;
  shimmer *= sin(u_time * 1.5 + uv.y * 8.0) * 0.5 + 0.5;
  shimmer *= 0.03;

  // 5. 组合
  vec4 color = vec4(0.0);
  color.rgb = vec3(1.0) * (highlight + shimmer);
  color.rgb += vec3(0.0, 0.0, 0.0) * (1.0 - shadow) * 0.2;
  color.a = highlight + shimmer + (1.0 - shadow) * 0.1;

  gl_FragColor = color;
}
`;

// 获取所有 uniform 名称
export const inkBreathingUniforms = [
  'u_resolution', 'u_time', 'u_image', 'u_noise', 'u_blurAmount', 'u_inkIntensity'
];

export const liquidCrystallizationUniforms = [
  'u_resolution', 'u_time', 'u_progress', 'u_imageOld', 'u_imageNew', 'u_noise'
];

export const inkSlashUniforms = [
  'u_resolution', 'u_sliderPos', 'u_time', 'u_imageOld', 'u_imageNew',
  'u_noise', 'u_inkWidth', 'u_glassHighlight'
];

export const glassOverlayUniforms = ['u_resolution', 'u_time'];
