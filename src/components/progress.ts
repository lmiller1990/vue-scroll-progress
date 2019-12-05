// const getScrollPercentage = (marker: HTMLElement): string => {
//   const { y, height } = marker.getBoundingClientRect() as DOMRect
//   const progress =  100 - ((y - window.innerHeight + height / 2) / (document.body.scrollHeight - window.innerHeight) * 100)

//   if (progress < 0) {
//     return '0'
//   }

//   if (progress > 100) {
//     return '100'
//   }

//   return progress.toFixed(0)
// }

// export {
//   getScrollPercentage,
// }

const getPosRelativeToBody = (el: HTMLElement) => {
  return Math.abs(
    document.body.getBoundingClientRect().top - el.getBoundingClientRect().top
  )
}

const getScrollPercentage = (startMarker: HTMLElement, marker: HTMLElement, circle: SVGCircleElement, circumference: number) => {
  const offsetFromTop = getPosRelativeToBody(startMarker) + marker.getBoundingClientRect().height

  const total = getPosRelativeToBody(marker) - getPosRelativeToBody(startMarker) - window.innerHeight
  const progress = (((window.scrollY - offsetFromTop) / total) * 100) // .toFixed(10)

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
  getScrollPercentage
}
