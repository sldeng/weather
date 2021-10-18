function dateFormat(fmt, date) {
  let ret;
  const opt = {
      "Y+": date.getFullYear().toString(),        // 年
      "m+": (date.getMonth() + 1).toString(),     // 月
      "d+": date.getDate().toString(),            // 日
      "H+": date.getHours().toString(),           // 时
      "M+": date.getMinutes().toString(),         // 分
      "S+": date.getSeconds().toString()          // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
          fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
      };
  };
  return fmt;
}

function fn(weatherData, lifeData, word, imgurl, lovingDays) {
  const { daily: weatherDataDaily } = weatherData;
  const { daily } = lifeData;
  let lovingDay = dateFormat("YYYY-mm-dd HH:MM:SS", lovingDays)
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <body>
      <div>
        <!-- 天数 -->
        <div>
          <p>今天是${lovingDay}</p>
        </div>
        <!-- 图片 -->
        <div>
          <img
            style="width: 100%; max-width: 768px"
            src="${imgurl}"
            alt="图片"
          />
        </div>
        <!-- 每日一句 -->
        <div>
          <p style="font-size: 14px; text-indent: 2em; font-style: italic;">
            ${word}
          </p>
        </div>
        <!-- 天气 -->
        <div>
          <p>
            <b>今日气温:</b>
            <span>${weatherDataDaily[0].tempMin}°C - ${weatherDataDaily[0].tempMax}°C</span>
          </p>
          <ul>
            <li style="margin-bottom: 10px">
              ${daily[1].name}(${daily[1].category}):
              ${daily[1].text}
            </li>
            <li style="margin-bottom: 10px">
              ${daily[2].name}(${daily[2].category}):
              ${daily[2].text}
            </li>
            <li style="margin-bottom: 10px">
              ${daily[0].name}(${daily[0].category}):
              ${daily[0].text}
            </li>
          </ul>
        </div>
      </div>
    </body>
  </html>
  `;
}

module.exports = fn;
