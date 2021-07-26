export const resolveScene = (state, scene) => {
  switch (typeof scene) {
    case "object":
      return state.scenes.includes(scene) ? scene : null;

    case "number":
      return state.scenes[scene];

    case "string":
      return state.scenes_by_name[scene];

    default:
      return null;
  }
};
