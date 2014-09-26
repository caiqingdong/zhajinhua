
var commondef = require('../common/commondef')

function Card()
{
    this.init = function()
    {
        this.statue = true;
        this.element = new Array();

        for (var cardColor in commondef.CardColor)
        {
            //黑桃
            for( var i = 1; i <= 13; i++)
            {
                this.element.push(new commondef.CardItem(cardColor, i));
            }
        }
    }
}

Card.prototype.dealingByZJH = function(PeopleNum)
{
    if( typeof this.statue == "undefined")
    {
        return ;
    }
    //牌不够用
    if(this.element.length < PeopleNum * 3)
    {
        return ;
    }
    var temp_Array = this.element.slice(0);
    //玩牌的牌
    var peopleCard = new Array();
    for(var arrayNum = 0; arrayNum < PeopleNum; arrayNum++)
    {
        peopleCard.push(new Array());
    }

    for(var i = 0; i < 3; i++)
    {
        for(var peopleIdx = 0; peopleIdx < PeopleNum; peopleIdx++)
        {
            var arrIndex = Math.floor(Math.random() * temp_Array.length);
            peopleCard[peopleIdx].push(temp_Array[arrIndex]);
            temp_Array.splice(arrIndex, 1);
        }
    }
    return peopleCard;
}

module.exports = Card;