// 格式化时间对象
const getNowDate = () => {
  let now = new Date();
  let year = now.getFullYear();
  let month = ("0" + (now.getMonth() + 1)).slice(-2);
  let date = ("0" + now.getDate()).slice(-2);
  let hours = ("0" + now.getHours()).slice(-2);
  let minutes = ("0" + now.getMinutes()).slice(-2);
  let seconds = ("0" + now.getSeconds()).slice(-2);
  return year +'-'+ month +'-'+ date + ' '+ hours +':'+ minutes + ':'+seconds
}
export  {getNowDate};