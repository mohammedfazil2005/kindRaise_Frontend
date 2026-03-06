import { Facebook, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#f5f7fa] pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top Section */}
        <div className="grid md:grid-cols-4 gap-12">

          {/* Brand */}
          <div>
            <img src="/logo.png" className="w-40 h-9" alt="" />

            <p className="text-gray-500 mt-1 leading-relaxed">
              Empowering non-profits and individuals to change the world
              through modern fundraising technology.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-bold mb-2">Product</h4>
            <ul className="space-y-1 text-gray-500">
              <li className="hover:text-gray-900 cursor-pointer text-sm font-extralight">How It Works</li>
              <li className="hover:text-gray-900 cursor-pointer text-sm font-extralight">Pricing</li>
              <li className="hover:text-gray-900 cursor-pointer text-sm font-extralight">Success Stories</li>
              <li className="hover:text-gray-900 cursor-pointer text-sm font-extralight">Mobile App</li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold mb-2">Resources</h4>
            <ul className="space-y-1 text-gray-500">
              <li className="hover:text-gray-900 cursor-pointer text-sm font-extralight">Help Center</li>
              <li className="hover:text-gray-900 cursor-pointer text-sm font-extralight">Blog</li>
              <li className="hover:text-gray-900 cursor-pointer text-sm font-extralight">API Docs</li>
              <li className="hover:text-gray-900 cursor-pointer text-sm font-extralight">Partner Program</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold mb-2">Company</h4>
            <ul className="space-y-1 text-gray-500">
              <li className="hover:text-gray-900 cursor-pointer text-sm font-extralight">About Us</li>
              <li className="hover:text-gray-900 cursor-pointer text-sm font-extralight">Careers</li>
              <li className="hover:text-gray-900 cursor-pointer text-sm font-extralight">Contact</li>
              <li className="hover:text-gray-900 cursor-pointer text-sm font-extralight">Privacy Policy</li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 mt-16 pt-8">

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">

            <p>© 2024 KINDRAISE INC. ALL RIGHTS RESERVED.</p>

            <div className="flex gap-5">
              <Facebook size={18} className="hover:text-gray-700 cursor-pointer" />
              <Twitter size={18} className="hover:text-gray-700 cursor-pointer" />
              <Linkedin size={18} className="hover:text-gray-700 cursor-pointer" />
            </div>

          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;