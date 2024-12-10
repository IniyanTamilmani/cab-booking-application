'use strict';

define('cab-booking-application/tests/app.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | app');

  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });

  QUnit.test('components/auth-links.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/auth-links.js should pass ESLint\n\n');
  });

  QUnit.test('components/cab-form-input.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/cab-form-input.js should pass ESLint\n\n');
  });

  QUnit.test('components/confirm-dialog.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/confirm-dialog.js should pass ESLint\n\n');
  });

  QUnit.test('components/data-table.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/data-table.js should pass ESLint\n\n');
  });

  QUnit.test('components/driver-form.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/driver-form.js should pass ESLint\n\n83:33 - \'response\' is defined but never used. (no-unused-vars)');
  });

  QUnit.test('components/dynamic-action-table.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/dynamic-action-table.js should pass ESLint\n\n');
  });

  QUnit.test('components/edit-action-table.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/edit-action-table.js should pass ESLint\n\n');
  });

  QUnit.test('components/fixed-action-table.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/fixed-action-table.js should pass ESLint\n\n');
  });

  QUnit.test('components/nav-bar.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/nav-bar.js should pass ESLint\n\n');
  });

  QUnit.test('components/side-bar.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/side-bar.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/booking.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/booking.js should pass ESLint\n\n27:37 - \'response\' is defined but never used. (no-unused-vars)\n90:33 - \'response\' is defined but never used. (no-unused-vars)');
  });

  QUnit.test('controllers/companies.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/companies.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/companies/details.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/companies/details.js should pass ESLint\n\n15:37 - \'response\' is defined but never used. (no-unused-vars)');
  });

  QUnit.test('controllers/companies/drivers.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/companies/drivers.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/companies/fares.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/companies/fares.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/companies/index.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/companies/index.js should pass ESLint\n\n31:37 - \'response\' is defined but never used. (no-unused-vars)\n50:37 - \'response\' is defined but never used. (no-unused-vars)\n62:17 - \'userId\' is assigned a value but never used. (no-unused-vars)\n70:37 - \'response\' is defined but never used. (no-unused-vars)\n94:37 - \'response\' is defined but never used. (no-unused-vars)');
  });

  QUnit.test('controllers/companies/users.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/companies/users.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/drivers.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/drivers.js should pass ESLint\n\n54:25 - \'response\' is defined but never used. (no-unused-vars)\n57:26 - \'error\' is defined but never used. (no-unused-vars)\n76:27 - \'response\' is defined but never used. (no-unused-vars)\n100:27 - \'response\' is defined but never used. (no-unused-vars)');
  });

  QUnit.test('controllers/history.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/history.js should pass ESLint\n\n52:37 - \'response\' is defined but never used. (no-unused-vars)');
  });

  QUnit.test('controllers/index.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/index.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/login.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/login.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/profile.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/profile.js should pass ESLint\n\n15:23 - \'details\' is defined but never used. (no-unused-vars)\n35:51 - Unnecessary semicolon. (no-extra-semi)');
  });

  QUnit.test('controllers/register.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/register.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/signup.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/signup.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/users.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/users.js should pass ESLint\n\n34:17 - \'userId\' is assigned a value but never used. (no-unused-vars)\n86:37 - \'response\' is defined but never used. (no-unused-vars)');
  });

  QUnit.test('helpers/and.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/and.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/eq.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/eq.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/gt.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/gt.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/if-else.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/if-else.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/is-empty-object.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/is-empty-object.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/is-not-null.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/is-not-null.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/is-null.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/is-null.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/join-strings.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/join-strings.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/not-equal.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/not-equal.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/report-driver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/report-driver.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/report-user.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/report-user.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/to-array.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/to-array.js should pass ESLint\n\n');
  });

  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });

  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });

  QUnit.test('routes/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/application.js should pass ESLint\n\n');
  });

  QUnit.test('routes/booking.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/booking.js should pass ESLint\n\n17:20 - \'Promise\' is not defined. (no-undef)\n17:38 - \'reject\' is defined but never used. (no-unused-vars)\n20:17 - \'self\' is assigned a value but never used. (no-unused-vars)');
  });

  QUnit.test('routes/companies.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/companies.js should pass ESLint\n\n');
  });

  QUnit.test('routes/companies/details.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/companies/details.js should pass ESLint\n\n6:15 - \'transition\' is defined but never used. (no-unused-vars)\n18:16 - \'Promise\' is not defined. (no-undef)\n18:34 - \'reject\' is defined but never used. (no-unused-vars)\n19:11 - \'companyId\' is assigned a value but never used. (no-unused-vars)\n20:11 - \'self\' is assigned a value but never used. (no-unused-vars)');
  });

  QUnit.test('routes/companies/drivers.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/companies/drivers.js should pass ESLint\n\n7:15 - \'transition\' is defined but never used. (no-unused-vars)\n20:20 - \'Promise\' is not defined. (no-undef)\n20:38 - \'reject\' is defined but never used. (no-unused-vars)');
  });

  QUnit.test('routes/companies/fares.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/companies/fares.js should pass ESLint\n\n6:15 - \'transition\' is defined but never used. (no-unused-vars)\n18:16 - \'Promise\' is not defined. (no-undef)\n18:34 - \'reject\' is defined but never used. (no-unused-vars)\n20:11 - \'self\' is assigned a value but never used. (no-unused-vars)');
  });

  QUnit.test('routes/companies/index.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/companies/index.js should pass ESLint\n\n7:15 - \'transition\' is defined but never used. (no-unused-vars)\n20:16 - \'Promise\' is not defined. (no-undef)\n20:34 - \'reject\' is defined but never used. (no-unused-vars)\n23:11 - \'self\' is assigned a value but never used. (no-unused-vars)');
  });

  QUnit.test('routes/companies/users.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/companies/users.js should pass ESLint\n\n5:15 - \'transition\' is defined but never used. (no-unused-vars)\n17:16 - \'Promise\' is not defined. (no-undef)\n17:34 - \'reject\' is defined but never used. (no-unused-vars)');
  });

  QUnit.test('routes/drivers.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/drivers.js should pass ESLint\n\n22:16 - \'Promise\' is not defined. (no-undef)\n22:34 - \'reject\' is defined but never used. (no-unused-vars)\n26:11 - \'self\' is assigned a value but never used. (no-unused-vars)');
  });

  QUnit.test('routes/history.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/history.js should pass ESLint\n\n7:17 - \'transition\' is defined but never used. (no-unused-vars)\n18:20 - \'Promise\' is not defined. (no-undef)\n18:38 - \'reject\' is defined but never used. (no-unused-vars)\n48:21 - \'userId\' is assigned a value but never used. (no-unused-vars)\n50:21 - \'cabId\' is assigned a value but never used. (no-unused-vars)');
  });

  QUnit.test('routes/index.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/index.js should pass ESLint\n\n7:17 - \'transition\' is defined but never used. (no-unused-vars)\n31:25 - \'resolve\' is not defined. (no-undef)');
  });

  QUnit.test('routes/login.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/login.js should pass ESLint\n\n');
  });

  QUnit.test('routes/not-found.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/not-found.js should pass ESLint\n\n');
  });

  QUnit.test('routes/profile.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/profile.js should pass ESLint\n\n6:17 - \'transition\' is defined but never used. (no-unused-vars)\n16:20 - \'Promise\' is not defined. (no-undef)\n16:38 - \'reject\' is defined but never used. (no-unused-vars)');
  });

  QUnit.test('routes/register.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/register.js should pass ESLint\n\n6:17 - \'transition\' is defined but never used. (no-unused-vars)');
  });

  QUnit.test('routes/signup.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/signup.js should pass ESLint\n\n6:17 - \'transition\' is defined but never used. (no-unused-vars)\n29:21 - \'resolve\' is not defined. (no-undef)');
  });

  QUnit.test('routes/users.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/users.js should pass ESLint\n\n');
  });

  QUnit.test('services/alert.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'services/alert.js should pass ESLint\n\n13:16 - \'Promise\' is not defined. (no-undef)');
  });

  QUnit.test('services/current-role.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/current-role.js should pass ESLint\n\n');
  });

  QUnit.test('services/current-route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/current-route.js should pass ESLint\n\n');
  });

  QUnit.test('utils/api-request.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'utils/api-request.js should pass ESLint\n\n15:10 - \'$\' is not defined. (no-undef)\n20:26 - \'error\' is defined but never used. (no-unused-vars)\n26:13 - \'Ember\' is not defined. (no-undef)\n36:14 - \'Promise\' is not defined. (no-undef)');
  });

  QUnit.test('utils/logout.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'utils/logout.js should pass ESLint\n\n10:21 - \'response\' is defined but never used. (no-unused-vars)\n12:7 - \'Ember\' is not defined. (no-undef)');
  });

  QUnit.test('utils/validate-email.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'utils/validate-email.js should pass ESLint\n\n');
  });

  QUnit.test('utils/validate-password.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'utils/validate-password.js should pass ESLint\n\n');
  });

  QUnit.test('utils/validate-phone-number.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'utils/validate-phone-number.js should pass ESLint\n\n');
  });
});
define('cab-booking-application/tests/helpers/destroy-app', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = destroyApp;
  function destroyApp(application) {
    Ember.run(application, 'destroy');
  }
});
define('cab-booking-application/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'cab-booking-application/tests/helpers/start-app', 'cab-booking-application/tests/helpers/destroy-app'], function (exports, _qunit, _startApp, _destroyApp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (name) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _startApp.default)();

        if (options.beforeEach) {
          return options.beforeEach.apply(this, arguments);
        }
      },
      afterEach: function afterEach() {
        var _this = this;

        var afterEach = options.afterEach && options.afterEach.apply(this, arguments);
        return resolve(afterEach).then(function () {
          return (0, _destroyApp.default)(_this.application);
        });
      }
    });
  };

  var resolve = Ember.RSVP.resolve;
});
define('cab-booking-application/tests/helpers/resolver', ['exports', 'cab-booking-application/resolver', 'cab-booking-application/config/environment'], function (exports, _resolver, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var resolver = _resolver.default.create();

  resolver.namespace = {
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix
  };

  exports.default = resolver;
});
define('cab-booking-application/tests/helpers/start-app', ['exports', 'cab-booking-application/app', 'cab-booking-application/config/environment'], function (exports, _app, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = startApp;
  function startApp(attrs) {
    var attributes = Ember.merge({}, _environment.default.APP);
    attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

    return Ember.run(function () {
      var application = _app.default.create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
      return application;
    });
  }
});
define('cab-booking-application/tests/integration/components/auth-links-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('auth-links', 'Integration | Component | auth links', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "HsQTBzfV",
      "block": "{\"statements\":[[1,[26,[\"auth-links\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "BbMKTTRW",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"auth-links\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('cab-booking-application/tests/integration/components/cab-form-input-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('cab-form-input', 'Integration | Component | cab form input', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "zOFeaiA9",
      "block": "{\"statements\":[[1,[26,[\"cab-form-input\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "G+BdWwCf",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"cab-form-input\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('cab-booking-application/tests/integration/components/confirm-dialog-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('confirm-dialog', 'Integration | Component | confirm dialog', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "tJPeyAKP",
      "block": "{\"statements\":[[1,[26,[\"confirm-dialog\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "NKj0B7QC",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"confirm-dialog\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('cab-booking-application/tests/integration/components/data-table-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('data-table', 'Integration | Component | data table', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "dnnCOgdG",
      "block": "{\"statements\":[[1,[26,[\"data-table\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "9BOAW7gm",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"data-table\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('cab-booking-application/tests/integration/components/driver-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('driver-form', 'Integration | Component | driver form', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "AhIIliAn",
      "block": "{\"statements\":[[1,[26,[\"driver-form\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "1Si6G+Wg",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"driver-form\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('cab-booking-application/tests/integration/components/dynamic-action-table-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('dynamic-action-table', 'Integration | Component | dynamic action table', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "AGn5mIzM",
      "block": "{\"statements\":[[1,[26,[\"dynamic-action-table\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "l3ab+81m",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"dynamic-action-table\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('cab-booking-application/tests/integration/components/edit-action-table-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('edit-action-table', 'Integration | Component | edit action table', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "zyc3p3T+",
      "block": "{\"statements\":[[1,[26,[\"edit-action-table\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "yKi9arjb",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"edit-action-table\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('cab-booking-application/tests/integration/components/fixed-action-table-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('fixed-action-table', 'Integration | Component | fixed action table', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "W+MfL299",
      "block": "{\"statements\":[[1,[26,[\"fixed-action-table\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "cecEuBO9",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"fixed-action-table\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('cab-booking-application/tests/integration/components/history-row-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('history-row', 'Integration | Component | history row', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "2011ezhb",
      "block": "{\"statements\":[[1,[26,[\"history-row\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "kxMLzsw+",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"history-row\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('cab-booking-application/tests/integration/components/left-nav-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('left-nav', 'Integration | Component | left nav', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "78GkmO4Q",
      "block": "{\"statements\":[[1,[26,[\"left-nav\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "yb8HvKMx",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"left-nav\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('cab-booking-application/tests/integration/components/left-side-nav-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('left-side-nav', 'Integration | Component | left side nav', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "oMNNgdF2",
      "block": "{\"statements\":[[1,[26,[\"left-side-nav\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "PrWhemMz",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"left-side-nav\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('cab-booking-application/tests/integration/components/nav-bar-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('nav-bar', 'Integration | Component | nav bar', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "ntAlUnVm",
      "block": "{\"statements\":[[1,[26,[\"nav-bar\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "UKwhv7kh",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"nav-bar\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('cab-booking-application/tests/integration/components/side-bar-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('side-bar', 'Integration | Component | side bar', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "xnoP9jrK",
      "block": "{\"statements\":[[1,[26,[\"side-bar\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "YG31HFCn",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"side-bar\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('cab-booking-application/tests/integration/components/top-nav-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('top-nav', 'Integration | Component | top nav', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "k/6vg9Fy",
      "block": "{\"statements\":[[1,[26,[\"top-nav\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "ePBRzMHV",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"top-nav\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('cab-booking-application/tests/integration/helpers/and-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('and', 'helper:and', {
    integration: true
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it renders', function (assert) {
    this.set('inputValue', '1234');

    this.render(Ember.HTMLBars.template({
      "id": "etSau6Tt",
      "block": "{\"statements\":[[1,[33,[\"and\"],[[28,[\"inputValue\"]]],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '1234');
  });
});
define('cab-booking-application/tests/integration/helpers/eq-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('eq', 'helper:eq', {
    integration: true
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it renders', function (assert) {
    this.set('inputValue', '1234');

    this.render(Ember.HTMLBars.template({
      "id": "1SYOrDlN",
      "block": "{\"statements\":[[1,[33,[\"eq\"],[[28,[\"inputValue\"]]],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '1234');
  });
});
define('cab-booking-application/tests/integration/helpers/equal-to-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('equal-to', 'helper:equal-to', {
    integration: true
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it renders', function (assert) {
    this.set('inputValue', '1234');

    this.render(Ember.HTMLBars.template({
      "id": "Yfcj4UZ/",
      "block": "{\"statements\":[[1,[33,[\"equal-to\"],[[28,[\"inputValue\"]]],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '1234');
  });
});
define('cab-booking-application/tests/integration/helpers/greater-than-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('greater-than', 'helper:greater-than', {
    integration: true
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it renders', function (assert) {
    this.set('inputValue', '1234');

    this.render(Ember.HTMLBars.template({
      "id": "nr2xfcSF",
      "block": "{\"statements\":[[1,[33,[\"greater-than\"],[[28,[\"inputValue\"]]],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '1234');
  });
});
define('cab-booking-application/tests/integration/helpers/gt-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('gt', 'helper:gt', {
    integration: true
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it renders', function (assert) {
    this.set('inputValue', '1234');

    this.render(Ember.HTMLBars.template({
      "id": "06IyGDRK",
      "block": "{\"statements\":[[1,[33,[\"gt\"],[[28,[\"inputValue\"]]],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '1234');
  });
});
define('cab-booking-application/tests/integration/helpers/if-else-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('if-else', 'helper:if-else', {
    integration: true
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it renders', function (assert) {
    this.set('inputValue', '1234');

    this.render(Ember.HTMLBars.template({
      "id": "QKRUi4eX",
      "block": "{\"statements\":[[1,[33,[\"if-else\"],[[28,[\"inputValue\"]]],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '1234');
  });
});
define('cab-booking-application/tests/integration/helpers/is-empty-object-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('is-empty-object', 'helper:is-empty-object', {
    integration: true
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it renders', function (assert) {
    this.set('inputValue', '1234');

    this.render(Ember.HTMLBars.template({
      "id": "7HrxTFIC",
      "block": "{\"statements\":[[1,[33,[\"is-empty-object\"],[[28,[\"inputValue\"]]],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '1234');
  });
});
define('cab-booking-application/tests/integration/helpers/is-not-null-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('is-not-null', 'helper:is-not-null', {
    integration: true
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it renders', function (assert) {
    this.set('inputValue', '1234');

    this.render(Ember.HTMLBars.template({
      "id": "awUJx/1w",
      "block": "{\"statements\":[[1,[33,[\"is-not-null\"],[[28,[\"inputValue\"]]],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '1234');
  });
});
define('cab-booking-application/tests/integration/helpers/is-null-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('is-null', 'helper:is-null', {
    integration: true
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it renders', function (assert) {
    this.set('inputValue', '1234');

    this.render(Ember.HTMLBars.template({
      "id": "2Bsr2cEp",
      "block": "{\"statements\":[[1,[33,[\"is-null\"],[[28,[\"inputValue\"]]],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '1234');
  });
});
define('cab-booking-application/tests/integration/helpers/join-strings-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('join-strings', 'helper:join-strings', {
    integration: true
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it renders', function (assert) {
    this.set('inputValue', '1234');

    this.render(Ember.HTMLBars.template({
      "id": "8MandR7N",
      "block": "{\"statements\":[[1,[33,[\"join-strings\"],[[28,[\"inputValue\"]]],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '1234');
  });
});
define('cab-booking-application/tests/integration/helpers/not-equal-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('not-equal', 'helper:not-equal', {
    integration: true
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it renders', function (assert) {
    this.set('inputValue', '1234');

    this.render(Ember.HTMLBars.template({
      "id": "B2bFh99Z",
      "block": "{\"statements\":[[1,[33,[\"not-equal\"],[[28,[\"inputValue\"]]],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '1234');
  });
});
define('cab-booking-application/tests/integration/helpers/report-driver-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('report-driver', 'helper:report-driver', {
    integration: true
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it renders', function (assert) {
    this.set('inputValue', '1234');

    this.render(Ember.HTMLBars.template({
      "id": "naWyoYSQ",
      "block": "{\"statements\":[[1,[33,[\"report-driver\"],[[28,[\"inputValue\"]]],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '1234');
  });
});
define('cab-booking-application/tests/integration/helpers/report-user-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('report-user', 'helper:report-user', {
    integration: true
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it renders', function (assert) {
    this.set('inputValue', '1234');

    this.render(Ember.HTMLBars.template({
      "id": "DJvtu5Z/",
      "block": "{\"statements\":[[1,[33,[\"report-user\"],[[28,[\"inputValue\"]]],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '1234');
  });
});
define('cab-booking-application/tests/integration/helpers/to-array-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('to-array', 'helper:to-array', {
    integration: true
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it renders', function (assert) {
    this.set('inputValue', '1234');

    this.render(Ember.HTMLBars.template({
      "id": "2trnR6rU",
      "block": "{\"statements\":[[1,[33,[\"to-array\"],[[28,[\"inputValue\"]]],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '1234');
  });
});
define('cab-booking-application/tests/test-helper', ['cab-booking-application/tests/helpers/resolver', 'ember-qunit', 'ember-cli-qunit'], function (_resolver, _emberQunit, _emberCliQunit) {
  'use strict';

  (0, _emberQunit.setResolver)(_resolver.default);
  (0, _emberCliQunit.start)();
});
define('cab-booking-application/tests/tests.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | tests');

  QUnit.test('helpers/destroy-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/module-for-acceptance.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/start-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/auth-links-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/auth-links-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/cab-form-input-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/cab-form-input-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/confirm-dialog-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/confirm-dialog-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/data-table-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/data-table-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/driver-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/driver-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/dynamic-action-table-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/dynamic-action-table-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/edit-action-table-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/edit-action-table-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/fixed-action-table-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/fixed-action-table-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/history-row-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/history-row-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/left-nav-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/left-nav-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/left-side-nav-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/left-side-nav-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/nav-bar-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/nav-bar-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/side-bar-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/side-bar-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/top-nav-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/top-nav-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/helpers/and-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/and-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/helpers/eq-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/eq-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/helpers/equal-to-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/equal-to-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/helpers/greater-than-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/greater-than-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/helpers/gt-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/gt-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/helpers/if-else-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/if-else-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/helpers/is-empty-object-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/is-empty-object-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/helpers/is-not-null-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/is-not-null-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/helpers/is-null-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/is-null-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/helpers/join-strings-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/join-strings-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/helpers/not-equal-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/not-equal-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/helpers/report-driver-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/report-driver-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/helpers/report-user-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/report-user-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/helpers/to-array-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/to-array-test.js should pass ESLint\n\n');
  });

  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/booking-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/booking-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/companies-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/companies-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/companies/details-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/companies/details-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/companies/drivers-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/companies/drivers-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/companies/fares-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/companies/fares-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/companies/index-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/companies/index-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/companies/users-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/companies/users-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/drivers-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/drivers-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/drivers/bookings-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/drivers/bookings-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/drivers/history-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/drivers/history-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/history-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/history-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/index-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/index-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/login-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/login-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/logout-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/logout-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/profile-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/profile-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/register-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/register-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/signup-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/signup-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/sigup-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/sigup-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/users-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/users-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/users/availablecabs-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/users/availablecabs-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/users/booking-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/users/booking-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/users/history-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/users/history-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/users/index-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/users/index-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/users/userupgradation-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/users/userupgradation-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/booking-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/booking-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/companies-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/companies-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/companies/details-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/companies/details-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/companies/drivers-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/companies/drivers-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/companies/fares-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/companies/fares-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/companies/index-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/companies/index-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/companies/users-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/companies/users-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/drivers-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/drivers-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/drivers/bookings-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/drivers/bookings-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/drivers/error-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/drivers/error-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/drivers/history-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/drivers/history-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/drivers/index-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/drivers/index-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/error-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/error-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/history-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/history-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/index-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/index-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/login-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/login-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/not-found-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/not-found-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/profile-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/profile-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/register-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/register-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/signup-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/signup-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/users-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/users-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/users/availablecabs-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/users/availablecabs-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/users/booking-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/users/booking-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/users/error-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/users/error-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/users/history-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/users/history-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/users/index-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/users/index-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/users/rides-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/users/rides-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/users/userupgradation-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/users/userupgradation-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/services/alert-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/alert-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/services/current-role-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/current-role-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/services/current-route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/current-route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/utils/api-request-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/utils/api-request-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/utils/logout-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/utils/logout-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/utils/validate-email-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/utils/validate-email-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/utils/validate-password-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/utils/validate-password-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/utils/validate-phone-number-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/utils/validate-phone-number-test.js should pass ESLint\n\n');
  });
});
define('cab-booking-application/tests/unit/controllers/booking-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:booking', 'Unit | Controller | booking', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('cab-booking-application/tests/unit/controllers/companies-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:companies', 'Unit | Controller | companies', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('cab-booking-application/tests/unit/controllers/companies/details-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:companies/details', 'Unit | Controller | companies/details', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('cab-booking-application/tests/unit/controllers/companies/drivers-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:companies/drivers', 'Unit | Controller | companies/drivers', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('cab-booking-application/tests/unit/controllers/companies/fares-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:companies/fares', 'Unit | Controller | companies/fares', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('cab-booking-application/tests/unit/controllers/companies/index-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:companies/index', 'Unit | Controller | companies/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('cab-booking-application/tests/unit/controllers/companies/users-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:companies/users', 'Unit | Controller | companies/users', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('cab-booking-application/tests/unit/controllers/drivers-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:drivers', 'Unit | Controller | drivers', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('cab-booking-application/tests/unit/controllers/drivers/bookings-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:drivers/bookings', 'Unit | Controller | drivers/bookings', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('cab-booking-application/tests/unit/controllers/drivers/history-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:drivers/history', 'Unit | Controller | drivers/history', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('cab-booking-application/tests/unit/controllers/history-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:history', 'Unit | Controller | history', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('cab-booking-application/tests/unit/controllers/index-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:index', 'Unit | Controller | index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('cab-booking-application/tests/unit/controllers/login-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:login', 'Unit | Controller | login', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('cab-booking-application/tests/unit/controllers/logout-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:logout', 'Unit | Controller | logout', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('cab-booking-application/tests/unit/controllers/profile-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:profile', 'Unit | Controller | profile', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('cab-booking-application/tests/unit/controllers/register-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:register', 'Unit | Controller | register', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('cab-booking-application/tests/unit/controllers/signup-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:signup', 'Unit | Controller | signup', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('cab-booking-application/tests/unit/controllers/sigup-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:sigup', 'Unit | Controller | sigup', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('cab-booking-application/tests/unit/controllers/users-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:users', 'Unit | Controller | users', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('cab-booking-application/tests/unit/controllers/users/availablecabs-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:users/availablecabs', 'Unit | Controller | users/availablecabs', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('cab-booking-application/tests/unit/controllers/users/booking-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:users/booking', 'Unit | Controller | users/booking', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('cab-booking-application/tests/unit/controllers/users/history-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:users/history', 'Unit | Controller | users/history', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('cab-booking-application/tests/unit/controllers/users/index-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:users/index', 'Unit | Controller | users/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('cab-booking-application/tests/unit/controllers/users/userupgradation-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:users/userupgradation', 'Unit | Controller | users/userupgradation', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('cab-booking-application/tests/unit/routes/booking-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:booking', 'Unit | Route | booking', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('cab-booking-application/tests/unit/routes/companies-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:companies', 'Unit | Route | companies', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('cab-booking-application/tests/unit/routes/companies/details-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:companies/details', 'Unit | Route | companies/details', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('cab-booking-application/tests/unit/routes/companies/drivers-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:companies/drivers', 'Unit | Route | companies/drivers', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('cab-booking-application/tests/unit/routes/companies/fares-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:companies/fares', 'Unit | Route | companies/fares', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('cab-booking-application/tests/unit/routes/companies/index-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:companies/index', 'Unit | Route | companies/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('cab-booking-application/tests/unit/routes/companies/users-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:companies/users', 'Unit | Route | companies/users', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('cab-booking-application/tests/unit/routes/drivers-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:drivers', 'Unit | Route | drivers', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('cab-booking-application/tests/unit/routes/drivers/bookings-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:drivers/bookings', 'Unit | Route | drivers/bookings', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('cab-booking-application/tests/unit/routes/drivers/error-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:drivers/error', 'Unit | Route | drivers/error', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('cab-booking-application/tests/unit/routes/drivers/history-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:drivers/history', 'Unit | Route | drivers/history', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('cab-booking-application/tests/unit/routes/drivers/index-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:drivers/index', 'Unit | Route | drivers/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('cab-booking-application/tests/unit/routes/error-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:error', 'Unit | Route | error', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('cab-booking-application/tests/unit/routes/history-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:history', 'Unit | Route | history', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('cab-booking-application/tests/unit/routes/index-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:index', 'Unit | Route | index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('cab-booking-application/tests/unit/routes/login-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:login', 'Unit | Route | login', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('cab-booking-application/tests/unit/routes/not-found-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:not-found', 'Unit | Route | not found', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('cab-booking-application/tests/unit/routes/profile-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:profile', 'Unit | Route | profile', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('cab-booking-application/tests/unit/routes/register-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:register', 'Unit | Route | register', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('cab-booking-application/tests/unit/routes/signup-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:signup', 'Unit | Route | signup', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('cab-booking-application/tests/unit/routes/users-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:users', 'Unit | Route | users', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('cab-booking-application/tests/unit/routes/users/availablecabs-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:users/availablecabs', 'Unit | Route | users/availablecabs', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('cab-booking-application/tests/unit/routes/users/booking-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:users/booking', 'Unit | Route | users/booking', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('cab-booking-application/tests/unit/routes/users/error-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:users/error', 'Unit | Route | users/error', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('cab-booking-application/tests/unit/routes/users/history-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:users/history', 'Unit | Route | users/history', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('cab-booking-application/tests/unit/routes/users/index-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:users/index', 'Unit | Route | users/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('cab-booking-application/tests/unit/routes/users/rides-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:users/rides', 'Unit | Route | users/rides', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('cab-booking-application/tests/unit/routes/users/userupgradation-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:users/userupgradation', 'Unit | Route | users/userupgradation', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('cab-booking-application/tests/unit/services/alert-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('service:alert', 'Unit | Service | alert', {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var service = this.subject();
    assert.ok(service);
  });
});
define('cab-booking-application/tests/unit/services/current-role-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('service:current-role', 'Unit | Service | current role', {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var service = this.subject();
    assert.ok(service);
  });
});
define('cab-booking-application/tests/unit/services/current-route-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('service:current-route', 'Unit | Service | current route', {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var service = this.subject();
    assert.ok(service);
  });
});
define('cab-booking-application/tests/unit/utils/api-request-test', ['cab-booking-application/utils/api-request', 'qunit'], function (_apiRequest, _qunit) {
  'use strict';

  (0, _qunit.module)('Unit | Utility | api request');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    var result = (0, _apiRequest.default)();
    assert.ok(result);
  });
});
define('cab-booking-application/tests/unit/utils/logout-test', ['cab-booking-application/utils/logout', 'qunit'], function (_logout, _qunit) {
  'use strict';

  (0, _qunit.module)('Unit | Utility | logout');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    var result = (0, _logout.default)();
    assert.ok(result);
  });
});
define('cab-booking-application/tests/unit/utils/validate-email-test', ['cab-booking-application/utils/validate-email', 'qunit'], function (_validateEmail, _qunit) {
  'use strict';

  (0, _qunit.module)('Unit | Utility | validate email');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    var result = (0, _validateEmail.default)();
    assert.ok(result);
  });
});
define('cab-booking-application/tests/unit/utils/validate-password-test', ['cab-booking-application/utils/validate-password', 'qunit'], function (_validatePassword, _qunit) {
  'use strict';

  (0, _qunit.module)('Unit | Utility | validate password');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    var result = (0, _validatePassword.default)();
    assert.ok(result);
  });
});
define('cab-booking-application/tests/unit/utils/validate-phone-number-test', ['cab-booking-application/utils/validate-phone-number', 'qunit'], function (_validatePhoneNumber, _qunit) {
  'use strict';

  (0, _qunit.module)('Unit | Utility | validate phone number');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    var result = (0, _validatePhoneNumber.default)();
    assert.ok(result);
  });
});
require('cab-booking-application/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
