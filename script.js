function locoMotive() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
  });

  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });
  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

locoMotive();

gsap.from(".page1 h1", {
  y: 30,
  opacity: 0,
  duration: 0.5,
  delay: 0.3,
  stagger: 0.4,
});

gsap.to(".logo svg", {
  y: -85,
  scrollTrigger: {
    trigger: ".page1",
    scroller: ".main",
    // markers: true,
    start: "top 0",

    end: "top -50%",
    scrub: true,
  },
});

gsap.to(".nav-2 .links", {
  y: -85,
  opacity: 0,
  scrollTrigger: {
    trigger: ".page1",
    scroller: ".main",
    // markers: true,
    start: "top 0",

    end: "top -50%",
    scrub: true,
  },
});

function cursor() {
  document.addEventListener("mousemove", (e) => {
    gsap.to(".cursor", {
      left: e.clientX,
      top: e.clientY,
    });
  });

  // cursor
  const a = document.querySelectorAll(".box");

  a.forEach(function (e) {
    e.addEventListener("mouseenter", () => {
      gsap.to(".cursor", {
        backgroundColor: "#000000",
        opacity: 0.1,
        transform: `translate(-50%, -50%) scale(1)`,
      });
    });

    e.addEventListener("mouseleave", () => {
      gsap.to(".cursor", {
        backgroundColor: "#f5dfcf",
        transform: `translate(-50%, -50%) scale(0)`,
      });
    });
  });
}
cursor();

// .nav
