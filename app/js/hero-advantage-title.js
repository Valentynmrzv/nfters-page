const title = document.querySelector(".hero-advantage__title")
  , options = {
    root: null,
    rootMargin: "200px",
    threshold: .5
  }
  , intersectionObserver = new IntersectionObserver((e => {
    e.forEach((e => {
      e.isIntersecting ? (title.style.opacity = "1",
        title.style.transform = "translateX(0)") : (title.style.opacity = "0",
          title.style.transform = "translateX(-30%)",
          document.body.style.overflowX = "auto")
    }
    ))
  }
  ), options);
intersectionObserver.observe(title);