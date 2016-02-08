// Register a new CKEditor plugin.
// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.resourceManager.html#add
CKEDITOR.plugins.add('simpleLink',
{
    // The plugin initialization logic goes inside this method.
    // http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.pluginDefinition.html#init
    init: function (editor) {
        // Create an editor command that stores the dialog initialization command.
        // http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.command.html
        // http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.dialogCommand.html
        editor.addCommand('simpleLinkDialog', new CKEDITOR.dialogCommand('simpleLinkDialog'));

        // Create a toolbar button that executes the plugin command defined above.
        // http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.ui.html#addButton
        editor.ui.addButton('SimpleLink',
		{
		    // Toolbar button tooltip.
		    label: 'Insert an attribute',
		    // Reference to the plugin command name.
		    command: 'simpleLinkDialog',
		    // Button's icon file path.
		    icon: this.path + 'images/icon.png'
		});
        var entitiesTemplate = [];
        var entityTemplateNames = [];

        if (typeof Entities !== "undefined" && Entities)
            $.each(Entities, function (key, val) {
                if (val.Attributes && val.Attributes.length > 0) {
                    entitiesTemplate.push(val);
                    entityTemplateNames.push([val.Name, val.Name]);
                }
            });
        else {
            (function ($) {
                $.ajax({
                    url: "/api/entitytemplate",
                    dataType: 'json',
                    data: "",
                    success: function (data) {
                        window["Entities"] = data;
                        $.each(data, function (key, val) {
                            entitiesTemplate.push(val);
                            entityTemplateNames.push([val.Name, val.Name]);
                        });
                    }
                });
            })(jQuery);
        }
        var loadingMe = false;
        if (typeof Me !== "undefined" && Me) { }
        else {
            (function ($) {
                if (loadingMe) return;
                loadingMe = true;
                $.ajax({
                    url: "/api/user/whoami/00000000-0000-0000-0000-000000000000",
                    dataType: 'json',
                    data: "",
                    success: function (data) {
                        window['Me'] = data;
                        loadingMe = false;
                    }
                });
            })(jQuery);
        }
        // Add a new dialog window definition containing all UI elements and listeners.
        // http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.dialog.html#.add
        // http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.dialog.dialogDefinition.html
        CKEDITOR.dialog.add('simpleLinkDialog', function (editor) {
            return {
                // Basic properties of the dialog window: title, minimum size.
                // http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.dialog.dialogDefinition.html
                title: 'Insert an attribute',
                minWidth: 400,
                minHeight: 200,
                // Dialog window contents.
                // http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.dialog.definition.content.html
                contents:
				[
					{
					    // Definition of the Settings dialog window tab (page) with its id, label and contents.
					    // http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.dialog.contentDefinition.html
					    id: 'general',
					    label: 'Settings',
					    elements:
						[
							// Dialog window UI element: HTML code field.
							// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.ui.dialog.html.html
							{
							    type: 'html',
							    // HTML code to be shown inside the field.
							    // http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.ui.dialog.html.html#constructor
							    html: 'This window allows you to add a new attribute value into the template.'
							},

							// Dialog window UI element: a selection field with link styles.
							// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.ui.dialog.select.html
							{
							    type: 'select',
							    required: true,
							    id: 'entitytemplateName',
							    className: 'entitytemplateFormAttributeSelect',
							    label: 'Entity *',
							    // Items that will appear inside the selection field, in pairs of displayed text and value.
							    // http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.ui.dialog.select.html#constructor
							    items: entityTemplateNames,
							    'default': entityTemplateNames[0][0],
							    onChange: function (data) {
							        FillPropsControl(data.data.value, entitiesTemplate);
							    },
							    commit: function (data) {
							        data.selectEntity = this.getValue();
							    },

							    onLoad: function () {
							        CleanFormStyle();
							        FillPropsControl(entityTemplateNames[0][0], entitiesTemplate);
							    }

							},
						    {
						        type: 'select',
						        id: 'entitytemplateProps',
						        className: 'entitytemplatePropsSelect',
						        label: 'Attribute *',
						        // Items that will appear inside the selection field, in pairs of displayed text and value.
						        // http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.ui.dialog.select.html#constructor
						        items: ['', ''],
						        commit: function (data) {
						            data.selectEntityProps = this.getValue();
						        },
						        onShow: function () {
						            FillPropsControl(entityTemplateNames[0][0], entitiesTemplate);
						        }

						    }
						]
					}
				],
                onOk: function () {
                    CleanFormStyle();

                    if (ValidateCkEditorField($(".entitytemplateFormAttributeSelect.cke_dialog_ui_input_select")) == false) {
                        ShowErrorMessage();
                        return false;
                    }
                    // Create a link element and an object that will store the data entered in the dialog window.
                    // http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.dom.document.html#createElement
                    var dialog = this,
                        data = {},
                        span = editor.document.createElement('span');
                    // Populate the data object with data entered in the dialog window.
                    // http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.dialog.html#commitContent
                    this.commitContent(data);

                    if (editor.config.resolveAttribute) {
                        ResolveSelectedAttribute(editor, span, data);
                    }
                    else {
                        span.setHtml('<merge-field>{{' + data.selectEntity + "." + data.selectEntityProps + "}}</merge-field>");
                        editor.insertElement(span);
                    }
                }
            };
        });
    }
});

