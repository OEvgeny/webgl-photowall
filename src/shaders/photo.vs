uniform vec3 camPos;
varying vec2 vUv;
varying vec4 pos;

void main() {
  vUv = uv;
  pos = vec4(camPos, 1.0) + modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix *
                modelViewMatrix * vec4(position, 1.0);
}
