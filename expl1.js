'use strict';
// fs (File System) モジュールを読み込んで使えるようにする
const fs = require('fs');
const readline = require('readline');

//ファイルとして読み込める状態に準備する
const rs = fs.createReadStream('./popu-pref.csv');

//readlineモジュールにfsを設定する
const rl = readline.createInterface({ input: rs, output: {} });

//popu-pref.csvのデータを１行ずつ読み込んで設定された関数を実行
rl.on('line', lineString => {
    //["2010","北海道","237155","258530"]のようなデータに分割
  const columns = lineString.split(',');

  //paseIntは文字列から数値型に変換している
  const year = parseInt(columns[0]); //年
  const prefecture = columns[1]; //県名
  const popu = parseInt(columns[3]); //15~19歳の人口

  if (year === 2010 || year === 2015) {
    console.log(year+ "年 " + prefecture + " " + popu + "人");
  }
});