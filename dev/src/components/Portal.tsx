import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

interface PortalProps {
  children: React.ReactNode;
  target: string | Element | null;
}

const Portal: React.FC<PortalProps> = ({ children, target }) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const portalNodeRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
    portalNodeRef.current = !target
      ? document.createElement("div")
      : typeof target === "string"
      ? document.querySelector(target)
      : (target as HTMLElement);

    if (!target && portalNodeRef.current) {
      document.body.appendChild(portalNodeRef.current);
    }

    return () => {
      if (!target && portalNodeRef.current) {
        document.body.removeChild(portalNodeRef.current);
      }
    };
  }, [target]);

  if (!mounted || !portalNodeRef.current) {
    return null;
  }

  return ReactDOM.createPortal(children, portalNodeRef.current);
};

export default Portal;
