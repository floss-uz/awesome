export function extractLink(arr){
  return { 
    first: extractCertain(arr, "first"),
    next: extractCertain(arr, "next"),
    prev: extractCertain(arr, "prev"),
    last: extractCertain(arr, "last")
  }  
}

function extractCertain(arr, keyword){
  let index;

  // find index of str containing keyword
  for(let i = 0; i < arr.length; i++){
    if(arr[i].split('"').some(x => x.trim() === keyword)){
      index = i - 1;
      break;
    }
  }

  if(index == undefined){
    return null;
  }

  return sliceLink(arr[index]);
}

function sliceLink(str){
  let result = "";

  for(const i of str){
    if(i == "<"){
      continue;
    }
    if(i == ">"){
      break;
    }
    result += i;
  }

  return result;
}