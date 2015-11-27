precision highp float;
varying vec2 vUv;
varying vec4 pos;

uniform vec3 camPos;
uniform sampler2D frame;
uniform sampler2D texture;

uniform float fAlpha;
uniform float fSepia;

vec3 sepia (vec3 color, float value) {
  vec3 ret = vec3(
    dot(color, vec3(.393, .769, .189)),
    dot(color, vec3(.349, .686, .168)),
    dot(color, vec3(.272, .534, .131))
  );
  return mix(color, ret, value);
}

void main(void) {
  vec3 color = texture2D(texture, vUv).rgb;
  float spot = dot(normalize(pos).xyz, normalize(camPos));
  vec3 rColor = sepia(color, fSepia) * (0.7 + spot);
  float frameAlpha = texture2D(frame, vUv).a;
  
  gl_FragColor = vec4(rColor, (fAlpha + spot * 2.0) * frameAlpha);
}
