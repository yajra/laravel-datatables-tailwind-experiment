/*! DataTables Tailwind CSS integration
 * Taken from https://github.com/DataTables/DataTablesSrc/blob/master/js/integration/dataTables.tailwindcss.js
 */

import $ from 'jquery';
import moment from 'moment';
import DataTable from 'datatables.net-dt';
import 'datatables.net-buttons-dt';
import 'datatables.net-select-dt';
import 'datatables.net-editor-dt';
import 'datatables.net-datetime';

window.jQuery = window.$ = $
window.moment = moment;
window.DataTable = DataTable;

/*
 * This is a tech preview of Tailwind CSS integration with DataTables.
 */

// Set the defaults for DataTables initialisation
$.extend(true, DataTable.defaults, {
    renderer: 'tailwindcss',
    layout: {
        top: 'buttons',
        topStart: 'search',
        topEnd: 'pageLength',
        bottomStart: 'info',
        bottomEnd: 'paging'
    },
});


// Default class modification
$.extend(true, DataTable.ext.classes, {
    container: "dt-container dt-tailwindcss",
    search: {
        input: "border placeholder-gray-500 ml-2 px-3 py-2 rounded-lg border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 dark:bg-gray-800 dark:border-gray-600 dark:focus:border-blue-500 dark:placeholder-gray-400"
    },
    info: {
        container: "dt-info"
    },
    length: {
        container: "dt-length",
        select: "border px-3 py-2 rounded-lg border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 dark:bg-gray-800 dark:border-gray-600 dark:focus:border-blue-500"
    },
    processing: {
        container: "dt-processing"
    },
    paging: {
        active: 'font-semibold bg-gray-100 dark:bg-gray-700/75',
        notActive: 'bg-white dark:bg-gray-800',
        button: 'relative inline-flex justify-center items-center space-x-2 border px-4 py-2 -mr-px leading-6 hover:z-10 focus:z-10 active:z-10 border-gray-200 active:border-gray-200 active:shadow-none dark:border-gray-700 dark:active:border-gray-700',
        first: 'rounded-l-lg',
        last: 'rounded-r-lg',
        enabled: 'text-gray-800 hover:text-gray-900 hover:border-gray-300 hover:shadow-sm focus:ring focus:ring-gray-300 focus:ring-opacity-25 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-200 dark:focus:ring-gray-600 dark:focus:ring-opacity-40',
        notEnabled: 'text-gray-300 dark:text-gray-600'
    },
    table: 'dataTable min-w-full text-sm align-middle whitespace-nowrap',
    thead: {
        row: 'border-b border-gray-100 dark:border-gray-700/50',
        cell: 'px-3 py-4 text-gray-900 bg-gray-100/75 font-semibold text-left dark:text-gray-50 dark:bg-gray-700/25'
    },
    tbody: {
        row: 'even:bg-gray-50 dark:even:bg-gray-900/50',
        cell: 'p-3'
    },
    tfoot: {
        row: 'even:bg-gray-50 dark:even:bg-gray-900/50',
        cell: 'p-3 text-left'
    },
});

DataTable.ext.renderer.pagingButton.tailwindcss = function (settings, buttonType, content, active, disabled) {
    let classes = settings.oClasses.paging;
    let btnClasses = [classes.button];

    btnClasses.push(active ? classes.active : classes.notActive);
    btnClasses.push(disabled ? classes.notEnabled : classes.enabled);

    let a = $('<a>', {
        'href': disabled ? null : '#',
        'class': btnClasses.join(' ')
    })
        .html(content);

    return {
        display: a,
        clicker: a
    };
};

DataTable.ext.renderer.pagingContainer.tailwindcss = function (settings, buttonEls) {
    let classes = settings.oClasses.paging;

    buttonEls[0].addClass(classes.first);
    buttonEls[buttonEls.length - 1].addClass(classes.last);

    return $('<ul/>').addClass('pagination').append(buttonEls);
};

