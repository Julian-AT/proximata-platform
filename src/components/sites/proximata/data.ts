// Page copy and asset paths for the confer.framer.website clone.
// Generated from docs/research/confer/content.json; keep wording identical to the source.

export const SOURCE_ORIGIN = "https://confer.framer.website";

const A = "/sites/confer";

export const navLinks = [
  { label: "About", href: `${SOURCE_ORIGIN}/about` },
  { label: "Speakers", href: `${SOURCE_ORIGIN}/speakers` },
  { label: "Venue", href: `${SOURCE_ORIGIN}/venue` },
  { label: "Contact", href: `${SOURCE_ORIGIN}/contact` },
] as const;

export const footerOtherLinks = [
  { label: "Policies", href: `${SOURCE_ORIGIN}/policies` },
  // The source labels this link "404" but points it at /venue.
  { label: "404", href: `${SOURCE_ORIGIN}/venue` },
] as const;

export const heroInfo = [
  { label: "Date", value: "18th November 2026" },
  { label: "City", value: "San Francisco, USA" },
  { label: "Venue", value: "Moscone Center, SF" },
] as const;

export const aboutParagraph =
  "First AI Summit brings together builders, thinkers, and pioneers shaping the next chapter of artificial intelligence. Spend the day with founders decoding real breakthroughs, engineers sharing hard-won lessons, and creators pushing what’s possible with machine intelligence. From hands-on demos to candid panel talks, this is where ideas turn into momentum. Come curious, leave inspired.";

export const tickerItems = [
  { label: "FOUNDER", icon: `${A}/images/ticker/founder.png` },
  { label: "DEVELOPER", icon: `${A}/images/ticker/developer.png` },
  { label: "DESIGNER", icon: `${A}/images/ticker/designer.png` },
  { label: "VIBE BUILDER", icon: `${A}/images/ticker/builder.png` },
  { label: "MARKETER", icon: `${A}/images/ticker/builder.png` },
] as const;

// The three visible cards (one per sticky row in the Learn section).
export const learnCards = [
  {
    title: "Get to Know AI",
    body: "The First AI Summit is the ultimate gathering for tech enthusiasts and industry expert level leaders.",
    image: "/sites/confer/images/learn/hand-left.png",
  },
  {
    title: "Ideate on It",
    body: "Join engaging discussions with tech enthusiasts, industry experts, and visionaries.",
    image: "/sites/confer/images/learn/hands-center.png",
  },
  {
    title: "Connect with People",
    body: "Network with experts, exchange ideas, and build valuable relationships that drive innovation.",
    image: "/sites/confer/images/learn/hand-right.png",
  },
] as const;

export const speakers = [
  {
    name: "Reggie Watts",
    role: "Chief AI Officer, Nexa",
    image: "/sites/confer/images/speakers/reggie-watts.png",
    instagram: "https://www.instagram.com/jitu.ux/",
    linkedin: "https://www.linkedin.com/in/jitendra-raut/",
  },
  {
    name: "Diana Nyad",
    role: "VP of Product Design, QNTM Labs",
    image: "/sites/confer/images/speakers/diana-nyad.png",
    instagram: "https://www.instagram.com/jitu.ux/",
    linkedin: "https://www.linkedin.com/in/jitendra-raut/",
  },
  {
    name: "Dr. Mark Hyman",
    role: "VP of Innovation, Horizon Ventures",
    image: "/sites/confer/images/speakers/mark-hyman.png",
    instagram: "https://www.instagram.com/jitu.ux/",
    linkedin: "https://www.linkedin.com/in/jitendra-raut/",
  },
  {
    name: "Valarie Kaur",
    role: "Founder & CEO, NeuralSphere",
    image: "/sites/confer/images/speakers/valarie-kaur.png",
    instagram: "https://www.instagram.com/jitu.ux/",
    linkedin: "https://www.linkedin.com/in/jitendra-raut/",
  },
  {
    name: "Tristan Harris",
    role: "Founder & CEO, InnovateX",
    image: "/sites/confer/images/speakers/tristan-harris.png",
    instagram: "https://www.instagram.com/jitu.ux/",
    linkedin: "https://www.linkedin.com/in/jitendra-raut/",
  },
  {
    name: "Donick Cary",
    role: "Head of AI Research, Synth Labs",
    image: "/sites/confer/images/speakers/donick-cary.png",
    instagram: "https://www.instagram.com/jitu.ux/",
    linkedin: "https://www.linkedin.com/in/jitendra-raut/",
  },
] as const;

