

var commoddef = module.exports = {}

commoddef.CardColor = {"Spade" : 1, "Heart" : 2, "Club" : 3, "Diamond" : 4};

commoddef.CardItem = function( color, number)
{
    this.color = color;
    this.number = number;
}

