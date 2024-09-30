// src/app/404.js

import Link from 'next/link';

const Custom404 = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Animated Container */}
      <div className="text-center p-6 rounded-lg shadow-lg bg-white transform transition duration-500 hover:scale-105">
        <h1 className="text-6xl font-bold text-gray-800 animate-bounce">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-600">Page Not Found</h2>
        <p className="mt-2 text-gray-500">
          Sorry, we couldn&apos;t find the page you were looking for.
        </p>
        <Link
          href="/"
          className="mt-4 inline-block px-4 py-2 text-white bg-blue-600 rounded-lg transition duration-300 hover:bg-blue-700 hover:shadow-lg"
        >
          Go back home
        </Link>
      </div>

      {/* Decorative SVG */}
      <svg
        className="absolute bottom-0 left-0 w-full h-32"
        viewBox="0 0 1440 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,64L30,85.3C60,107,120,149,180,170.7C240,192,300,192,360,170.7C420,149,480,107,540,96C600,85,660,107,720,128C780,149,840,171,900,170.7C960,171,1020,149,1080,144C1140,139,1200,149,1260,144C1320,139,1380,117,1410,106.7L1440,96L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320H0V64Z"
          fill="#93c5fd"
        />
      </svg>
    </div>
  );
};

export default Custom404;
