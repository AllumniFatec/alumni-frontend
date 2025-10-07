import React from "react";

export interface BaseContainerLayoutProps {
  children: React.ReactNode;
}
export const BaseContainerLayout = ({ children }: BaseContainerLayoutProps) => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div
        className="w-full h-full bg-transparent py-5 sm:pt-10 sm:bg-primary-foreground 
                      sm:min-h-[600px] sm:rounded-4xl sm:max-w-[90vw] sm:h-auto"
      >
        {children}
      </div>
    </div>
  );
};