export const metrics = [
  { value: "24", label: "Speakers" },
  { value: "30", label: "Sessions" },
  { value: "600+", label: "Attendees" },
  { value: "10", label: "Panels" },
] as const;

export type AgendaSpeaker = { name: string; role: string; image: string };
export type AgendaSession = {
  time: string;
  title: string;
  description: string;
  /** "row": single speaker beside the copy; "column": speakers below the copy. */
  layout: "row" | "column";
  speakers: AgendaSpeaker[];
};
export type AgendaDay = {
  day: string;
  theme: string;
  sessions: AgendaSession[];
};

export const agenda: AgendaDay[] = [
  {
    day: "Day : 1",
    theme: "Foundations & Vision",
    sessions: [
      {
        time: "11:00 – 11:45",
        title: "Opening Remarks",
        description:
          "A warm welcome from the First AI Summit team. We’ll walk you through the three days ahead—the speakers, the sessions, and the moments worth showing up for.",
        layout: "row",
        speakers: [
          {
            name: "Arjun Mehta",
            role: "AI Head",
            image: "/sites/confer/images/agenda/arjun-mehta.png",
          },
        ],
      },
      {
        time: "11:45 – 01:30",
        title: "Keynote: Shaping the Future with AI",
        description:
          "Our keynote speaker opens the event with a bold vision of where AI is heading — the shifts already happening and what’s coming next.",
        layout: "column",
        speakers: [
          {
            name: "Lucy Morgan",
            role: "CEO - X AI",
            image: "/sites/confer/images/agenda/lucy-morgan.png",
          },
        ],
      },
      {
        time: "03:00 – 05:00",
        title: "Panel: The State of AI in 2026",
        description:
          "Top founders and researchers explore where AI truly stands today — beyond the hype, beyond the headlines.",
        layout: "column",
        speakers: [
          {
            name: "Rohan Kapoor",
            role: "Founder, SynthMind",
            image: "/sites/confer/images/agenda/rohan-kapoor.png",
          },
          {
            name: "Elena Garcia",
            role: "ML Director, DataForge",
            image: "/sites/confer/images/agenda/elena-garcia.png",
          },
          {
            name: "David Kim",
            role: "AI Strategist, NexaTech",
            image: "/sites/confer/images/agenda/david-kim.png",
          },
          {
            name: "Priya Nair",
            role: "Innovation Head, DeepGrid",
            image: "/sites/confer/images/agenda/priya-nair.png",
          },
        ],
      },
    ],
  },
  {
    day: "Day : 2",
    theme: "Innovation & Execution",
    sessions: [
      {
        time: "10:00 – 11:30",
        title: "Workshop: Building AI-First Products",
        description:
          "A hands-on session focused on turning ideas into AI-powered products. Learn how to design, build, and launch scalable solutions using modern AI tools.",
        layout: "row",
        speakers: [
          {
            name: "Neha Sharma",
            role: "Product Lead, AIVerse",
            image: "/sites/confer/images/agenda/neha-sharma.png",
          },
        ],
      },
      {
        time: "11:45 – 01:00",
        title: "Talk: Designing Human-Centered AI",
        description:
          "Explore how to create AI experiences that feel intuitive, ethical, and user-first — balancing technology with real human needs.",
        layout: "column",
        speakers: [
          {
            name: "Daniel Ross",
            role: "UX Director, FutureLab",
            image: "/sites/confer/images/agenda/daniel-ross.png",
          },
        ],
      },
      {
        time: "02:00 – 03:30",
        title: "Case Study: Scaling AI in Real-World Systems",
        description:
          "A deep dive into how companies are successfully integrating AI into real-world products — challenges, learnings, and outcomes.",
        layout: "column",
        speakers: [
          {
            name: "Amelia Scott",
            role: "AI Product Lead",
            image: "/sites/confer/images/agenda/amelia-scott.png",
          },
          {
            name: "Henry Collins",
            role: "AI Architect",
            image: "/sites/confer/images/agenda/henry-collins.png",
          },
          {
            name: "Lisa Wong",
            role: "AI Consultant, GlobalEdge",
            image: "/sites/confer/images/agenda/lisa-wong.png",
          },
          {
            name: "Karan Rao",
            role: "Director of AI, NexGen",
            image: "/sites/confer/images/agenda/karan-rao.png",
          },
        ],
      },
    ],
  },
  {
    day: "Day : 3",
    theme: "Future & Connections",
    sessions: [
      {
        time: "10:00 – 11:15",
        title: "Talk: The Next Era of AI Innovation",
        description:
          "Explore what’s next for AI — from emerging breakthroughs to the long-term impact on industries, creativity, and everyday life.",
        layout: "row",
        speakers: [
          {
            name: "Daniel Brooks",
            role: "Data Scientist",
            image: "/sites/confer/images/agenda/daniel-brooks.png",
          },
        ],
      },
      {
        time: "11:30 – 01:00",
        title: "Workshop: From Idea to AI Startup",
        description:
          "Learn how to turn your AI ideas into real startups — covering validation, product building, and go-to-market strategies.",
        layout: "column",
        speakers: [
          {
            name: "Charlotte Reed",
            role: "AI Ethics Lead",
            image: "/sites/confer/images/agenda/charlotte-reed.png",
          },
        ],
      },
      {
        time: "02:00 – 03:30",
        title: "Fireside Chat: Building in the Age of AI",
        description:
          "An honest conversation with industry leaders on lessons, failures, and opportunities while building in the AI-driven world.",
        layout: "column",
        speakers: [
          {
            name: "James Walker",
            role: "AI Scientist",
            image: "/sites/confer/images/agenda/james-walker.png",
          },
          {
            name: "Oliva Bennett",
            role: "ML Engineer",
            image: "/sites/confer/images/agenda/oliva-bennett.png",
          },
          {
            name: "Sophia Turner",
            role: "AI Strategist",
            image: "/sites/confer/images/agenda/charlotte-reed.png",
          },
          {
            name: "William Hayes",
            role: "Chief AI Officer",
            image: "/sites/confer/images/agenda/william-hayes.png",
          },
        ],
      },
    ],
  },
];

