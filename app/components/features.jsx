import { motion } from "framer-motion";

const Features = () => {
  return (
    <>
      <div id="features" className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-pink-600">
            A Revolutionary Way to Learn German
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Our scientifically proven methodology combines modern technology
            with traditional immersion techniques.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
          {[
            {
              title: "Interactive Lessons",
              description:
                "Engage in real conversations with AI-powered virtual natives",
              icon: "🎯",
            },
            {
              title: "Personalized Learning",
              description: "Adaptive system that focuses on your weak areas",
              icon: "🧠",
            },
            {
              title: "Cultural Immersion",
              description:
                "Learn the language within cultural context and nuances",
              icon: "🌍",
            },
            {
              title: "Certification Ready",
              description:
                "Prepare for official German language certifications",
              icon: "🏆",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-pink-600">
                {feature.title}
              </h3>
              <p className="text-gray-600 mt-2">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Methodology section */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-pink-600">
              Our Proven Methodology
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              A structured approach that takes you from complete beginner to
              confident speaker
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 border-l-2 border-dashed border-pink-300 h-full"></div>

            {[
              {
                title: "Foundation Building",
                description:
                  "Master essential vocabulary, pronunciation, and basic grammar through interactive exercises.",
                position: "left",
                icon: "📚",
              },
              {
                title: "Conversation Practice",
                description:
                  "Develop speaking confidence with our AI conversation partners and group sessions.",
                position: "right",
                icon: "💬",
              },
              {
                title: "Cultural Context",
                description:
                  "Learn how Germans think, interact, and express themselves through cultural notes and stories.",
                position: "left",
                icon: "🎭",
              },
              {
                title: "Real-World Application",
                description:
                  "Apply your knowledge in simulated real-life scenarios from ordering food to job interviews.",
                position: "right",
                icon: "🌉",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: step.position === "left" ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className={`relative mb-16 ${
                  step.position === "left" ? "md:text-right" : ""
                }`}
              >
                <div
                  className={`md:w-1/2 ${
                    step.position === "right" ? "md:ml-auto" : ""
                  }`}
                >
                  <div
                    className={`bg-white p-6 rounded-2xl shadow-lg ${
                      step.position === "left" ? "md:mr-8" : "md:ml-8"
                    }`}
                  >
                    <div className="flex items-center mb-4 text-pink-600">
                      <div
                        className={`text-3xl ${
                          step.position === "left"
                            ? "md:order-last md:ml-4"
                            : "mr-4"
                        }`}
                      >
                        {step.icon}
                      </div>
                      <h3 className="text-xl font-semibold">{step.title}</h3>
                    </div>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full border-4 border-pink-500 bg-white z-10 flex items-center justify-center">
                  <span className="font-bold text-pink-500">{i + 1}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
