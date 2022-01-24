require('dotenv').config();
const req = require('request');

req.get({
  uri:process.env.UPDATE_URI+'/versions/sorted',
  json: true
}, (err, res, body) => {

  const items = body.items
  var assetArray = items.map(item => {
    assets = item.assets.map(asset => [asset.name, asset.id])
    return [item.createdAt, item.id, assets]
  }).sort();

  var lastNum = 0;
  assetArray.some((el, i) => {
    if(el[2].length > 0) {
      lastNum = i;
      return lastNum;
    }
  })
    
  assetArray[lastNum][2].map((id) => {
  deleteAsset(id)
  })
})

const deleteAsset = (id) => {
  req.delete({
    uri:process.env.UPDATE_URI+'/api/asset/'+id[1]
  }, (err, res, body) => {

    console.log(`[DELETE] Name: ${id[0]}, Id: ${id[1]}`)
  })
}