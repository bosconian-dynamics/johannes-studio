export const List = ({
  activeIndex = -1,
  children,
  className,
  ordered = false,
  ...props
}) => {
  if (activeIndex > -1) children = [children[activeIndex]];

  const element = ordered ? (
    <ol className={`list ${className}`} {...props}>
      {children}
    </ol>
  ) : (
    <ul className={`list ${className}`} {...props}>
      {children}
    </ul>
  );

  return element;
};
