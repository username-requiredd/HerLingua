import { motion } from "framer-motion";
const Faq = () => {
  return (
    <>
      <div id="faq" className="bg-purple-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-pink-600">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about our German language courses
            </p>
          </div>

          <div className="mt-12 max-w-6xl mx-auto">
            <div className="flex flex-wrap justify-center gap-6">
              {[
                {
                  question: "How long does it take to become fluent?",
                  answer:
                    "Most students achieve conversational fluency (B1 level) within 6 months of consistent study. To reach advanced proficiency (C1 level), it typically takes 12-18 months depending on your dedication and prior language learning experience.",
                },
                {
                  question: "Do I need any prior knowledge of German?",
                  answer:
                    "Not at all! Our beginner courses start from absolute zero, assuming no prior knowledge of German or any other foreign language. Our structured approach ensures you'll build a solid foundation from day one.",
                },
                {
                  question: "How much time should I dedicate each week?",
                  answer:
                    "We recommend at least 5-7 hours per week for optimal progress. This includes 2-3 hours of guided lessons and 3-4 hours of practice and exercises. However, our flexible learning system allows you to adjust based on your schedule.",
                },
              ].map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex-1 min-w-[300px] max-w-[400px] mb-6 bg-white rounded-xl shadow-md overflow-hidden"
                >
                  <div className="p-6">
                    <h3 className="font-semibold text-lg text-pink-600">
                      {faq.question}
                    </h3>
                    <p className="mt-2 text-gray-600">{faq.answer}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Faq;
