function pagers() {

  const pagerCount = this.pagerCount;
  const halfPagerCount = (pagerCount - 1) / 2;

  const currentPage = Number(this.currentPage);

  const pageCount = Number(this.maxPager);

  let showPrevMore = false;
  let showNextMore = false;

  if (pageCount > pagerCount) {
    if (currentPage > pagerCount - halfPagerCount) {
      showPrevMore = true;
    }
    if (currentPage < pageCount - halfPagerCount) {
      showNextMore = true;
    }
  }
  const array = [];
  if (showPrevMore && !showNextMore) {
    const startPage = pageCount - (pagerCount - 2);
    for (let i = startPage; i < pageCount; i++) {
      array.push(i);
    }
  } else if (!showPrevMore && showNextMore) {
    for (let i = 2; i < pagerCount; i++) {
      array.push(i);
    }
  } else if (showPrevMore && showNextMore) {
    const offset = Math.floor(pagerCount / 2) - 1;
    for (let i = currentPage - offset; i <= currentPage + offset; i++) {
      array.push(i);
    }
  } else {
    for (let i = 2; i < pageCount; i++) {
      array.push(i);
    }
  }
  this.showPrevMore = showPrevMore;
  this.showNextMore = showNextMore;
  return array;
}