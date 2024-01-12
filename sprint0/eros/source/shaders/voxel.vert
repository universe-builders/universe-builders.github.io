#version 300 es

precision highp int;
precision highp float;

in vec4 model_vertex; // model space position of the vertex.
in vec3 world_translation; // The translation of the voxel in world coordinates.
//in vec4 color;        // vertex color.
in float texture_coordinate;

//uniform mat4 model_to_world; // model space -> world space.
uniform mat4 world_to_view; // world space -> view space. (inverse of the camera matrix).
uniform mat4 project_view_to_clip; // view space -> clip space using a projection.

//out vec4 v_color; // interpolated color sent to fragment shader.
flat out float v_texture_coordinate;

void main() {
  mat4 model_to_world = mat4(0.0);
  model_to_world[0] = vec4(1.0, 0.0, 0.0, 0.0);
  model_to_world[1] = vec4(0.0, 1.0, 0.0, 0.0);
  model_to_world[2] = vec4(0.0, 0.0, 1.0, 0.0);
  model_to_world[3] = vec4(world_translation.xyz, 1.0);

  gl_Position = (project_view_to_clip * world_to_view * model_to_world * model_vertex);
  //v_color = color;

  v_texture_coordinate = texture_coordinate;
}