import {  Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
   <footer className="bg-gradient-to-br from-[#f5f7fa] to-[#e9eef5] pt-20 pb-10">
  <div className="max-w-7xl mx-auto px-6">

    {/* Top Section */}
    <div className="grid md:grid-cols-4 gap-12">

      {/* Brand */}
      <div>
        <img src="/logo.png" className="w-30 h-8" alt="logo" />

        <p className="text-gray-500 mt-3 leading-relaxed text-sm">
          Empowering non-profits and individuals to change the world
          through modern fundraising technology.
        </p>

        {/* Social Icons */}
        <div className="flex gap-4 mt-5">
           <Link
              to={'https://www.linkedin.com/in/mohammedfazil20005/'} target="_blank"
              className="p-2 rounded-full bg-white shadow-sm hover:shadow-md hover:scale-110 transition cursor-pointer"
            >
              <Linkedin size={16} className="text-gray-600" />
            </Link>
        </div>
      </div>

      {/* Reusable Column */}
      {[
        {
          title: "Product",
          items: ["How It Works", "Pricing", "Success Stories", "Mobile App"],
        },
        {
          title: "Resources",
          items: ["Help Center", "Blog", "API Docs", "Partner Program"],
        },
        {
          title: "Company",
          items: ["About Us", "Careers", "Contact", "Privacy Policy"],
        },
      ].map((section, index) => (
        <div key={index}>
          <h4 className="font-semibold mb-4 text-gray-800 tracking-wide">
            {section.title}
          </h4>

          <ul className="space-y-2">
            {section.items.map((item, i) => (
              <li
                key={i}
                className="text-gray-500 text-sm cursor-pointer relative w-fit
                hover:text-gray-900 transition"
              >
                {item}
                <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-gray-800 transition-all duration-300 group-hover:w-full"></span>
              </li>
            ))}
          </ul>
        </div>
      ))}

    </div>

    

    {/* Divider */}
    <div className="border-t border-gray-200 mt-12 pt-6">

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">

        <p>© 2026 KINDRAISE INC. ALL RIGHTS RESERVED.</p>

        <div className="flex gap-6">
          <span className="hover:text-gray-700 cursor-pointer">Terms</span>
          <span className="hover:text-gray-700 cursor-pointer">Privacy</span>
          <span className="hover:text-gray-700 cursor-pointer">Cookies</span>
        </div>

      </div>
    </div>

  </div>
</footer>
  );
};

export default Footer;