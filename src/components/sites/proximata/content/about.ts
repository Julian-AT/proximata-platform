import { coordinatesLabel, event } from "./event";
import { tracks } from "./tracks";

/** About section: event pitch (confirmed Luma copy) and HUD decoration labels. */
export const about = {
  tag: "ABOUT",
  // Non-breaking space keeps "24 Hours." on one line.
  title: "Real Cases. 24\u00A0Hours. Real Impact.",
  paragraph:
    "On 13 November Proximata hosts its flagship hackathon, jointly organised with START Vienna and Home of InnoVation. Real cases from real companies give you and your team 24 hours to build something truly disruptive. Meet leaders of the ecosystem, experts from top industries, and exceptional builders.",
  /** Micro-copy on the decorative HUD marks either side of the title. */
  hud: {
    location: `${event.city} // ${event.poweredBy.short}`.toUpperCase(),
    locationDetail: coordinatesLabel(2),
    format: `${event.duration} // ${tracks.length} tracks`.toUpperCase(),
    formatDetail: event.timeLabel.toUpperCase(),
  },
} as const;