DataTable.ext.renderer.layout.tailwindcss = function (settings, container, items) {
    let row = $('<div/>', {
        "class": items.full ?
            'grid grid-cols-1 gap-4 mb-4' :
            'grid grid-cols-2 gap-4 mb-4'
    })
        .appendTo(container);

    $.each(items, function (key, val) {
        let klass;
        let children = val.contents.length;

        // Apply start / end (left / right when ltr) margins
        if (val.table) {
            klass = 'col-span-2 overflow-x-auto';
        } else if (key === 'start') {
            klass = 'justify-self-start';
        } else if (key === 'end') {
            klass = 'col-start-2 justify-self-end';
        } else {
            klass = 'col-span-2 justify-self-end';
        }

        if (children >=2) {
            klass += ' contents';
            row.attr('class', 'flex justify-between mb-4 items-center');
        }

        $('<div/>', {
            id: val.id || null,
            "class": klass + ' flex items-center ' + (val.className || '')
        })
            .append(val.contents)
            .appendTo(row);
    });
};

/* Set the defaults for DataTables Buttons classes */
$.extend(true, DataTable.Buttons.defaults, {
    dom: {
        container: {
            className: 'dt-buttons'
        },
        button: {
            className: 'inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 transition ease-in-out duration-150'
        },
        collection: {
            tag: '',
            className: 'dt-button-collection',
            button: {
                tag: 'a',
                className: 'dt-button dropdown-item',
                active: 'active',
                disabled: 'disabled'
            }
        },
        buttonLiner: {
            tag: "",
            className: ""
        }
    }
});

/** Editor & TailwindCSS integration */
DataTable.Editor.defaults.display = "tailwindcss";

/** Editor & TailwindCSS default classes */
$.extend(true, DataTable.Editor.classes, {
    wrapper: "DTE",
    processing: {
        indicator: "DTE_Processing_Indicator",
        active: "processing"
    },
    header: {
        wrapper: "DTE_Header flex font-medium uppercase justify-between modal-header my-6 mx-6",
        content: "DTE_Header_Content",
    },
    body: {
        wrapper: "DTE_Body modal-body",
        content: "DTE_Body_Content"
    },
    footer: {
        wrapper: "DTE_Footer modal-footer bg-gray-50 px-4 py-3 sm:px-6 sm:flex dark:bg-dark_neut-800 dark:text-dark_neut-100",
        content: "DTE_Footer_Content"
    },
    form: {
        wrapper: "DTE_Form",
        content: "DTE_Form_Content mx-6 my-4 space-y-2",
        tag: "form-horizontal",
        info: "DTE_Form_Info mx-6 mb-4",
        error: "DTE_Form_Error text-red-600 text-xs block",
        buttons: "DTE_Form_Buttons flex flex-row-reverse w-full",
        button: "h-10 inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 text-base leading-6 font-medium shadow-sm transition ease-in-out duration-150 sm:text-sm sm:leading-5",
        buttonInternal: "hidden h-8 mb-2 mt-2 text-xs inline-flex items-center justify-center rounded-md border border-gray-300 px-3 py-1 leading-6 font-medium shadow-sm transition ease-in-out duration-150 sm:text-sm sm:leading-5"
    },
    field: {
        wrapper: "DTE_Field flex items-center",
        typePrefix: "DTE_Field_Type_",
        namePrefix: "DTE_Field_Name_",
        label: "w-1/5 text-sm font-medium leading-5 text-gray-700 mr-2 dark:text-dark_neut-100",
        input: "flex flex-1 flex-col dark:text-dark_neut-100",
        inputControl: "DTE_Field_InputControl w-full",
        error: "error is-invalid",
        "msg-label": "DTE_Label_Info",
        "msg-error": "text-red-600 text-xs",
        "msg-message": "text-gray-600 text-xs",
        "msg-info": "text-blue-600 text-xs",
        multiValue: "card multi-value text-xs",
        multiInfo: "small text-muted",
        multiRestore: "card multi-restore cursor-pointer py-2 underline",
        multiNoEdit: "multi-noEdit",
        disabled: "disabled",
        processing: "DTE_Processing_Indicator",
        "msg-labelInfo": "form-text text-secondary small"
    },
    actions: {
        create: "DTE_Action_Create",
        edit: "DTE_Action_Edit",
        remove: "DTE_Action_Remove"
    },
    inline: {
        wrapper: "DTE DTE_Inline",
        liner: "DTE_Inline_Field",
        buttons: "DTE_Inline_Buttons"
    },
    bubble: {
        wrapper: "DTE DTE_Bubble",
        liner: "DTE_Bubble_Liner",
        table: "DTE_Bubble_Table",
        close: "icon close",
        pointer: "DTE_Bubble_Triangle",
        bg: "DTE_Bubble_Background"
    }
});

