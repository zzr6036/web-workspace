import Image from "next/image";

type PhotoProps = { name: string; alt: string; className?: string; priority?: boolean; src?: string };

export function Photo({ name, alt, className = "", priority = false, src }: PhotoProps) {
  return <div className={`photo ${className}`}><Image src={src ?? `/frames/${name}.png`} alt={alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 600px" priority={priority} /></div>;
}
