+++
title = "CHIP-8 Interpreter & Emulators"
date = 2024-08-19
description = "A WIP interpreter/emulator built to run CHIP-8 programs in C with SDL2, alongside explorations into 8080/6502 emulation in Rust."

[taxonomies]
technologies = ["C", "SDL", "CMake", "Rust", "Emulation"]

[extra]
status = "In Progress"
git_link = "https://github.com/florinsalasan/homegrown-organic-emulators"
cover_image = "/images/low-res-chip8.jpg"
gallery = [
  { src = "/images/low-res-chip8.jpg", caption = "CHIP-8 emulator display output running via SDL2" }
]
+++

## CHIP-8 Interpreter

### The Tech Stack

This emulator was written fully in **C** and used the **SDL2** framework for the graphics library; it was then compiled with **CMake** using a guide I found online.

I wanted to use C again since I hadn't used it in a long time, instead opting to use higher-level languages like Python and JavaScript. So I wanted to see if I still knew how to write C effectively. After finishing up this CHIP-8 interpreter, I still don't know how good my C is since I avoided using pointers—not intentionally, but because I never ran into a scenario where I believed that it would have been necessary to use them. Looking back, this may have created issues since tests from various test ROMs all pass, but the interpreter is still buggy and not working properly on certain games.

### Moving to Rust for Next Emulators

For the second emulator, I wanted to use **Rust**. This is for two main reasons:
1. I enjoy working with new toolsets and seeing what they can offer in comparison to other ones.
2. For Rust specifically, I liked the idea that the language is a lot stricter when it comes to mutability and memory allocation, especially in comparison with C where you can just shoot yourself in the foot and the compiler doesn't even blink.

I'm still getting the hang of writing Rust code, but so far I am enjoying it—even the detours to understand why certain things are the way they are and encountering Rust features such as lifetimes along the way. I also found the way Rust sets up unit testing to be really intuitive and easy to work with, which has so far made it far easier to incorporate tests compared to the CHIP-8 emulator.
