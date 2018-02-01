class Paginator {
  constructor (limit) {
    this.skip = 0
    this.limit = limit
  }

  next () {
    this.skip = this.skip + this.limit
  }

  getSkip () {
    return this.skip
  }

  getLimit () {
    return this.limit
  }

  setSkip (skip) {
    this.skip = skip
  }

  setLimit (limit) {
    this.limit = limit
  }

  reset () {
    this.limit = 0
    this.skip = 0
  }

  get () {
    return {
      skip: this.skip,
      limit: this.limit
    }
  }
}

export default Paginator
