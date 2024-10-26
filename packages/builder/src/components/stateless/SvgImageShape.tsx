export interface SvgImageProps {
  width: number;
  height: number;
  fillColor: string;
  sides: number;
}

export const SvgImage = ({ width, height, fillColor, sides }: SvgImageProps) => {
  const shape = sides > 2 ? (
    <polygon
      points={generateStarPoints(width, height, sides)}
      fill={fillColor}
    />
  ) : (
    <circle cx={width / 2} cy={height / 2} r={Math.min(width, height) / 2} fill={fillColor} />
  );
  return (
    <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg">
      {shape}
      <text style={{ fontSize: `${40}px`, fontWeight: 'bold'}}  x={width / 2} y={height / 2 } textAnchor="middle" alignmentBaseline="middle">
        {sides}
      </text>
    </svg>
  );
};

const generateStarPoints = (width: number, height: number, sides: number) => {
  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.min(width, height) / 2;
  const angle = (Math.PI * 2) / sides;
  let points = "";

  for (let i = 0; i < sides; i++) {
    const x = cx + radius * Math.cos(i * angle);
    const y = cy + radius * Math.sin(i * angle);
    points += `${x},${y} `;
  }

  return points;
};
