import React from "react";

const Discord = () => {
  const handleDiscordClick = () => {
    window.open('https://discord.gg/PPJezp2y9P', '_blank');
  };

  return (
    <>
      <main className="blogs max padding spacer discord-main">
        <h2 className="discord-h2">Join our LSAT Discord Community: Study groups, resources, tutor tips & support system</h2>
        <p className="discord-p">I started this Discord server for LSAT students not because the internet needs another forum but because you need a space where your questions actually get answered. This isn’t a passive message board. It’s an active study group with a dedicated LSAT tutor (hi, that’s me!) in the room.

If we’ve had a free consultation, you know I could only scratch the surface of what you need. This server gives you ongoing access to support, accountability, and real help when you're stuck. </p>
        <div className="discord-images">
          <img 
            src="/assets/law_book.png" 
            alt="Law Book" 
            onClick={handleDiscordClick}
            style={{ cursor: 'pointer' }}
          />
          <img 
            src="/assets/discord.png" 
            alt="Discord Icon" 
            onClick={handleDiscordClick}
            style={{ cursor: 'pointer' }}
          />
        </div>
        
        <button onClick={handleDiscordClick} className="discord-btn">
          Join our Discord server
        </button>
        
        <img src="/assets/server.png" alt="Discord Server" className="server"/>
      </main>
    </>
  );
};

export default Discord;