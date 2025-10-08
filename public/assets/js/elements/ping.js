const pingCheck = {
  isRunning: false,
  timeout: null,

  async getPing() {
    const startTime = performance.now();
    try {
      const response = await fetch(window.location.href, {
        method: 'HEAD',
        cache: 'no-store',
      });
      const endTime = performance.now();
      return Math.round(endTime - startTime);
    } catch (err) {
      console.warn('Ping check failed:', err);
      return null;
    }
  },

  updateDisplay(ping) {
    if (!ping) return;

    const pingValueElement = document.getElementById('pingValue');
    const pingDotElement = document.getElementById('pingDot');

    if (!pingValueElement || !pingDotElement) return;

    pingValueElement.textContent = `Ping: ${ping} ms`;

    const dot = pingDotElement;
    if (ping < 60) {
      dot.className = 'dot';
      dot.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
      dot.style.boxShadow = '0 0 15px rgba(16, 185, 129, 0.6)';
    } else if (ping < 120) {
      dot.className = 'dot';
      dot.style.background = 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)';
      dot.style.boxShadow = '0 0 15px rgba(245, 158, 11, 0.6)';
    } else {
      dot.className = 'dot';
      dot.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
      dot.style.boxShadow = '0 0 15px rgba(239, 68, 68, 0.6)';
    }
  },

  async check() {
    if (this.isRunning) return;
    this.isRunning = true;

    try {
      const ping = await this.getPing();
      if (document.visibilityState === 'visible') {
        this.updateDisplay(ping);
      }
    } finally {
      this.isRunning = false;
    }
  },

  start() {
    if (document.visibilityState === 'visible') {
      this.check();
    }

    this.timeout = setTimeout(() => {
      this.start();
    }, 1500);
  },

  stop() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  },
};

document.addEventListener(
  'visibilitychange',
  () => {
    if (document.visibilityState === 'visible') {
      pingCheck.start();
    } else {
      pingCheck.stop();
    }
  },
  { passive: true }
);

pingCheck.start();
