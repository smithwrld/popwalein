"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";

interface NavItem {
  name: string;
  path: string;
}

interface NavHeaderProps {
  items: NavItem[];
  showUserIcon?: boolean;
  userIconPath?: string;
}

function NavHeader({ items, showUserIcon = false, userIconPath = "/auth" }: NavHeaderProps) {
  const location = useLocation();
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  // Initialize position for active tab on mount
  React.useEffect(() => {
    const activeIndex = items.findIndex(item => item.path === location.pathname);
    if (activeIndex !== -1) {
      const activeElement = document.querySelector(`[data-nav-index="${activeIndex}"]`) as HTMLElement;
      if (activeElement) {
        const { width } = activeElement.getBoundingClientRect();
        setPosition({
          width,
          opacity: 1,
          left: activeElement.offsetLeft,
        });
      }
    }
  }, [location.pathname, items]);

  return (
    <ul
      className="relative mx-auto flex w-fit rounded-full bg-black/40 backdrop-blur-xl border border-white/30 p-2 shadow-elegant flex-nowrap"
      onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
    >
      {items.map((item, index) => (
        <Tab key={item.name} setPosition={setPosition} item={item} index={index}>
          {item.name}
        </Tab>
      ))}

      {showUserIcon && (
        <li className="relative z-10 block ml-1">
          <Link
            to={userIconPath}
            className="flex items-center justify-center px-3 py-2 rounded-full hover:bg-white/25 transition-all duration-300 group"
            title="Admin Login"
          >
            <User className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-200" />
          </Link>
        </li>
      )}

      <Cursor position={position} />
    </ul>
  );
}

const Tab = ({
  children,
  setPosition,
  item,
  index,
}: {
  children: React.ReactNode;
  setPosition: any;
  item: NavItem;
  index: number;
}) => {
  const ref = useRef<HTMLLIElement>(null);
  const location = useLocation();
  const isActive = location.pathname === item.path;

  return (
    <li
      ref={ref}
      data-nav-index={index}
      onMouseEnter={() => {
        if (!ref.current) return;

        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          width,
          opacity: 1,
          left: ref.current.offsetLeft,
        });
      }}
      className="relative z-10 block"
    >
      <Link
        to={item.path}
        className={cn(
          "block cursor-pointer px-3 py-2 text-sm font-medium transition-all duration-300 relative z-10 whitespace-nowrap rounded-full",
          isActive 
            ? "text-white font-semibold after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 after:w-4 after:h-0.5 after:bg-white after:rounded-full" 
            : "text-white/80 hover:text-white"
        )}
      >
        {children}
      </Link>
    </li>
  );
};

const Cursor = ({ position }: { position: any }) => {
  return (
    <motion.li
      animate={position}
      className="absolute z-0 top-2 bottom-2 rounded-full bg-white/25 backdrop-blur-md border border-white/20"
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    />
  );
};

export default NavHeader;