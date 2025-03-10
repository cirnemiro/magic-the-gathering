import Image from "next/image";

interface ManaCostProps {
  manaCost?: string;
}

export const manaSymbols: { [key: string]: string } = {
  W: "/manaIcons/plain.png",
  U: "/manaIcons/water.png",
  B: "/manaIcons/swamp.png",
  R: "/manaIcons/fire.png",
  G: "/manaIcons/forest.png",
};

export default function ManaCost({ manaCost }: ManaCostProps) {
  if (!manaCost) {
    return null;
  }

  const symbols = manaCost.match(/\{.*?\}/g) || [];

  return (
    <div className="flex items-center space-x-1">
      {symbols.map((symbol, index) => {
        const key = symbol.replace(/\{|\}/g, "");
        return manaSymbols[key] ? (
          <Image
            key={index}
            src={manaSymbols[key]}
            alt={`${key} mana`}
            width={15}
            height={15}
          />
        ) : (
          <span
            key={index}
            className="bg-gray-200 font-bold rounded-full w-[15px] h-[15px] text-center   text-black"
          >
            {key}
          </span>
        );
      })}
    </div>
  );
}
