# Ebook Files

Put your 4 book PDFs in this folder using these exact filenames:

| Book                                            | Filename                  |
|-------------------------------------------------|---------------------------|
| 01 — Releasing the Eagle in You                 | a7f3k9-eagle.pdf          |
| 02 — Journey to Understanding                   | b2m8q4-journey.pdf        |
| 03 — New Media and Democracy                    | c5p2w7-media.pdf          |
| 04 — Nollywood and the Challenge of Subtitles   | d9r1x6-nollywood.pdf      |

## Why the random hashed filenames?

If someone inspects the page's DevTools, they'll only see `a7f3k9-eagle.pdf` — not "Releasing the Eagle in You.pdf". This makes it harder for casual users to share the file. They'd need both the URL AND know which book it is.

## To rotate a hash (if a leak happens):

1. Rename the file (e.g. `a7f3k9-eagle.pdf` → `xy8z2k-eagle.pdf`)
2. Update the `file` field in `src/data/books.js` for that book
3. Commit & push — Vercel redeploys
4. Existing buyers will automatically use the new URL on their next page load

## Optional: pre-process PDFs

Before uploading, consider:
- Adding a copyright watermark on every page (using Adobe Acrobat → Tools → Edit PDF → Watermark)
- Removing the "permission to print" flag in PDF metadata
- Optimizing file size (Acrobat → Save as Reduced Size PDF)

Then drop them in this folder. Git won't track the .pdf files automatically — let me know if you want them committed.
