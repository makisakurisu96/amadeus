var t = '1-Aug-2021::03:39:19.447'.replace('::', ' ')
// 1-Aug-2021 03:39:19.447
var t1 = Date.parse(t)
console.log(t1)
var t1d = new Date(t1)
console.log(t1d)
var t2 = Date.parse("1-Aug-2021 03:39:20.447")
var t2d = new Date(t2)
console.log(t2d)
var h = (t2d - t1d) / 1000 / 3600
console.log(h)