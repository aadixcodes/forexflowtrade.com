
'use client';

import React from "react";
import { usePathname } from 'next/navigation';
import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn, FaSkype, FaWhatsapp  } from 'react-icons/fa';
import { MdOutlineMailOutline } from "react-icons/md";

const Footer2 = () => {
  const pathname = usePathname();

   // Hide footer on /admin or any route under /admin/*
   if (pathname.startsWith('/admin')) return null;
   if (pathname.startsWith('/dashboard')) return null;

  return (
    <footer className="bg-[#0D1C1A] text-white pt-8 pb-4 px-4">
      <div className="max-w-7xl mx-auto rounded-lg shadow-lg relative" style={{background: '#0D1C1A'}}>
        {/* Top border accent */}
        <div className="h-1 w-full absolute top-0 left-0 rounded-t-lg" style={{background: '#43B852'}} />
        <div className="flex flex-col items-center py-10 px-6">
          {/* Logo and site name */}
          <div className="flex items-center gap-4 mb-4">
            {/* Logo image */}
            <div className="p-4 flex items-center justify-center">
              <img 
                src="/assets/forexlogo3.png" 
                alt="ForexFlow Logo" 
                className="h-14 object-contain"
              />
            </div>
            {/* <span className="text-2xl font-bold tracking-wide">ForexFlow</span> */}
          </div>

          {/* Disclaimer text */}
          <p className="text-center text-xs italic text-white/50 max-w-5xl mb-6">
            Investment is risky. You should not spend more than you can afford to lose and should ensure that you fully understand the risks involved. Using the products offered may not be suitable for everyone. Before you use these products, please take into consideration your level of experience, financial objectives and seek independent advice if necessary. It is the responsibility of the Client to ascertain whether he/she is permitted to use the services of the ForexFlow brand based on the legal requirements in his/her country of residence. Client must be aware that profits are on market risk and thus firm does not commits assures or guarantees about the returns and profits.
            <br/> <br/> Investments in securities are subject to market risks, which includes price fluctuation risk. There is no assurance or guarantee that the objectives of any of the products mentioned in this document or on this site will be achieved.
          </p>

          {/* Address and contact info */}
          <div className="text-center text-sm text-gray-300 mb-4">
            Floor, 355 NEX Tower, Ruedu Savoir, Cybercity, Ebene 72201, Mauritius
            <div className="mt-2">
              <span className="font-semibold">Phone:</span> 409-748-1384<br />
              <span className="font-semibold">Email:</span> support@forexflow.com
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto text-center text-xs text-gray-400 pt-6">
        © {new Date().getFullYear()} <span className="font-semibold text-white">ForexFlow</span>. All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer2;