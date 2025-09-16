import { useEffect, useRef, useCallback, useMemo } from "react";
import { gsap } from "gsap";
import "./TargetCursor.css";

const TargetCursor = ({
  targetSelector = ".dock-item, .dock-label, .dock-icon, .contact-container, .contact-content, .contact-title, .contact-info, .contact-form, .contact-form input, .contact-form textarea, .contact-form button, .form-group, .form-group input, .form-group textarea, .form-group button, .form-group label, .submit-button, .social-icon",
  spinDuration = 2,
  hideDefaultCursor = true,
}) => {
  const cursorRef = useRef(null);
  const cornersRef = useRef(null);
  const spinTl = useRef(null);
  const dotRef = useRef(null);
  const constants = useMemo(
    () => ({
      borderWidth: 3,
      cornerSize: 12,
      parallaxStrength: 0.00005,
    }),
    []
  );

  const moveCursor = useCallback((x, y) => {
    if (!cursorRef.current) return;
    gsap.to(cursorRef.current, {
      x,
      y,
      duration: 0.05, // Reduced from 0.1 for snappier movement
      ease: "power2.out", // Changed from power3.out for less floaty feel
    });
  }, []);

  useEffect(() => {
    if (!cursorRef.current) return;

    const originalCursor = document.body.style.cursor;
    if (hideDefaultCursor) {
      document.body.style.cursor = 'none';
      // Also hide cursor on all elements to ensure complete coverage
      document.documentElement.style.cursor = 'none';
      document.head.style.cursor = 'none';
    }

    const cursor = cursorRef.current;
    cornersRef.current = cursor.querySelectorAll(".target-cursor-corner");

    let activeTarget = null;
    let currentTargetMove = null;
    let currentLeaveHandler = null;
    let isAnimatingToTarget = false;
    let resumeTimeout = null;

    // Function to check if menu is open
    const isMenuOpen = () => {
      const sidebar = document.querySelector('.navbar__sidebar');
      return sidebar && sidebar.classList.contains('open');
    };

    // Function to show/hide cursor based on menu state
    const updateCursorVisibility = () => {
      if (isMenuOpen()) {
        cursor.style.opacity = '1'; // Keep cursor visible inside menu
        cursor.style.pointerEvents = 'auto';
      } else {
        cursor.style.opacity = '1';
        cursor.style.pointerEvents = 'auto';
      }
    };

    // Initial check
    updateCursorVisibility();

    // Watch for menu state changes
    const observer = new MutationObserver(updateCursorVisibility);
    const sidebar = document.querySelector('.navbar__sidebar');
    if (sidebar) {
      observer.observe(sidebar, { attributes: true, attributeFilter: ['class'] });
    }

    const cleanupTarget = (target) => {
      if (currentTargetMove) {
        target.removeEventListener("mousemove", currentTargetMove);
      }
      if (currentLeaveHandler) {
        target.removeEventListener("mouseleave", currentLeaveHandler);
      }
      currentTargetMove = null;
      currentLeaveHandler = null;
    };

    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });

    const createSpinTimeline = () => {
      if (spinTl.current) {
        spinTl.current.kill();
      }
      spinTl.current = gsap
        .timeline({ repeat: -1 })
        .to(cursor, { rotation: "+=360", duration: spinDuration, ease: "none" });
    };

    createSpinTimeline();

    const moveHandler = (e) => {
      // Always move cursor regardless of menu state
      moveCursor(e.clientX, e.clientY);
    };
    window.addEventListener("mousemove", moveHandler);

    const scrollHandler = () => {
      if (!activeTarget || !cursorRef.current) return;
      
      const mouseX = gsap.getProperty(cursorRef.current, "x");
      const mouseY = gsap.getProperty(cursorRef.current, "y");
      
      const elementUnderMouse = document.elementFromPoint(mouseX, mouseY);
      const isStillOverTarget = elementUnderMouse && (
        elementUnderMouse === activeTarget || 
        elementUnderMouse.closest(targetSelector) === activeTarget
      );
      
      if (!isStillOverTarget) {
        if (currentLeaveHandler) {
          currentLeaveHandler();
        }
      }
    };

    window.addEventListener("scroll", scrollHandler, { passive: true });

    //---------------------------------------------------------------
    // This code for onclick animation

    window.addEventListener("mousemove", moveHandler);
    const mouseDownHandler = () => {
      if (!dotRef.current) return;
      gsap.to(dotRef.current, { scale: 0.7, duration: 0.3 });
      gsap.to(cursorRef.current, { scale: 0.9, duration: 0.2 });
    };

    // Animate it back to its original size
    const mouseUpHandler = () => {
      if (!dotRef.current) return;
      gsap.to(dotRef.current, { scale: 1, duration: 0.3 });
      gsap.to(cursorRef.current, { scale: 1, duration: 0.2 });
    };

    window.addEventListener("mousedown", mouseDownHandler);
    window.addEventListener("mouseup", mouseUpHandler);

    //----------------------------------------------------------------
    const enterHandler = (e) => {
      const directTarget = e.target;

      // Check if the element is just plain text or non-functional
      const isPlainText = (element) => {
        // Ignore elements that are just text containers
        if (element.tagName === 'H1' || element.tagName === 'H2' || element.tagName === 'H3' || 
            element.tagName === 'H4' || element.tagName === 'H5' || element.tagName === 'H6' ||
            element.tagName === 'P' || element.tagName === 'SPAN' || element.tagName === 'DIV') {
          
          // Check if it has cursor-target class (these are intentional targets)
          if (element.classList.contains('cursor-target')) {
            return false;
          }
          
          // Check if it has click handlers or is actually interactive
          const hasClickHandlers = element.onclick || 
                                 element.getAttribute('onclick') || 
                                 element.getAttribute('role') === 'button' ||
                                 element.getAttribute('tabindex') !== null;
          
          // Check if it's a navigation item or has specific interactive classes
          const isInteractive = element.classList.contains('navbar__sidebar-nav-item') ||
                               element.classList.contains('navbar__sidebar-close') ||
                               element.classList.contains('navbar__brand-text') ||
                               element.tagName === 'BUTTON' ||
                               element.tagName === 'A' ||
                               element.tagName === 'INPUT' ||
                               element.tagName === 'SELECT';
          
          return !hasClickHandlers && !isInteractive;
        }
        return false;
      };

      // Skip if this is just plain text
      if (isPlainText(directTarget)) {
        return;
      }

      const allTargets = [];
      let current = directTarget;
      while (current && current !== document.body) {
        if (current.matches(targetSelector)) {
          allTargets.push(current);
        }
        current = current.parentElement;
      }

      const target = allTargets[0] || null;
      if (!target || !cursorRef.current || !cornersRef.current) return;

      console.log('Cursor targeting:', target.className, target.tagName, target);

      if (activeTarget === target) return;

      if (activeTarget) {
        cleanupTarget(activeTarget);
      }

      if (resumeTimeout) {
        clearTimeout(resumeTimeout);
        resumeTimeout = null;
      }

      activeTarget = target;

      gsap.killTweensOf(cursorRef.current, "rotation");
      spinTl.current?.pause();

      gsap.set(cursorRef.current, { rotation: 0 });

      const updateCorners = (mouseX, mouseY) => {
        const rect = target.getBoundingClientRect();
        const cursorRect = cursorRef.current.getBoundingClientRect();

        const cursorCenterX = cursorRect.left + cursorRect.width / 2;
        const cursorCenterY = cursorRect.top + cursorRect.height / 2;

        const [tlc, trc, brc, blc] = Array.from(cornersRef.current);

        const { borderWidth, cornerSize, parallaxStrength } = constants;

        // Make target area larger for easier locking
        const expandedRect = {
          left: rect.left - 8,
          top: rect.top - 8,
          right: rect.right + 8,
          bottom: rect.bottom + 8
        };

        let tlOffset = {
          x: expandedRect.left - cursorCenterX - borderWidth,
          y: expandedRect.top - cursorCenterY - borderWidth,
        };
        let trOffset = {
          x: expandedRect.right - cursorCenterX + borderWidth - cornerSize,
          y: expandedRect.top - cursorCenterY - borderWidth,
        };
        let brOffset = {
          x: expandedRect.right - cursorCenterX + borderWidth - cornerSize,
          y: expandedRect.bottom - cursorCenterY + borderWidth - cornerSize,
        };
        let blOffset = {
          x: expandedRect.left - cursorCenterX - borderWidth,
          y: expandedRect.bottom - cursorCenterY + borderWidth - cornerSize,
        };

        if (mouseX !== undefined && mouseY !== undefined) {
          const targetCenterX = expandedRect.left + (expandedRect.right - expandedRect.left) / 2;
          const targetCenterY = expandedRect.top + (expandedRect.bottom - expandedRect.top) / 2;
          const mouseOffsetX = (mouseX - targetCenterX) * parallaxStrength;
          const mouseOffsetY = (mouseY - targetCenterY) * parallaxStrength;

          tlOffset.x += mouseOffsetX;
          tlOffset.y += mouseOffsetY;
          trOffset.x += mouseOffsetX;
          trOffset.y += mouseOffsetY;
          brOffset.x += mouseOffsetX;
          brOffset.y += mouseOffsetY;
          blOffset.x += mouseOffsetX;
          blOffset.y += mouseOffsetY;
        }

        const tl = gsap.timeline();
        const corners = [tlc, trc, brc, blc];
        const offsets = [tlOffset, trOffset, brOffset, blOffset];

        corners.forEach((corner, index) => {
          tl.to(
            corner,
            {
              x: offsets[index].x,
              y: offsets[index].y,
              duration: 0.2,
              ease: "power2.out",
            },
            0
          );
        });
      };

      isAnimatingToTarget = true;
      updateCorners();

      setTimeout(() => {
        isAnimatingToTarget = false;
      }, 1);

      let moveThrottle = null;
      const targetMove = (ev) => {
        if (moveThrottle || isAnimatingToTarget) return;
        moveThrottle = requestAnimationFrame(() => {
          const mouseEvent = ev;
          updateCorners(mouseEvent.clientX, mouseEvent.clientY);
          moveThrottle = null;
        });
      };

      const leaveHandler = () => {
        activeTarget = null;
        isAnimatingToTarget = false;

        if (cornersRef.current) {
          const corners = Array.from(cornersRef.current);
          gsap.killTweensOf(corners);

          const { cornerSize } = constants;
          const positions = [
            { x: -cornerSize * 1.5, y: -cornerSize * 1.5 },
            { x: cornerSize * 0.5, y: -cornerSize * 1.5 },
            { x: cornerSize * 0.5, y: cornerSize * 0.5 },
            { x: -cornerSize * 1.5, y: cornerSize * 0.5 },
          ];

          const tl = gsap.timeline();
          corners.forEach((corner, index) => {
            tl.to(
              corner,
              {
                x: positions[index].x,
                y: positions[index].y,
                duration: 0.3,
                ease: "power3.out",
              },
              0
            );
          });
        }

        resumeTimeout = setTimeout(() => {
          if (!activeTarget && cursorRef.current && spinTl.current) {
            const currentRotation = gsap.getProperty(
              cursorRef.current,
              "rotation"
            );
            const normalizedRotation = currentRotation % 360;

            spinTl.current.kill();
            spinTl.current = gsap
              .timeline({ repeat: -1 })
              .to(cursorRef.current, { rotation: "+=360", duration: spinDuration, ease: "none" });

            gsap.to(cursorRef.current, {
              rotation: normalizedRotation + 360,
              duration: spinDuration * (1 - normalizedRotation / 360),
              ease: "none",
              onComplete: () => {
                spinTl.current?.restart();
              },
            });
          }
          resumeTimeout = null;
        }, 50);

        cleanupTarget(target);
      };

      currentTargetMove = targetMove;
      currentLeaveHandler = leaveHandler;

      target.addEventListener("mousemove", targetMove);
      target.addEventListener("mouseleave", leaveHandler);
    };

    window.addEventListener("mouseover", enterHandler, { passive: true });

    return () => {
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("mouseover", enterHandler);
      window.removeEventListener("scroll", scrollHandler);

      if (activeTarget) {
        cleanupTarget(activeTarget);
      }

      console.log("Cleaning up TargetCursor");

      spinTl.current?.kill();
      document.body.style.cursor = originalCursor;
      document.documentElement.style.cursor = '';
      document.head.style.cursor = '';
      observer.disconnect();
    };
  }, [targetSelector, spinDuration, moveCursor, constants, hideDefaultCursor]);

  useEffect(() => {
    if (!cursorRef.current || !spinTl.current) return;

    if (spinTl.current.isActive()) {
      spinTl.current.kill();
      spinTl.current = gsap
        .timeline({ repeat: -1 })
        .to(cursorRef.current, { rotation: "+=360", duration: spinDuration, ease: "none" });
    }
  }, [spinDuration]);

  return (
    <div ref={cursorRef} className="target-cursor-wrapper">
      <div ref={dotRef} className="target-cursor-dot" />
      <div className="target-cursor-corner corner-tl" />
      <div className="target-cursor-corner corner-tr" />
      <div className="target-cursor-corner corner-br" />
      <div className="target-cursor-corner corner-bl" />
    </div>
  );
};

export default TargetCursor;
