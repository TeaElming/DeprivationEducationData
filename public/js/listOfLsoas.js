import { LsoaGraph } from './lsoaGraph.js'

export class ListOfLsoas {
  constructor() {
    this.currentPage = 1
    this.totalPages = 0
    this.filteredAreas = []
    this.lsoaGraph = new LsoaGraph()

    this.setupListeners()
    this.fetchData()

    // Attach search event listener once
    const searchInput = document.getElementById('searchInput')
    searchInput.addEventListener('input', () => {
      this.filterAreas(searchInput.value.toLowerCase())
      this.renderPage(1)
    })
  }

  /**
   * Renders the search results on the page.
   *
   * @param {Object} data - The data object containing the search results.
   * @memberof listOfLsoas
   */
  async renderResults(data) {
    const totalLSOAsElement = document.getElementById('totalLSOAs')
    totalLSOAsElement.textContent = data.count

    const searchInput = document.getElementById('searchInput')
    searchInput.addEventListener('input', () => {
      this.filterAreas(data, searchInput.value.toLowerCase())
      this.renderPage(1)
    })

    this.totalPages = Math.ceil(data.areas.length / 20)
    this.filteredAreas = data.areas
    this.renderPage(1)
  }

  /**
   * Filters the areas based on the search term.
   *
   * @param {Object} data - The data object containing the areas to filter.
   * @param {String} searchTerm - The search term to filter the areas, either code or name.
   * @memberof listOfLsoas
   */
  filterAreas(searchTerm) {
    this.filteredAreas = this.fullData.filter(
      (area) =>
        area.geography_code.toLowerCase().includes(searchTerm) ||
        area.geography.toLowerCase().includes(searchTerm)
    )
    this.totalPages = Math.ceil(this.filteredAreas.length / 20)
  }

  /**
   * Sets up the event listeners for the pagination buttons.
   *
   * @memberof listOfLsoas
   */
  setupListeners() {
    const prevButton = document.getElementById('prevButton')
    prevButton.addEventListener('click', () => this.goToPrevPage())

    const nextButton = document.getElementById('nextButton')
    nextButton.addEventListener('click', () => this.goToNextPage())
  }

  /**
   * Updates the pagination arrows and page info based on the current page and total pages.
   *
   * @memberof listOfLsoas
   */
  updatePagination() {
    const prevButton = document.getElementById('prevButton')
    const nextButton = document.getElementById('nextButton')
    const pageInfo = document.getElementById('pageInfo')

    prevButton.disabled = this.currentPage === 1
    nextButton.disabled = this.currentPage === this.totalPages

    pageInfo.textContent = `Page: ${this.currentPage}/${this.totalPages}`
  }

  /**
   * Goes to the previous page.
   *
   * @memberof listOfLsoas
   */
  goToPrevPage() {
    if (this.currentPage > 1) {
      this.renderPage(this.currentPage - 1)
    }
  }

  /**
   * Goes to the next page.
   *
   * @memberof listOfLsoas
   */
  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.renderPage(this.currentPage + 1)
    }
  }

  /**
   * Triggers the manipulation of the data for the selected geocode.
   *
   * @param {*} geocode
   * @memberof listOfLsoas
   */
  handleClick(geocode) {
    console.log(`Clicked on row with geocode: ${geocode}`)
    document.getElementById('graph').innerHTML = ''
    this.lsoaGraph.manipulateGeoCodeData(geocode)
  }

  async fetchData() {
    try {
      const response = await fetch('/fetch-geo-code-names', { method: 'GET' })
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      const data = await response.json()
      console.log('Data fetched: ', data)

      this.fullData = data.areas
      this.filteredAreas = [...this.fullData] // Ensure filtering works
      this.totalPages = Math.ceil(this.filteredAreas.length / 20) // Use filtered data

      // Update the total LSOA count in the UI
      const totalLSOAsElement = document.getElementById('totalLSOAs')
      totalLSOAsElement.textContent = this.fullData.length

      this.renderPage(1)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  // Override renderPage to handle large datasets more efficiently
  renderPage(pageNumber) {
    const pageSize = 20
    const startIdx = (pageNumber - 1) * pageSize
    const endIdx = startIdx + pageSize
    const pageItems = this.filteredAreas.slice(startIdx, endIdx) // Use filtered data

    const resultsContainer = document.getElementById('resultsContainer')
    resultsContainer.innerHTML = ''

    pageItems.forEach((area) => {
      const row = document.createElement('div')
      row.classList.add('row')
      row.innerHTML = `
        <span class="geocode">${area.geography_code}</span>
        <span class="name">${area.geography}</span>
      `
      row.addEventListener('click', () => this.handleClick(area.geography_code))
      resultsContainer.appendChild(row)
    })

    this.currentPage = pageNumber
    this.updatePagination()
  }
}
