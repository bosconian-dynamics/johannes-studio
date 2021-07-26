import { useScenes, useActiveScene } from "/lib/scenes";

import "./style.scss";

export function App() {
  const { scenes } = useScenes("BlockEditor");
  const active_scene = useActiveScene(scenes);

  console.log("APP RENDER", scenes);

  return (
    <div className="app">
      <header>
        <h2>Berlin Editor{active_scene && `: ${active_scene.name}`}</h2>
      </header>
      {Object.entries(scenes).map((Scene) => (
        <Scene key={Scene.displayName} />
      ))}
    </div>
  );
}
