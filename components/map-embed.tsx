"use client";

interface MapEmbedProps {
  className?: string;
}

const MAP_IFRAME_SRC = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d525.8993355207282!2d78.02090537119969!3d15.822987629844087!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb5ddb41e0cc0d9%3A0x13f0e282bafd7db0!2sWINGS%20fertility%20CENTRE!5e1!3m2!1sen!2sin!4v1777881731392!5m2!1sen!2sin";

export default function MapEmbed({ className = "h-56 w-full" }: MapEmbedProps) {
  return (
    <div className={`relative overflow-hidden rounded-xl border border-[#C8A2C8]/40 ${className}`}>
      <iframe
        src={MAP_IFRAME_SRC}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Wings Fertility Centre Location"
      />
    </div>
  );
}