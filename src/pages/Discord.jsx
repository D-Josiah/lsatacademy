import React from "react";
import { Helmet } from "react-helmet-async";
import Img from "../components/Img";

const Discord = () => {
  const handleDiscordClick = () => {
    window.open('https://discord.gg/PPJezp2y9P', '_blank');
  };

  return (
    <>
      <Helmet>
        <title>Join the LSAT Discord Community | LSAT Academy</title>
        <meta name="description" content="Join LSAT Academy's free Discord server — real-time study groups, LSAT tips from David McMaster, peer support, and resources to help you ace the LSAT." />
        <link rel="canonical" href="https://www.lsat.academy/discord" />
        <meta property="og:title" content="Join the LSAT Discord Community | LSAT Academy" />
        <meta property="og:description" content="Real-time study groups, LSAT tips from David McMaster, peer support, and resources to help you ace the LSAT." />
        <meta property="og:url" content="https://www.lsat.academy/discord" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Join the LSAT Discord Community | LSAT Academy" />
        <meta name="twitter:description" content="Real-time study groups, LSAT tips from David McMaster, peer support, and resources to ace the LSAT." />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.lsat.academy/" },
              { "@type": "ListItem", "position": 2, "name": "Discord Community", "item": "https://www.lsat.academy/discord" }
            ]
          }
        `}</script>
      </Helmet>
      <main className="blogs max padding spacer discord-main">
        <h1 className="discord-h2">Join our LSAT Discord Community: Study groups, resources, tutor tips & support system</h1>
        <p className="discord-p">I started this Discord server for LSAT students not because the internet needs another forum but because you need a space where your questions actually get answered. This isn’t a passive message board. It’s an active study group with a dedicated LSAT tutor (hi, that’s me!) in the room.

If we’ve had a free consultation, you know I could only scratch the surface of what you need. This server gives you ongoing access to support, accountability, and real help when you're stuck. </p>
        <div className="discord-images">
          <Img
            src="/assets/law_book.png"
            alt="Open law book illustration"
            onClick={handleDiscordClick}
            style={{ cursor: 'pointer' }}
            loading="lazy"
            decoding="async"
          />
          <Img
            src="/assets/discord.png"
            alt="Discord logo"
            onClick={handleDiscordClick}
            style={{ cursor: 'pointer' }}
            loading="lazy"
            decoding="async"
          />
        </div>
        
        <button onClick={handleDiscordClick} className="discord-btn">
          Join our Discord server
        </button>
        
        <Img src="/assets/server.png" alt="LSAT Academy Discord server screenshot" className="server" loading="lazy" decoding="async"/>
      </main>
    </>
  );
};

export default Discord;