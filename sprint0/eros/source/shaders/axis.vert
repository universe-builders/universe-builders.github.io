#version 300 es

in vec4 model_vertex; // model space position of the vertex.
in vec4 color;        // vertex color.

uniform mat4 model_to_world; // model space -> world space.
uniform mat4 world_to_view; // world space -> view space. (inverse of the camera matrix).
uniform mat4 project_view_to_clip; // view space -> clip space using a projection.

out vec4 v_color; // interpolated color sent to fragment shader.

void main() {
  gl_Position = (project_view_to_clip * world_to_view * model_to_world * model_vertex);
  v_color = color;
}