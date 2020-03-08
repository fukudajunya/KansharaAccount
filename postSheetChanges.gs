// ====================================================================================
// (function) postSheetChange
/**
 * メイン処理
 *
 * @ param object e
 * @ return void
 */
// reference: https://qiita.com/matsukazu1112/items/d47e81d4c4d08d2147d3
// ====================================================================================
function postSheetChange(e){

  const value = getData(e);

  if (value) {
    postMessage(value);
  }else{
   
    Logger.log("更新なし")
    
  }

}