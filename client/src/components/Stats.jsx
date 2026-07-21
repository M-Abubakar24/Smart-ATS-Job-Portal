const Stats = () => {
  const stats = [
    {
      number: "10K+",
      title: "Jobs Posted",
    },
    {
      number: "2.5K+",
      title: "Companies",
    },
    {
      number: "20K+",
      title: "Candidates",
    },
    {
      number: "95%",
      title: "ATS Success",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

          {stats.map((item, index) => (
            <div
              key={index}
              className="shadow-lg rounded-xl p-8 text-center hover:shadow-2xl transition"
            >
              <h2 className="text-4xl font-bold text-indigo-600">
                {item.number}
              </h2>

              <p className="mt-3 text-gray-600">
                {item.title}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Stats;