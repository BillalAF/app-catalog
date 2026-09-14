"use client";

import { useEffect, useState } from "react";
import styles from "./DiagramViewer.module.css";

/**
 * Placeholder untuk area diagram di halaman detail, dilengkapi tombol
 * "View Fullscreen" yang membuka overlay penuh layar.
 *
 * `diagram` saat ini diharapkan berupa URL gambar (opsional).
 * Ke depan, tempat ini bisa diganti untuk merender SVG, Mermaid,
 * atau React Flow tanpa mengubah pemanggil component ini — cukup ganti
 * isi <DiagramContent />, tombol & overlay fullscreen tetap bekerja sama.
 */
export default function DiagramViewer({ diagram }) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Tutup overlay dengan tombol Escape, dan kunci scroll body selagi terbuka.
  useEffect(() => {
    if (!isFullscreen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsFullscreen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isFullscreen]);

  return (
    <>
      <div className={styles.frame}>
        <button
          type="button"
          className={styles.fullscreenButton}
          onClick={() => setIsFullscreen(true)}
        >
          <ExpandIcon />
          View Fullscreen
        </button>

        <DiagramContent diagram={diagram} />
      </div>

      {isFullscreen ? (
        <div
          className={styles.overlay}
          role="dialog"
          aria-modal="true"
          aria-label="Diagram fullscreen view"
          onClick={() => setIsFullscreen(false)}
        >
          <button
            type="button"
            className={styles.closeButton}
            onClick={() => setIsFullscreen(false)}
            aria-label="Close fullscreen"
          >
            <CloseIcon />
          </button>
          <div
            className={styles.overlayContent}
            onClick={(e) => e.stopPropagation()}
          >
            <DiagramContent diagram={diagram} fullscreen />
          </div>
        </div>
      ) : null}
    </>
  );
}

function DiagramContent({ diagram, fullscreen = false }) {
  if (!diagram) {
    return (
      <div className={styles.placeholder}>
        <span className={styles.placeholderLabel}>diagram</span>
        {!fullscreen ? (
          <p className={styles.placeholderText}>Diagram not available</p>
        ) : null}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={diagram} alt="Application diagram" className={styles.image} />
  );
}

function ExpandIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M8 3H5a2 2 0 0 0-2 2v3" />
      <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
      <path d="M3 16v3a2 2 0 0 0 2 2h3" />
      <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
