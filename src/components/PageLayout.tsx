import React, { ReactNode } from "react";
import cn from "classnames"; 
const PageLayout = ({ children, className }: { children: ReactNode, className?: string }) => {
  return (
    <section className={cn("pt-20 min-h-screen", className)}>
      {children}
    </section>
  );
};

export default PageLayout;
