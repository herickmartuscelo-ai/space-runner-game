// Space Runner Game - Mobile Enhanced with Shooting Mechanic
class SpaceRunner {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Set canvas size to match window
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        window.addEventListener('orientationchange', () => this.resizeCanvas());
        
        // Game States
        this.gameState = 'start'; // start, playing, paused, gameOver
        this.score = 0;
        this.level = 1;
        this.lives = 3;
        this.gameSpeed = 3;
        
        // Player
        this.player = {
            x: this.canvas.width / 2 - 15,
            y: this.canvas.height - 80,
            width: 30,
            height: 40,
            speed: 6,
            active: true
        };
        
        // Weapons and projectiles
        this.bullets = [];
        this.fireRate = 8; // frames between shots
        this.fireCounter = 0;
        
        // Obstacles and collectibles
        this.obstacles = [];
        this.collectibles = [];
        this.powerUps = [];
        this.particles = [];
        this.explosions = [];
        
        // Game mechanics
        this.spawnRate = 0.02;
        this.collectibleRate = 0.01;
        this.powerUpRate = 0.003;
        this.frameCount = 0;
        this.invulnerableTime = 0;
        
        // High score
        this.highScore = localStorage.getItem('spaceRunnerHighScore') || 0;
        
        // Input handling
        this.keys = {};
        this.touchControls = {
            left: false,
            right: false,
            shoot: false
        };
        
