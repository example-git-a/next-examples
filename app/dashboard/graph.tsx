
import mermaid from "mermaid";
import { useRef, useEffect } from "react";



export  default function Mermaid({ src }: { src: string; }) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (src) {
            mermaid.init({'theme':'dark'}, ref.current!);
        }
    }, [ref.current, src])

    return (
        src &&
        <div ref={ref} key={src}>
            {src}
        </div>
    );
}