/** Editor & TailwindCSS Buttons default classes */
$.extend(true, DataTable.ext.buttons, {
    create: {
        formButtons: {
            className: 'inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 transition ease-in-out duration-150'
        }
    },
    edit: {
        formButtons: {
            className: 'inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 transition ease-in-out duration-150'
        }
    },
    remove: {
        formButtons: {
            className: 'inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150'
        }
    }
});

/** Editor TailwindCSS modal */
DataTable.Editor.display.tailwindcss = $.extend(true, {}, DataTable.Editor.models.displayController, {
    "init": function (dte) {
        let width = dte.s.formOptions.width || 'sm:max-w-2xl';
        let conf = {
            content: $(`
                    <div class="dt-editor-modal modal fixed z-10 inset-0 overflow-y-auto">
                      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div class="fixed inset-0 transition-opacity">
                          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;

                        <div class="modal-dialog inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle ${width} sm:w-full dark:bg-dark_neut-800" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                        </div>
                      </div>
                    </div>
                `),
            close: $('<button class="btn-close px-2 font-mono text-2xl hover:font-bold absolute right-4 top-5 dark:text-dark_neut-100">&times;</div>')
                .attr('title', dte.i18n.close)
                .on('click', function () {
                    dte.close('icon');
                }),
            shown: false,
            fullyShow: false
        }

        // Add `form-input` to required elements
        dte.on('displayOrder.dte', function (e, display, action, form) {
            $.each(dte.s.fields, function (key, field) {
                $('input:not([type=checkbox]):not([type=radio]), textarea', field.node()).addClass('my-2 py-2 pl-2 block w-full border-gray-300 rounded-md focus:border-blue-50 focus:ring focus:ring-blue-200 focus:ring-opacity-50 sm:text-sm sm:leading-5 dark:bg-dark_neut-500 dark:text-dark_neut-100 dark:border-dark_neut-500');
                $('select', field.node()).addClass(' block w-full border-gray-100 rounded-md focus:border-blue-100 focus:ring focus:ring-blue-100 focus:ring-opacity-50 sm:text-sm sm:leading-5 dark:bg-dark_neut-800 dark:text-dark_neut-100 dark:border-dark_neut-500');
            });
        });

        dte._tailwindDisplay = conf;

        return DataTable.Editor.display.tailwindcss;
    },

    "open": function (dte, append, callback) {
        let conf = dte._tailwindDisplay;

        if (conf._shown) {
            // Modal already up, so just draw in the new content
            let content = conf.content.find('div.modal-dialog');
            content.children().detach();
            content.append(append);

            if (callback) {
                callback();
            }
            return;
        }

        conf.shown = true;
        conf.fullyDisplayed = false;

        let content = conf.content.find('div.modal-dialog');
        content.children().detach();
        content.append(append);

        $('div.modal-header', append).append(conf.close);

        $(conf.content).removeClass('hidden').appendTo('body')
    },

    "close": function (dte, callback) {
        let conf = dte._tailwindDisplay;

        $(conf.content).addClass('hidden')

        if (!conf.shown) {
            if (callback) {
                callback();
            }
            return;
        }

        conf.shown = false;
        conf.fullyDisplayed = false;

        if (callback) {
            callback();
        }
    },

    node: function (dte) {
        return dte._tailwindDisplay.content[0];
    }
});

export default DataTable;
