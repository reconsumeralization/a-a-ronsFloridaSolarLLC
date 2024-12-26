type ClarityOptions = {
  projectId: string;
  afterLoad?: () => void;
};

declare global {
  interface Window {
    clarity?: (command: string, ...args: unknown[]) => void;
  }
}

export function initClarity(options: ClarityOptions) {
  const { projectId, afterLoad } = options;

  if (typeof window === "undefined") return;

  try {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = `https://www.clarity.ms/tag/${projectId}`;

    script.onload = () => {
      if (afterLoad) afterLoad();
    };

    document.head.appendChild(script);
  } catch (error) {
    console.error("Failed to initialize Clarity:", error);
  }
}

export function trackClarityEvent(name: string, value?: string | number) {
  if (typeof window !== "undefined" && window.clarity) {
    window.clarity("event", name, { value });
  }
}
