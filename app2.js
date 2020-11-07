'use strict';
const fs = require('fs');
const readline = require('readline');

const rs = fs.createReadStream('./popu-pref.csv');
const rl = readline.createInterface({ input: rs, output: {} });

const prefectureDataMap = new Map(); // key: 都道府県 value: 集計データのオブジェクト

//１行ずつ処理
rl.on('line', lineString => {
  //データを分割してる
  const columns = lineString.split(',');
  const year = parseInt(columns[0]);//年
  const prefecture = columns[1];//県名
  const popu = parseInt(columns[3]);//15-19の人口

  if (year === 2010 || year === 2015) {
    //都道府県五とのデータを作る
    let value = prefectureDataMap.get(prefecture);

    //上でデータが無かったらデータを初期化　選択的代入でもできる map.get(prefecture); || この配列
    if (!value) {
      value = {
        popu10: 0,
        popu15: 0,
        change: null
      };
    }

    //ここでデータを入れてる
    if (year === 2010) {
      value.popu10 = popu;
    }
    if (year === 2015) {
      value.popu15 = popu;
    }
    prefectureDataMap.set(prefecture, value); 
  }
});
rl.on('close', () => {
    for (let [key, date] of prefectureDataMap) { //また復習　なんでvalueじゃなくても動くのか
        date.change = date.popu15 / date.popu10;//ここvalueじゃなくても動くのが分からない >> forofでキーでプレふぇくちゃーに入れてるから？？
    }
    const rankingArray = Array.from(prefectureDataMap).sort((pair1, pair2) => {
        return pair2[1].change - pair1[1].change;
      });
      const rankingStrings = rankingArray.map(([key, value]) => {
        return (
          key +
          ': ' +
          value.popu10 +
          '=>' +
          value.popu15 +
          ' 変化率:' +
          value.change
        );
      });
      console.log(rankingStrings);
    });