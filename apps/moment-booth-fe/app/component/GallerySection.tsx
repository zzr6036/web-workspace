import {
  EventCarousel,
  SectionHeading,
  type CarouselMedia,
} from "elij-ui-library";
type GalleryCase = {
  title: string;
  description: string;
  media: CarouselMedia[];
};
const imageMedia = (
  day: string,
  names: string[],
  alt: string,
): CarouselMedia[] =>
  names.map((name) => ({ src: `/gallery/${day}/${name}.png`, alt }));
const galleryCases: GalleryCase[] = [
  {
    title: "Wedding keepsakes",
    description:
      "Playful props and polished details for a day worth remembering.",
    media: imageMedia(
      "day5",
      ["1", "2", "3", "4", "5", "6", "7"],
      "Wedding celebration",
    ),
  },
  {
    title: "Celebration details",
    description:
      "Colourful accessories that turn every guest into part of the story.",
    media: imageMedia(
      "day6",
      ["2", "3", "4", "5", "6", "7", "8", "9"],
      "Celebration details",
    ),
  },
  {
    title: "Instant memories",
    description: "Easy, candid moments guests can print, share, and take home.",
    media: imageMedia(
      "day7",
      ["2", "3", "4", "6", "7", "8", "9", "10", "11"],
      "Instant memories",
    ),
  },
  {
    title: "Wedding day moments",
    description:
      "A relaxed photo experience made to fit the mood of your celebration.",
    media: imageMedia(
      "day8",
      ["2", "3", "4", "5", "6", "7", "8"],
      "Wedding day moments",
    ),
  },
  {
    title: "Personalised guestbook",
    description:
      "A growing collection of smiles, poses, and little in-between moments.",
    media: imageMedia(
      "day9",
      ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
      "Personalised guestbook",
    ),
  },
  {
    title: "Family Day Celebration",
    description:
      "A quick look at the booth in action, from setup to shared smiles.",
    media: [
      {
        src: "/gallery/day11/video3.mp4",
        type: "video",
        alt: "Family Day Celebration video",
      },
    ],
  },
];

export default function GallerySection() {
  return (
    <section className="section gallery-section" id="gallery">
      <SectionHeading
        className="section-heading"
        eyebrow="Selected moments"
        title="Made for real connection."
        description="Real celebrations, considered styling, and keepsakes guests can take home on the day."
      />
      <div className="gallery-cases">
        {galleryCases.map((event) => (
          <EventCarousel
            title={event.title}
            description={event.description}
            media={event.media}
            key={event.title}
          />
        ))}
      </div>
    </section>
  );
}
