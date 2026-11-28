import { useEffect, useRef } from "react";
import poster from "@/assets/institutional/nexus-poster.jpg";

interface NexusVideoProps {
  className?: string;
  eager?: boolean;
}

const NexusVideo = ({ className = "", eager = false }: NexusVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const tryPlay = () => video.play().catch(() => undefined);
    tryPlay();
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) tryPlay();
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      className={`institutional-video ${className}`}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload={eager ? "auto" : "metadata"}
      aria-hidden="true"
      tabIndex={-1}
      onCanPlay={(event) => event.currentTarget.play().catch(() => undefined)}
    >
      <source src="/videos/nexus-institutional.mp4" type="video/mp4" />
    </video>
  );
};

export default NexusVideo;
