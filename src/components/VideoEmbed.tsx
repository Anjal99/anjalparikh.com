import { useState } from "react";
import { embedUrl, formatDuration, type JournalEntry } from "../lib/journal";

/**
 * Facade player: shows the poster until clicked, then mounts the iframe.
 * Loading three provider iframes on page load would cost hundreds of KB and
 * several requests each before anyone presses play.
 */
const VideoEmbed = ({ entry }: { entry: JournalEntry }) => {
  const [active, setActive] = useState(false);

  if (active) {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-3xl border border-stroke bg-black">
        <iframe
          src={embedUrl(entry)}
          title={entry.title}
          className="h-full w-full"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      onClick={() => setActive(true)}
      aria-label={`Play ${entry.title}`}
      className="group relative block aspect-video w-full overflow-hidden rounded-3xl border border-stroke bg-surface"
    >
      <img
        src={entry.poster}
        alt=""
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <span className="absolute inset-0 bg-bg/30 transition-colors duration-300 group-hover:bg-bg/50" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="relative rounded-full p-[2px] accent-gradient-animated">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-bg text-xl text-text-primary transition-colors duration-300 group-hover:bg-text-primary group-hover:text-bg">
            ▶
          </span>
        </span>
      </span>
      <span className="absolute bottom-4 right-4 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-xs text-white backdrop-blur-md">
        {formatDuration(entry.durationSec)}
      </span>
    </button>
  );
};

export default VideoEmbed;
