import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export function usePageAnimations() {
  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const compactViewport = window.matchMedia(
      "(max-width: 767px)"
    ).matches;

    const finePointer = window.matchMedia(
      "(pointer: fine)"
    ).matches;

    /* --------------------------------------------------
       LENIS
    -------------------------------------------------- */

    const lenis = reducedMotion
      ? null
      : new Lenis({
          autoRaf: false,
          duration: 1.05,
          smoothWheel: true,
          smoothTouch: false,
          syncTouch: false,
        });

    const update = (time) => {
      lenis?.raf(time * 1000);
    };

    /* --------------------------------------------------
       GLOBAL PAGE SCROLL INDICATOR
       IMPORTANT:
       This is completely independent from section animations.
    -------------------------------------------------- */

    const pageScrollIndicator = document.querySelector(
      "[data-page-scroll-indicator]"
    );

    const pageScrollProgress = pageScrollIndicator?.querySelector(
      "[data-page-scroll-progress]"
    );

    const updatePageScrollProgress = (lenisScroll) => {
      if (!pageScrollIndicator || !pageScrollProgress) return;

      const scrollTop =
        typeof lenisScroll === "number"
          ? lenisScroll
          : window.scrollY ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0;

      const scrollHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      );

      const viewportHeight = window.innerHeight;

      const scrollLimit = Math.max(
        scrollHeight - viewportHeight,
        1
      );

      const ratio = Math.min(
        Math.max(scrollTop / scrollLimit, 0),
        1
      );

      gsap.set(pageScrollProgress, {
        scaleY: ratio,
      });
    };

    /*
      Make absolutely sure the existing indicator itself
      is never hidden by an accidental global animation.
    */
    if (pageScrollIndicator) {
      gsap.set(pageScrollIndicator, {
        autoAlpha: 1,
        visibility: "visible",
      });
    }

    if (pageScrollProgress) {
      gsap.set(pageScrollProgress, {
        scaleY: 0,
        visibility: "visible",
      });
    }

    const onWindowScroll = () => {
      updatePageScrollProgress();
    };

    const onLenisScrollEvent = (event) => {
      ScrollTrigger.update();

      const currentScroll =
        typeof event?.scroll === "number"
          ? event.scroll
          : lenis?.scroll;

      updatePageScrollProgress(currentScroll);
    };

    /* --------------------------------------------------
       GENERAL HELPERS
    -------------------------------------------------- */

    const magneticButtons = [];
    const depthListeners = [];
    const loadedImages = [];

    const refresh = () => {
      ScrollTrigger.refresh();
      updatePageScrollProgress(
        typeof lenis?.scroll === "number"
          ? lenis.scroll
          : undefined
      );
    };

    /* --------------------------------------------------
       SECTION TRANSITIONS
    -------------------------------------------------- */

    const sectionTransitions = [
      ["#about", "#E9EEE6"],
      ["#projects", "#F7F4EC"],
      ["#peerpath", "#E9EEE6"],
      ["#certificates", "#F7F4EC"],
      ["#beyond-code", "#E9EEE6"],
      ["#trace", "#F7F5EF"],
      ["#contact", "#0F3D3E"],
      ["[data-footer-section]", "#062627"],
    ];

    /* --------------------------------------------------
       MAIN GSAP CONTEXT
    -------------------------------------------------- */

    const ctx = gsap.context(() => {
      /* -----------------------------------------------
         LENIS + SCROLLTRIGGER
      ----------------------------------------------- */

      if (lenis) {
        gsap.ticker.add(update);

        lenis.on("scroll", onLenisScrollEvent);

        gsap.ticker.lagSmoothing(0);
      }

      /* -----------------------------------------------
         GLOBAL SCROLL INDICATOR LISTENERS
         These are NOT inside any section animation.
      ----------------------------------------------- */

      window.addEventListener(
        "scroll",
        onWindowScroll,
        { passive: true }
      );

      window.addEventListener(
        "resize",
        onWindowScroll,
        { passive: true }
      );

      updatePageScrollProgress();

      /* -----------------------------------------------
         NAVBAR
      ----------------------------------------------- */

      const navbar = document.querySelector("[data-navbar]");

      if (navbar && !reducedMotion) {
        gsap.fromTo(
          navbar,
          {
            yPercent: -110,
            opacity: 0,
          },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            delay: 0.15,
            ease: "expo.out",
          }
        );

        gsap.fromTo(
          "[data-navbar-link]",
          {
            y: -8,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            delay: 0.28,
            stagger: 0.045,
            ease: "power3.out",
          }
        );
      }

      /* -----------------------------------------------
         SECTION BACKGROUND TRANSITIONS
      ----------------------------------------------- */

      sectionTransitions.forEach(([selector, toColor]) => {
        const section = document.querySelector(selector);

        if (!section || reducedMotion) return;

        gsap.to(section, {
          backgroundColor: toColor,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      });

      /* -----------------------------------------------
         CONTACT REVEALS
      ----------------------------------------------- */

      gsap.utils
        .toArray("[data-contact-reveal]")
        .forEach((element, index) =>
          gsap.fromTo(
            element,
            {
              y: 30,
              opacity: 0.82,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: index * 0.06,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 86%",
                once: true,
              },
            }
          )
        );

      gsap.utils
        .toArray("[data-contact-parallax]")
        .forEach((element) =>
          gsap.to(element, {
            yPercent: -18,
            rotation: 12,
            ease: "none",
            scrollTrigger: {
              trigger: element,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          })
        );

      /* -----------------------------------------------
         FOOTER REVEALS
      ----------------------------------------------- */

      gsap.utils
        .toArray("[data-footer-reveal]")
        .forEach((element, index) =>
          gsap.fromTo(
            element,
            {
              y: 24,
              opacity: 0.82,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.75,
              delay: index * 0.04,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 90%",
                once: true,
              },
            }
          )
        );

      gsap.utils
        .toArray("[data-footer-line]")
        .forEach((element) =>
          gsap.to(element, {
            scaleX: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 92%",
              once: true,
            },
          })
        );

      gsap.utils
        .toArray("[data-footer-signature]")
        .forEach((element) =>
          gsap.to(element, {
            xPercent: 5,
            ease: "none",
            scrollTrigger: {
              trigger: element,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          })
        );

      /* -----------------------------------------------
         BACK TO TOP
      ----------------------------------------------- */

      gsap.utils
        .toArray("[data-back-top]")
        .forEach((button) => {
          const scrollToTop = () => {
            if (lenis) {
              lenis.scrollTo(0, {
                duration: 1.2,
              });
            } else {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }
          };

          button.addEventListener("click", scrollToTop);

          magneticButtons.push({
            button,
            moveButton: null,
            resetButton: null,
            scrollToTop,
          });
        });

      /* -----------------------------------------------
         MAGNETIC BUTTONS
      ----------------------------------------------- */

      gsap.utils
        .toArray("[data-magnetic]")
        .forEach((button) => {
          const moveButton = (event) => {
            const bounds = button.getBoundingClientRect();

            gsap.to(button, {
              x:
                (event.clientX -
                  bounds.left -
                  bounds.width / 2) *
                0.12,
              y:
                (event.clientY -
                  bounds.top -
                  bounds.height / 2) *
                0.12,
              duration: 0.35,
            });
          };

          const resetButton = () => {
            gsap.to(button, {
              x: 0,
              y: 0,
              duration: 0.5,
            });
          };

          button.addEventListener("mousemove", moveButton);
          button.addEventListener("mouseleave", resetButton);

          magneticButtons.push({
            button,
            moveButton,
            resetButton,
          });
        });

      /* -----------------------------------------------
         SECTION TITLES / IMAGES
      ----------------------------------------------- */

      gsap.utils
        .toArray(
          "[data-section-title], [data-image]:not([data-hero-profile])"
        )
        .forEach((element) =>
          gsap.fromTo(
            element,
            {
              y: 36,
              opacity: 0.55,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.85,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 88%",
                once: true,
              },
            }
          )
        );

      /* -----------------------------------------------
         EDITORIAL MEDIA
      ----------------------------------------------- */

      gsap.utils
        .toArray("[data-editorial-media]")
        .forEach((media) => {
          const image = media.querySelector("img, video");

          if (!image) return;

          gsap.fromTo(
            media,
            {
              clipPath: "inset(10% 0 10% 0)",
            },
            {
              clipPath: "inset(0% 0 0% 0)",
              duration: 1.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: media,
                start: "top 84%",
                once: true,
              },
            }
          );

          gsap.fromTo(
            image,
            {
              scale: 1.08,
            },
            {
              scale: 1,
              duration: 1.3,
              ease: "power3.out",
              scrollTrigger: {
                trigger: media,
                start: "top 84%",
                once: true,
              },
            }
          );
        });

      gsap.utils
        .toArray("[data-editorial-copy]")
        .forEach((copy) =>
          gsap.fromTo(
            copy,
            {
              y: 20,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.75,
              ease: "power3.out",
              scrollTrigger: {
                trigger: copy,
                start: "top 88%",
                once: true,
              },
            }
          )
        );

      /* -----------------------------------------------
         PARALLAX
      ----------------------------------------------- */

      gsap.utils
        .toArray("[data-parallax]")
        .forEach((element) =>
          gsap.to(element, {
            yPercent: -12,
            ease: "none",
            scrollTrigger: {
              trigger: element,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          })
        );

      /* -----------------------------------------------
         KITCHEN
      ----------------------------------------------- */

      gsap.utils
        .toArray("[data-kitchen-feature]")
        .forEach((feature) =>
          gsap.fromTo(
            feature,
            {
              clipPath: "inset(12% 0 0 0)",
              y: 24,
            },
            {
              clipPath: "inset(0 0 0% 0)",
              y: 0,
              duration: 1.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: feature,
                start: "top 82%",
                once: true,
              },
            }
          )
        );

      /* -----------------------------------------------
         PROJECT IMAGE REVEAL
      ----------------------------------------------- */

      gsap.utils
        .toArray("#projects [data-project-image]")
        .forEach((image) =>
          gsap.fromTo(
            image,
            {
              clipPath: "inset(8% 0 8% 0)",
              scale: 1.06,
            },
            {
              clipPath: "inset(0 0 0% 0)",
              scale: 1,
              duration: 1.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: image,
                start: "top 88%",
                once: true,
              },
            }
          )
        );

      /* -----------------------------------------------
         ADVANCED MOTION
      ----------------------------------------------- */

      if (!reducedMotion) {
        const depthScrub = compactViewport ? 0.35 : 0.7;
        const perspective = compactViewport ? 1200 : 1450;

        const projectSection =
          document.querySelector("#projects");

        /* ---------------------------------------------
           PROJECTS
        --------------------------------------------- */

        if (projectSection) {
          const projectCards = gsap.utils.toArray(
            "[data-project-card]",
            projectSection
          );

          const projectScreenshots = gsap.utils.toArray(
            "[data-project-screenshot]",
            projectSection
          );

          const projectTimeline = gsap.timeline({
            defaults: {
              ease: "power3.out",
            },
            scrollTrigger: {
              trigger: projectSection,
              start: "top 78%",
              once: true,
            },
          });

          projectTimeline
            .fromTo(
              "[data-project-kicker]",
              {
                y: 14,
                opacity: 0,
              },
              {
                y: 0,
                opacity: 1,
                duration: 0.55,
              }
            )
            .fromTo(
              "[data-project-title]",
              {
                y: 28,
                opacity: 0,
              },
              {
                y: 0,
                opacity: 1,
                duration: 0.75,
              },
              "-=.28"
            )
            .fromTo(
              "[data-project-description]",
              {
                y: 18,
                opacity: 0,
              },
              {
                y: 0,
                opacity: 1,
                duration: 0.6,
              },
              "-=.36"
            )
            .fromTo(
              projectCards,
              {
                z: -24,
                y: 34,
                scale: 0.985,
                rotateX: 2.5,
                opacity: 0,
              },
              {
                z: 0,
                y: 0,
                scale: 1,
                rotateX: 0,
                opacity: 1,
                duration: 0.9,
                stagger: 0.14,
              },
              "-=.14"
            )
            .fromTo(
              "[data-project-card-title], .project-links",
              {
                y: 14,
                opacity: 0,
              },
              {
                y: 0,
                opacity: 1,
                duration: 0.55,
                stagger: 0.08,
              },
              "-=.5"
            );

          projectScreenshots.forEach(
            (screenshot, index) =>
              gsap.fromTo(
                screenshot,
                {
                  scale: 0.965,
                  yPercent: index ? 2 : -2,
                },
                {
                  scale: 1,
                  yPercent: 0,
                  duration: 1.05,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: screenshot,
                    start: "top 88%",
                    once: true,
                  },
                }
              )
          );

          projectCards.forEach((card, index) => {
            const screenshot = card.querySelector(
              "[data-project-screenshot]"
            );

            const featured =
              card.classList.contains(
                "project-card-featured"
              );

            if (screenshot) {
              gsap.to(screenshot, {
                yPercent: featured
                  ? -3.5
                  : index % 2
                  ? 2.5
                  : -2.5,
                scale: featured ? 1.018 : 1.01,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: depthScrub,
                },
              });
            }

            const content =
              card.querySelector(".project-content");

            if (content) {
              gsap.to(content, {
                yPercent: featured ? -1.5 : 1,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: depthScrub,
                },
              });
            }
          });

          /* -------------------------------------------
             PROJECT CARD TILT
          ------------------------------------------- */

          if (finePointer) {
            projectCards.forEach((card) => {
              const screenshot = card.querySelector(
                "[data-project-screenshot]"
              );

              const title = card.querySelector(
                "[data-project-card-title]"
              );

              const links =
                card.querySelector(".project-links");

              const featured =
                card.classList.contains(
                  "project-card-featured"
                );

              const strength = featured ? 2.4 : 1.8;

              const moveCard = (event) => {
                const bounds =
                  card.getBoundingClientRect();

                const x =
                  (event.clientX - bounds.left) /
                    bounds.width -
                  0.5;

                const y =
                  (event.clientY - bounds.top) /
                    bounds.height -
                  0.5;

                gsap.to(card, {
                  rotateX: y * -strength,
                  rotateY: x * strength,
                  z: featured ? 10 : 7,
                  duration: 0.45,
                  ease: "power3.out",
                  overwrite: "auto",
                });

                if (screenshot) {
                  gsap.to(screenshot, {
                    x: x * -5,
                    y: y * -4,
                    scale: featured ? 1.022 : 1.018,
                    duration: 0.5,
                    ease: "power3.out",
                    overwrite: "auto",
                  });
                }

                if (title) {
                  gsap.to(title, {
                    x: x * 3,
                    y: y * 3,
                    duration: 0.4,
                    ease: "power3.out",
                    overwrite: "auto",
                  });
                }

                if (links) {
                  gsap.to(links, {
                    x: x * 2,
                    y: y * 2,
                    duration: 0.4,
                    ease: "power3.out",
                    overwrite: "auto",
                  });
                }
              };

              const resetCard = () => {
                gsap.to(card, {
                  rotateX: 0,
                  rotateY: 0,
                  z: 0,
                  duration: 0.7,
                  ease: "power3.out",
                  overwrite: "auto",
                });

                if (screenshot) {
                  gsap.to(screenshot, {
                    x: 0,
                    y: 0,
                    scale: 1,
                    duration: 0.7,
                    ease: "power3.out",
                    overwrite: "auto",
                  });
                }

                if (title) {
                  gsap.to(title, {
                    x: 0,
                    y: 0,
                    duration: 0.55,
                    ease: "power3.out",
                    overwrite: "auto",
                  });
                }

                if (links) {
                  gsap.to(links, {
                    x: 0,
                    y: 0,
                    duration: 0.55,
                    ease: "power3.out",
                    overwrite: "auto",
                  });
                }
              };

              card.addEventListener(
                "pointermove",
                moveCard
              );

              card.addEventListener(
                "pointerleave",
                resetCard
              );

              depthListeners.push({
                target: card,
                onMove: moveCard,
                onLeave: resetCard,
              });
            });
          }
        }

        /* ---------------------------------------------
           PAGE PERSPECTIVE
        --------------------------------------------- */

        gsap.set(
          "#home, #about, #skills, #projects, #beyond-code, #peerpath, #certificates, #trace, #contact, [data-footer-section]",
          {
            perspective,
          }
        );

        /* ---------------------------------------------
           HERO
        --------------------------------------------- */

        gsap.to("#home [data-hero-profile]", {
          yPercent: compactViewport ? -4 : -9,
          rotateY: compactViewport ? 0 : 2.5,
          rotateX: compactViewport ? 0 : -1.5,
          transformOrigin: "center center",
          ease: "none",
          scrollTrigger: {
            trigger: "#home",
            start: "top top",
            end: "bottom top",
            scrub: depthScrub,
          },
        });

        gsap.to("#home [data-hero-detail]", {
          yPercent: -15,
          xPercent: 4,
          rotate: 3,
          ease: "none",
          scrollTrigger: {
            trigger: "#home",
            start: "top top",
            end: "bottom top",
            scrub: depthScrub,
          },
        });

        /* ---------------------------------------------
           ABOUT
        --------------------------------------------- */

        gsap.fromTo(
          "#about .max-w-7xl > div:nth-of-type(2)",
          {
            rotateX: 2.5,
            y: 28,
            transformOrigin: "center top",
          },
          {
            rotateX: 0,
            y: 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "#about",
              start: "top 82%",
              end: "top 35%",
              scrub: depthScrub,
            },
          }
        );

        gsap.to("#about [data-stagger-group]", {
          yPercent: -5,
          rotateY: -1,
          ease: "none",
          scrollTrigger: {
            trigger: "#about",
            start: "top bottom",
            end: "bottom top",
            scrub: depthScrub,
          },
        });

        gsap.utils
          .toArray("#about .about-identity")
          .forEach((card, index) =>
            gsap.fromTo(
              card,
              {
                z: -20 - index * 8,
                rotateX: 3,
                y: 24,
              },
              {
                z: 0,
                rotateX: 0,
                y: 0,
                duration: 0.85,
                delay: index * 0.08,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 88%",
                  once: true,
                },
              }
            )
          );

        /* ---------------------------------------------
           PEERPATH
        --------------------------------------------- */

        gsap.utils
          .toArray("#peerpath [data-peerpath-image]")
          .forEach((image, index) =>
            gsap.to(image, {
              yPercent: index ? -5 : 4,
              rotate: index ? -1.5 : 1,
              ease: "none",
              scrollTrigger: {
                trigger: "#peerpath",
                start: "top bottom",
                end: "bottom top",
                scrub: depthScrub,
              },
            })
          );

        gsap.to("#peerpath [data-peerpath-video]", {
          yPercent: -3,
          scale: 1.018,
          ease: "none",
          scrollTrigger: {
            trigger: "#peerpath",
            start: "top bottom",
            end: "bottom top",
            scrub: depthScrub,
          },
        });

        /* ---------------------------------------------
           CERTIFICATES
        --------------------------------------------- */

        gsap.utils
          .toArray(".certificate-card")
          .forEach((card, index) =>
            gsap.to(card, {
              z: -index * 8,
              rotateX: index ? 1.5 : -1,
              y: index * 2,
              ease: "none",
              scrollTrigger: {
                trigger: "#certificates",
                start: "top bottom",
                end: "top 30%",
                scrub: depthScrub,
              },
            })
          );

        /* ---------------------------------------------
           BEYOND CODE / MEDIA
        --------------------------------------------- */

        gsap.utils
          .toArray(
            "#beyond-code .media-image-wrap, #culinary .media-image-wrap, #photography .media-image-wrap"
          )
          .forEach((media, index) => {
            const image =
              media.querySelector(".media-image");

            if (!image) return;

            gsap.to(image, {
              yPercent: index % 2 ? 4 : -4,
              scale: 1.035,
              ease: "none",
              scrollTrigger: {
                trigger: media,
                start: "top bottom",
                end: "bottom top",
                scrub: depthScrub,
              },
            });
          });

        /* ---------------------------------------------
           TRACE
        --------------------------------------------- */

        gsap.utils
          .toArray("#trace [data-trace-entry]")
          .forEach((entry, index) =>
            gsap.fromTo(
              entry,
              {
                z: -18 - (index % 3) * 8,
                rotateY: index % 2 ? 2 : -2,
                y: 20,
              },
              {
                z: 0,
                rotateY: 0,
                y: 0,
                duration: 0.75,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: entry,
                  start: "top 90%",
                  once: true,
                },
              }
            )
          );

        /* ---------------------------------------------
           CONTACT
        --------------------------------------------- */

        gsap.to("#contact [data-contact-reveal]", {
          z: 18,
          ease: "none",
          stagger: 0.04,
          scrollTrigger: {
            trigger: "#contact",
            start: "top bottom",
            end: "top 30%",
            scrub: depthScrub,
          },
        });

        /* ---------------------------------------------
           FOOTER
        --------------------------------------------- */

        gsap.to("[data-footer-signature]", {
          yPercent: -3,
          rotateX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-footer-section]",
            start: "top bottom",
            end: "bottom top",
            scrub: depthScrub,
          },
        });

        /* ---------------------------------------------
           OTHER TILT TARGETS
        --------------------------------------------- */

        if (!compactViewport) {
          const tiltTargets = gsap.utils.toArray(
            "#beyond-code .media-image-wrap, #culinary .media-image-wrap, #photography .media-image-wrap, #trace .journal-card"
          );

          tiltTargets.forEach((target) => {
            const onMove = (event) => {
              const bounds =
                target.getBoundingClientRect();

              const x =
                (event.clientX - bounds.left) /
                  bounds.width -
                0.5;

              const y =
                (event.clientY - bounds.top) /
                  bounds.height -
                0.5;

              gsap.to(target, {
                rotateX: y * -2.5,
                rotateY: x * 2.5,
                z: 7,
                duration: 0.55,
                ease: "power3.out",
                overwrite: "auto",
              });
            };

            const onLeave = () => {
              gsap.to(target, {
                rotateX: 0,
                rotateY: 0,
                z: 0,
                duration: 0.65,
                ease: "power3.out",
                overwrite: "auto",
              });
            };

            target.addEventListener(
              "pointermove",
              onMove
            );

            target.addEventListener(
              "pointerleave",
              onLeave
            );

            depthListeners.push({
              target,
              onMove,
              onLeave,
            });
          });
        }

        /* ---------------------------------------------
           TRACE HOVER
        --------------------------------------------- */

        gsap.utils
          .toArray("[data-trace-entry]")
          .forEach((entry) => {
            const onEnter = () =>
              gsap.to(entry, {
                y: -5,
                rotate: 0,
                duration: 0.45,
                ease: "power3.out",
                overwrite: "auto",
              });

            const onLeave = () =>
              gsap.to(entry, {
                y: 0,
                rotate:
                  entry.dataset.traceRotation || 0,
                duration: 0.6,
                ease: "power3.out",
                overwrite: "auto",
              });

            const currentTransform =
              entry.style.transform || "";

            const rotationMatch =
              currentTransform.match(
                /rotate\(([^)]+)\)/
              );

            entry.dataset.traceRotation =
              rotationMatch?.[1] || "0deg";

            entry.addEventListener(
              "pointerenter",
              onEnter
            );

            entry.addEventListener(
              "pointerleave",
              onLeave
            );

            depthListeners.push({
              target: entry,
              onMove: onEnter,
              onLeave,
            });
          });
      }

      /* -----------------------------------------------
         IMAGE LOAD / REFRESH
      ----------------------------------------------- */

      document.querySelectorAll("img").forEach((image) => {
        if (!image.complete) {
          image.addEventListener("load", refresh, {
            once: true,
          });

          loadedImages.push(image);
        }
      });

      /* -----------------------------------------------
         CLEAR INITIAL PROPS
         IMPORTANT:
         Explicitly exclude the global page indicator.
      ----------------------------------------------- */

      gsap.set(
        "[data-skill-category], [data-skill-line], [data-trace-entry], [data-contact-reveal], [data-footer-reveal]",
        {
          clearProps:
            "transform, opacity, visibility",
        }
      );

      /*
        Re-assert indicator visibility after all global
        GSAP setup has completed.
      */

      if (pageScrollIndicator) {
        gsap.set(pageScrollIndicator, {
          autoAlpha: 1,
          visibility: "visible",
        });
      }

      if (pageScrollProgress) {
        updatePageScrollProgress();
      }
    });

    /* --------------------------------------------------
       INITIAL REFRESH
    -------------------------------------------------- */

    ScrollTrigger.refresh();

    updatePageScrollProgress();

    window.addEventListener("load", refresh, {
      once: true,
    });

    const resizeObserver = new ResizeObserver(
      refresh
    );

    resizeObserver.observe(document.body);

    /* --------------------------------------------------
       CLEANUP
    -------------------------------------------------- */

    return () => {
      magneticButtons.forEach(
        ({
          button,
          moveButton,
          resetButton,
          scrollToTop,
        }) => {
          if (moveButton) {
            button.removeEventListener(
              "mousemove",
              moveButton
            );
          }

          if (resetButton) {
            button.removeEventListener(
              "mouseleave",
              resetButton
            );
          }

          if (scrollToTop) {
            button.removeEventListener(
              "click",
              scrollToTop
            );
          }
        }
      );

      depthListeners.forEach(
        ({ target, onMove, onLeave }) => {
          target.removeEventListener(
            "pointermove",
            onMove
          );

          target.removeEventListener(
            "pointerleave",
            onLeave
          );

          target.removeEventListener(
            "pointerenter",
            onMove
          );
        }
      );

      window.removeEventListener(
        "scroll",
        onWindowScroll
      );

      window.removeEventListener(
        "resize",
        onWindowScroll
      );

      window.removeEventListener(
        "load",
        refresh
      );

      resizeObserver.disconnect();

      if (lenis) {
        lenis.off(
          "scroll",
          onLenisScrollEvent
        );

        gsap.ticker.remove(update);

        lenis.destroy();
      }

      loadedImages.forEach((image) =>
        image.removeEventListener(
          "load",
          refresh
        )
      );

      ctx.revert();
    };
  }, []);
}