const request = require('superagent')
const cheerio = require('cheerio')
const fs = require('fs-extra')

let url1 = 'https://www.meishij.net/chufang/diy/jiangchangcaipu/?&page='
let url2 = 'https://www.xiaomiyoupin.com/goodsbycategory?firstId=1038&secondId=1364&title=%E7%88%86%E5%93%81%E4%B8%BB%E6%8E%A8'
let url3 = 'https://a751-lar.mxnt.net/api/auth/startover?merchant_id=1'

const getText = async () => {
  const res = await request.get(url3)
  console.log(res.text)
}

const getUrl = async () => {
  const file = './output.json'
  let imgArr = []

  for (let i = 1; i <= 3; i++) {
    const res = await request.get(url1 + i)
    const $ = cheerio.load(res.text)

    $('#listtyle1_list .listtyle1').each(function (i, elem) {
      const title = $(this).find('a').attr('title')
      const img = $(this).find('img').attr('src')
      console.log(title, img)
      imgArr.push({ title: title, img: img })
    })

    fs.outputJsonSync(file, imgArr)
  }
}

getText()