export const agendaRays = `${A}/images/agenda/rays.png`;

export const sponsors = [
  {
    name: "OpenAI",
    width: 32,
    height: 32,
    svg: '<svg display="block" role="presentation" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M 14.745 6.547 C 15.106 5.457 14.981 4.265 14.401 3.274 C 13.528 1.755 11.774 0.974 10.061 1.34 C 9.096 0.267 7.632 -0.211 6.219 0.087 C 4.807 0.385 3.66 1.414 3.211 2.786 C 2.087 3.018 1.116 3.723 0.546 4.72 C -0.335 6.237 -0.135 8.15 1.041 9.451 C 0.678 10.54 0.802 11.734 1.381 12.725 C 2.255 14.245 4.011 15.026 5.725 14.658 C 6.488 15.516 7.583 16.005 8.731 16 C 10.486 16 12.042 14.867 12.579 13.196 C 13.703 12.964 14.674 12.259 15.243 11.262 C 16.114 9.748 15.913 7.846 14.745 6.547 M 8.731 14.953 C 8.03 14.954 7.351 14.709 6.813 14.26 L 6.907 14.206 L 10.093 12.367 C 10.254 12.272 10.353 12.1 10.355 11.913 L 10.355 7.422 L 11.701 8.2 C 11.715 8.207 11.724 8.22 11.727 8.235 L 11.727 11.957 C 11.723 13.61 10.384 14.949 8.731 14.953 M 2.291 12.202 C 1.939 11.595 1.813 10.884 1.934 10.193 L 2.029 10.25 L 5.217 12.089 C 5.378 12.183 5.577 12.183 5.737 12.089 L 9.633 9.843 L 9.633 11.398 C 9.632 11.414 9.624 11.429 9.611 11.439 L 6.384 13.3 C 4.95 14.125 3.119 13.634 2.291 12.202 M 1.451 5.264 C 1.805 4.653 2.364 4.188 3.028 3.948 L 3.028 7.733 C 3.026 7.919 3.125 8.092 3.287 8.184 L 7.163 10.42 L 5.817 11.199 C 5.802 11.206 5.784 11.206 5.769 11.199 L 2.549 9.342 C 1.118 8.513 0.627 6.682 1.451 5.248 Z M 12.515 7.834 L 8.627 5.576 L 9.97 4.8 C 9.985 4.792 10.003 4.792 10.017 4.8 L 13.237 6.66 C 14.243 7.24 14.823 8.348 14.727 9.505 C 14.63 10.662 13.875 11.659 12.787 12.064 L 12.787 8.278 C 12.781 8.093 12.678 7.924 12.515 7.834 M 13.855 5.818 L 13.761 5.762 L 10.579 3.907 C 10.417 3.813 10.217 3.813 10.055 3.907 L 6.163 6.153 L 6.163 4.598 C 6.162 4.582 6.169 4.567 6.182 4.557 L 9.402 2.699 C 10.41 2.119 11.662 2.174 12.615 2.839 C 13.568 3.504 14.052 4.66 13.855 5.806 Z M 5.429 8.575 L 4.082 7.799 C 4.068 7.791 4.059 7.777 4.057 7.761 L 4.057 4.05 C 4.059 2.888 4.732 1.831 5.785 1.339 C 6.837 0.846 8.079 1.005 8.973 1.748 L 8.879 1.801 L 5.693 3.64 C 5.533 3.735 5.433 3.907 5.431 4.094 Z M 6.16 6.998 L 7.895 5.998 L 9.633 6.998 L 9.633 8.998 L 7.901 9.998 L 6.163 8.998 Z" fill="var(--t829wi, rgb(0,0,0))" height="15.999777478073392px" id="vqBwHqKOR" transform="translate(0.109 0)" width="15.781355558369114px"/></svg>',
  },
  {
    name: "NVIDIA",
    width: 32,
    height: 32,
    svg: '<svg display="block" role="presentation" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M 5.965 3.157 L 5.965 2.203 C 6.059 2.196 6.154 2.192 6.248 2.191 C 8.863 2.109 10.577 4.441 10.577 4.441 C 10.577 4.441 8.727 7.008 6.743 7.008 C 6.481 7.008 6.22 6.967 5.971 6.885 L 5.971 3.987 C 6.99 4.111 7.196 4.559 7.803 5.577 L 9.163 4.435 C 9.163 4.435 8.168 3.133 6.496 3.133 C 6.319 3.129 6.142 3.137 5.965 3.157 M 5.965 0 L 5.965 1.425 L 6.248 1.407 C 9.881 1.284 12.255 4.387 12.255 4.387 C 12.255 4.387 9.535 7.697 6.701 7.697 C 6.457 7.696 6.212 7.674 5.971 7.632 L 5.971 8.515 C 6.171 8.539 6.378 8.557 6.578 8.557 C 9.216 8.557 11.125 7.208 12.973 5.618 C 13.279 5.865 14.533 6.46 14.793 6.719 C 13.038 8.191 8.945 9.375 6.625 9.375 C 6.401 9.375 6.189 9.363 5.977 9.34 L 5.977 10.583 L 16 10.583 L 16 0 Z M 5.965 6.884 L 5.965 7.638 C 3.527 7.202 2.85 4.665 2.85 4.665 C 2.85 4.665 4.022 3.369 5.965 3.157 L 5.965 3.981 L 5.96 3.981 C 4.941 3.857 4.14 4.811 4.14 4.811 C 4.14 4.811 4.593 6.419 5.966 6.885 M 1.637 4.558 C 1.637 4.558 3.08 2.427 5.971 2.203 L 5.971 1.425 C 2.769 1.685 0 4.393 0 4.393 C 0 4.393 1.567 8.928 5.965 9.34 L 5.965 8.515 C 2.739 8.115 1.637 4.558 1.637 4.558" fill="var(--t829wi, rgb(0,0,0))" height="10.582666666666665px" id="khs_vm060" transform="translate(0 2.709)" width="15.999999651590983px"/></svg>',
  },
  {
    name: "Microsoft",
    width: 32,
    height: 32,
    svg: '<svg display="block" role="presentation" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M 0 0 L 0 6.655 L 6.655 6.655 L 6.655 0 Z M 7.346 0 L 7.346 6.655 L 14 6.655 L 14 0 Z M 0 7.346 L 0 14 L 6.655 14 L 6.655 7.346 Z M 7.346 7.346 L 7.346 14 L 14 14 L 14 7.346 Z" fill="var(--t829wi, rgb(0,0,0))" height="14px" id="Dyl3j2qP8" transform="translate(1 1)" width="14px"/></svg>',
  },
  {
    name: "IBM",
    width: 73,
    height: 32,
    svg: '<svg display="block" role="presentation" viewBox="0 0 32 14" xmlns="http://www.w3.org/2000/svg"><path d="M 31.392 11.316 C 31.444 11.316 31.471 11.292 31.472 11.245 L 31.472 11.197 C 31.471 11.151 31.444 11.128 31.392 11.128 L 31.272 11.128 L 31.272 11.315 Z M 31.272 11.665 L 31.111 11.665 L 31.111 11.001 L 31.411 11.001 C 31.56 11.001 31.636 11.089 31.636 11.211 C 31.636 11.316 31.588 11.383 31.516 11.411 L 31.664 11.664 L 31.487 11.664 L 31.364 11.437 L 31.271 11.437 Z M 31.851 11.369 L 31.851 11.287 C 31.851 11.02 31.641 10.811 31.367 10.811 C 31.239 10.808 31.115 10.857 31.024 10.946 C 30.933 11.036 30.882 11.159 30.883 11.287 L 30.883 11.369 C 30.883 11.636 31.091 11.847 31.367 11.847 C 31.495 11.85 31.619 11.8 31.71 11.71 C 31.801 11.621 31.852 11.497 31.851 11.369 M 30.733 11.329 C 30.733 10.956 31.016 10.673 31.367 10.673 C 31.719 10.673 32 10.957 32 11.328 C 32.005 11.499 31.941 11.666 31.821 11.789 C 31.702 11.912 31.538 11.982 31.367 11.983 C 31.195 11.982 31.032 11.912 30.912 11.789 C 30.793 11.666 30.729 11.501 30.733 11.329 M 21.613 0.832 L 21.325 0 L 16.579 0 L 16.579 0.832 Z M 22.164 2.419 L 21.876 1.588 L 16.579 1.588 L 16.579 2.42 Z M 25.697 11.948 L 29.84 11.948 L 29.84 11.116 L 25.696 11.116 Z M 25.697 10.359 L 29.84 10.359 L 29.84 9.528 L 25.696 9.528 Z M 25.697 8.772 L 28.183 8.772 L 28.183 7.94 L 25.696 7.94 Z M 25.697 7.184 L 28.183 7.184 L 28.183 6.352 L 25.696 6.352 Z M 25.697 5.596 L 28.183 5.596 L 28.183 4.764 L 23.443 4.764 L 23.209 5.436 L 22.976 4.764 L 18.236 4.764 L 18.236 5.596 L 20.723 5.596 L 20.723 4.831 L 20.989 5.596 L 25.429 5.596 L 25.696 4.831 Z M 28.183 3.176 L 23.993 3.176 L 23.704 4.008 L 28.183 4.008 Z M 18.236 7.184 L 20.723 7.184 L 20.723 6.352 L 18.236 6.352 Z M 18.236 8.771 L 20.723 8.771 L 20.723 7.94 L 18.236 7.94 Z M 16.579 10.359 L 20.723 10.359 L 20.723 9.528 L 16.579 9.528 Z M 16.579 11.948 L 20.723 11.948 L 20.723 11.116 L 16.579 11.116 Z M 25.093 0 L 24.805 0.832 L 29.84 0.832 L 29.84 0 Z M 24.255 2.42 L 29.841 2.42 L 29.841 1.588 L 24.543 1.588 Z M 18.236 4.007 L 22.715 4.007 L 22.427 3.176 L 18.236 3.176 Z M 21.545 7.184 L 24.873 7.184 L 25.164 6.352 L 21.255 6.352 Z M 22.101 8.771 L 24.317 8.771 L 24.608 7.94 L 21.811 7.94 Z M 22.656 10.359 L 23.763 10.359 L 24.053 9.528 L 22.365 9.528 Z M 23.208 11.948 L 23.497 11.116 L 22.921 11.116 Z M 6.631 11.94 L 12.735 11.948 C 13.564 11.948 14.308 11.632 14.871 11.116 L 6.631 11.116 Z M 13.111 7.94 L 13.111 8.772 L 15.9 8.772 C 15.898 8.483 15.861 8.206 15.789 7.94 Z M 8.289 8.772 L 10.776 8.772 L 10.776 7.94 L 8.289 7.94 Z M 13.112 4.008 L 15.789 4.008 C 15.861 3.741 15.898 3.464 15.9 3.176 L 13.112 3.176 Z M 8.289 4.008 L 10.776 4.008 L 10.776 3.176 L 8.289 3.176 Z M 12.733 0.001 L 6.631 0.001 L 6.631 0.833 L 14.871 0.833 C 14.289 0.297 13.526 0 12.735 0.001 Z M 15.475 1.589 L 6.631 1.589 L 6.631 2.421 L 15.809 2.421 C 15.738 2.13 15.626 1.85 15.476 1.589 Z M 8.288 4.765 L 8.288 5.597 L 14.781 5.597 C 15.057 5.363 15.291 5.081 15.473 4.765 Z M 14.781 6.353 L 8.288 6.353 L 8.288 7.185 L 15.473 7.185 C 15.292 6.871 15.058 6.589 14.781 6.353 M 6.629 10.361 L 15.475 10.361 C 15.621 10.104 15.736 9.825 15.808 9.529 L 6.631 9.529 Z M 0 0.832 L 5.803 0.832 L 5.803 0 L 0 0 Z M 0 2.42 L 5.803 2.42 L 5.803 1.588 L 0 1.588 Z M 1.657 4.008 L 4.144 4.008 L 4.144 3.176 L 1.657 3.176 Z M 1.657 5.596 L 4.144 5.596 L 4.144 4.764 L 1.657 4.764 Z M 1.657 7.183 L 4.144 7.183 L 4.144 6.352 L 1.657 6.352 Z M 1.657 8.772 L 4.144 8.772 L 4.144 7.94 L 1.657 7.94 Z M 0 10.36 L 5.803 10.36 L 5.803 9.529 L 0 9.529 Z M 0 11.949 L 5.803 11.949 L 5.803 11.117 L 0 11.117 Z" fill="var(--t829wi, rgb(0,0,0))" height="11.982667455037245px" id="U7GL7xkz2" transform="translate(0 1.008)" width="32.00027296527848px"/></svg>',
  },
  {
    name: "Google",
    width: 32,
    height: 32,
    svg: '<svg display="block" role="presentation" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M 0.821 11.083 C 0.299 10.053 0 8.891 0 7.653 C 0 6.415 0.299 5.253 0.821 4.223 C 2.08 1.718 4.661 0 7.653 0 C 9.719 0 11.445 0.758 12.774 1.997 L 10.582 4.188 C 9.782 3.437 8.78 3.047 7.653 3.047 C 5.663 3.047 3.973 4.39 3.367 6.199 C 3.214 6.658 3.124 7.145 3.124 7.653 C 3.124 8.161 3.214 8.648 3.367 9.107 L 3.358 9.114 L 3.367 9.114 C 3.973 10.923 5.663 12.266 7.653 12.266 C 8.683 12.266 9.552 11.987 10.234 11.528 C 11.048 10.986 11.591 10.179 11.772 9.225 L 7.653 9.225 L 7.653 6.262 L 14.861 6.262 C 14.951 6.763 15 7.284 15 7.827 C 15 10.158 14.165 12.12 12.718 13.455 C 11.452 14.624 9.719 15.306 7.653 15.306 C 4.661 15.306 2.08 13.588 0.821 11.09 Z" fill="var(--t829wi, rgb(0,0,0))" height="15.306123059078175px" id="GdnAYzeLR" transform="translate(0.5 0.4)" width="15px"/></svg>',
  },
] as const;

