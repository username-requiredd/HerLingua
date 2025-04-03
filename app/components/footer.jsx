import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-pink-200 py-6 mt-12">
      <div className="container mx-auto text-center text-pink-600 text-sm">
        <p>&copy; {new Date().getFullYear()} HerLingua. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
