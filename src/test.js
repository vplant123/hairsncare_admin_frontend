let arr =[2,4,6,7] //10
let target=13;

const twosum=(arr,target)=>{
let obj={}
for(let i=0;i<arr.length;i++){
  let remain=target-arr[i]
  if(obj[i]==remain){
    console.log('hfh')
  }
  else
  {
    obj[i]=arr[i]
  }
}
console.log(obj)
}
twosum(arr,target)