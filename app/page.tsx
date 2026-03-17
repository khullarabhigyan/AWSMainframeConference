"use client";

import { useState, useMemo, useEffect } from "react";
import { sessions, tracks } from "@/lib/schedule";

const TRACK_STYLES: Record<string, { accent: string; dim: string }> = {
  business: {
    accent: "var(--accent-orange)",
    dim: "var(--accent-orange-dim)",
  },
  tech1: {
    accent: "var(--accent-blue)",
    dim: "var(--accent-blue-dim)",
  },
  "tech1-d2": {
    accent: "var(--accent-blue)",
    dim: "var(--accent-blue-dim)",
  },
  tech2: {
    accent: "var(--accent-teal)",
    dim: "var(--accent-teal-dim)",
  },
  "tech2-d2": {
    accent: "var(--accent-teal)",
    dim: "var(--accent-teal-dim)",
  },
};

const TRACK_DISPLAY_NAMES: Record<string, string> = {
  business: "Business",
  tech1: "Technical 1",
  "tech1-d2": "Technical 1",
  tech2: "Technical 2",
  "tech2-d2": "Technical 2",
};

const ALL_TRACKS = "all";
type FilterTrack = "all" | "business" | "tech1" | "tech2";

function highlight(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escaped})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark
        key={i}
        style={{
          background: "var(--accent-orange-dim)",
          color: "inherit",
          borderRadius: "3px",
          padding: "0 2px",
        }}
      >
        {part}
      </mark>
    ) : (
      part
    )
  );
}

function SunIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function Home() {
  const [activeDay, setActiveDay] = useState<1 | 2>(1);
  const [activeTrack, setActiveTrack] = useState<FilterTrack>(ALL_TRACKS);
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  const trackFilterGroups: { id: FilterTrack; label: string }[] = [
    { id: ALL_TRACKS, label: "All" },
    { id: "business", label: "Business" },
    { id: "tech1", label: "Technical 1" },
    { id: "tech2", label: "Technical 2" },
  ];

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return sessions.filter((s) => {
      if (s.day !== activeDay) return false;
      if (activeTrack !== ALL_TRACKS) {
        const base = s.trackId.replace("-d2", "");
        if (base !== activeTrack) return false;
      }
      if (q) {
        return (
          s.title.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [activeDay, activeTrack, query]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof filtered>();
    filtered.forEach((s) => {
      const g = map.get(s.trackId) ?? [];
      g.push(s);
      map.set(s.trackId, g);
    });
    return map;
  }, [filtered]);

  const trackOrder = ["business", "tech1", "tech2", "tech1-d2", "tech2-d2"];
  const orderedTrackIds = trackOrder.filter((id) => grouped.has(id));
  const totalResults = filtered.length;

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)" }}>
      {/* ── Header ─────────────────────────────────────────────────── */}
      <header
        style={{
          borderBottom: "1px solid var(--border-subtle)",
          background: "var(--bg-secondary)",
        }}
      >
        <div
          style={{
            maxWidth: 960,
            margin: "0 auto",
            padding: "28px 24px 24px",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 8,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--accent-orange)",
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: "0.13em",
                  color: "var(--accent-orange)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                }}
              >
                AWS Partner Conference
              </span>
            </div>
            <h1
              style={{
                margin: 0,
                fontSize: "clamp(22px, 4vw, 30px)",
                fontWeight: 700,
                color: "var(--text-primary)",
                letterSpacing: "-0.025em",
                lineHeight: 1.2,
              }}
            >
              Mainframe Modernization
            </h1>
            <p
              style={{
                margin: "8px 0 0",
                fontSize: 13,
                color: "var(--text-muted)",
                letterSpacing: "0.01em",
                fontWeight: 500,
              }}
            >
              Session Schedule — 2 Days · 3 Tracks · 22 Sessions
            </p>
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              height: 36,
              borderRadius: 8,
              border: "1px solid var(--border-subtle)",
              background: "var(--bg-card)",
              cursor: "pointer",
              color: "var(--text-muted)",
              flexShrink: 0,
              marginTop: 2,
              transition: "background 0.15s, color 0.15s, border-color 0.15s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "var(--bg-card-hover)";
              el.style.color = "var(--text-primary)";
              el.style.borderColor = "var(--border)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "var(--bg-card)";
              el.style.color = "var(--text-muted)";
              el.style.borderColor = "var(--border-subtle)";
            }}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </header>

      {/* ── Controls ───────────────────────────────────────────────── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: "var(--bg-secondary)",
          borderBottom: "1px solid var(--border-subtle)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <div
          style={{
            maxWidth: 960,
            margin: "0 auto",
            padding: "12px 24px",
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            alignItems: "center",
          }}
        >
          {/* Day tabs */}
          <div
            style={{
              display: "flex",
              gap: 2,
              background: "var(--bg-card)",
              padding: 3,
              borderRadius: 8,
              border: "1px solid var(--border-subtle)",
            }}
          >
            {([1, 2] as const).map((d) => (
              <button
                key={d}
                onClick={() => setActiveDay(d)}
                style={{
                  padding: "5px 18px",
                  borderRadius: 6,
                  border: "none",
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: "inherit",
                  transition: "all 0.15s",
                  background:
                    activeDay === d ? "var(--accent-orange)" : "transparent",
                  color: activeDay === d ? "#fff" : "var(--text-secondary)",
                  boxShadow:
                    activeDay === d ? "0 1px 4px rgba(0,0,0,0.15)" : "none",
                }}
              >
                Day {d}
              </button>
            ))}
          </div>

          {/* Track filter */}
          <div
            style={{
              display: "flex",
              gap: 2,
              background: "var(--bg-card)",
              padding: 3,
              borderRadius: 8,
              border: "1px solid var(--border-subtle)",
            }}
          >
            {trackFilterGroups.map((t) => {
              const isActive = activeTrack === t.id;
              const accentColor =
                t.id === "business"
                  ? "var(--accent-orange)"
                  : t.id === "tech1"
                  ? "var(--accent-blue)"
                  : t.id === "tech2"
                  ? "var(--accent-teal)"
                  : undefined;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTrack(t.id)}
                  style={{
                    padding: "5px 12px",
                    borderRadius: 6,
                    border: "none",
                    cursor: "pointer",
                    fontSize: 12,
                    fontWeight: 600,
                    fontFamily: "inherit",
                    transition: "all 0.15s",
                    background: isActive
                      ? "var(--bg-card-hover)"
                      : "transparent",
                    color:
                      isActive && accentColor
                        ? accentColor
                        : isActive
                        ? "var(--text-primary)"
                        : "var(--text-muted)",
                  }}
                >
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div style={{ position: "relative", flex: 1, minWidth: 160 }}>
            <svg
              style={{
                position: "absolute",
                left: 11,
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-muted)",
                pointerEvents: "none",
              }}
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search sessions…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                width: "100%",
                background: "var(--bg-card)",
                border: "1px solid var(--border-subtle)",
                borderRadius: 8,
                padding: "6px 32px",
                fontSize: 13,
                fontFamily: "inherit",
                fontWeight: 400,
                color: "var(--text-primary)",
                outline: "none",
                transition: "border-color 0.15s",
              }}
              onFocus={(e) =>
                (e.target.style.borderColor = "var(--accent-orange)")
              }
              onBlur={(e) =>
                (e.target.style.borderColor = "var(--border-subtle)")
              }
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                style={{
                  position: "absolute",
                  right: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--text-muted)",
                  padding: 2,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Content ────────────────────────────────────────────────── */}
      <main
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: "32px 24px 64px",
        }}
      >
        {query && (
          <p
            style={{
              fontSize: 12,
              color: "var(--text-muted)",
              marginBottom: 24,
              marginTop: -8,
              fontWeight: 500,
            }}
          >
            {totalResults === 0
              ? "No sessions found"
              : `${totalResults} session${totalResults !== 1 ? "s" : ""} matching "${query}"`}
          </p>
        )}

        {orderedTrackIds.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "80px 0",
              color: "var(--text-muted)",
            }}
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              style={{ margin: "0 auto 12px", display: "block", opacity: 0.4 }}
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <p style={{ fontSize: 14 }}>No sessions match your search.</p>
          </div>
        )}

        {orderedTrackIds.map((trackId) => {
          const track = tracks.find((t) => t.id === trackId)!;
          const trackStyle = TRACK_STYLES[trackId];
          const trackSessions = grouped.get(trackId)!;

          return (
            <section key={trackId} style={{ marginBottom: 48 }}>
              {/* Track Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 16,
                  paddingBottom: 14,
                  borderBottom: `1px solid ${trackStyle.dim}`,
                }}
              >
                <div
                  style={{
                    width: 3,
                    height: 22,
                    borderRadius: 2,
                    background: trackStyle.accent,
                    flexShrink: 0,
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {track.name}
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: trackStyle.accent,
                      background: trackStyle.dim,
                      padding: "2px 8px",
                      borderRadius: 4,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    {track.code}
                  </span>
                  {track.level && (
                    <span
                      style={{
                        fontSize: 11,
                        color: "var(--text-muted)",
                        fontWeight: 500,
                        letterSpacing: "0.03em",
                      }}
                    >
                      {track.level}
                    </span>
                  )}
                </div>
              </div>

              {/* Session Cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {trackSessions.map((session) => (
                  <div
                    key={session.id}
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: 10,
                      padding: "16px 18px",
                      borderLeft: `3px solid ${trackStyle.dim}`,
                      boxShadow: "var(--shadow-sm)",
                      transition:
                        "border-left-color 0.15s, background 0.15s, box-shadow 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.setProperty(
                        "border-left",
                        `3px solid ${trackStyle.accent}`
                      );
                      el.style.setProperty(
                        "background",
                        "var(--bg-card-hover)"
                      );
                      el.style.setProperty("box-shadow", "var(--shadow-md)");
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.setProperty(
                        "border-left",
                        `3px solid ${trackStyle.dim}`
                      );
                      el.style.setProperty("background", "var(--bg-card)");
                      el.style.setProperty("box-shadow", "var(--shadow-sm)");
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: 16,
                        alignItems: "flex-start",
                        flexWrap: "wrap",
                      }}
                    >
                      {/* Time */}
                      <div
                        style={{
                          minWidth: 108,
                          flexShrink: 0,
                          paddingTop: 1,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            color: trackStyle.accent,
                            letterSpacing: "0.03em",
                          }}
                        >
                          {session.time}
                        </span>
                      </div>

                      {/* Content */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h3
                          style={{
                            margin: "0 0 6px",
                            fontSize: 14,
                            fontWeight: 600,
                            color: "var(--text-primary)",
                            letterSpacing: "-0.01em",
                            lineHeight: 1.45,
                          }}
                        >
                          {highlight(session.title, query)}
                        </h3>
                        <p
                          style={{
                            margin: 0,
                            fontSize: 13,
                            color: "var(--text-secondary)",
                            lineHeight: 1.7,
                            fontWeight: 400,
                          }}
                        >
                          {highlight(session.description, query)}
                        </p>
                      </div>

                      {activeTrack === ALL_TRACKS && (
                        <div style={{ flexShrink: 0, paddingTop: 1 }}>
                          <span
                            style={{
                              fontSize: 10,
                              fontWeight: 700,
                              color: trackStyle.accent,
                              background: trackStyle.dim,
                              padding: "2px 7px",
                              borderRadius: 4,
                              letterSpacing: "0.05em",
                              whiteSpace: "nowrap",
                              textTransform: "uppercase",
                            }}
                          >
                            {TRACK_DISPLAY_NAMES[trackId]}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </main>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer
        style={{
          borderTop: "1px solid var(--border-subtle)",
          padding: "24px 24px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 12,
            color: "var(--text-muted)",
            letterSpacing: "0.03em",
            fontWeight: 500,
          }}
        >
          AWS Mainframe Modernization Partner Conference
        </p>
      </footer>
    </div>
  );
}
