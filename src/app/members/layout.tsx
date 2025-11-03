import React from "react";

import { User } from "lucide-react";

export default function MembersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav className="bg-white shadow-sm px-6 py-4 mb-2">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src="/basic-name-logo.png"
              alt="FATEC Sorocaba"
              className="h-8"
            />
          </div>
          <div>
            <User />
          </div>
        </div>
      </nav>
      <div className="flex justify-center w-full">
        <div className="max-w-[800px] w-full px-4">{children}</div>
      </div>
    </>
  );
}