function ResolveSelectedAttribute(editor, span, data) {
    var attribute = "{{" + data.selectEntity + "." + data.selectEntityProps + "}}";
    var cid = getParameterByName("cid");
    var params = {
        Reference: {
            Id: editor.config.entityId,
            Otc: editor.config.otc
        },
        Model: editor.config.model,
        Attribute: attribute,
    };

    (function ($) {
        $.ajax({
            url: "/api/merge/document/" + (cid ? ("?cid=" + cid) : ""),
            dataType: 'json',
            contentType: "application/json",
            type: "POST",
            data: JSON.stringify(params),
            success: function (response) {
                span.setHtml("<merge-field>" + response.Result + "</merge-field>");
                editor.insertElement(span);
            }
        });
    })(jQuery);
}

function FillPropsControl(selectedName, entitiesTemplate) {
    $.each(entitiesTemplate, function (key, val) {
        if (val.Name == selectedName) {
            val.Attributes.sortByKey("DisplayName");
            $(".entitytemplatePropsSelect").find('option').remove();
            for (var i = 0; i < val.Attributes.length; i++) {
                var attribute = val.Attributes[i];
                if (attribute.Type != 5 && (Me.PrimaryRole == 0 || attribute.Area == null || attribute.Area == Me.Area)) {
                    var value = attribute.MergeName;
                    if (!value)
                        value = attribute.LogicalName;
                    $(".entitytemplatePropsSelect select").append(
                        "<option value='" + value + "' " + (i == 0 ? 'selected' : '') + ">" + attribute.DisplayName + "</option>"
                    );
                }
            }

        }
    });
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.href);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function ValidateCkEditorField(fieldCKEditor) {
    if (fieldCKEditor[0].value.length == 0) {
        return false;
    }
}

function ShowErrorMessage() {
    if ($(".entitytemplateFormAttributeSelect.cke_dialog_ui_input_select").length > 0) {
        $(".entitytemplateFormAttributeSelect.cke_dialog_ui_input_select").css("border", "1px solid #ee0000");
        $(".entitytemplatePropsSelect.cke_dialog_ui_input_select").css("border", "1px solid #ee0000");
    }
}


function CleanFormStyle() {
    if ($(".entitytemplateFormAttributeSelect.cke_dialog_ui_input_select").length > 0) {
        $(".entitytemplateFormAttributeSelect.cke_dialog_ui_input_select").css("border", "1px solid #ddd");
        $(".entitytemplatePropsSelect.cke_dialog_ui_input_select").css("border", "1px solid #ddd");
    }
}