        this.setupEventListeners();
        this.draw();
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    setupEventListeners() {
        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;
            if (e.key === ' ') {
                e.preventDefault();
                this.touchControls.shoot = true;
            }
            if (e.key === 'p' || e.key === 'P') this.togglePause();
        });
        
        document.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
            if (e.key === ' ') {
                this.touchControls.shoot = false;
            }
        });
        
        // Touch controls for movement
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const rect = this.canvas.getBoundingClientRect();
            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;
            
            // Left side for moving left
            if (x < this.canvas.width / 3) {
                this.touchControls.left = true;
            }
            // Right side for moving right
            else if (x > (this.canvas.width * 2) / 3) {
                this.touchControls.right = true;
            }
            // Center for shooting
            else {
                this.touchControls.shoot = true;
            }
        });
        
        this.canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.touchControls.left = false;
            this.touchControls.right = false;
            this.touchControls.shoot = false;
        });
        
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
        });
        
        // Button controls
        document.getElementById('startBtn').addEventListener('click', () => this.startGame());
        document.getElementById('restartBtn').addEventListener('click', () => this.startGame());
        document.getElementById('resumeBtn').addEventListener('click', () => this.togglePause());
        document.getElementById('quitBtn').addEventListener('click', () => this.goToMenu());
        document.getElementById('shareBtn').addEventListener('click', () => this.shareScore());
        
        // Left button
        document.getElementById('leftBtn').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.touchControls.left = true;
        });
        document.getElementById('leftBtn').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.touchControls.left = false;
        });
        document.getElementById('leftBtn').addEventListener('mousedown', () => {
            this.touchControls.left = true;
        });
        document.getElementById('leftBtn').addEventListener('mouseup', () => {
            this.touchControls.left = false;
        });
        
        // Right button
        document.getElementById('rightBtn').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.touchControls.right = true;
        });
        document.getElementById('rightBtn').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.touchControls.right = false;
        });
        document.getElementById('rightBtn').addEventListener('mousedown', () => {
            this.touchControls.right = true;
        });
        document.getElementById('rightBtn').addEventListener('mouseup', () => {
            this.touchControls.right = false;
        });
        
        // Shoot button
        document.getElementById('shootBtn').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.touchControls.shoot = true;
        });
        document.getElementById('shootBtn').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.touchControls.shoot = false;
        });
        document.getElementById('shootBtn').addEventListener('mousedown', () => {
            this.touchControls.shoot = true;
        });
        document.getElementById('shootBtn').addEventListener('mouseup', () => {
            this.touchControls.shoot = false;
        });
    }
    
    startGame() {
        this.gameState = 'playing';
        this.score = 0;
        this.level = 1;
        this.lives = 3;
        this.gameSpeed = 3;
        this.frameCount = 0;
        this.obstacles = [];
        this.collectibles = [];
        this.powerUps = [];
        this.bullets = [];
        this.invulnerableTime = 0;
        this.player.active = true;
        this.player.x = this.canvas.width / 2 - 15;
        
        this.setScreenVisibility('startScreen', false);
        this.setScreenVisibility('gameOverScreen', false);
        this.setScreenVisibility('pauseScreen', false);
        
        this.update();
    }
    
    togglePause() {
        if (this.gameState === 'playing') {
            this.gameState = 'paused';
            this.setScreenVisibility('pauseScreen', true);
        } else if (this.gameState === 'paused') {
            this.gameState = 'playing';
            this.setScreenVisibility('pauseScreen', false);
            this.update();
        }
    }
    
    goToMenu() {
        this.gameState = 'start';
        this.setScreenVisibility('pauseScreen', false);
        this.setScreenVisibility('startScreen', true);
        this.obstacles = [];
        this.collectibles = [];
        this.powerUps = [];
        this.bullets = [];
    }
    
    gameOver() {
        this.gameState = 'gameOver';
        
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('spaceRunnerHighScore', this.highScore);
        }
        
        document.getElementById('finalScore').textContent = this.score;
        document.getElementById('finalLevel').textContent = this.level;
        
        this.setScreenVisibility('gameOverScreen', true);
    }
    
    shareScore() {
        const text = `🚀 I scored ${this.score} points in Space Runner! Shot down asteroids and collected stars! Can you beat my score? https://github.com/herickmartuscelo-ai/space-runner-game`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Space Runner',
                text: text
            }).catch(err => console.log('Error sharing:', err));
        } else {
            alert(text);
        }
    }
    
    setScreenVisibility(screenId, visible) {
        const screen = document.getElementById(screenId);
        if (visible) {
            screen.classList.add('active');
        } else {
            screen.classList.remove('active');
        }
    }
    
    update() {
        if (this.gameState !== 'playing') {
            if (this.gameState === 'start') {
                this.setScreenVisibility('startScreen', true);
            }
            return;
        }
        
        this.frameCount++;
        
        // Increase difficulty over time
        if (this.frameCount % 300 === 0) {
            this.level++;
            this.gameSpeed += 0.5;
            this.spawnRate += 0.002;
        }
        
        // Handle player movement
        if (this.keys['ArrowLeft'] || this.keys['a'] || this.keys['A'] || this.touchControls.left) {
            this.player.x -= this.player.speed;
        }
        if (this.keys['ArrowRight'] || this.keys['d'] || this.keys['D'] || this.touchControls.right) {
            this.player.x += this.player.speed;
        }
        
        // Keep player in bounds
        if (this.player.x < 0) this.player.x = 0;
        if (this.player.x + this.player.width > this.canvas.width) {
            this.player.x = this.canvas.width - this.player.width;
        }
        
        // Handle shooting
        if (this.touchControls.shoot || this.keys[' ']) {
            if (this.fireCounter <= 0) {
                this.shoot();
                this.fireCounter = this.fireRate;
            }
        }
        this.fireCounter--;
        
        // Spawn obstacles
        if (Math.random() < this.spawnRate) {
            this.spawnObstacle();
        }
        
        // Spawn collectibles
        if (Math.random() < this.collectibleRate) {
            this.spawnCollectible();
        }
        
        // Spawn power-ups
        if (Math.random() < this.powerUpRate) {
            this.spawnPowerUp();
        }
        
        // Update bullets
        this.bullets.forEach((bullet, index) => {
            bullet.y -= bullet.speed;
            
            // Check collision with obstacles
            for (let i = this.obstacles.length - 1; i >= 0; i--) {
                if (this.isColliding(bullet, this.obstacles[i])) {
                    this.score += 15; // Points for destroying asteroid
                    this.createExplosion(this.obstacles[i].x + this.obstacles[i].width / 2, 
                                       this.obstacles[i].y + this.obstacles[i].height / 2);
                    this.createParticles(this.obstacles[i].x + this.obstacles[i].width / 2, 
                                        this.obstacles[i].y + this.obstacles[i].height / 2, '#ff9900');
                    this.obstacles.splice(i, 1);
                    this.bullets.splice(index, 1);
                    return;
                }
            }
            
            // Remove if off screen
            if (bullet.y < 0) {
                this.bullets.splice(index, 1);
            }
        });
        
        // Update obstacles
        this.obstacles.forEach((obs, index) => {
            obs.y += this.gameSpeed;
            
            // Check collision with player
            if (this.isColliding(this.player, obs)) {
                if (this.invulnerableTime <= 0) {
                    this.lives--;
                    this.invulnerableTime = 120; // 2 seconds at 60 FPS
                    this.createExplosion(this.player.x + this.player.width / 2, this.player.y);
                    
                    if (this.lives <= 0) {
                        this.player.active = false;
                        this.gameOver();
                    }
                }
            }
            
            // Remove if off screen
            if (obs.y > this.canvas.height) {
                this.obstacles.splice(index, 1);
            }
        });
        
        // Update collectibles
        this.collectibles.forEach((col, index) => {
            col.y += this.gameSpeed;
            col.rotation += 0.05;
            
            if (this.isColliding(this.player, col)) {
                this.score += col.points;
                this.createParticles(col.x, col.y, '#00ff00');
                this.collectibles.splice(index, 1);
            }
            
            if (col.y > this.canvas.height) {
                this.collectibles.splice(index, 1);
            }
        });
        
        // Update power-ups
        this.powerUps.forEach((pup, index) => {
            pup.y += this.gameSpeed;
            pup.rotation += 0.08;
            
            if (this.isColliding(this.player, pup)) {
                this.activatePowerUp(pup.type);
                this.createParticles(pup.x, pup.y, '#ffff00');
                this.powerUps.splice(index, 1);
            }
            
            if (pup.y > this.canvas.height) {
                this.powerUps.splice(index, 1);
            }
        });
        
        // Update particles
        this.particles.forEach((p, index) => {
            p.x += p.vx;
            p.y += p.vy;
            p.life--;
            p.vy += 0.1; // Gravity
            
            if (p.life <= 0) {
                this.particles.splice(index, 1);
            }
        });
        
        // Update explosions
        this.explosions.forEach((exp, index) => {
            exp.life--;
            if (exp.life <= 0) {
                this.explosions.splice(index, 1);
            }
        });
        
        // Update invulnerability
        this.invulnerableTime--;
        
        // Update UI
        document.getElementById('score').textContent = this.score;
        document.getElementById('level').textContent = this.level;
        document.getElementById('lives').textContent = this.lives;
        
        this.draw();
        requestAnimationFrame(() => this.update());
    }
    
    shoot() {
        this.bullets.push({
            x: this.player.x + this.player.width / 2 - 2,
            y: this.player.y,
            width: 4,
            height: 12,
            speed: 8
        });
        
        this.createParticles(this.player.x + this.player.width / 2, this.player.y, '#ffff00');
    }
    
    spawnObstacle() {
        const width = 40;
        const height = 40;
        const x = Math.random() * (this.canvas.width - width);
        
        this.obstacles.push({
            x: x,
            y: -height,
            width: width,
            height: height,
            type: Math.random() > 0.5 ? 'asteroid1' : 'asteroid2'
        });
    }
    
    spawnCollectible() {
        const size = 15;
        const x = Math.random() * (this.canvas.width - size);
        
        this.collectibles.push({
            x: x,
            y: -size,
            width: size,
            height: size,
            points: 10,
            rotation: 0
        });
    }
    
    spawnPowerUp() {
        const size = 20;
        const x = Math.random() * (this.canvas.width - size);
        const types = ['shield', 'speedBoost', 'magnet'];
        const type = types[Math.floor(Math.random() * types.length)];
        
        this.powerUps.push({
            x: x,
            y: -size,
            width: size,
            height: size,
            type: type,
            rotation: 0
        });
    }
    
    activatePowerUp(type) {
        switch(type) {
            case 'shield':
                this.lives = Math.min(this.lives + 1, 5);
                break;
            case 'speedBoost':
                this.score += 50;
                break;
            case 'magnet':
                this.score += 100;
                break;
        }
    }
    
    isColliding(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + rect2.height &&
               rect1.y + rect1.height > rect2.y;
    }
    
    createExplosion(x, y) {
        this.explosions.push({
            x: x,
            y: y,
            radius: 5,
            maxRadius: 30,
            life: 20,
            maxLife: 20
        });
        
        for (let i = 0; i < 12; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 8,
                vy: (Math.random() - 0.5) * 8,
                life: 30,
                color: '#ff6b6b'
            });
        }
    }
    
    createParticles(x, y, color) {
        for (let i = 0; i < 8; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 5,
                vy: (Math.random() - 0.5) * 5,
                life: 20,
                color: color
            });
        }
    }
    
    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw starfield background
        this.drawStarfield();
        
        // Draw explosions
        this.explosions.forEach(exp => {
            this.drawExplosion(exp);
        });
        
        // Draw obstacles
        this.obstacles.forEach(obs => {
            this.drawObstacle(obs);
        });
        
        // Draw collectibles
        this.collectibles.forEach(col => {
            this.drawCollectible(col);
        });
        
        // Draw power-ups
        this.powerUps.forEach(pup => {
            this.drawPowerUp(pup);
        });
        
        // Draw bullets
        this.bullets.forEach(bullet => {
            this.ctx.fillStyle = '#ffff00';
            this.ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
            // Bullet glow
            this.ctx.shadowColor = '#ffff00';
            this.ctx.shadowBlur = 8;
        });
        this.ctx.shadowBlur = 0;
        
        // Draw particles
        this.particles.forEach(p => {
            this.ctx.fillStyle = p.color;
            this.ctx.globalAlpha = p.life / 30;
            this.ctx.fillRect(p.x, p.y, 3, 3);
            this.ctx.globalAlpha = 1;
        });
        
        // Draw player
        if (this.player.active) {
            this.drawPlayer();
        }
    }
    
    drawStarfield() {
        this.ctx.fillStyle = '#1a1a2e';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Simple starfield pattern
        this.ctx.fillStyle = '#fff';
        for (let i = 0; i < 50; i++) {
            const x = (i * 73) % this.canvas.width;
            const y = (i * 91 + this.frameCount * 0.5) % this.canvas.height;
            this.ctx.fillRect(x, y, 1, 1);
        }
    }
    
    drawExplosion(exp) {
        const progress = 1 - (exp.life / exp.maxLife);
        const currentRadius = exp.radius + (exp.maxRadius - exp.radius) * progress;
        
        this.ctx.fillStyle = `rgba(255, 107, 107, ${1 - progress})`;
        this.ctx.beginPath();
        this.ctx.arc(exp.x, exp.y, currentRadius, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.ctx.strokeStyle = `rgba(255, 200, 0, ${1 - progress})`;
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    }
    
    drawPlayer() {
        const x = this.player.x;
        const y = this.player.y;
        
        // Draw spaceship
        this.ctx.fillStyle = this.invulnerableTime > 0 ? '#ffff00' : '#00ff00';
        
        // Main body
        this.ctx.beginPath();
        this.ctx.moveTo(x + this.player.width / 2, y);
        this.ctx.lineTo(x + this.player.width, y + this.player.height);
        this.ctx.lineTo(x + this.player.width / 2, y + this.player.height - 10);
        this.ctx.lineTo(x, y + this.player.height);
        this.ctx.closePath();
        this.ctx.fill();
        
        // Cockpit
        this.ctx.fillStyle = '#00d4ff';
        this.ctx.fillRect(x + 10, y + 8, 10, 8);
        
        // Invulnerability indicator
        if (this.invulnerableTime > 0) {
            this.ctx.strokeStyle = '#ffff00';
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.arc(x + this.player.width / 2, y + this.player.height / 2, 
                        this.player.width, 0, Math.PI * 2);
            this.ctx.stroke();
        }
    }
    
    drawObstacle(obs) {
        this.ctx.fillStyle = '#ff6b6b';
        this.ctx.save();
        this.ctx.translate(obs.x + obs.width / 2, obs.y + obs.height / 2);
        this.ctx.rotate(this.frameCount * 0.02);
        
        if (obs.type === 'asteroid1') {
            // Jagged asteroid shape
            this.ctx.beginPath();
            this.ctx.moveTo(-15, -15);
            this.ctx.lineTo(-5, -20);
            this.ctx.lineTo(10, -18);
            this.ctx.lineTo(18, -8);
            this.ctx.lineTo(20, 5);
            this.ctx.lineTo(12, 18);
            this.ctx.lineTo(-8, 20);
            this.ctx.lineTo(-18, 10);
            this.ctx.lineTo(-20, -5);
            this.ctx.closePath();
            this.ctx.fill();
        } else {
            // Round asteroid
            this.ctx.beginPath();
            this.ctx.arc(0, 0, 15, 0, Math.PI * 2);
            this.ctx.fill();
        }
        
        this.ctx.restore();
    }
    
    drawCollectible(col) {
        this.ctx.save();
        this.ctx.translate(col.x + col.width / 2, col.y + col.height / 2);
        this.ctx.rotate(col.rotation);
        
        // Star shape
        this.ctx.fillStyle = '#ffff00';
        this.drawStar(0, 0, 5, 8, 3);
        
        this.ctx.restore();
    }
    
    drawPowerUp(pup) {
        this.ctx.save();
        this.ctx.translate(pup.x + pup.width / 2, pup.y + pup.height / 2);
        this.ctx.rotate(pup.rotation);
        
        let color = '#00ff00';
        let symbol = '';
        
        if (pup.type === 'shield') {
            color = '#0099ff';
            symbol = '★';
        } else if (pup.type === 'speedBoost') {
            color = '#ff00ff';
            symbol = '⚡';
        } else if (pup.type === 'magnet') {
            color = '#ffaa00';
            symbol = '◆';
        }
        
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(0, 0, 10, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.ctx.fillStyle = '#000';
        this.ctx.font = 'bold 12px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(symbol, 0, 0);
        
        this.ctx.restore();
    }
    
    drawStar(cx, cy, spikes, outerRadius, innerRadius) {
        let rot = Math.PI / 2 * 3;
        let step = Math.PI / spikes;
        
        this.ctx.beginPath();
        this.ctx.moveTo(cx, cy - outerRadius);
        for (let i = 0; i < spikes; i++) {
            this.ctx.lineTo(cx + Math.cos(rot) * outerRadius, cy + Math.sin(rot) * outerRadius);
            rot += step;
            
            this.ctx.lineTo(cx + Math.cos(rot) * innerRadius, cy + Math.sin(rot) * innerRadius);
            rot += step;
        }
        this.ctx.lineTo(cx, cy - outerRadius);
        this.ctx.closePath();
        this.ctx.fill();
    }
}

// Initialize game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new SpaceRunner();
});
