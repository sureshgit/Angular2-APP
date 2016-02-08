/**
 * @license Copyright (c) 2003-2014, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function (config) {

    // %REMOVE_START%
    // The configuration options below are needed when running CKEditor from source files.
    config.plugins = 'dialogui,dialog,about,a11yhelp,dialogadvtab,basicstyles,bidi,blockquote,clipboard,button,panelbutton,panel,floatpanel,colorbutton,colordialog,templates,menu,contextmenu,div,'
        + 'resize,toolbar,elementspath,enterkey,entities,popup,filebrowser,find,fakeobjects,flash,floatingspace,listblock,richcombo,font,forms,format,horizontalrule,htmlwriter,iframe,wysiwygarea,'
        + 'image,indent,indentblock,indentlist,smiley,justify,menubutton,language,link,list,liststyle,magicline,maximize,newpage,pagebreak,pastetext,pastefromword,preview,print,removeformat,save,'
        + 'selectall,showblocks,showborders,sourcearea,specialchar,'//scayt,
    +'stylescombo,tab,table,tabletools,undo,wsc,autocorrect,backgrounds,fastimage,insertpre,symbol';
    config.skin = 'bootstrapck';
    config.extraPlugins = 'simpleLink,lineheight';
    config.toolbar = [
                        ['Styles', 'Format'],
                        ['Bold', 'Italic', 'Underline', 'Strike'],
                        ['TextColor', 'BGColor'],
                        ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
                        ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', 'lineheight'],
                        ['Image', 'PasteFromWord', 'Table', 'PageBreak', 'SimpleLink','Source']
                        //, 'SpellChecker', 'Scayt' //---- spellchecker
    ];

    config.pasteFromWordPromptCleanup = false;
    config.pasteFromWordRemoveStyles = false;
    config.pasteFromWordRemoveFontStyles = false;

   // config.scayt_sLang = 'en_GB';
    //config.wsc_lang = 'en_GB'


    config.allowedContent = {
        $1: {
            // Use the ability to specify elements as an object.
            elements: CKEDITOR.dtd,
            attributes: true,
            styles: true,
            classes: true
        }
    };
    //config.disallowedContent = 'script; *[on*]';
    config.extraAllowedContent = 'merge-field; merge[*](*){*}; merge-empty[*](*){*}';
    config.ignoreEmptyParagraph = true;
    //config.allowedContent = true;
    //config.extraAllowedContent = 'style';
    // %REMOVE_END%

    // Define changes to default configuration here. For example:
    // config.language = 'fr';
    // config.uiColor = '#AADC6E';
};
