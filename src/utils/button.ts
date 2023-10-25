export const hasButtonOrLinkAncestor = (
  el: HTMLElement
): false | HTMLElement => {
  if (["A", "BUTTON"].includes(el.tagName)) return el;

  if (!el.parentElement) return false;

  return hasButtonOrLinkAncestor(el.parentElement);
};

export const handleClick = (
  e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent
) => {
  const el = hasButtonOrLinkAncestor(e.target as HTMLElement);

  if (!el) return;

  if ((el as HTMLButtonElement).disabled) {
    return;
  }

  const audio = new Audio("/click.wav");
  audio.play();
};
