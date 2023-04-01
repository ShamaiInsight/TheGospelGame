
// Use to display big number 3 digit only whth unit
function formatNumber(num) 
{
    let str = num.toString();
    let length = str.length;
    let units = ["","K","M","G","T","A","kA","mA","gA","tA"]
  
    if (length <= 3) 
    {
      return str;
    }
    else 
    {
      let remainder = length - Math.trunc(length / 3)*3;
      
      let formatted = "";
      if ( (length % 3) === 0)
      {
        formatted = str.substr(0,3)
      }
      else
      {
        formatted = str.substr(0,remainder)+".";
        formatted += str.substr(remainder,3-remainder);
      }
      return formatted+units[Math.trunc(length / 3)-((length % 3)==0?1:0)];
    }
  }
  