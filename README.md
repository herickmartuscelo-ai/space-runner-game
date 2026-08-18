# 🚀 Space Runner - Endless Runner Game

A fun and addictive space-themed endless runner game built with vanilla JavaScript, HTML5 Canvas, and CSS. Perfect for mobile and desktop play!

## 🎮 Game Features

- **Endless Gameplay**: Navigate through an asteroid field with increasing difficulty
- **Progressive Difficulty**: Game speed and obstacle spawn rate increase over time
- **Power-ups**: Collect special power-ups for bonuses:
  - 🛡️ **Shield**: Gain an extra life
  - ⚡ **Speed Boost**: Earn 50 bonus points
  - 💎 **Magnet**: Earn 100 bonus points
- **Collectibles**: Grab golden stars for points
- **High Score System**: Your best score is saved locally
- **Mobile-Friendly Controls**: 
  - Touch controls (tap left/right)
  - Arrow keys or A/D keys
  - On-screen buttons for mobile
- **Responsive Design**: Works on phones, tablets, and desktops
- **Particle Effects**: Explosions and visual feedback for actions
- **Pause/Resume**: Take a break anytime
- **Share Score**: Challenge your friends!

## 🕹️ How to Play

### Starting the Game
1. Open `index.html` in your web browser
2. Click **START GAME** button
3. Avoid asteroids, collect stars and power-ups

### Controls
| Input | Action |
|-------|--------|
| **Arrow Left** / **A** | Move Left |
| **Arrow Right** / **D** | Move Right |
| **P** | Pause/Resume |
| **Mobile Tap** | Left half = Move Left, Right half = Move Right |
| **On-Screen Buttons** | Use the virtual buttons at the bottom |

### Scoring
- 💛 **Yellow Star**: +10 points
- 🛡️ **Shield Power-up**: +1 life
- ⚡ **Speed Boost**: +50 points
- 💎 **Magnet Power-up**: +100 points

### Game Mechanics
- You start with **3 lives**
- Hitting an asteroid costs 1 life
- Difficulty increases every 5 seconds
- Game ends when you run out of lives
- Your high score is saved automatically

## 📁 Project Structure

```
space-runner-game/
├── index.html          # Main HTML file
├── style.css           # Styling and animations
├── game.js             # Game logic and mechanics
└── README.md           # This file
```

## 🚀 Quick Start

### Option 1: Direct Browser Play
1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start playing!

### Option 2: GitHub Pages (Share with Friends)
1. Go to your repository settings
2. Enable GitHub Pages
3. Set source to `main` branch
4. Share the GitHub Pages URL with your friends!

**Example URL**: `https://yourusername.github.io/space-runner-game/`

## 💾 Save/Share

- **High Score**: Automatically saved to your browser's local storage
- **Share Score**: Click "SHARE SCORE" button after game over to challenge friends
- **Send to Friends**: Simply share the GitHub repository URL or the GitHub Pages link

## 🎨 Game Design

- **Retro Pixel Art Style**: Nostalgic 8-bit inspired graphics
- **Neon Color Scheme**: Cyan, green, and red colors with glow effects
- **Smooth Animations**: Particle effects and smooth gameplay
- **Sound-Ready**: Structure allows for easy audio addition

## 🔧 Customization

### Change Difficulty
Edit `game.js` - Look for these variables:
```javascript
this.gameSpeed = 3;           // Initial speed
this.spawnRate = 0.02;        // How often obstacles spawn
this.collectibleRate = 0.01;  // How often collectibles spawn
this.powerUpRate = 0.003;     // How often power-ups spawn
```

### Change Colors
Edit `style.css` - Look for color values like:
- `#00d4ff` - Cyan (primary)
- `#00ff00` - Green (player)
- `#ff6b6b` - Red (obstacles)

### Change Canvas Size
Edit both files:
- `index.html`: `<canvas id="gameCanvas" width="400" height="600"></canvas>`
- `style.css`: Adjust `.mobile-controls` and responsive rules
- `game.js`: Player spawn position calculations

## 📱 Mobile Optimization

The game is fully optimized for mobile:
- Responsive touch controls
- Full-screen canvas
- Mobile button layout at bottom
- Prevents pinch-to-zoom
- Works on iOS and Android

## 🐛 Browser Compatibility

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers (iOS Safari, Chrome Mobile, Firefox Mobile)

## 📊 Game Balance

| Level | Speed | Spawn Rate | Description |
|-------|-------|-----------|-------------|
| 1-2 | Slow | Low | Learning phase |
| 3-5 | Medium | Medium | Getting challenging |
| 6+ | Fast | High | Intense gameplay |

## 🎯 Tips for High Scores

1. **Stay Centered**: Move smoothly, don't jerk side to side
2. **Plan Ahead**: Look for gaps in the asteroid field
3. **Collect Stars**: Gather every yellow star you can
4. **Power-ups First**: Grab power-ups before other collectibles
5. **Practice Levels 1-2**: Master movement before speed increases
6. **Use Edges**: Sometimes dodging at screen edges is safer
7. **Stay Invulnerable**: After hitting an asteroid, use the 2-second shield wisely

## 🚀 Future Enhancement Ideas

- 🔊 Sound effects and background music
- 🎵 Different difficulty modes
- 🏆 Online leaderboard
- 🎨 Multiple spaceship skins
- ⭐ Bonus levels and bosses
- 💥 Different asteroid types
- 🌟 Combo system
- 🎁 Unlockable achievements

## 📄 License

This game is free to use and distribute. Feel free to modify and share with your friends!

## 🤝 Share Your Score

After playing, click **SHARE SCORE** to tell your friends how many points you got. Challenge them to beat your high score!

---

**Made with ❤️ for fun and entertainment**

Enjoy the game! 🎮✨
