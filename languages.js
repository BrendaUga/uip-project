//translation
var LangTrans = new Array();
LangTrans['en']=new Array();
LangTrans['sv']=new Array();
LangTrans['ca']=new Array();
LangTrans['es']=new Array();

LangTrans['en']['title']='The Seasick Captain';
LangTrans['en']['beer']='Beer';
LangTrans['en']['wine']='Wine';
LangTrans['en']['whiskey']='Whiskey';
LangTrans['en']['food']='Food';
LangTrans['en']['special']='Special';
LangTrans['en']['your-order']='Your Order';
LangTrans['en']['total']='TOTAL:';
LangTrans['en']['card']='CARD';
LangTrans['en']['cash']='CASH'; //Cash?

LangTrans['sv']['title']='The Seasick Captain';
LangTrans['sv']['beer']='Öl';
LangTrans['sv']['wine']='Vin';
LangTrans['sv']['whiskey']='Whiskey';
LangTrans['sv']['food']='Mat';
LangTrans['sv']['special']='Special'; //Add another translation to special
LangTrans['sv']['your-order']='Din Beställning';
LangTrans['sv']['total']='TOTAL:';
LangTrans['sv']['card']='KORT';
LangTrans['sv']['cash']='KONTANT';

LangTrans['ca']['title']='The Seasick Captain';
LangTrans['ca']['beer']='Cervesa';
LangTrans['ca']['wine']='Vi';
LangTrans['ca']['whiskey']='Whiskey';
LangTrans['ca']['food']='Menjar';
LangTrans['ca']['special']='Especial';
LangTrans['ca']['your-order']='La seva comanda';
LangTrans['ca']['total']='TOTAL:';
LangTrans['ca']['card']='TARGETA';
LangTrans['ca']['cash']='EFECTIU';

LangTrans['es']['title']='The Seasick Captain';
LangTrans['es']['beer']='Õlu';
LangTrans['es']['wine']='Vein';
LangTrans['es']['whiskey']='Viski';
LangTrans['es']['food']='Toit';
LangTrans['es']['special']='Erimenüü';
LangTrans['es']['your-order']='Sinu tellimus';
LangTrans['es']['total']='KOKKU:';
LangTrans['es']['card']='KAART';
LangTrans['es']['cash']='KREDIIT';

$(document).ready(function() {
    // onclick behavior
    $('.lang').click( function() {
        var lang = $(this).attr('id'); // obtain language id
        // translate all translatable elements
        $('.tr').each(function(i){
            $(this).text(LangTrans[lang][ $(this).attr('key') ]);
        });
    } );
});