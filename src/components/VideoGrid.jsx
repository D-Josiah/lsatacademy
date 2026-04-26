import React from "react";

// Replace these placeholder IDs with your real YouTube video IDs
// YouTube ID is the part after ?v= or the short code after youtu.be/
export const ALL_VIDEOS = [
  {
    id: "YOUTUBE_ID_1",
    title: "LSAT Patterns Explained",
    category: "Patterns",
  },
  {
    id: "YOUTUBE_ID_2",
    title: "Indicator Words Fundamentals",
    category: "Logical Reasoning",
  },
  {
    id: "YOUTUBE_ID_3",
    title: "Sufficient Assumption Made Simple",
    category: "Logical Reasoning",
  },
  {
    id: "YOUTUBE_ID_4",
    title: "How to Apply to Law School",
    category: "Law School",
  },
  {
    id: "YOUTUBE_ID_5",
    title: "LSAT Study Tips",
    category: "Study Tips",
  },
  {
    id: "YOUTUBE_ID_6",
    title: "What is the LSAT?",
    category: "LSAT Basics",
  },
];

const VideoGrid = ({ videos = ALL_VIDEOS, maxCols = 4 }) => {
  return (
    <>
      <style>{`
        .video-grid {
          display: grid;
          grid-template-columns: repeat(${maxCols}, 1fr);
          gap: 20px;
          width: 100%;
        }

        @media (max-width: 1100px) {
          .video-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .video-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
        }

        @media (max-width: 480px) {
          .video-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
        }

        .video-card {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .video-card-embed {
          position: relative;
          width: 100%;
          padding-top: 177.78%; /* 9:16 aspect ratio */
          border-radius: 16px;
          overflow: hidden;
          background: #000;
          box-shadow: 0 4px 20px rgba(2, 50, 71, 0.15);
        }

        .video-card-embed iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: none;
        }

        .video-card-title {
          font-family: 'Poppins', sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          color: #023247;
          line-height: 1.4;
          text-align: center;
        }

        .video-card-category {
          font-family: 'Poppins', sans-serif;
          font-size: 0.75rem;
          color: #2A8E9E;
          text-align: center;
          font-weight: 500;
        }
      `}</style>

      <div className="video-grid">
        {videos.map((video) => (
          <div key={video.id} className="video-card">
            <div className="video-card-embed">
              <iframe
                src={`https://www.youtube.com/embed/${video.id}`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
            <p className="video-card-title">{video.title}</p>
            <p className="video-card-category">{video.category}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default VideoGrid;