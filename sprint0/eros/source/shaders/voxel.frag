#version 300 es

precision highp int;
precision highp float;

// the varied color passed from the vertex shader
//in vec4 v_color;
flat in float v_texture_coordinate;
uniform sampler2D texture_ID;


// we need to declare an output for the fragment shader
out vec4 outColor;

void main() {
  outColor = texture(texture_ID, vec2(v_texture_coordinate, 0));
}