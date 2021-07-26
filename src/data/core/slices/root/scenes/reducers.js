import { resolveScene } from "./lib";

export const addScene = (state, { payload }) => {
  if (state.names.includes(payload.name)) return;

  state.names.push(payload.name);
  state.scenes.push(payload);
  state.scenes_by_name[payload.name] = payload;
};

export const removeScene = (state, { payload }) => {
  const scene = resolveScene(state, payload);

  if (!scene) return;

  const index = state.names.indexOf(scene.name);

  state.names.splice(index, 1);
  state.scenes.splice(index, 1);
  delete state.scenes_by_name[scene.name];
};

export const setActiveScene = (state, { payload }) => {
  const scene = resolveScene(state, payload);

  if (scene) state.active = scene;
};
