import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Indie App Developer",
    avatar: "SC",
    content:
      "I used to spend hours in Figma making screenshots for every update. Now I do it in 5 minutes. This tool has been a game-changer for my workflow.",
    rating: 5,
  },
  {
    name: "Marco Rivera",
    role: "UI/UX Designer",
    avatar: "MR",
    content:
      "The template quality is outstanding. My clients are always impressed by the App Store visuals we create. Highly recommend for any design team.",
    rating: 5,
  },
  {
    name: "Alex Park",
    role: "Startup Founder",
    avatar: "AP",
    content:
      "We launched on Product Hunt and our App Store screenshots were one of the most complimented aspects. All made with this tool in under an hour.",
    rating: 5,
  },
];

const TestimonialCard = ({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
      className="group"
    >
      <div className="glass-card p-8 h-full relative overflow-hidden hover:border-primary/30 transition-colors">
        <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/10" />

        {/* Stars */}
        <div className="flex gap-1 mb-4">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-primary text-primary" />
          ))}
        </div>

        <p className="text-foreground/90 leading-relaxed mb-6 text-sm md:text-base">
          "{testimonial.content}"
        </p>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-sm font-bold text-primary">
            {testimonial.avatar}
          </div>
          <div>
            <div className="font-medium text-foreground text-sm">
              {testimonial.name}
            </div>
            <div className="text-xs text-muted-foreground">
              {testimonial.role}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const SocialProofSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 px-4 relative" ref={ref}>
      <div className="container max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
            Loved by Creators
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            What Our Users
            <span className="gradient-text block">Are Saying</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join thousands of developers and designers who trust AppLens to
            create their app store visuals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.name}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-8 text-muted-foreground/50"
        >
          {[
            "App Store Ready",
            "Play Store Ready",
            "Web Optimized",
            "Social Media Sizes",
          ].map((badge) => (
            <div
              key={badge}
              className="flex items-center gap-2 text-sm font-medium"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
              {badge}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProofSection;
