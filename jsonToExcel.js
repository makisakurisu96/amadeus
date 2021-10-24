const Excel = require('exceljs')
var file_name = "amit_ras"
var data = require(`./${file_name}.json`);

let workbook = new Excel.Workbook()
let worksheet = workbook.addWorksheet('amit_ras')

worksheet.columns = [
    { header: 'statusMessage', key: 'statusMessage' },
    { header: 'CircuitID', key: 'CircuitID' },
    { header: 'createdAt', key: 'createdAt' },
    { header: 'updatedAt', key: 'updatedAt' },
    { header: 'OrderNumber', key: 'OrderNumber' },
    { header: 'RANumber', key: 'RANumber' },
    { header: 'mins_diff', key: 'mins_diff' },
]

keys=Object.keys(data)
count=0
not_reach=[]
for (var k = 0; k < keys.length; k++) {
    // i = data[keys[k]].data[data[keys[k]].data.length-1]
    if (data[keys[k]].status=="Success"){
        i = data[keys[k]].data[0]
    }
    else{
        not_reach.push(keys[k])
        continue
    }
    createdAt=new Date(i["createdAt"]).getTime(),
    updatedAt=new Date(i["updatedAt"]).getTime(),
    diff=updatedAt-createdAt
    worksheet.addRow([
        i["statusMessage"],
        i["CircuitID"],
        i["createdAt"],
        i["updatedAt"],
        i["catalogOrderNumber"],
        i["OrderNumber"],
        diff/1000/60
    ])
}
console.log(not_reach)
workbook.xlsx.writeFile(`${file_name}.xlsx`)
