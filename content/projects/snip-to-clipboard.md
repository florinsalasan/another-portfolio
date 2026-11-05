+++
title = "Snip to Clipboard (OCR Utility)"
date = 2024-08-16
description = "A set of Python scripts that act as a screen snipping tool, optical character recognition (OCR) text extractor, and one-command clipboard utility."

[taxonomies]
technologies = ["Python", "Tesseract", "Tkinter"]

[extra]
status = "Completed"
git_link = "https://github.com/florinsalasan/snip-to-clipboard"
cover_image = "/images/snip-to-clipboard.jpg"
gallery = [
  { src = "/images/snip-to-clipboard.jpg", caption = "Selecting a screen region to extract text via Tesseract OCR" },
  { src = "/images/snip-to-clip.png", caption = "Extracted text output copied directly to clipboard" }
]
+++

## Snip to Clipboard

### Overview

A set of three Python scripts that act as:
1. A screen region snipping tool (`tk`),
2. A text extractor from an image using **Tesseract OCR**, and
3. An all-in-one shortcut command that pipes the snipped screen region directly into your system clipboard as plain text.

It works seamlessly on a single display and includes coordinate adjustments for notched MacBook displays.
