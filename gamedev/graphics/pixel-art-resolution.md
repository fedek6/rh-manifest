
# How to choose a resolution for pixel-art game?

* I upscale 320×180 to 1920×1080, it's the right pixel size for me but my sprites tend to be around 24×24.

* I use 640×360 (2x larger than what you use). Really, anything that is 16:9 and can be scaled up by some integer to obtain the common resolutions should be good -- then you can just do the obvious thing for 720p screens, 1080p screens, etc. For other geometries you have to be creative either by adding black bars, or by allowing the viewport to grow (if that's feasible in your game)

* Instead, each Shovel Knight pixel is really 4.5x4.5 pixels at 1080p, giving a virtual resolution of 400×240. An NES outputs at 256×240, giving us the same viewable vertical resolution. Our background tiles (like most NES games) are 16×16 in size, and we have the same number of vertical tiles as an NES game. Keeping the vertical and tile size dimensions were important to us in order to match the gameplay feel of NES titles. The only difference is additional horizontal space, which we thought was a great addition, allowing extra room in level design for puzzles, objects, and breathing room.