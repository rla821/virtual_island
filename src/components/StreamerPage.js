import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "./PageTransition";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

export default function StreamerPage({ file }) {
  const navigate = useNavigate();
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(`/data/${file}.md`)
      .then((res) => res.text())
      .then((text) => setContent(text));
  }, [file]);

  return (
    <PageTransition>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{ height: "100vh", padding: "20px" }}
      >
        <ReactMarkdown>{content}</ReactMarkdown>

        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: "20px",
            padding: "8px 16px",
            background: "#333",
            color: "white",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          ← 메인으로
        </button>
      </motion.div>
    </PageTransition>
  );
}
