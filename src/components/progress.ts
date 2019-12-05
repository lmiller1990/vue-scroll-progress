const getScrollPercentage = (startMarker: HTMLElement, endMarker: HTMLElement): number => {
  const offsetFromTop = getPosRelativeToBody(startMarker)
  const total = getPosRelativeToBody(endMarker) - offsetFromTop - window.innerHeight
  const progress = ((window.scrollY - offsetFromTop) / total)
  return progress
}

const updateCircle = (circle: SVGCircleElement, progress: number): void => {
  const circumference = circle.r.baseVal.value * 2 * Math.PI

  // draw nothing
  if (progress < 0) {
    circle.style.strokeDashoffset = `${circumference}`
    return
  }

  // draw the full circle
  if (progress > 1) {
    circle.style.strokeDashoffset = '0'
    return
  }

  circle.style.strokeDasharray = `${circumference}`
  const offset = circumference - (circumference * progress)
  circle.style.strokeDashoffset = `${offset}`
}

const getPosRelativeToBody = (el: HTMLElement): number => {
  return Math.abs(
    document.documentElement.getBoundingClientRect().top - el.getBoundingClientRect().top,
  );
}

export {
  getScrollPercentage,
  updateCircle,
}
