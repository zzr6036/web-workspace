"use client";

import Image from "next/image";
import { useState } from "react";
import { Button, Card, FilterTabs, Paragraph, SectionHeading } from "elij-ui-library";

const libraryStats = [
  ["100+", "Props options"],
  ["200+", "Template options"],
  ["Many", "Popular event styles"],
  ["Custom", "Designs available"],
];

const templatePreviews = [
  {
    src: "/library/templates/wedding-392.png",
    number: "392",
    category: "wedding",
    label: "Wedding & ROM",
  },
  {
    src: "/library/templates/wedding-44.png",
    number: "44",
    category: "wedding",
    label: "Wedding & ROM",
  },
  {
    src: "/library/templates/wedding-115.png",
    number: "115",
    category: "wedding",
    label: "Wedding & ROM",
  },
  {
    src: "/library/templates/wedding-404.png",
    number: "404",
    category: "wedding",
    label: "Wedding & ROM",
  },
  {
    src: "/library/templates/birthday-37.png",
    number: "37",
    category: "birthday",
    label: "Birthday",
  },
  {
    src: "/library/templates/birthday-60.png",
    number: "60",
    category: "birthday",
    label: "Birthday",
  },
  {
    src: "/library/templates/birthday-146.png",
    number: "146",
    category: "birthday",
    label: "Birthday",
  },
  {
    src: "/library/templates/birthday-23.png",
    number: "23",
    category: "birthday",
    label: "Birthday",
  },
  {
    src: "/library/templates/event-67.png",
    number: "67",
    category: "event",
    label: "Corporate & Events",
  },
  {
    src: "/library/templates/event-09.png",
    number: "09",
    category: "event",
    label: "Corporate & Events",
  },
  {
    src: "/library/templates/event-19.png",
    number: "19",
    category: "event",
    label: "Corporate & Events",
  },
  {
    src: "/library/templates/event-53.png",
    number: "53",
    category: "event",
    label: "Corporate & Events",
  },
  {
    src: "/library/templates/kids-24.png",
    number: "24",
    category: "kids",
    label: "Baby & Kids",
  },
  {
    src: "/library/templates/kids-92.png",
    number: "92",
    category: "kids",
    label: "Baby & Kids",
  },
  {
    src: "/library/templates/kids-134.png",
    number: "134",
    category: "kids",
    label: "Baby & Kids",
  },
  {
    src: "/library/templates/kids-35.png",
    number: "35",
    category: "kids",
    label: "Baby & Kids",
  },
  {
    src: "/library/templates/festive-34.png",
    number: "34",
    category: "festive",
    label: "Festive & Cultural",
  },
  {
    src: "/library/templates/festive-48.png",
    number: "48",
    category: "festive",
    label: "Festive & Cultural",
  },
  {
    src: "/library/templates/festive-53.png",
    number: "53",
    category: "festive",
    label: "Festive & Cultural",
  },
  {
    src: "/library/templates/festive-24.png",
    number: "24",
    category: "festive",
    label: "Festive & Cultural",
  },
  {
    src: "/library/templates/minimal-396.png",
    number: "396",
    category: "minimal",
    label: "Minimal & All-occasion",
  },
  {
    src: "/library/templates/minimal-400.png",
    number: "400",
    category: "minimal",
    label: "Minimal & All-occasion",
  },
  {
    src: "/library/templates/minimal-61.png",
    number: "61",
    category: "minimal",
    label: "Minimal & All-occasion",
  },
] as const;

const propCategories = [
  { id: "all", label: "All" },
  { id: "wedding", label: "Wedding" },
  { id: "birthday", label: "Birthday" },
  { id: "animals", label: "Animals" },
  { id: "fruits", label: "Fruits" },
] as const;

type PropCategory = (typeof propCategories)[number]["id"];
type PropFilter = Exclude<PropCategory, "all">;
type PropPreview = {
  src: string;
  alt: string;
  categories: PropFilter[];
};

const birthdayPropNumbers = [
  3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 23, 24, 25, 26, 27, 28, 29, 30, 31,
];
const animalPropNumbers = [
  29, 30, 31, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52,
  53,
];
const fruitPropNumbers = [7, 13, 15, 17, 24];
const catalogPropNumbers = [
  ...new Set([
    ...birthdayPropNumbers,
    ...animalPropNumbers,
    ...fruitPropNumbers,
  ]),
].sort((a, b) => a - b);

