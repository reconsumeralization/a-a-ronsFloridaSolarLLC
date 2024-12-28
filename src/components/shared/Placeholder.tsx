"use client";

interface PlaceholderProps {
  width: number;
  height: number;
  text?: string;
}

export function Placeholder({ width, height, text }: PlaceholderProps) {
  return (
    <div
      className="bg-gray-200 rounded-lg flex items-center justify-center"
      style={{ width, height }}
    >
      <span className="text-gray-400 text-sm">
        {text || `${width}x${height}`}
      </span>
    </div>
  );
}
