if (typeof mt == 'undefined') {var mt = {};}

$(function () {
    mt.suggestiveText('lang-input', 'Input Your Text For Translation'); 
    $('#lang-input').keydown(function (e) {
        if (e.keyCode == 13) {
            mt.translateBox();
        }
    });
    
    $.post('/get_languages', {}, function (ans) {
        mt.allLangs = {};
        for (var lang in ans) {
            mt.allLangs[ans[lang].language] = ans[lang].name;
        }
    });
});

mt.translateBox = function () {
    var translateText = $('#lang-input').val();
    if (translateText === '') { return; }
    
    for (var lang in mt.allLangs) {
        $.post('/translate', {'lang': lang, 'q': translateText}, 
            function (ans) {
                console.log(ans);
            });
    }
};

mt.suggestiveText = function (id, defaultText, type) {
    $('#' + id)           
        .addClass('blur')
        .val(defaultText)                                 
        .focus(function () {                                           
            if (this.value == defaultText) {                                           
                this.value = '';                                         
            }                                                                      
                
            $(this).removeClass('blur');
        })
        .focusout(function () {          
            if (this.value === '' || (type==Number && isNaN(type(this.value)))) {
                this.value = defaultText;
            } 
            if (this.value == defaultText) {
                $(this).addClass('blur');
            }         
        });   
};
