// fireworks.js
(function (global) {
    // Hàm để tạo hiệu ứng pháo hoa
    function launchFireworks(container) {
      if (!container) return; // Kiểm tra xem có container hay không
  
      const canvas = document.createElement('canvas');
      canvas.style.position = 'absolute';
      canvas.style.top = 0;
      canvas.style.left = 0;
      canvas.style.pointerEvents = 'none';
      container.appendChild(canvas);
  
      const ctx = canvas.getContext('2d');
      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
  
      // Resize canvas khi cửa sổ thay đổi kích thước
      window.addEventListener('resize', resizeCanvas);
      resizeCanvas(); // Gọi một lần khi khởi tạo
  
      // Tạo một hiệu ứng pháo hoa
      const particles = [];
  
      function createParticle(x, y, color) {
        return {
          x: x,
          y: y,
          radius: Math.random() * 5 + 2, // Kích thước hạt pháo hoa
          color: color,
          speed: Math.random() * 5 + 1, // Tốc độ hạt pháo hoa
          angle: Math.random() * 2 * Math.PI, // Góc phát ra
          lifetime: Math.random() * 2 + 3, // Thời gian sống của hạt pháo hoa
          alpha: 1, // Độ trong suốt của hạt
        };
      }
  
      // Hàm tạo và bắn pháo hoa
      function launch() {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight * 0.5; // Phát ra từ phần trên của màn hình
        const color = `hsl(${Math.random() * 360}, 100%, 50%)`; // Màu sắc ngẫu nhiên
  
        // Tạo 50 hạt pháo hoa mỗi lần bắn
        for (let i = 0; i < 50; i++) {
          particles.push(createParticle(x, y, color));
        }
      }
  
      // Vẽ các hạt pháo hoa lên canvas
      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((particle, index) => {
          // Di chuyển các hạt pháo hoa
          particle.x += Math.cos(particle.angle) * particle.speed;
          particle.y += Math.sin(particle.angle) * particle.speed;
          particle.alpha -= 0.02; // Dần mờ đi
  
          // Vẽ các hạt pháo hoa
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.globalAlpha = particle.alpha;
          ctx.fill();
  
          // Xóa các hạt đã hết thời gian sống
          if (particle.alpha <= 0) {
            particles.splice(index, 1);
          }
        });
  
        // Tiếp tục vẽ lại các hạt pháo hoa
        requestAnimationFrame(animate);
      }
  
      // Bắt đầu vẽ các hạt pháo hoa
      animate();
  
      // Tạo pháo hoa cứ sau 1 giây
      setInterval(launch, 1000);
    }
  
    // Xuất thư viện ra ngoài
    global.launchFireworks = launchFireworks;
  })(window);
  