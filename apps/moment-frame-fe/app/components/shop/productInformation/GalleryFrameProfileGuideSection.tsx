const profiles = [
  { x: 20, y: 494, label: "INK SHADOW TIME", width: "5.8 cm", depth: "4.7 cm", labelY: 291, depthY: 438 },
  { x: 520, y: 494, label: "GOLDEN SAND WALNUT", width: "5.7 cm", depth: "4.7 cm", labelY: 291, depthY: 438 },
  { x: 1020, y: 494, label: "WALNUT POEM", width: "5 cm", depth: "3.1 cm", labelY: 291, depthY: 438 },
  { x: 20, y: 1062, label: "WALNUT GRAIN", width: "2.1 cm", depth: "3.5 cm", labelY: 846, depthY: 995 },
  { x: 520, y: 1062, label: "LINEN GREY", width: "4.9 cm", depth: "2.7 cm", labelY: 846, depthY: 995 },
  { x: 1020, y: 1062, label: "BREEZE ELEGANCE", width: "5.5 cm", depth: "3 cm", labelY: 846, depthY: 995 },
  { x: 20, y: 1630, label: "GOLDEN YEARS FRAME", width: "5.5 cm", depth: "3 cm", labelY: 1403, depthY: 1558 },
  { x: 520, y: 1630, label: "TIME IMPRINT", width: "4.8 cm", depth: "3.1 cm", labelY: 1403, depthY: 1558 },
  { x: 1020, y: 1630, label: "MONET WINDOW", width: "4.8 cm", depth: "3 cm", labelY: 1403, depthY: 1558 },
  { x: 20, y: 2180, label: "GILDED ELEGANCE", width: "6.2 cm", depth: "4.1 cm", labelY: 1957, depthY: 2118 },
  { x: 520, y: 2180, label: "MOONLIGHT WHITE", width: "6.5 cm", depth: "3 cm", labelY: 1957, depthY: 2118 },
];

export function GalleryFrameProfileGuideSection() {
  return (
    <section
      className="gallery-frame-profile-guide"
      aria-labelledby="gallery-frame-profile-guide-title"
      style={{ padding: "clamp(24px, 3vw, 38px)", border: "1px solid #e9ddfa", borderRadius: 22, background: "#fbf9ff" }}
    >
      <div>
        <p className="eyebrow">GALLERY WOODEN FRAME</p>
        <h3 id="gallery-frame-profile-guide-title" style={{ margin: 0, color: "#32176b", fontSize: "clamp(25px, 2.5vw, 36px)" }}>Frame Profile Guide</h3>
      </div>
      <div className="gallery-frame-profile-chart" role="img" aria-label="Gallery wooden frame profiles and dimensions" style={{ width: "min(100%, 800px)", margin: "18px auto 0", overflow: "hidden", border: "1px solid #eee8f8", borderRadius: 14, background: "#fff" }}>
        <svg viewBox="0 0 1500 2494" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", width: "100%", height: "auto" }}>
          <image href="/frames/product-information/gallery/frame-profile-guide/frame-profile-guide-base.jpg" x="0" y="0" width="1500" height="2494" />
          {profiles.map((profile) => (
            <g key={profile.label}>
              <rect x={profile.x} y={profile.y} width="460" height="86" fill="#3f3c50" />
              <text x={profile.x + 230} y={profile.y + 54} fill="#fff" fontSize="31" fontWeight="700" textAnchor="middle" fontFamily="Arial, sans-serif">{profile.label}</text>
              <text x={profile.x + 34} y={profile.labelY} fill="#b22a20" stroke="#fff" strokeWidth="10" paintOrder="stroke" fontSize="38" fontWeight="800" fontFamily="Arial, sans-serif" textLength="245" lengthAdjust="spacingAndGlyphs">{profile.width}</text>
              <text x={profile.x + 34} y={profile.depthY} fill="#b22a20" stroke="#fff" strokeWidth="10" paintOrder="stroke" fontSize="38" fontWeight="800" fontFamily="Arial, sans-serif" textLength="270" lengthAdjust="spacingAndGlyphs">{profile.depth}</text>
            </g>
          ))}
          <rect x="40" y="2340" width="1420" height="110" rx="48" fill="#dedede" />
          <text x="750" y="2408" fill="#333" fontSize="37" textAnchor="middle" fontFamily="Arial, sans-serif">Manual measurements may vary by 1–2 mm.</text>
        </svg>
      </div>
    </section>
  );
}
