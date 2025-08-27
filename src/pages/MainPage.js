import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../style.css";
import PageTransition from "../components/PageTransition";

import ReactMarkdown from "react-markdown";

import virtual from "../image/Virtual_Island.png";
import Heeyo from "../image/Heeyo.png";
import Mingsoon from "../image/Mingsoon.png";
import Choa from "../image/Choa.png";
import Jjyeony from "../image/Jjyeony.png";

const YOUTUBE_CHANNELS = [
  {
    name: "히요",
    router: "/Heeyo",
    id: "UCR6Tv_HcWl7HSoQXY1_IR5w",
    image: Heeyo,
  },
  {
    name: "밍쑨",
    router: "/Mingsoon",
    id: "UCsmOZDbLiJTe2Ol6y-lK20g",
    image: Mingsoon,
  },
  {
    name: "초아해요",
    router: "/Choa",
    id: "UC9DiST20rsYZqVCp0QwQLdA",
    image: Choa,
  },
  {
    name: "쪄니",
    router: "/Jjyeony",
    id: "UC7vRnmB7AR215Jk7qEQh0PQ",
    image: Jjyeony,
  },
];

const MainPage = () => {
  const [thumbnails, setThumbnails] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(`/data/Virtual_Island.md`)
      .then((res) => res.text())
      .then((text) => setContent(text));

    const fetchThumbnails = async () => {
      try {
        const allThumbs = [];

        for (const channel of YOUTUBE_CHANNELS) {
          const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channel.id}`;
          const response = await fetch(
            `https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`
          );
          const data = await response.json();

          const thumbs = data.items.slice(0, 10).map((item) => ({
            url: item.thumbnail,
            link: item.link,
          }));

          allThumbs.push(...thumbs);
        }

        // Shuffle thumbnails once on page load
        const shuffled = allThumbs
          .map((t) => ({ ...t, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ sort, ...t }) => t);

        // Duplicate for infinite loop effect
        setThumbnails([...shuffled, ...shuffled]);
      } catch (error) {
        console.error("Error fetching thumbnails:", error);
      }
    };

    fetchThumbnails();
  }, []);

  return (
    <div className="main-page">
      {/* TOP SECTION */}
      <section className="top-section">
        <img src={virtual} alt="Group" className="group-image" />
        <h1 className="welcome-text">외딴섬 입국을 환영합니다.</h1>
      </section>

      {/* MIDDLE SECTION */}
      <section className="middle-section">
        <h1 className="topic-text">외딴섬이란?</h1>
        <ReactMarkdown className="description-text">{content}</ReactMarkdown>
        <div className="slider">
          <div className="slider-track">
            {thumbnails.map((thumb, index) => (
              <a
                href={thumb.link}
                target="_blank"
                rel="noreferrer"
                key={index}
                className="thumbnail"
              >
                <img src={thumb.url} alt={`Thumbnail ${index + 1}`} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM SECTION */}
      <PageTransition>
        <section className="bottom-section">
          <div className="streamers">
            {YOUTUBE_CHANNELS.map((channel, index) => (
              <Link
                to={channel.router}
                key={channel.router}
                className="streamer-block"
                style={{ backgroundImage: `url(${channel.image})` }}
              >
                <span className="streamer-name">{channel.name}</span>
              </Link>
            ))}
          </div>
        </section>
      </PageTransition>
    </div>
  );
};

export default MainPage;
