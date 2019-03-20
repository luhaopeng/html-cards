(function () {
  let cards = new Cards(document.getElementById('main'))
  let types = ['default', 'primary', 'warning', 'error']
  let disconnected = [true, false, undefined]
  let rowTitles = [
    { bodyTitle: '上月用电量', footTitle: '剩余电量', unit: 'kWh' },
    { bodyTitle: '上期电费', footTitle: '账户余额', unit: '元', bodyTitle2: '本期电费' }
  ]

  for (let i = 0; i < 15; i++) {
    cards.addChild({
      title: 'Card ' + i,
      type: rand(types),
      disconnected: rand(disconnected),
      bodyData: (Math.random() * 100).toFixed(2),
      bodyData2: (Math.random() * 100).toFixed(2),
      footData: (Math.random() * 100).toFixed(2),
      ...rand(rowTitles)
    })
  }

  function rand(arr) {
    return arr[Math.random() * arr.length | 0]
  }
}())