const propPreviews: PropPreview[] = [
  {
    src: "/library/props/wedding-signs.png",
    alt: "Chinese wedding handheld sign collection",
    categories: ["wedding"],
  },
  {
    src: "/library/props/wedding-fans.png",
    alt: "Chinese wedding fan prop collection",
    categories: ["wedding"],
  },
  ...catalogPropNumbers.map(
    (number): PropPreview => ({
      src: `/library/props/catalog-prop-${String(number).padStart(2, "0")}.jpg`,
      alt: `Moment Booth catalog prop ${String(number).padStart(2, "0")}`,
      categories: [
        ...(birthdayPropNumbers.includes(number) ? ["birthday" as const] : []),
        ...(animalPropNumbers.includes(number) ? ["animals" as const] : []),
        ...(fruitPropNumbers.includes(number) ? ["fruits" as const] : []),
      ],
    }),
  ),
];

const categories = [
  { id: "all", label: "All" },
  { id: "wedding", label: "Wedding & ROM" },
  { id: "birthday", label: "Birthday" },
  { id: "event", label: "Corporate & Events" },
  { id: "kids", label: "Baby & Kids" },
  { id: "festive", label: "Festive & Cultural" },
  { id: "minimal", label: "Minimal" },
] as const;

type Category = (typeof categories)[number]["id"];

export default function LibrarySection() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [activePropCategory, setActivePropCategory] =
    useState<PropCategory>("all");
  const visibleTemplates =
    activeCategory === "all"
      ? templatePreviews
      : templatePreviews.filter(
          (template) => template.category === activeCategory,
        );
  const visibleProps =
    activePropCategory === "all"
      ? propPreviews
      : propPreviews.filter((prop) =>
          prop.categories.includes(activePropCategory),
        );

  return (
    <section className="section library-section" id="library">
      <SectionHeading
        className="section-heading"
        eyebrow="Props & template library"
        title={
          <>
            Props for every personality.
            <br />
            Templates for every occasion.
          </>
        }
        description="Explore a growing collection of playful props and customisable photo templates, carefully selected for weddings, birthdays, corporate events, family celebrations and more."
      />

      <div className="library-stats" aria-label="Moment Booth collection size">
        {libraryStats.map(([value, label]) => (
          <div key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>

      <div className="library-showcase">
        <Card className="library-props-card">
          <div className="props-library-heading">
            <p className="eyebrow">Props collection</p>
            <h3>Pick a prop. Strike a pose.</h3>
            <p>
              Wedding signs, birthday favourites, fruit-shaped glasses and
              animal headbands for every celebration.
            </p>
          </div>
          <FilterTabs
            items={propCategories}
            activeKey={activePropCategory}
            onChange={setActivePropCategory}
            ariaLabel="Filter prop previews"
            className="props-filters"
          />
          <div className="props-preview-grid">
            {visibleProps.map((prop) => (
              <figure key={prop.src}>
                <Image src={prop.src} alt={prop.alt} width={216} height={216} />
              </figure>
            ))}
          </div>
          <div className="library-image-label">
            <strong>100+ styles currently available</strong>
            <span>
              More choices are available when you select your event collection.
            </span>
          </div>
        </Card>

        <div className="template-library">
          <div className="template-library-heading">
            <div>
              <p className="eyebrow">Template preview</p>
              <h3>A design for every celebration.</h3>
            </div>
            <span>24 featured · 200+ available</span>
          </div>
          <FilterTabs
            items={categories}
            activeKey={activeCategory}
            onChange={setActiveCategory}
            ariaLabel="Filter template previews"
            className="template-filters"
          />
          <div className="template-preview-grid">
            {visibleTemplates.map((template) => (
              <Card key={template.src} className="template-preview-card">
                <Image
                  src={template.src}
                  alt={`Template ${template.number}, ${template.label} photo template preview`}
                  width={848}
                  height={650}
                />
                <div>
                  <strong>Template {template.number}</strong>
                  <span>{template.label}</span>
                </div>
              </Card>
            ))}
          </div>
          <div className="library-footer">
            <Paragraph>
              A selection is shown here. More designs are available after
              booking.
            </Paragraph>
            <a href="#contact">
              <Button variant="secondary">Explore our collection</Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
