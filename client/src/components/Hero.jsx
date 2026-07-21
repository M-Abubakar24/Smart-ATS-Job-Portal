const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-6 py-24">

        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left Side */}
          <div>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Find Your Dream Job Faster
            </h1>

            <p className="mt-6 text-lg text-gray-100">
              Build an ATS-friendly resume, discover matching jobs,
              and apply with confidence—all in one place.
            </p>

            {/* Search Bar */}
            <div className="mt-8 flex bg-white rounded-lg overflow-hidden shadow-lg">

              <input
                type="text"
                placeholder="Search jobs..."
                className="flex-1 px-5 py-4 text-gray-700 outline-none"
              />

              <button className="bg-indigo-800 px-8 font-semibold hover:bg-indigo-900">
                Search
              </button>

            </div>

          </div>

          {/* Right Side */}
          <div className="hidden md:flex justify-center">

            <div className="bg-white rounded-2xl shadow-2xl p-10 text-gray-700 w-80">

              <h3 className="text-2xl font-bold mb-6">
                ATS Resume Score
              </h3>

              <div className="text-6xl font-bold text-green-600">
                92%
              </div>

              <p className="mt-4">
                Resume optimized for modern Applicant Tracking Systems.
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;