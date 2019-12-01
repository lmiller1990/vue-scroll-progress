const getScrollPercentage = (marker: HTMLElement): string => {
  const { y, height } = marker.getBoundingClientRect() as DOMRect
  const progress =  100 - ((y - window.innerHeight + (height / 2)) / (document.body.scrollHeight - window.innerHeight) * 100)

  if (progress < 0) {
    return '0'
  }

  if (progress > 100) {
    return '100'
  }

  return progress.toFixed(0)
}

export {
  getScrollPercentage,
}
