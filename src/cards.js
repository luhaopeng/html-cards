class Cards {
  constructor(el) {
    if (!this._isElement(el)) {
      throw new Error('Cards must be initialize on an HTMLDomElement.')
    }
    this._ref = el
    this._length = 0
    this._selected = null
    let that = this
    el.addEventListener('click', function () {
      that._cancelSelect()
    })
  }
  addChild(options = {}) {
    this._updateLength()
    options = Object.assign({
      type: 'default', // 'default', 'primary', 'warning', 'error'
      title: 'Card',
      disconnected: undefined,
      contact: '小张',
      bodyTitle: '上月用电量',
      bodyTitle2: null,
      footTitle: '剩余电量',
      bodyData: '0.00',
      bodyData2: null,
      footData: '0.00',
      unit: 'kWh',
      link: null,
      key: 'key'
    }, options)
    const types = ['default', 'primary', 'warning', 'error']
    if (types.indexOf(options.type) === -1) {
      throw new Error(
        'Card type should be among "default", "primary", "warning", "error".'
      )
    }
    let index = this._length / 5 | 0
    let row = this._ref.querySelectorAll('.card-row').item(index)
    if (!row) {
      let newRow = document.createElement('div')
      newRow.className = 'card-row'
      this._ref.appendChild(newRow)
      row = this._ref.querySelectorAll('.card-row').item(index)
    }
    let col = document.createElement('div')
    col.className = 'card-col'
    col.setAttribute('data-index', this._length)
    let section = document.createElement('section')
    section.className = options.type
    section.setAttribute('data-key', options.key)
    let bodyRow2 = `
      <tr>
        <th>${options.bodyTitle2}</th>
        <td>
            ${options.bodyData2} <small>${options.unit}</small>
        </td>
      </tr>
    `
    let svg = `
      <svg class="icon ${options.disconnected ? 'disconn' : 'conn'}" aria-hidden="true">
        <use xlink:href="${options.disconnected ? '#icondisconn1' : '#iconconn1'}"></use>
      </svg>
    `
    section.innerHTML = `
      <header>
        <div title="${options.title}">
          ${options.title}
        </div>
        ${typeof options.disconnected === 'undefined' ? '' : svg}
      </header>
      <div class="body">
        <table>
          <tbody>
            <tr>
              <th>联系人</th>
              <td>${options.contact}</td>
            </tr>
            <tr>
              <th>${options.bodyTitle}</th>
              <td>
                  <a>
                    ${options.bodyData} <small>${options.unit}</small>
                  </a>
              </td>
            </tr>
            ${options.bodyTitle2 ? bodyRow2 : ''}
            <tr>
              <th>${options.footTitle}</th>
              <td class="data">${options.footData} <small>${options.unit}</small></td>
            </tr>
          </tbody>
        </table>
      </div>
    `
    let that = this
    section.addEventListener('click', function (e) {
      that._onClick(this, that, e)
    })
    let a = section.querySelector('.body a')
    a.addEventListener('click', function () {
      let link = options.link
      typeof link === 'function' && link(options.key)
    })
    col.appendChild(section)
    row.appendChild(col)
    this._updateLength()
    return this
  }
  queryChild(query) {
    if (typeof query === 'number') {
      return this._ref.querySelector(`div[data-index=${query}]`)
    } else if (typeof query === 'string') {
      return this._ref.querySelectorAll(query)
    } else {
      throw new Error('queryChild() accept index|queryString')
    }
  }
  get length() {
    return this._length
  }
  set length(cn) {
    throw new Error('You shouldn\'t set length manually.')
  }
  get selected() {
    return this._selected
  }
  set selected(cn) {
    throw new Error('You shouldn\'t set selected manually.')
  }
  _onClick(section, cards, e) {
    cards._cancelSelect()
    section.className += ' selected'
    cards._selected = section.getAttribute('data-key')
    e.stopPropagation()
  }
  _cancelSelect() {
    this._ref.querySelectorAll('section.selected').forEach(function (cur) {
      cur.className = cur.className.replace(/\s*selected\s*/g, ' ')
    })
    this._selected = null
  }
  _updateLength() {
    this._length = this._ref.querySelectorAll('.card-col section').length
  }
  _isElement(obj) {
    if (obj && obj.nodeType === 1) {
      if (window.Node && obj instanceof Node) {
        return true
      }
      try {
        let testDiv = document.createElement('div')
        testDiv.appendChild(obj)
        testDiv.removeChild(obj)
      } catch (e) {
        return false
      }
      return true
    }
    return false
  }
}
