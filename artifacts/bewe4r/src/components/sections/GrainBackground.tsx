import { Component, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { GrainGradient } from "@paper-design/shaders-react";

/**
 * WebGL can throw (not reject) when no context is available — same lesson as the
 * Spline scene. Wrap the shader in an error boundary so a failure degrades to the
 * plain white hero background instead of crashing the whole page.
 */
class ShaderBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/**
 * Feature-detect WebGL once so we never even mount the shader (which throws, not
 * rejects) in contexts without a GL context — headless capture browsers, GL
 * disabled, etc. Falls back to the plain white hero background.
 */
const WEBGL_OK = (() => {
  if (typeof document === "undefined") return false;
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl") || c.getContext("experimental-webgl"));
  } catch {
    return false;
  }
})();

/**
 * Animated monochrome grain-gradient background tuned to the BEWE4R white theme:
 * white base with a full ramp of grays (up to ink) so the motion stays visible,
 * yet light enough for the ink hero heading + radial white wash to read on top.
 */
export default function GrainBackground({ className = "" }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  if (!WEBGL_OK) return null;
  return (
    <ShaderBoundary>
      <GrainGradient
        className={className}
        style={{ width: "100%", height: "100%" }}
        colorBack="#ffffff"
        colors={["#e4e4e4", "#b4b4b4", "#7c7c7c", "#171717"]}
        softness={0.9}
        intensity={0.45}
        noise={0.32}
        shape="corners"
        scale={1.15}
        speed={reduceMotion ? 0 : 0.5}
      />
    </ShaderBoundary>
  );
}
