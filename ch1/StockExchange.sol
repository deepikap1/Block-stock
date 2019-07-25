pragma solidity >=0.4.0 <0.6.0;

contract StockExchange {

  
  struct Firm {

   uint256 id;
   uint256 no_of_stocks;
   uint256 price;

  }
  
  struct Account {

  address acc_no;
  uint256 balance;
  uint8[3] stocks_owned;

  }

  Firm[] public firm_list;
  

  constructor() public {

    for(uint256 i=0;i<3;i++){
   firm_list.push(Firm(i,(i+1)*1000,(i+1)*100));
  }

  }

 // int x =-1;
  Account[] public account_list;

  function flag(address candidate) internal view returns (uint256) {
   
    for(uint256 i = 0; i < account_list.length; i++) {
      if (account_list[i].acc_no == candidate) {
        return i;
      }
    }
    return 11;
  }


  function buy (uint256 firm_id ,uint256 quantity) public {

    uint256 a = flag(msg.sender);

    if(a==11){

    account_list.push(Account(msg.sender,10000,[0,0,0]));
    a = account_list.length-1;

    }
    
    require((quantity<=firm_list[firm_id].no_of_stocks)&&(account_list[a].balance>=quantity*firm_list[firm_id].price));

     account_list[a].balance=account_list[a].balance-quantity*firm_list[firm_id].price;
     firm_list[firm_id].no_of_stocks=firm_list[firm_id].no_of_stocks-quantity;
     account_list[a].stocks_owned[firm_id]++;

  }

  
  function stocksLeft(uint256 firm_id) view public returns (uint256) {
    //require(validCandidate(candidate));
    return firm_list[firm_id].no_of_stocks;
  }

  function getBalance() view public returns (uint256) {
    //require(validCandidate(candidate));
    uint256 a = flag(msg.sender);
    return account_list[a].balance;
  }
  
  function stocksOwned(uint256 firm_id) view public returns (uint256) {
    uint256 a = flag(msg.sender);
    return account_list[a].stocks_owned[firm_id];

  }



}
