import { InstitutionalPhoto } from "./authority";

const InstitutionalMediaGallery = ({ photos }: { photos: InstitutionalPhoto[] }) => {
  if (!photos.length) return null;
  return <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{photos.map((photo) => <figure key={photo.image}>
    <img src={photo.image} alt={photo.alt} loading="lazy" className="aspect-[4/3] w-full rounded-2xl object-cover" />
    {photo.caption && <figcaption className="mt-3 text-base text-institutional-muted">{photo.caption}</figcaption>}
  </figure>)}</div>;
};

export default InstitutionalMediaGallery;