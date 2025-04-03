import { motion } from "framer-motion";
import Image from "next/image";
const Testimonials = () => {
  return (
    <>
      <div id="testimonials" className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-pink-600">
            Student Success Stories
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Hear from our students who transformed their lives through our
            German courses
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote:
                "After trying multiple language apps with no success, this course finally helped me become conversational in German. The structured approach and cultural context made all the difference.",
              name: "lydia Solomon",
              role: "Software Developer",
              city: "Nigeria",
              rating: 5,
              image: "/images/testimonials/lydia.jpeg",
            },
            {
              quote:
                "I needed to learn German quickly for my job relocation to Berlin. This course was perfect - practical, efficient, and focused on real-world communication. Within 3 months I was comfortable in business meetings.",
              name: "Sarah Lindemann",
              role: "Marketing Manager",
              city: "New York",
              rating: 5,
              image: "/images/testimonials/sarah.jpeg",
            },
            {
              quote:
                "The cultural immersion aspect of this course is what sets it apart. I not only learned the language but also understood how Germans think and communicate, which made my transition to living in Munich so much smoother.",
              name: "Abigail Micheal ",
              role: "Graduate Student",
              city: "Kenya",
              rating: 5,
              image: "/images/testimonials/abigail.jpeg",
            },
          ].map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-2xl shadow-lg"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="h-5 w-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              <div className="mt-6 flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image}
                    width={48}
                    height={48}
                    alt={testimonial.name}
                    className="rounded-full"
                  />
                </div>
                <div className="ml-4">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">
                    {testimonial.role}, {testimonial.city}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats section */}
        <div className="mt-20 bg-pink-500 rounded-2xl shadow-lg text-white p-10">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold">Our Impact in Numbers</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "10,000+", label: "Students" },
              { value: "93%", label: "Completion Rate" },
              { value: "87%", label: "Pass Official Exams" },
              { value: "47", label: "Countries" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-yellow-200">
                  {stat.value}
                </div>
                <div className="mt-2 text-pink-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonials;
