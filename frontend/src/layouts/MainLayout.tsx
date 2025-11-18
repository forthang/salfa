import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="container mx-auto p-4">
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
