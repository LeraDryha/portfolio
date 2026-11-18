import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/* Link previews (Open Graph, 1200×630). ImageResponse can't read the kit's CSS, so the few colours are the kit's
   tokens written out: page white, tile grey, ink, pencil, and the Mulberry Ink accent. */
const C = { page: "#ffffff", tile: "#f5f5f7", ink: "#1d1d1f", pencil: "#6e6e73", accent: "#952a66" };
export const ogSize = { width: 1200, height: 630 };
export const SITE_NAME = "Lera Starychenko";

async function geist() {
  return readFile(join(process.cwd(), "node_modules/next/dist/compiled/@vercel/og/Geist-Regular.ttf"));
}

/** A text card: a small line on top, the title, an optional proof in the accent, the name at the bottom. */
export async function ogCard({ kicker, title, mark, cap }: { kicker: string; title: string; mark?: string; cap?: string }) {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", padding: 40, background: C.page, fontFamily: "Geist" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "56px 64px", borderRadius: 36, background: C.tile }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ fontSize: 28, color: C.pencil }}>{kicker}</div>
            <div style={{ fontSize: title.length > 60 ? 54 : 66, lineHeight: 1.08, letterSpacing: -1.5, color: C.ink, maxWidth: 980 }}>{title}</div>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 40 }}>
            {mark ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 6, maxWidth: 700 }}>
                <div style={{ fontSize: 60, color: C.accent, letterSpacing: -1 }}>{mark}</div>
                {cap && <div style={{ fontSize: 24, color: C.pencil, lineHeight: 1.3 }}>{cap}</div>}
              </div>
            ) : (
              <div />
            )}
            <div style={{ fontSize: 26, color: C.ink }}>{SITE_NAME}</div>
          </div>
        </div>
      </div>
    ),
    { ...ogSize, fonts: [{ name: "Geist", data: await geist(), weight: 400, style: "normal" }] },
  );
}

/** A case's own cover as the preview, cropped to 1200×630 (the image renderer can't read webp, so sharp does it). */
export async function ogCover(src: string) {
  const sharp = (await import("sharp")).default;
  const png = await sharp(join(process.cwd(), "public", src)).resize(ogSize.width, ogSize.height, { fit: "cover", position: "centre" }).png().toBuffer();
  return new Response(new Uint8Array(png), { headers: { "content-type": "image/png", "cache-control": "public, max-age=31536000, immutable" } });
}
