"use client";

import { useState, useMemo } from "react";
import { sessions, tracks } from "@/lib/schedule";

const TRACK_STYLES: Record<
  string,
  { accent: string; bg: string; badge: string }
> = {
  business: {
    accent: "#e8622a",
    bg: "rgba(232,98,42,0.08)",
    badge: "rgba(232,98,42,0.18)",
  },
  tech1: {
    accent: "#4a90d9",
    bg: "rgba(74,144,217,0.08)",
    badge: "rgba(74,144,217,0.18)",
  },
  "tech1-d2": {
    accent: "#4a90d9",
    bg: "rgba(74,144,217,0.08)",
    badge: "rgba(74,144,217,0.18)",
  },
  tech2: {
    accent: "#2ab5a0",
    bg: "rgba(42,181,160,0.08)",
    badge: "rgba(42,181,160,0.18)",
  },
  "tech2-d2": {
    accent: "#2ab5a0",
    bg: "rgba(42,181,160,0.08)",
    badge: "rgba(42,181,160,0.18)",
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
          background: "rgba(232,98,42,0.35)",
          color: "inherit",
          borderRadius: "2px",
          padding: "0 1px",
        }}
      >
        {part}
      </mark>
    ) : (
      part
    )
  );
}

export default function Home() {
  const [activeDay, setActiveDay] = useState<1 | 2>(1);
  const [activeTrack, setActiveTrack] = useState<FilterTrack>(ALL_TRACKS);
  const [query, setQuery] = useState("");

  const trackFilterGroups: { id: FilterTrack; label: string }[] = [
    { id: ALL_TRACKS, label: "All Tracks" },
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
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 6,
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
                letterSpacing: "0.12em",
                color: "var(--accent-orange)",
                fontWeight: 600,
                textTransform: "uppercase",
              }}
            >
              AWS Partner Conference
            </span>
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: "clamp(20px, 4vw, 28px)",
              fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
            }}
          >
            Mainframe Modernization
          </h1>
          <p
            style={{
              margin: "6px 0 0",
              fontSize: 13,
              color: "var(--text-muted)",
              letterSpacing: "0.01em",
            }}
          >
            Session Schedule — 2 Days · 3 Tracks · 22 Sessions
          </p>
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
          backdropFilter: "blur(8px)",
        }}
      >
        <div
          style={{
            maxWidth: 960,
            margin: "0 auto",
            padding: "12px 24px",
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            alignItems: "center",
          }}
        >
          {/* Day tabs */}
          <div
            style={{
              display: "flex",
              gap: 3,
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
                  padding: "5px 16px",
                  borderRadius: 6,
                  border: "none",
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 600,
                  transition: "all 0.15s",
                  background:
                    activeDay === d ? "var(--accent-orange)" : "transparent",
                  color: activeDay === d ? "#fff" : "var(--text-secondary)",
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
              gap: 3,
              background: "var(--bg-card)",
              padding: 3,
              borderRadius: 8,
              border: "1px solid var(--border-subtle)",
            }}
          >
            {trackFilterGroups.map((t) => {
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
                    transition: "all 0.15s",
                    background:
                      activeTrack === t.id
                        ? "var(--bg-card-hover)"
                        : "transparent",
                    color:
                      activeTrack === t.id && accentColor
                        ? accentColor
                        : activeTrack === t.id
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
          <div style={{ position: "relative", flex: 1, minWidth: 180 }}>
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
                color: "var(--text-primary)",
                outline: "none",
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
          const style = TRACK_STYLES[trackId];
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
                  paddingBottom: 12,
                  borderBottom: `1px solid ${style.accent}22`,
                }}
              >
                <div
                  style={{
                    width: 3,
                    height: 22,
                    borderRadius: 2,
                    background: style.accent,
                    flexShrink: 0,
                  }}
                />
                <div>
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
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {track.name}
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: style.accent,
                        background: style.badge,
                        padding: "2px 8px",
                        borderRadius: 4,
                        letterSpacing: "0.04em",
                      }}
                    >
                      {track.code}
                    </span>
                    {track.level && (
                      <span
                        style={{
                          fontSize: 11,
                          color: "var(--text-muted)",
                          letterSpacing: "0.04em",
                        }}
                      >
                        {track.level}
                      </span>
                    )}
                  </div>
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
                      borderLeft: `3px solid ${style.accent}55`,
                      transition: "border-left-color 0.15s, background 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderLeftColor =
                        style.accent;
                      (e.currentTarget as HTMLElement).style.background =
                        "var(--bg-card-hover)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderLeftColor =
                        `${style.accent}55`;
                      (e.currentTarget as HTMLElement).style.background =
                        "var(--bg-card)";
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
                            fontWeight: 600,
                            color: style.accent,
                            letterSpacing: "0.02em",
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
                            lineHeight: 1.4,
                          }}
                        >
                          {highlight(session.title, query)}
                        </h3>
                        <p
                          style={{
                            margin: 0,
                            fontSize: 13,
                            color: "var(--text-secondary)",
                            lineHeight: 1.65,
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
                              fontWeight: 600,
                              color: style.accent,
                              background: style.badge,
                              padding: "2px 7px",
                              borderRadius: 4,
                              letterSpacing: "0.04em",
                              whiteSpace: "nowrap",
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
          padding: "20px 24px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 12,
            color: "var(--text-muted)",
            letterSpacing: "0.02em",
          }}
        >
          AWS Mainframe Modernization Partner Conference
        </p>
      </footer>
    </div>
  );
}