export const galleryFrame = `${A}/images/gallery/frame.png`;

export const galleryPhotos = [
  {
    src: "/sites/confer/images/gallery/sunset-friends.jpg",
    alt: "four person hands wrap around shoulders while looking at sunset",
  },
  {
    src: "/sites/confer/images/gallery/party-crowd.jpg",
    alt: "laughing people in party",
  },
  {
    src: "/sites/confer/images/gallery/glass-toast.jpg",
    alt: "people holding clear glass bottles during daytime",
  },
  {
    src: "/sites/confer/images/gallery/outdoor-laughs.jpg",
    alt: "people laughing and talking outside during daytime",
  },
  {
    src: "/sites/confer/images/gallery/field-crowd.jpg",
    alt: "several people standing on field under blue sky",
  },
  {
    src: "/sites/confer/images/gallery/drinks-laughing.jpg",
    alt: "four women holding drinks while laughing together during daytime",
  },
] as const;

export const faqs = [
  {
    question: "What is this AI conference about?",
    answer:
      "This is a three-day AI conference focused on innovation, design, and real-world applications. It brings together industry leaders, creators, and professionals to explore how AI is transforming products, businesses, and everyday experiences through talks, panels, and hands-on sessions.",
  },
  {
    question: "Who should attend this event?",
    answer:
      "This event is designed for designers, developers, founders, product managers, and anyone curious about AI. Whether you're just starting out or already working in the field, you'll find valuable insights, practical knowledge, and meaningful connections.",
  },
  {
    question: "Will sessions be recorded?",
    answer:
      "Yes, all major sessions including keynotes, panels, and selected workshops will be recorded. Recordings will be available to Pro and VIP pass holders after the event so you can revisit key learnings anytime.",
  },
  {
    question: "Do I need prior AI knowledge?",
    answer:
      "No prior experience is required. The conference is structured to cater to all levels, with beginner-friendly sessions as well as advanced discussions for professionals already working with AI.",
  },
  {
    question: "Can I upgrade my ticket later?",
    answer:
      "Yes, you can upgrade your ticket before the event, subject to availability and payment of the price difference.",
  },
  {
    question: "Will there be networking opportunities?",
    answer:
      "Absolutely. The event includes dedicated networking sessions, informal meetups, and open interaction spaces where you can connect with speakers, founders, and fellow attendees.",
  },
  {
    question: "Is there a refund policy?",
    answer:
      "Yes, refunds are available within a limited time after purchase. Please check the event policy for specific timelines and eligibility details.",
  },
] as const;

