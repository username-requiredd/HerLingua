const Navbar = ({ setShowModal, isScrolled }) => {
  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold text-xl">
            H
          </div>
          <span className="ml-2 font-bold text-xl text-pink-600">
            HerLingua
          </span>
        </div>
        <div className="hidden md:flex space-x-6">
          <a href="#features" className="hover:text-pink-600 transition">
            Features
          </a>
          <a href="#courses" className="hover:text-pink-600 transition">
            Courses
          </a>
          <a href="#testimonials" className="hover:text-pink-600 transition">
            Testimonials
          </a>
          <a href="#faq" className="hover:text-pink-600 transition">
            FAQ
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
