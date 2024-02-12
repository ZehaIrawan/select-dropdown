import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: React.ReactNode;
  target?: string | Element | null;
}

function createPortalNode(props: React.ComponentPropsWithoutRef<"div">) {
  const node = document.createElement("div");
  node.setAttribute("data-portal", "true");
  typeof props.className === "string" &&
    node.classList.add(...props.className.split(" ").filter(Boolean));
  typeof props.style === "object" && Object.assign(node.style, props.style);
  typeof props.id === "string" && node.setAttribute("id", props.id);
  return node;
}

const Portal: React.FC<PortalProps> = ({ children, target }) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const portalNodeRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
    portalNodeRef.current = !target
      ? createPortalNode({})
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

  return createPortal(children, portalNodeRef.current);
};

export default Portal;
