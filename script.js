document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const bars = document.querySelectorAll('.bar');
    const navLinks = document.querySelectorAll('.nav-link');

    const setScrolled = () => {
        if (!navbar) return;
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    };

    const closeMenu = () => {
        if (!navMenu) return;
        navMenu.classList.remove('left-0');
        navMenu.classList.add('-left-full');
        hamburger?.setAttribute('aria-expanded', 'false');

        bars[1]?.classList.remove('opacity-0');
        bars[0]?.classList.remove('translate-y-[7px]', 'rotate-45', 'bg-gold-premium');
        bars[2]?.classList.remove('-translate-y-[7px]', '-rotate-45', 'bg-gold-premium');
        document.body.classList.remove('menu-open');
    };

    const openMenu = () => {
        if (!navMenu) return;
        navMenu.classList.add('left-0');
        navMenu.classList.remove('-left-full');
        hamburger?.setAttribute('aria-expanded', 'true');

        bars[1]?.classList.add('opacity-0');
        bars[0]?.classList.add('translate-y-[7px]', 'rotate-45', 'bg-gold-premium');
        bars[2]?.classList.add('-translate-y-[7px]', '-rotate-45', 'bg-gold-premium');
        document.body.classList.add('menu-open');
    };

    window.addEventListener('scroll', setScrolled, { passive: true });
    setScrolled();

    if (hamburger && navMenu) {
        hamburger.setAttribute('role', 'button');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.addEventListener('click', () => {
            const isOpen = navMenu.classList.contains('left-0');
            isOpen ? closeMenu() : openMenu();
        });
    }

    navLinks.forEach(link => link.addEventListener('click', closeMenu));

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) closeMenu();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeMenu();
    });

    const cards = document.querySelectorAll('.species-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            cards.forEach(c => {
                c.classList.remove('border-gold-premium/40', 'shadow-[0_15px_40px_rgba(0,0,0,0.5)]');
                c.classList.add('border-white/5');
                const title = c.querySelector('h3');
                title?.classList.remove('text-gold-premium');
                title?.classList.add('text-white');
            });

            card.classList.remove('border-white/5');
            card.classList.add('border-gold-premium/40', 'shadow-[0_15px_40px_rgba(0,0,0,0.5)]');
            const activeTitle = card.querySelector('h3');
            activeTitle?.classList.remove('text-white');
            activeTitle?.classList.add('text-gold-premium');
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const tabButtons = document.querySelectorAll(".tab-btn-new");
    const panels = document.querySelectorAll(".showcase-panel");

    tabButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const targetId = button.dataset.target;
            const targetPanel = document.getElementById(targetId);

            if (!targetPanel) return;

            tabButtons.forEach((btn) => btn.classList.remove("active"));
            panels.forEach((panel) => panel.classList.remove("active"));

            button.classList.add("active");
            targetPanel.classList.add("active");
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const videos = document.querySelectorAll(".hero-bg-video");

    if (videos.length < 2) return;

    let currentIndex = 0;
    let nextIndex = 1;
    let isSwitching = false;

    // เริ่มตัวแรกทันที
    videos[0].muted = true;
    videos[0].playsInline = true;
    videos[0].play().catch(() => {});

    // เตรียมตัวที่สองให้โหลดไว้ก่อน
    videos[1].load();

    function switchVideo() {
        if (isSwitching) return;
        isSwitching = true;

        const currentVideo = videos[currentIndex];
        const nextVideo = videos[nextIndex];

        nextVideo.currentTime = 0;
        nextVideo.play().catch(() => {});

        nextVideo.classList.add("active");
        currentVideo.classList.remove("active");

        setTimeout(() => {
            currentVideo.pause();
            currentVideo.currentTime = 0;

            currentIndex = nextIndex;
            nextIndex = (nextIndex + 1) % videos.length;
            isSwitching = false;
        }, 1100);
    }

    videos.forEach((video) => {
        video.addEventListener("timeupdate", () => {
            // เปลี่ยนก่อนจบประมาณ 1.2 วิ เพื่อให้ fade เนียน
            if (video === videos[currentIndex] && video.duration) {
                const timeLeft = video.duration - video.currentTime;

                if (timeLeft <= 1.2) {
                    switchVideo();
                }
            }
        });
    });
});