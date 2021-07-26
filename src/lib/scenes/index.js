import {
  useCallback,
  useDispatch,
  useEffect,
  useMemo,
  useSelect,
  useState
} from "/lib/data";

export const importScenes = async (...names) =>
  Promise.all(
    names.map(async (name) => {
      console.log("MAP", name);
      const { default: Scene } = await import(`/scenes/${name}/index.jsx`);

      if (!Scene.displayName) Scene.displayName = name;

      return Scene;
    })
  );

export const useActiveScene = (scenes, { selector, action, initial }) => {
  const { setActiveSceneName } = useDispatch();
  const { active_scene_name } = useSelect((select) =>
    (selector ?? select("sazerac/core").getActiveSceneName)()
  );

  const dispatchAction = action ?? setActiveSceneName;

  return useMemo(() => {
    const index = Object.keys(scenes).indexOf(active_scene_name);
    const setActiveScene = (scene_name_index) => {
      let name;

      switch (typeof scene_name_index) {
        case "number":
          name = scenes[Object.keys(scenes)[scene_name_index]].name;
          break;
        case "string":
          name = scene_name_index;
          break;
        case "object":
          name = scene_name_index.name;
          break;
        default:
          throw new TypeError("Unkown scene resolvable.");
      }

      dispatchAction(name);
    };

    return {
      name: active_scene_name,
      index,
      scene: scenes[active_scene_name],
      setActiveScene,
      set: setActiveScene
    };
  }, [scenes, active_scene_name, dispatchAction]);
};

export const useScenes = (...scenes_or_names) => {
  const [scenes, setScenes] = useState({});

  const setScene = useCallback(
    (name, scene) => {
      if (!name) name = scene.displayName;

      setScenes({ ...scenes, [name]: scene });

      return scene;
    },
    [scenes]
  );

  const loadScene = useCallback(
    async (scene_or_name) => {
      let scene = Object.entries(scenes).find(([name, scene]) =>
        [name, scene, scene.displayName].includes(scene_or_name)
      );

      if (scene) return scene;

      if ("string" === typeof scene_or_name) {
        try {
          [scene] = await importScenes(scene_or_name);

          return setScene(scene, scene_or_name);
        } catch (err) {
          console.error(`No such scene: "${scene_or_name}" :: ${err}`);
          return;
        }
      }

      return setScene(scene);
    },
    [setScene, scenes]
  );

  useEffect(() => {
    for (const scene_or_name of scenes_or_names) {
      loadScene(scene_or_name);
    }
  }, [scenes_or_names, loadScene]);

  return {
    scenes,
    set: setScene
  };
};
