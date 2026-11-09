# stereo-viewer

A single-file HTML viewer for a pair of slightly offset photos. It's built for
**cross-eye (or parallel) viewing**, and it can also wiggle, slide or make an
anaglyph. No libraries, no build step.

Inspired by [xkcd 941: Depth Perception](https://xkcd.com/941/).

## Run it

Pixel access (needed for auto-align and anaglyph) is blocked on `file://`, so
serve the folder over http:

```sh
cd fun/stereo-viewer
npx http-server -p 8000   # then open http://localhost:8000
```

The page shows `a.jpg` and `b.jpg` from its own folder (they aren't committed).
Point it at other images with `?a=left.jpg&b=right.jpg`, or just use
**Load two photos…** / drag and drop two files onto the page.

## Modes

| Mode | What it does |
|---|---|
| Side by side | The two photos next to each other for cross-eye or parallel viewing |
| Wiggle | Flips between the two views; the motion shows depth |
| Slide | Drag or move across the image to blend between the viewpoints |
| Anaglyph | Red/cyan composite for 3D glasses |

## Auto-align

On load it searches for the X / Y / zoom / rotation of photo B that best matches
photo A (normalised cross-correlation on high-passed, downscaled images,
coarse grid then local refinement). It then compares the leftover shift of the
lower (near) and upper (far) parts of the frame to guess which photo is the
left view and which is the right, and orders them for you.

- It aligns one depth plane. Objects at other depths keep their offset, and that offset is the 3D effect.
- The left/right guess assumes the lower part of the frame is nearer, which is
  true for tabletop scenes and not for, say, a ceiling lamp. **Flip left/right
  order** overrides it, and the choice is remembered.
- Sliders let you fine-tune by hand. **Size** shrinks the pair, since smaller
  images are easier to cross your eyes on.

## Phones

In short or narrow viewports (phone landscape) the controls collapse behind the
☰ button and the photos fill the screen. Tap the image to hide the panel.

## Notes

- Browsers can't display HEIC (except Safari). Convert to JPG first.
- Photos load locally in the browser; nothing is uploaded anywhere.
