"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Cards =
/*#__PURE__*/
function () {
  function Cards(el) {
    _classCallCheck(this, Cards);

    if (!this._isElement(el)) {
      throw new Error('Cards must be initialize on an HTMLDomElement.');
    }

    this._ref = el;
    this._length = 0;
    this._selected = null;
    var that = this;
    el.addEventListener('click', function () {
      that._cancelSelect();
    });
  }

  _createClass(Cards, [{
    key: "addChild",
    value: function addChild() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this._updateLength();

      options = Object.assign({
        type: 'default',
        // 'default', 'primary', 'warning', 'error'
        title: 'Card',
        disconnected: undefined,
        contact: '小张',
        bodyTitle: '上月用电量',
        bodyTitle2: null,
        footTitle: '剩余电量',
        bodyData: '0.00',
        bodyData2: null,
        footData: '0.00',
        unit: 'kWh',
        link: null,
        key: 'key'
      }, options);
      var types = ['default', 'primary', 'warning', 'error'];

      if (types.indexOf(options.type) === -1) {
        throw new Error('Card type should be among "default", "primary", "warning", "error".');
      }

      var index = this._length / 5 | 0;

      var row = this._ref.querySelectorAll('.card-row').item(index);

      if (!row) {
        var newRow = document.createElement('div');
        newRow.className = 'card-row';

        this._ref.appendChild(newRow);

        row = this._ref.querySelectorAll('.card-row').item(index);
      }

      var col = document.createElement('div');
      col.className = 'card-col';
      col.setAttribute('data-index', this._length);
      var section = document.createElement('section');
      section.className = options.type;
      section.setAttribute('data-key', options.key);
      var bodyRow2 = "\n      <tr>\n        <th>".concat(options.bodyTitle2, "</th>\n        <td>\n            ").concat(options.bodyData2, " <small>").concat(options.unit, "</small>\n        </td>\n      </tr>\n    ");
      var svg = "\n      <svg class=\"icon ".concat(options.disconnected ? 'disconn' : 'conn', "\" aria-hidden=\"true\">\n        <use xlink:href=\"").concat(options.disconnected ? '#icondisconn1' : '#iconconn1', "\"></use>\n      </svg>\n    ");
      section.innerHTML = "\n      <header>\n        <div title=\"".concat(options.title, "\">\n          ").concat(options.title, "\n        </div>\n        ").concat(typeof options.disconnected === 'undefined' ? '' : svg, "\n      </header>\n      <div class=\"body\">\n        <table>\n          <tbody>\n            <tr>\n              <th>\u8054\u7CFB\u4EBA</th>\n              <td>").concat(options.contact, "</td>\n            </tr>\n            <tr>\n              <th>").concat(options.bodyTitle, "</th>\n              <td>\n                  <a>\n                    ").concat(options.bodyData, " <small>").concat(options.unit, "</small>\n                  </a>\n              </td>\n            </tr>\n            ").concat(options.bodyTitle2 ? bodyRow2 : '', "\n            <tr>\n              <th>").concat(options.footTitle, "</th>\n              <td class=\"data\">").concat(options.footData, " <small>").concat(options.unit, "</small></td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n    ");
      var that = this;
      section.addEventListener('click', function (e) {
        that._onClick(this, that, e);
      });
      var a = section.querySelector('.body a');
      a.addEventListener('click', function () {
        var link = options.link;
        typeof link === 'function' && link(options.key);
      });
      col.appendChild(section);
      row.appendChild(col);

      this._updateLength();

      return this;
    }
  }, {
    key: "queryChild",
    value: function queryChild(query) {
      if (typeof query === 'number') {
        return this._ref.querySelector("div[data-index=".concat(query, "]"));
      } else if (typeof query === 'string') {
        return this._ref.querySelectorAll(query);
      } else {
        throw new Error('queryChild() accept index|queryString');
      }
    }
  }, {
    key: "_onClick",
    value: function _onClick(section, cards, e) {
      cards._cancelSelect();

      section.className += ' selected';
      cards._selected = section.getAttribute('data-key');
      e.stopPropagation();
    }
  }, {
    key: "_cancelSelect",
    value: function _cancelSelect() {
      this._ref.querySelectorAll('section.selected').forEach(function (cur) {
        cur.className = cur.className.replace(/\s*selected\s*/g, ' ');
      });

      this._selected = null;
    }
  }, {
    key: "_updateLength",
    value: function _updateLength() {
      this._length = this._ref.querySelectorAll('.card-col section').length;
    }
  }, {
    key: "_isElement",
    value: function _isElement(obj) {
      if (obj && obj.nodeType === 1) {
        if (window.Node && obj instanceof Node) {
          return true;
        }

        try {
          var testDiv = document.createElement('div');
          testDiv.appendChild(obj);
          testDiv.removeChild(obj);
        } catch (e) {
          return false;
        }

        return true;
      }

      return false;
    }
  }, {
    key: "length",
    get: function get() {
      return this._length;
    },
    set: function set(cn) {
      throw new Error('You shouldn\'t set length manually.');
    }
  }, {
    key: "selected",
    get: function get() {
      return this._selected;
    },
    set: function set(cn) {
      throw new Error('You shouldn\'t set selected manually.');
    }
  }]);

  return Cards;
}();