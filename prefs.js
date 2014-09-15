/* ========================================================================================================
 * prefs.js - preferences
 * ========================================================================================================
 */

const Gio = imports.gi.Gio;
const GLib = imports.gi.GLib;
const GObject = imports.gi.GObject;
const Gtk = imports.gi.Gtk;
const Lang = imports.lang;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Convenience = Me.imports.convenience;

const Gettext = imports.gettext.domain(Me.metadata['gettext-domain']);
const _ = Gettext.gettext;


const AppsMenuIconPreferencesWidget = new GObject.Class({
    Name: 'AppsMenuIcon.AppsMenuIconPreferencesWidget',
    GTypeName: 'AppsMenuIconPreferencesWidget',
    Extends: Gtk.Box,

    _init: function(params) {
        this.parent(params);
        this.settings = Convenience.getSettings('org.gnome.shell.extensions.apps-menu-icon');

		/* frame */
        let frame = new Gtk.Box({
            orientation: Gtk.Orientation.VERTICAL,
            margin_top: 15
        });

		/* switch */
        let switchBox = new Gtk.Box({
            spacing: 20,
            orientation: Gtk.Orientation.HORIZONTAL,
            homogeneous: false,
            margin_left: 20,
            margin_top: 5,
            margin_bottom: 5,
            margin_right: 10
        });
        let switchLabel = new Gtk.Label({
            label: _("Enable Extension"),
            use_markup: true,
            xalign: 0,
            hexpand: true
        });
        let switchSwitch = new Gtk.Switch ({
            halign: Gtk.Align.END
        });
		switchBox.add(switchLabel);
		switchBox.add(switchSwitch);

		/* icon image */
        let iconImageBox = new Gtk.Box({
            spacing: 20,
            orientation: Gtk.Orientation.HORIZONTAL,
            homogeneous: false,
            margin_left: 20,
            margin_top: 5,
            margin_bottom: 5,
            margin_right: 10
        });
        let iconImageLabel = new Gtk.Label({label: _("Menu Icon Image"), hexpand:true, xalign:0});
        let iconImageCombo = new Gtk.ComboBoxText({halign:Gtk.Align.END});
        iconImageCombo.set_size_request(120, -1);
        iconImageCombo.append_text(_('Debian'));
        iconImageCombo.append_text(_('Fedora'));
        iconImageCombo.append_text(_('Gentoo'));
        iconImageCombo.append_text(_('Suse'));
        iconImageCombo.append_text(_('Tux'));
        iconImageCombo.append_text(_('Ubuntu'));
        /*
        menuLayoutCombo.set_active(this.settings.get_enum('menu-layout'));
        menuLayoutCombo.connect('changed', Lang.bind (this, function(widget) {
                this.settings.set_enum('menu-layout', widget.get_active());
                let selected = widget.get_active();
                if (selected == 2) {
                    favoritesIconSizeCombo.set_active(iconSizes.indexOf(24));
                    appsListIconSizeCombo.set_active(iconSizes.indexOf(16));
                    appsGridIconSizeCombo.set_active(iconSizes.indexOf(32));
                } else if (selected == 1) {
                    favoritesIconSizeCombo.set_active(iconSizes.indexOf(32));
                    appsListIconSizeCombo.set_active(iconSizes.indexOf(24));
                    appsGridIconSizeCombo.set_active(iconSizes.indexOf(48));
                } else {
                    favoritesIconSizeCombo.set_active(iconSizes.indexOf(48));
                    appsListIconSizeCombo.set_active(iconSizes.indexOf(32));
                    appsGridIconSizeCombo.set_active(iconSizes.indexOf(64));
                }
        }));
        */
		iconImageBox.add(iconImageLabel);
		iconImageBox.add(iconImageCombo);

		/* icon size */
        let iconSizeBox = new Gtk.Box({
            spacing: 20,
            orientation: Gtk.Orientation.HORIZONTAL,
            homogeneous: false,
            margin_left: 20,
            margin_top: 5,
            margin_bottom: 5,
            margin_right: 10
        });
		let iconSizeLabel = new Gtk.Label({
			label: _("Menu Icon size [px]"), 
			use_markup: true, 
			xalign: 0,
			hexpand:true
		});
		let iconSizeSpin = new Gtk.SpinButton({
			halign:Gtk.Align.END
		});
        iconSizeSpin.set_sensitive(true);
        iconSizeSpin.set_range(10, 100);
        iconSizeSpin.set_value(24);
        /*
        iconSizeSpin.set_value(this.settings.get_double('icon-size'));
        iconSizeSpin.set_increments(1, 5);
        iconSizeSpin.connect('icon-size', Lang.bind(this, function(button){
            let s = button.get_value_as_int()/1000;
            this.settings.set_double('icon-size', s);
        }));
        */
        iconSizeBox.add(iconSizeLabel);
        iconSizeBox.add(iconSizeSpin);

		/* button width */
        let buttonWidthBox = new Gtk.Box({
            spacing: 20,
            orientation: Gtk.Orientation.HORIZONTAL,
            homogeneous: false,
            margin_left: 20,
            margin_top: 5,
            margin_bottom: 5,
            margin_right: 10
        });
		let buttonWidthLabel = new Gtk.Label({
			label: _("Menu Button width [px]"), 
			use_markup: true, 
			xalign: 0,
			hexpand:true
		});
		let buttonWidthSpin = new Gtk.SpinButton({
			halign:Gtk.Align.END
		});
        buttonWidthSpin.set_sensitive(true);
        buttonWidthSpin.set_range(10, 100);
        buttonWidthSpin.set_value(30);
		/*
            buttonWidthSpin.set_value(this.settings.get_double('button-width')*1000);
            buttonWidthSpin.set_increments(1, 5);
            buttonWidthSpin.connect('button-width', Lang.bind(this, function(button){
                let s = button.get_value_as_int()/1000;
                this.settings.set_double('button-width', s);
            }));
		*/
        buttonWidthBox.add(buttonWidthLabel);
        buttonWidthBox.add(buttonWidthSpin);

		/* frame */
        frame.add(switchBox);
        frame.add(iconImageBox);
        frame.add(iconSizeBox);
        frame.add(buttonWidthBox);
        this.add(frame);
    }
});

function init() {
    Convenience.initTranslations();
}

function buildPrefsWidget() {
    let widget = new AppsMenuIconPreferencesWidget({
        orientation: Gtk.Orientation.VERTICAL,
        spacing: 5,
        border_width: 5
    });
    widget.show_all();

    return widget;
}