export const articles = [
  {
    category: "Perspectives",
    title: "The Human Signals Behind the AI Hype",
    excerpt:
      "The most useful AI conversations start where the headlines end: with people, practice, and the hard questions.",
    image: "/sites/confer/images/journal/green-hand.jpg",
    alt: "Hand illuminated by green LED light",
    href: `${SOURCE_ORIGIN}/blog/the-human-signals-behind-the-ai-hype`,
  },
  {
    category: "Field Notes",
    title: "Why the Next AI Needs Better Rooms",
    excerpt:
      "A summit is more than a stage. It is a temporary lab for the ideas that need context, friction, and collaboration.",
    image: "/sites/confer/images/journal/ai-lightbulb.jpg",
    alt: "AI concept lightbulb",
    href: `${SOURCE_ORIGIN}/blog/why-the-next-ai-breakthrough-needs-better-rooms`,
  },
  {
    category: "Summit Brief",
    title: "The Builders’ Brief: Watch in San Francisco",
    excerpt:
      "From embodied intelligence to creative tooling, these are the ideas likely to animate the rooms this November.",
    image: "/sites/confer/images/journal/motherboard.jpg",
    alt: "Computer motherboard in darkness",
    href: `${SOURCE_ORIGIN}/blog/the-builders’-brief-what-to-watch-in-san-francisco`,
  },
] as const;

export const passes = [
  {
    price: "149",
    name: "GENERAL PASS",
    description:
      "Access to all main stage talks and sessions. Perfect for attendees looking to learn, explore, network.",
    features: [
      "Access to all keynotes",
      "Entry to panel discussions",
      "Networking sessions",
      "Event swag kit",
      "Community access",
    ],
    featured: false,
  },
  {
    price: "249",
    name: "PRO PASS",
    description:
      "For those who want deeper learning and hands-on experience with AI tools, workflows, and expert guidance.",
    features: [
      "Everything in General",
      "Access to workshops",
      "Session recordings",
      "Priority seating",
      "Exclusive resources",
    ],
    featured: true,
  },
  {
    price: "399",
    name: "VIP PASS",
    description:
      "The ultimate experience with exclusive access, premium networking, direct interaction, and reserved privileges.",
    features: [
      "Everything in Pro",
      "VIP lounge access",
      "Speaker meet & greet",
      "Front row seating",
      "Premium swag & perks",
    ],
    featured: false,
  },
] as const;

export const footerBlurb =
  "San Francisco’s premier AI summit for founders, builders, and industry expert level leaders.";
