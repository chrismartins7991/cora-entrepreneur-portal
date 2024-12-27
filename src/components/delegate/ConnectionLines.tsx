import { useIsMobile } from "@/hooks/use-mobile";

export const ConnectionLines = () => {
  const isMobile = useIsMobile();

  if (isMobile) return null;

  return (
    <svg className="absolute w-full h-full max-w-[800px]" style={{ zIndex: 0 }}>
      <line 
        x1="50%" 
        y1="50%" 
        x2="30%" 
        y2="30%" 
        stroke="rgba(139, 92, 246, 0.2)" 
        strokeWidth="2"
      />
      <line 
        x1="50%" 
        y1="50%" 
        x2="70%" 
        y2="30%" 
        stroke="rgba(139, 92, 246, 0.2)" 
        strokeWidth="2"
      />
      <line 
        x1="50%" 
        y1="50%" 
        x2="30%" 
        y2="70%" 
        stroke="rgba(139, 92, 246, 0.2)" 
        strokeWidth="2"
      />
      <line 
        x1="50%" 
        y1="50%" 
        x2="70%" 
        y2="70%" 
        stroke="rgba(139, 92, 246, 0.2)" 
        strokeWidth="2"
      />
    </svg>
  );
};