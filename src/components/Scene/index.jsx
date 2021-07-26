import { SceneList } from "./components/List";

export const Scene = ({ name, children, className = "", slug, ...props }) => {
  if (!slug) slug = name.toLowerCase().replace(" ", "-");

  const classes = ["scene", `scene-${slug}`, ...className.split(" ")];

  return (
    <div className={classes.join(" ")} data-name={name}>
      {children}
    </div>
  );
};

Scene.List = SceneList;

export { SceneList };
