const getPosRelativeToBody = (el: HTMLElement) => {
  return Math.abs(
    document.documentElement.getBoundingClientRect().top - el.getBoundingClientRect().top,
  );
}

const getScrollPercentage = (startMarker: HTMLElement, marker: HTMLElement, circle: SVGCircleElement, circumference: number) => {
  const offsetFromTop = getPosRelativeToBody(startMarker) + marker.getBoundingClientRect().height

  const total = getPosRelativeToBody(marker) - getPosRelativeToBody(startMarker) - window.innerHeight
  const progress = (((window.scrollY - offsetFromTop) / total) * 100)

  const offset = circumference - (circumference * (progress * 0.01))

  if (progress < 0) {
    circle.style.strokeDashoffset = (Math.PI * 100).toFixed(10)
    return
  }

  if (progress > 100) {
    circle.style.strokeDashoffset = '0'
    return
  }

  circle.style.strokeDashoffset = `${offset}`
  circle.style.strokeWidth = '4'
}

export {
  getScrollPercentage,
  getPosRelativeToBody,
}
