"use strict";

sap.ui.define(["sap/ui/base/ManagedObject", "sap/base/Log", "sap/m/MessageBox", "sap/ui/base/ObjectPool", "sap/ui/base/Event"], function (ManagedObject, Log, MessageBox, ObjectPool, Event) {
  "use strict";

  /**
   * @namespace cc.spreadsheetimporter.v1_1_1
   */
  const Util = ManagedObject.extend("cc.spreadsheetimporter.v1_1_1.Util", {
    constructor: function _constructor(resourceBundle) {
      ManagedObject.prototype.constructor.call(this);
      this.resourceBundle = resourceBundle;
    },
    geti18nText: function _geti18nText(text, array) {
      return this.resourceBundle.getText(text, array);
    }
  });
  Util.getValueFromRow = function getValueFromRow(row, label, type, fieldMatchType) {
    let value;
    if (fieldMatchType === "label") {
      value = row[label];
    }
    if (fieldMatchType === "labelTypeBrackets") {
      try {
        value = Object.entries(row).find(_ref => {
          let [key] = _ref;
          return key.includes(`[${type}]`);
        })[1];
      } catch (error) {
        Log.debug(`Not found ${type}`, undefined, "SpreadsheetUpload: Util");
      }
    }
    return value;
  };
  Util.changeDecimalSeperator = function changeDecimalSeperator(value) {
    // Replace thousands separator with empty string
    value = value.replace(/[.]/g, "");
    // Replace decimal separator with a dot
    value = value.replace(/[,]/g, ".");
    // Convert string to number
    return parseFloat(value);
  };
  Util.sleep = function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  };
  Util.showError = function showError(error, className, methodName) {
    let detailsContent = "";
    let errorMessage = "";
    try {
      // code error
      if (error.stack) {
        errorMessage = error.message;
        // convert urls to links and to remove lines of the url
        const regex = /(http[s]?:\/\/[^\s]+):(\d+):(\d+)/g;
        let errorStack = error.stack.replace(regex, '<a href="$1" target="_blank" class="sapMLnk">$1</a>:<span class="line-no">$2:$3</span>').replace(/\n/g, "<br/>");
        detailsContent = errorStack;
      } else {
        // OData error
        const errorObject = JSON.parse(error.responseText);
        errorMessage = errorObject.error.message.value;
        detailsContent = errorObject;
      }
    } catch (error) {
      errorMessage = "Generic Error";
      detailsContent = error;
    }
    Log.error(errorMessage, error, `${className}.${methodName}`);
    MessageBox.error(errorMessage, {
      details: detailsContent,
      initialFocus: MessageBox.Action.CLOSE,
      actions: [MessageBox.Action.OK]
    });
  };
  Util.showErrorMessage = function showErrorMessage(errorMessage, className, methodName) {
    Log.error(errorMessage, `${className}.${methodName}`);
    MessageBox.error(errorMessage, {
      initialFocus: MessageBox.Action.CLOSE,
      actions: [MessageBox.Action.CANCEL]
    });
  };
  Util.getBrowserDecimalAndThousandSeparators = function getBrowserDecimalAndThousandSeparators(componentDecimalSeparator) {
    let decimalSeparator = "";
    let thousandSeparator = "";
    if (componentDecimalSeparator === ",") {
      thousandSeparator = ".";
      decimalSeparator = ",";
      return {
        thousandSeparator,
        decimalSeparator
      };
    }
    if (componentDecimalSeparator === ".") {
      thousandSeparator = ",";
      decimalSeparator = ".";
      return {
        decimalSeparator,
        thousandSeparator
      };
    }
    const sampleNumber = 12345.6789;
    const formatted = new Intl.NumberFormat(navigator.language).format(sampleNumber);
    const withoutDigits = formatted.replace(/\d/g, "");
    decimalSeparator = withoutDigits.charAt(withoutDigits.length - 1);
    thousandSeparator = withoutDigits.charAt(0);
    return {
      decimalSeparator,
      thousandSeparator
    };
  };
  Util.normalizeNumberString = function normalizeNumberString(numberString, component) {
    const {
      decimalSeparator,
      thousandSeparator
    } = this.getBrowserDecimalAndThousandSeparators(component.getDecimalSeparator());

    // Remove thousand separators
    const stringWithoutThousandSeparators = numberString.replace(new RegExp(`\\${thousandSeparator}`, "g"), "");

    // Replace the default decimal separator with the standard one
    const standardNumberString = stringWithoutThousandSeparators.replace(decimalSeparator, ".");
    return standardNumberString;
  };
  Util.getRandomString = function getRandomString(length) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let randomString = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }
    return randomString;
  };
  Util.stringify = function stringify(obj) {
    const seen = new WeakSet();
    return JSON.stringify(obj, (key, value) => {
      // Check if value is an object and not null
      if (typeof value === "object" && value !== null) {
        // Handle circular references
        if (seen.has(value)) {
          return;
        }
        seen.add(value);

        // Handle first-level objects
        const keys = Object.keys(value);
        if (keys.every(k => typeof value[k] !== "object" || value[k] === null)) {
          let simpleObject = {};
          for (let k in value) {
            if (typeof value[k] !== "object" || value[k] === null) {
              simpleObject[k] = value[k];
            }
          }
          return simpleObject;
        }
      }
      return value;
    });
  };
  Util.extractObjects = function extractObjects(objects) {
    return objects.map(obj => obj.getObject());
  };
  Util.downloadSpreadsheetFile = function downloadSpreadsheetFile(arrayBuffer, fileName) {
    const blob = new Blob([arrayBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  Util.loadUI5RessourceAsync = async function loadUI5RessourceAsync(libraryName) {
    return new Promise(function (resolve, reject) {
      sap.ui.require([libraryName], function (Library) {
        resolve(Library);
      }, function (err) {
        reject(err);
      });
    });
  };
  /**
   * Asynchronously fires an event with the given name and parameters on the specified component.
   * With this method, async methods can be attached and also sync methods
   * instead of the standard generated fireEvent methods, we call the methods directly
   * using promises to wait for the event handlers to complete
   *
   * @param eventName - The name of the event to be fired.
   * @param eventParameters - The parameters to be passed to the event handlers.
   * @param component - The component on which the event is fired.
   * @returns A promise that resolves when all event handlers have completed.
   */
  Util.fireEventAsync = async function fireEventAsync(eventName, eventParameters, component) {
    let aEventListeners,
      event,
      promises = [];

    // @ts-ignore
    const eventPool = new ObjectPool(Event);
    aEventListeners = component.mEventRegistry[eventName];
    if (Array.isArray(aEventListeners)) {
      // Avoid issues with 'concurrent modification' (e.g. if an event listener unregisters itself).
      aEventListeners = aEventListeners.slice();
      event = eventPool.borrowObject(eventName, component, eventParameters); // borrow event lazily

      for (let oInfo of aEventListeners) {
        try {
          // Assuming each handler returns a promise
          promises.push(oInfo.fFunction.call(null, event));
        } catch (error) {
          Log.error("Error in event handler:", error);
        }
      }
    }

    // Wait for all promises (i.e., async handlers) to resolve
    await Promise.all(promises);
    return {
      bPreventDefault: event?.bPreventDefault,
      mParameters: event?.mParameters,
      returnValue: promises[0]
    };
  };
  return Util;
});
