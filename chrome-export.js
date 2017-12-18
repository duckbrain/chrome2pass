// 1. Open chrome://settings/passwords
// 2. Open chrome developer tools (using F12 or Ctrl+Shift+i)
// 3. Run the following code in the console tab
// 4. Copy output in a text file and save it somewhere safe!

function asyncForEach(array, done, iterator) {
    var i = 0;
    next();
    function next(err) {
        if (err) {
            done(err);
        }
        else if (i >= array.length) {
            done();
        }
        else if (i < array.length) {
            var item = array[i++];
            setTimeout(function() {
                iterator(item, i - 1, next);
            }, 0);
        }
    }
}

settingsUi = $$('settings-ui');
settingsPage = Polymer.dom(settingsUi[0].shadowRoot);
container = settingsPage.querySelector('#container');
settingsPasswordsAndForms = Polymer.dom(Polymer.dom(Polymer.dom(settingsPage.querySelector('#main').shadowRoot).querySelector('settings-basic-page').shadowRoot).querySelector('settings-passwords-and-forms-page').shadowRoot);
page = settingsPasswordsAndForms.querySelector('passwords-section').shadowRoot;
passwordSection = Polymer.dom(settingsPasswordsAndForms.querySelector('#pages')).querySelector('#passwordSection');
list = Polymer.dom(page).querySelector('iron-list');
passwordItems = list.get('items');

asyncForEach(passwordItems, function () {
    console.log(JSON.stringify(passwordItems, null, 4));
	// Now you can save output in a text file!
}, function (item, index, next) {
    passwordSection.passwordManager_.getPlaintextPassword(index, function (item) {
        passwordItems[index].password = item.plaintextPassword;
        next();
    }.bind(passwordSection))
});
