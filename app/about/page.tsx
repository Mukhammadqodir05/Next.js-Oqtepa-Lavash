import React from 'react';
import aboutImage from '/public/About/aboutImage.jpg';
import Navbar from '../pages/navbar';
import Footer from '../pages/footer';
import Image from 'next/image';

const About = () => {
  return (
    <div className="flex flex-col w-full p-0 h-full bg-black">
      <Navbar />
      <div className="w-full h-full text-white pt-[50px] flex flex-col justify-center items-center overflow-y-auto">
        <div className="md:w-3/2 flex flex-col items-center justify-center p-2 mt-[100px]">
          <Image
              src={aboutImage}
              alt="About Oqtepa Lavash company" 
              className="rounded-lg shadow-lg"
              style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
        <div className="md:w-[80%] mt-8 md:mt-0 md:ml-8 p-2">
          <h1 className="text-3xl font-bold gradient-text mb-4">Welcome to Oqtepa Lavash</h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            Oqtepa Lavash is a renowned fast food company that specializes in serving delicious and authentic fast foods. Our mission is to provide our customers with high-quality, freshly made fast foods that are packed with flavor and satisfaction.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed mt-4">
            With a focus on using premium ingredients and traditional recipes, we ensure that every bite of our food is a delightful experience. Whether you're looking for a quick meal on the go or a fulfilling snack, Oqtepa Lavash has got you covered.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
