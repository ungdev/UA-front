export const generateTextBorderStyle = (size) => {
  const totalArraySize = (2 * size + 1) ** 2 - 1;
  const shadows = [...Array(totalArraySize).keys()].map((i) => {
    let y = i % (2 * size + 1);
    let x = (i - y) / (2 * size + 1);
    y -= size;
    x -= size;
    if ((x > 0 && y > 0) || (x === 0 && y === 0)) {
      x++;
      y++;
    }
    return `${x}px ${y}px 0 #000`;
  });
  return { textShadow: shadows.join(',') };
};
