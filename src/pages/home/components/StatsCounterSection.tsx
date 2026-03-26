import { motion } from "framer-motion";
import FancyCounter from "./FancyCounter";

const StatsSection = () => {
  return (
    <section className="relative w-full py-24   overflow-hidden">

      {/* 🔥 Animated Background Glow */}
      <div className="absolute inset-0">
        <div className="w-full h-full bg-gradient-to-r from-emerald-500/10 via-transparent to-emerald-500/10 blur-3xl animate-pulse"></div>
      </div>

      {/* 🔥 Content */}
      <div className="relative max-w-7xl mx-auto px-6">

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center"
        >

          {[
           { value: 2500, label: "Donations Made" },
            { value: 120, label: "Active Campaigns" },
            { value: 800, label: "Happy Donors" },
            { value: 35, label: "NGO Partners" }
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6 }}
              className="space-y-3"
            >
              <FancyCounter target={item.value} />
              <p className="text-gray-400 text-sm tracking-wide">
                {item.label}
              </p>
            </motion.div>
          ))}

        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;