import React, {useState, useRef, useEffect} from "react";

export const ChatBar = ({
  initialQuery = "",
  placeholder = "What will you like to build...",
  onSubmit,
  isStreaming = false,
  isSubmitting = false,
  onCancel,
  style = {},
  theme = "blue",
  playgroundUid,
  framework = "react",
}) => {
  // Internal state management
  const [query, setQuery] = useState(initialQuery || "");
  const [isFocused, setIsFocused] = useState(false);

  // Generic theme configuration following Mintlify naming conventions
  const gradientThemes = {
    blue: {
      primary: "#1ca0fb",
      shadow: {
        light: "#dbeafe", // blue-100
        dark: "#1e40af", // blue-800
      },
      gradient:
        "radial-gradient(circle farthest-side at 0 100%, #00ccb1, transparent), radial-gradient(circle farthest-side at 100% 0, #7b61ff, transparent), radial-gradient(circle farthest-side at 100% 100%, #ffc414, transparent), radial-gradient(circle farthest-side at 0 0, #1ca0fb, #141316)",
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!query.trim() || isStreaming || isSubmitting) {
      return;
    }

    // If playgroundUid is provided, redirect to playground
    if (playgroundUid) {
      const encodedQuery = encodeURIComponent(query.trim());
      const encodedFramework = encodeURIComponent(framework);
      const url = `https://${playgroundUid}.sampleapp.ai?q=${encodedQuery}&framework=${encodedFramework}`;
      window.open(url, "_blank");
      return;
    }

    // Otherwise, call the provided onSubmit handler
    if (onSubmit) {
      onSubmit(query.trim(), framework);
    }
  };

  const upArrow = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        data-v-6433c584=""
      >
        <path d="m5 12 7-7 7 7"></path>
        <path d="M12 19V5"></path>
      </svg>
    );
  };

  const colorScheme = gradientThemes[theme];

  return (
    <div style={style}>
      {/* Gradient Border Container */}
      <div
        style={{
          position: "relative",
          padding: "2px",
        }}
      >
        {/* Static border */}
        <div
          style={{
            backgroundColor: colorScheme.shadow.dark,
            position: "absolute",
            top: "0",
            right: "0",
            bottom: "0",
            left: "0",
            borderRadius: "0.85rem",
            transition: "opacity 0.3s ease-in-out",
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            opacity: "1",
            pointerEvents: "none",
          }}
        />

        {/* Animated gradient border - blur effect */}
        <div
          style={{
            background: colorScheme.gradient,
            backgroundSize: "400% 400%",
            position: "absolute",
            top: "0",
            right: "0",
            bottom: "0",
            left: "0",
            borderRadius: "0.85rem",
            zIndex: "1",
            filter: "blur(12px)",
            transition: "opacity 0.3s ease-in-out",
            pointerEvents: "none",
            opacity: "0.6",
            animation: "gradient-bg 5s ease infinite",
          }}
        />

        {/* Animated gradient border - main */}
        <div
          style={{
            background: colorScheme.gradient,
            backgroundSize: "400% 400%",
            position: "absolute",
            top: "0",
            right: "0",
            bottom: "0",
            left: "0",
            borderRadius: "0.85rem",
            zIndex: "1",
            transition: "opacity 0.3s ease-in-out",
            pointerEvents: "none",
            opacity: "1",
            animation: "gradient-bg 5s ease infinite",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: "10",
            borderRadius: "0.75rem",
            backgroundColor: "#18181b",
            width: "100%",
            marginLeft: "auto",
            marginRight: "auto",
            paddingLeft: "0.25rem",
            paddingRight: "0.25rem",
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.25rem",
            }}
          >
            {/* Input area */}
            <div
              style={{
                position: "relative",
                display: "flex",
                paddingLeft: "0.5rem",
                paddingRight: "0.5rem",
                gap: "0.5rem",
                paddingTop: "0.25rem",
                paddingBottom: "0.25rem",
              }}
            >
              <textarea
                placeholder={placeholder}
                style={{
                  flex: "1 1 0%",
                  width: "100%",
                  border: "0",
                  boxShadow: "none",
                  outline: "none",
                  paddingLeft: "0.25rem",
                  paddingRight: "0.25rem",
                  resize: "none",
                  fontSize: "1rem",
                  overflow: "hidden",
                  backgroundColor: "transparent",
                  display: "block",
                  paddingTop: "0",
                  paddingBottom: "0",
                  lineHeight: "1.5",
                  overflowY: "auto",
                  maxHeight: "12rem",
                  marginTop: "0.25rem",
                  color: "#FFFFFF",
                  minHeight: "5rem",
                }}
                value={query}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={(e) => {
                  if (e && e.target) {
                    const newValue = e.target.value;
                    setQuery(newValue);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                rows={1}
              />

              {/* Submit button */}
              {(query.length > 0 || isStreaming || isSubmitting) && (
                <button
                  type="button"
                  style={{
                    height: "2rem",
                    width: "2rem",
                    borderRadius: "0.75rem",
                    backgroundColor: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "black",
                    transition: "background-color 0.15s ease-in-out",
                    border: "none",
                    cursor: "pointer",
                    opacity:
                      isSubmitting || (!query.trim() && !isStreaming) ? 0.5 : 1,
                  }}
                  disabled={isSubmitting || (!query.trim() && !isStreaming)}
                  onClick={(e) => {
                    if (isStreaming && onCancel) {
                      onCancel();
                    } else {
                      handleSubmit(e);
                    }
                  }}
                  onMouseEnter={(e) => {
                    const target = e.target;
                    if (!target.disabled) {
                      target.style.backgroundColor = "#f3f4f6";
                    }
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target;
                    if (!target.disabled) {
                      target.style.backgroundColor = "white";
                    }
                  }}
                >
                  {upArrow()}
                </button>
              )}
            </div>
          </div>
        </div>

        <style>{`
          @keyframes gradient-bg {
            0%,
            100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }
          @keyframes fadeIn {
            0% {
              opacity: 0;
              transform: scale(0.95);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}</style>
      </div>
    </div>
  );
};
