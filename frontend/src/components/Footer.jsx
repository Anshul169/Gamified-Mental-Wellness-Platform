import { FacebookIcon, InstagramIcon, TwitterIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 px-16">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8 px-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">Quick Links</h2>
          <ul className="space-y-1 text-gray-300">
            <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
            <li><a href="#" className="hover:text-white transition">Resources</a></li>
            <li><a href="#" className="hover:text-white transition">Contact</a></li>
            <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
          </ul>
        </div>
        <img src="/homeImage.png" width={100} height={100} />
        <div>
          <h2 className="text-lg font-semibold mb-2">Connect With Us</h2>
          <div className="flex space-x-4 text-gray-300">
            <a href="#" aria-label="Facebook" className="hover:text-white transition">
              <FacebookIcon size={24} />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-white transition">
              <TwitterIcon size={24} />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-white transition">
              <InstagramIcon size={24} />
            </a>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-8 border-t border-gray-700 pt-4 text-center text-gray-400">
        <p>&copy; 2024 Nirvana. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer