import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  FolderPlus,
  Layers,
  Ruler,
  MousePointerClick,
} from "lucide-react";

const stories = [
  {
    icon: FolderPlus,
    step: "Step 1",
    title: "Create a New Project",
    description:
      "Start by creating a new project in your dashboard. Give it a name, select a device type, and you're ready to go. Each project acts as a container for all your screenshot slides.",
    details: [
      "Name your project for easy organization",
      "Choose from iPhone, Android, iPad, or Desktop",
      "Set up in under 10 seconds",
    ],
    visual: (
      <div className="relative w-full max-w-sm mx-auto">
        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <FolderPlus className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="h-3 w-28 bg-foreground/80 rounded" />
              <div className="h-2 w-20 bg-muted-foreground/40 rounded mt-1.5" />
            </div>
          </div>
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-secondary border border-border/50">
              <div className="h-2.5 w-16 bg-muted-foreground/40 rounded mb-2" />
              <div className="h-8 rounded bg-muted border border-border/50" />
            </div>
            <div className="p-3 rounded-lg bg-secondary border border-border/50">
              <div className="h-2.5 w-20 bg-muted-foreground/40 rounded mb-2" />
              <div className="flex gap-2">
                {["iPhone", "Android", "iPad"].map((d) => (
                  <div
                    key={d}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium border ${d === "iPhone" ? "bg-primary/20 border-primary/40 text-primary" : "bg-muted border-border/50 text-muted-foreground"}`}
                  >
                    {d}
                  </div>
                ))}
              </div>
            </div>
            <div className="h-9 rounded-lg bg-primary/80 flex items-center justify-center">
              <div className="h-2.5 w-20 bg-primary-foreground/80 rounded" />
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: Layers,
    step: "Step 2",
    title: "Add Slides to Your Project",
    description:
      "Each slide represents one screenshot. Add multiple slides to create a complete set for your App Store or Play Store listing. Reorder them with drag-and-drop.",
    details: [
      "Add unlimited slides per project",
      "Drag-and-drop to reorder",
      "Duplicate slides to save time",
    ],
    visual: (
      <div className="relative w-full max-w-sm mx-auto">
        <div className="glass-card p-5 space-y-3">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.4 }}
              className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${i === 1 ? "bg-primary/10 border-primary/30" : "bg-secondary border-border/50"}`}
            >
              <div className="w-12 h-16 rounded-lg bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground border border-border/50">
                {i}
              </div>
              <div className="flex-1 space-y-1.5">
                <div className="h-2.5 w-24 bg-foreground/60 rounded" />
                <div className="h-2 w-16 bg-muted-foreground/40 rounded" />
              </div>
              <div className="flex gap-1">
                <div className="w-6 h-6 rounded bg-muted" />
                <div className="w-6 h-6 rounded bg-muted" />
              </div>
            </motion.div>
          ))}
          <div className="flex items-center justify-center p-3 rounded-xl border-2 border-dashed border-primary/30 text-primary/60 text-sm font-medium cursor-pointer hover:bg-primary/5 transition-colors">
            + Add New Slide
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: Ruler,
    step: "Step 3",
    title: "Set Custom Dimensions",
    description:
      "Need specific dimensions for different platforms? Set custom width and height for pixel-perfect results. We support all major app store screenshot sizes out of the box.",
    details: [
      "Preset sizes for every app store",
      "Custom pixel dimensions",
      "Automatic aspect ratio lock",
    ],
    visual: (
      <div className="relative w-full max-w-sm mx-auto">
        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <Ruler className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">
              Canvas Size
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-secondary border border-border/50 text-center">
              <div className="text-xs text-muted-foreground mb-1">Width</div>
              <div className="text-lg font-bold text-foreground font-display">
                1290
              </div>
              <div className="text-xs text-muted-foreground">px</div>
            </div>
            <div className="p-3 rounded-lg bg-secondary border border-border/50 text-center">
              <div className="text-xs text-muted-foreground mb-1">Height</div>
              <div className="text-lg font-bold text-foreground font-display">
                2796
              </div>
              <div className="text-xs text-muted-foreground">px</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-xs text-muted-foreground font-medium">
              Quick Presets
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                "iPhone 6.7\"",
                "iPhone 6.1\"",
                "iPad 12.9\"",
                "Android",
              ].map((preset, i) => (
                <div
                  key={preset}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border cursor-pointer transition-colors ${i === 0 ? "bg-primary/20 border-primary/40 text-primary" : "bg-muted border-border/50 text-muted-foreground hover:border-primary/30"}`}
                >
                  {preset}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: MousePointerClick,
    step: "Step 4",
    title: "Customize & Export",
    description:
      "Use our powerful visual editor to add backgrounds, text overlays, device frames, and effects. When you're happy, export all slides in one click as high-quality PNGs.",
    details: [
      "Rich visual editor with live preview",
      "Add text, backgrounds, and device frames",
      "Batch export all slides at once",
    ],
    visual: (
      <div className="relative w-full max-w-sm mx-auto">
        <div className="glass-card p-4">
          <div className="flex items-center gap-1.5 px-2 py-2 border-b border-border/50 mb-3">
            <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-primary/60" />
            <div className="ml-auto flex gap-1">
              <div className="px-2 py-0.5 rounded text-[10px] bg-primary/20 text-primary font-medium">
                Export
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-16 space-y-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-full h-10 rounded border ${i === 1 ? "border-primary/50 bg-primary/10" : "border-border/50 bg-muted"}`}
                />
              ))}
            </div>
            <div className="flex-1 aspect-[9/16] rounded-lg bg-gradient-to-br from-primary/20 via-secondary to-primary/10 border border-border/50 flex items-center justify-center">
              <div className="w-2/3 h-4/5 rounded-2xl border-2 border-foreground/20 bg-background/50 p-2">
                <div className="w-full h-full rounded-xl bg-muted/50" />
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

const StoryCard = ({
  story,
  index,
}: {
  story: (typeof stories)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className="relative"
    >
      {/* Connecting line */}
      {index < stories.length - 1 && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full w-px h-20 md:h-28 bg-gradient-to-b from-primary/40 to-transparent hidden md:block" />
      )}

      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center ${isEven ? "" : "md:[direction:rtl]"}`}
      >
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? -60 : 60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="md:[direction:ltr]"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <story.icon className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">
              {story.step}
            </span>
          </div>

          <h3 className="font-display text-2xl md:text-3xl font-bold mb-4 text-foreground">
            {story.title}
          </h3>

          <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
            {story.description}
          </p>

          <ul className="space-y-3">
            {story.details.map((detail, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  delay: 0.3 + i * 0.1,
                  duration: 0.4,
                }}
                className="flex items-center gap-3 text-sm text-muted-foreground"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                {detail}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? 60 : -60, scale: 0.9 }}
          animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="md:[direction:ltr]"
        >
          {story.visual}
        </motion.div>
      </div>
    </motion.div>
  );
};

const StorySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 px-4 relative overflow-hidden" id="features" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />

      <div className="container max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 md:mb-28"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
            How It Works
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            From Idea to App Store
            <span className="gradient-text block">In Four Simple Steps</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Follow our streamlined workflow to create professional app
            screenshots that convert. No design degree needed.
          </p>
        </motion.div>

        <div className="space-y-20 md:space-y-32">
          {stories.map((story, index) => (
            <StoryCard key={story.step} story={story} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StorySection;
