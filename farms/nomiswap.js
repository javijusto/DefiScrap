const puppeteer = require('puppeteer');

const scanner = async () => {
  const browser = await puppeteer.launch( {headless: false}); //abre navegador
  const page = await browser.newPage(); //nueva pagina
  await page.setDefaultNavigationTimeout(0); //espera infinita
  await page.goto('https://nomiswap.io/farms'); //url
  await page.waitForSelector(
      '#farms-table div:nth-child(13) div.sc-gwWxmB.jOWvaz div:nth-child(4) div.sc-gtsrHT.gaRYli div span'
  );//espera que carguen datos del selector
  const data = await page.evaluate(() => {
    const elementsPairs = document.querySelectorAll(
      '#farms-table div div.sc-gwWxmB.jOWvaz div:nth-child(2) div div:nth-child(2) div');
    let pairs = [];//PARES DE LIQUIDEZ
    for (let elementPairs of elementsPairs){
        pairs.push(elementPairs.textContent);
    }
    const elementsAPRs = document.querySelectorAll(
    '#farms-table div div.sc-gwWxmB.jOWvaz div:nth-child(4) div.sc-gtsrHT.gaRYli div span');
    let APRs = [];//APRS
    for (let elementAPRs of elementsAPRs){
        APRs.push(elementAPRs.textContent);
    }
    const elementsliquidity = document.querySelectorAll(
      '#farms-table div div.sc-gwWxmB.jOWvaz div:nth-child(5) div.sc-gtsrHT.gaRYli');
    let liquidity = [];//LIQUIDEZ DE LA POOL
    for (let elementliquidity of elementsliquidity){
        APRs.push(elementliquidity.textContent);
    }
    return pairs.concat(APRs.concat(liquidity));

  })
  await browser.close();
  return data;
};

module.exports = scanner;