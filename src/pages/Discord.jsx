import React from "react";

const Discord = () => {
  return (
    <>
      <main className="blogs max padding spacer discord-main">
        <h2 className="discord-h2">Join our LSAT Discord Community: Study groups, resources, tutor tips & support system</h2>
        <button onClick={() => window.open('https://discord.gg/PPJezp2y9P', '_blank')} className="discord-btn">
          Join our Discord server
        </button>
        <div className="discord-images">
            <img src="/assets/law_book.png" alt="Law Book" />
            <img src="/assets/discord.png" alt="Discord Icon" />
        </div>
        <img src="/assets/server.png" alt="Discord Server" className="server"/>
      </main>
    </>
  );
};

export default Discord;